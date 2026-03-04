import { pool } from "@/db/server";
import axios from "axios";

export interface GetContentsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tag?: string;
}

export async function getContentsLogic({ 
  page = 1, 
  pageSize = 6, 
  search = '', 
  tag = ''
}: GetContentsParams) {
  const validPage = Math.max(1, Math.floor(page));
  const validPageSize = Math.max(1, Math.min(100, Math.floor(pageSize)));
  const offset = (validPage - 1) * validPageSize;
  
  const searchTerm = search?.trim() || '';
  const searchTag = tag?.trim() || '';

  // 1. Try External API (Strapi)
  if (process.env.BACKEND_URI && process.env.API_TOKEN) {
    try {
      let apiUrl = `${process.env.BACKEND_URI}/api/project-contents?populate=*&pagination[page]=${validPage}&pagination[pageSize]=${validPageSize}&sort[0]=createdAt:desc`;
      
      if (searchTerm) {
        apiUrl += `&filters[$or][0][title][$containsi]=${encodeURIComponent(searchTerm)}`;
        apiUrl += `&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm)}`;
      }
      
      if (searchTag && searchTag !== 'All' && searchTag !== '') {
        apiUrl += `&filters[tags][name][$eq]=${encodeURIComponent(searchTag)}`;
      }
      
      const res = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        timeout: 5000,
      });

      if (res.status === 200) return res.data;
    } catch (apiError) {
      console.warn('External API failed, falling back to database');
    }
  }

  // 2. Fallback to Database (PostgreSQL)
  const client = await pool.connect();
  try {
    let whereConditions = ['pc.published_at IS NOT NULL'];
    let queryParams: any[] = [];
    let paramIndex = 1;
    
    if (searchTerm) {
      whereConditions.push(`(pc.title ILIKE $${paramIndex} OR pc.description ILIKE $${paramIndex})`);
      queryParams.push(`%${searchTerm}%`);
      paramIndex++;
    }
    
    let tagJoinCondition = '';
    if (searchTag && searchTag !== 'All' && searchTag !== '') {
      whereConditions.push(`t_search.name = $${paramIndex}`);
      tagJoinCondition = `
        INNER JOIN project_contents_tags_lnk pct_search ON pc.id = pct_search.project_content_id
        INNER JOIN tags t_search ON pct_search.tag_id = t_search.id
      `;
      queryParams.push(searchTag);
      paramIndex++;
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    // Count Query
    const countQuery = `SELECT COUNT(DISTINCT pc.id) as total FROM project_contents pc ${tagJoinCondition} WHERE ${whereClause}`;
    const countResult = await client.query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);
    
    if (total === 0) return { data: [], meta: { pagination: { page: validPage, pageSize: validPageSize, pageCount: 0, total: 0 } } };

    // Data Query
    const dataQueryParams = [...queryParams, validPageSize, offset];
    const dataQuery = `
      SELECT 
        pc.id, pc.document_id AS "documentId", pc.title, pc.description, 
        pc.created_at AS "createdAt", pc.updated_at AS "updatedAt", 
        pc.published_at AS "publishedAt", pc.content,
        COALESCE(tags_json.tags, '[]') AS tags,
        COALESCE(banner_json.banner, '{}') AS banner
      FROM project_contents pc
      ${tagJoinCondition}
      LEFT JOIN LATERAL (
        SELECT json_agg(jsonb_build_object(
          'id', t.id, 'documentId', t.document_id, 'name', t.name
        ) ORDER BY t.id DESC) AS tags
        FROM project_contents_tags_lnk pct
        JOIN tags t ON pct.tag_id = t.id
        WHERE pct.project_content_id = pc.id
      ) tags_json ON true
      LEFT JOIN LATERAL (
        SELECT jsonb_build_object('id', f.id, 'name', f.name, 'url', f.url) AS banner
        FROM files_related_mph fr
        JOIN files f ON f.id = fr.file_id
        WHERE fr.related_id = pc.id AND fr.related_type = 'api::project-content.project-content' AND fr.field = 'banner'
        ORDER BY fr."order" ASC LIMIT 1
      ) banner_json ON true
      WHERE ${whereClause}
      ORDER BY pc.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    const dataResult = await client.query(dataQuery, dataQueryParams);
    return {
      data: dataResult.rows,
      meta: { pagination: { page: validPage, pageSize: validPageSize, pageCount: Math.ceil(total / validPageSize), total } }
    };
  } finally {
    client.release();
  }
}

export async function getProjectById(id: string) {
  // 1. Try External API (Strapi)
  if (process.env.BACKEND_URI && process.env.API_TOKEN) {
    try {
      const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents/${id}?populate=*`, {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        timeout: 5000,
      });
      // Strapi returns { data: { ... } }, so we return it directly
      if (res.status === 200 && res.data) return res.data;
    } catch (err) {
      console.warn('External API failed for single project, falling back to database');
    }
  }

  // 2. Fallback to Database (PostgreSQL)
  try {
    const dbRes = await pool.query(
      `SELECT 
        pc.id, pc.document_id AS "documentId", pc.title, pc.description, 
        pc.created_at AS "createdAt", pc.content, 
        COALESCE(tags_json.tags, '[]') AS tags,
        COALESCE(screenshots_json.screenshots, '[]') AS screenshots,
        COALESCE(banner_json.banner, '{}') AS banner
      FROM project_contents pc
      LEFT JOIN LATERAL (
        SELECT json_agg(jsonb_build_object('id', t.id, 'name', t.name)) AS tags
        FROM project_contents_tags_lnk pct
        JOIN tags t ON pct.tag_id = t.id
        WHERE pct.project_content_id = pc.id
      ) tags_json ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(jsonb_build_object('id', f.id, 'url', f.url)) AS screenshots
        FROM files_related_mph fr
        JOIN files f ON f.id = fr.file_id
        WHERE fr.related_id = pc.id AND fr.related_type = 'api::project-content.project-content' AND fr.field = 'screenshots'
      ) screenshots_json ON true
      LEFT JOIN LATERAL (
        SELECT jsonb_build_object('id', f.id, 'url', f.url) AS banner
        FROM files_related_mph fr
        JOIN files f ON f.id = fr.file_id
        WHERE fr.related_id = pc.id AND fr.related_type = 'api::project-content.project-content' AND fr.field = 'banner'
        ORDER BY fr."order" ASC LIMIT 1
      ) banner_json ON true
      WHERE pc.published_at IS NOT NULL AND pc.document_id = $1
      LIMIT 1`, [id]);
    
    // Wrap database result in { data: ... } to match API format
    return { data: dbRes.rows[0] || null };
  } catch (err) {
    console.error('Database fetch failed for single project:', err);
    return { data: null };
  }
}
