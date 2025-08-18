import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents?populate=*&pagination[page]=1&pagination[pageSize]=6&sort[0]=updatedAt:desc`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		if (res.status === 200) return NextResponse.json(res.data)
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
		const dbRes = await pool.query(`
			SELECT 
				pc.id, 
				pc.document_id AS "documentId", 
				pc.title, 
				pc.description, 
				pc.created_at AS "createdAt", 
				pc.updated_at AS "updatedAt", 
				pc.published_at AS "publishedAt", 
				pc.content, 
				pc.date,
				json_agg(jsonb_build_object(
					'id', t.id,
					'documentId', t.document_id,
					'name', t.name,
					'createdAt', t.created_at,
					'updatedAt', t.updated_at,
					'publishedAt', t.published_at
				) ORDER BY t.id DESC) AS tags
			FROM project_contents pc
			LEFT JOIN admin_users creator ON pc.created_by_id = creator.id
			LEFT JOIN admin_users updater ON pc.updated_by_id = updater.id
			LEFT JOIN project_contents_tags_lnk pct ON pc.id = pct.project_content_id
			LEFT JOIN tags t ON pct.tag_id = t.id
			WHERE pc.published_at IS NOT NULL
			GROUP BY pc.id, creator.id, updater.id 
			ORDER BY pc.id DESC;
		`);
		return NextResponse.json({ data: dbRes.rows });
	} catch (err) {
		return NextResponse.json({ status: 404, error: 'Failed Fetching' }, { status: 404 });
	}
}