import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await axios.get(`${process.env.BACKEND_URI}/api/tags`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            }
        });

        if (res.status === 200) return NextResponse.json({ data: res.data.data })
    } catch (err) {
        console.log('Error fetching from external API:', err);
    }

    try {
        const dbRes = await pool.query(`
            SELECT 
                id,
                document_id AS "documentId",
                name,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                published_at AS "publishedAt"
            FROM tags
            WHERE published_at IS NOT NULL
            ORDER BY name ASC
        `);
        return NextResponse.json({ data: dbRes.rows });
    } catch (err) {
        return NextResponse.json({ status: 404, error: 'Failed Fetching tags' }, { status: 404 });
    }
}