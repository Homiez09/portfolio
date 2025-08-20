import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";

interface RequestParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tag?: string;
}

export async function POST(request: Request) {
  try {
    const { 
      page = 1, 
      pageSize = 6, 
      search = '', 
      tag = ''
    }: RequestParams = await request.json();
    
    // Validate pagination parameters
    const validPage = Math.max(1, Math.floor(page));
    const validPageSize = Math.max(1, Math.min(100, Math.floor(pageSize))); // Limit max page size
    const offset = (validPage - 1) * validPageSize;
    
    // Clean search term
    const searchTerm = search?.trim() || '';
    const searchTag = tag?.trim() || '';

    // Try external API first
    if (process.env.BACKEND_URI && process.env.API_TOKEN) {
      try {
        // Build API URL with search parameters
        let apiUrl = `${process.env.BACKEND_URI}/api/project-contents?populate=*&pagination[page]=${validPage}&pagination[pageSize]=${validPageSize}&sort[0]=createdAt:desc`;
        
        // Add search filters for external API
        if (searchTerm) {
          apiUrl += `&filters[$or][0][title][$containsi]=${encodeURIComponent(searchTerm)}`;
          apiUrl += `&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm)}`;
        }
        
        if (searchTag && searchTag !== 'All') {
          apiUrl += `&filters[tags][name][$eq]=${encodeURIComponent(searchTag)}`;
        }
        
        const res = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
          timeout: 5000, // 5 second timeout
        });

        if (res.status === 200) {
          return NextResponse.json(res.data);
        }
      } catch (apiError) {
        console.warn('External API failed, falling back to database:', apiError);
      }
    }

    // Fallback to database with optimized queries
    const client = await pool.connect();
    
    try {
      // Build WHERE conditions for search
      let whereConditions = ['pc.published_at IS NOT NULL'];
      let queryParams: any[] = [];
      let paramIndex = 1;
      
      // Add search condition for title, description, and content
      if (searchTerm) {
        whereConditions.push(`(
          pc.title ILIKE $${paramIndex} OR 
          pc.description ILIKE $${paramIndex}
        )`);
        queryParams.push(`%${searchTerm}%`);
        paramIndex++;
      }
      
      // Add tag search condition
      let tagJoinCondition = '';
      if (searchTag && searchTag !== 'All') {
        whereConditions.push(`t_search.name = $${paramIndex}`);
        tagJoinCondition = `
          INNER JOIN project_contents_tags_lnk pct_search ON pc.id = pct_search.project_content_id
          INNER JOIN tags t_search ON pct_search.tag_id = t_search.id
        `;
        queryParams.push(searchTag);
        paramIndex++;
      }
      
      const whereClause = whereConditions.join(' AND ');
      
      // Get total count first (optimized query with search)
      const countQuery = `
        SELECT COUNT(DISTINCT pc.id) as total
        FROM project_contents pc
        ${tagJoinCondition}
        WHERE ${whereClause}
      `;
      
      const countResult = await client.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);
      
      if (total === 0) {
        return NextResponse.json({
          data: [],
          meta: {
            pagination: {
              page: validPage,
              pageSize: validPageSize,
              pageCount: 0,
              total: 0,
            },
            search: {
              term: searchTerm,
              tag: searchTag,
            }
          }
        });
      }

      // Get paginated data with optimized search query
      const limitOffset = [validPageSize, offset];
      const dataQueryParams = [...queryParams, ...limitOffset];
      
      const dataQuery = `
        SELECT 
          pc.id, 
          pc.document_id AS "documentId", 
          pc.title, 
          pc.description, 
          pc.created_at AS "createdAt", 
          pc.updated_at AS "updatedAt", 
          pc.published_at AS "publishedAt", 
          pc.content,
          COALESCE(tags_json.tags, '[]') AS tags,
    			COALESCE(banner_json.banner) AS banner
        FROM project_contents pc
        ${tagJoinCondition}
        LEFT JOIN project_contents_tags_lnk pct ON pc.id = pct.project_content_id
        LEFT JOIN tags t ON pct.tag_id = t.id
				LEFT JOIN LATERAL (
					SELECT json_agg(jsonb_build_object(
						'id', t.id,
						'documentId', t.document_id,
						'name', t.name,
						'createdAt', t.created_at,
						'updatedAt', t.updated_at,
						'publishedAt', t.published_at
					) ORDER BY t.id DESC) AS tags
					FROM project_contents_tags_lnk pct
					JOIN tags t ON pct.tag_id = t.id
					WHERE pct.project_content_id = pc.id
				) tags_json ON true
				LEFT JOIN LATERAL (
					SELECT 
							COALESCE(
									jsonb_build_object(
											'id', f.id,
											'name', f.name,
											'url', f.url,
											'order', fr."order"
									), 
									'{}'
							) AS banner
					FROM files_related_mph fr
					JOIN files f ON f.id = fr.file_id
					WHERE fr.related_id = pc.id
						AND fr.related_type = 'api::project-content.project-content'
						AND fr.field = 'banner'
					ORDER BY fr."order" ASC
					LIMIT 1
				) banner_json ON true
        WHERE ${whereClause}
        ORDER BY 
          ${searchTerm ? `
            CASE 
              WHEN pc.title ILIKE $1 THEN 1
              WHEN pc.description ILIKE $1 THEN 2
              ELSE 3
            END,
          ` : ''}
          pc.created_at DESC
        LIMIT $${dataQueryParams.length - 1} OFFSET $${dataQueryParams.length}
      `;
      
      const dataResult = await client.query(dataQuery, dataQueryParams);

      const pageCount = Math.ceil(total / validPageSize);

      return NextResponse.json({
        data: dataResult.rows,
        meta: {
          pagination: {
            page: validPage,
            pageSize: validPageSize,
            pageCount,
            total,
          },
          search: {
            term: searchTerm,
            tag: searchTag,
            hasFilters: searchTerm.length > 0 || searchTag.length > 0,
          }
        }
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error in getAll API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to fetch content'
      }, 
      { status: 500 }
    );
  }
}