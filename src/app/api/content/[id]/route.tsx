import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents/${id}?populate=*`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		if (res.status === 200) return NextResponse.json(res.data);
		return NextResponse.json(
			{
				status: res.status,
				msg: res.data,
			},
			{ status: res.status }
		);
	} catch (err) {
		console.log('Error fetching data:', err);
	}

	try {
		const dbRes = await pool.query(
			`SELECT 
				pc.id, 
				pc.document_id AS "documentId", 
				pc.title, 
				pc.description, 
				pc.created_at AS "createdAt", 
				pc.updated_at AS "updatedAt", 
				pc.published_at AS "publishedAt", 
				pc.content, 
				COALESCE(tags_json.tags, '[]') AS tags,
    			COALESCE(screenshots_json.screenshots, '[]') AS screenshots,
				COALESCE(banner_json.banner) AS banner
			FROM project_contents pc
			LEFT JOIN admin_users creator ON pc.created_by_id = creator.id
			LEFT JOIN admin_users updater ON pc.updated_by_id = updater.id
			LEFT JOIN project_contents_tags_lnk pct ON pc.id = pct.project_content_id
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
				SELECT json_agg(jsonb_build_object(
					'id', f.id,
					'name', f.name,
					'url', f.url,
					'order', fr."order",
					'width', f.width,
					'height', f.height
				) ORDER BY fr."order" ASC) AS screenshots
				FROM files_related_mph fr
				JOIN files f ON f.id = fr.file_id
				WHERE fr.related_id = pc.id
				AND fr.related_type = 'api::project-content.project-content'
				AND fr.field = 'screenshots'
			) screenshots_json ON true
			LEFT JOIN LATERAL (
				SELECT 
					COALESCE(
						jsonb_build_object(
							'id', f.id,
							'name', f.name,
							'url', f.url,
							'order', fr."order",
							'width', f.width,
							'height', f.height
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
			WHERE pc.published_at IS NOT NULL
			AND pc.document_id = '${id}'
			LIMIT 1`);
		return NextResponse.json({ data: dbRes.rows[0] });
	} catch (err) {
		return NextResponse.json({ status: 404, error: 'Failed to fetch project contents' }, { status: 404 })
	}
}