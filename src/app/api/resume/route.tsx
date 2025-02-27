import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function POST() {
    try {
        const res = await axios.get(`${process.env.BACKEND_URI}/api/resume-download-url`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            }
        });

        if (res.status === 200) return NextResponse.json({ uri: res.data.data.name })
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
                id,
                document_id AS "documentId",
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                published_at AS "publishedAt",
                name
            FROM resume_download_urls
            WHERE published_at IS NOT NULL
            LIMIT 1;

        `);
        return NextResponse.json({ uri: dbRes.rows[0].name });
    } catch (err) {
        return NextResponse.json({ status: 404, error: 'Failed Fetching' }, { status: 404 });
    }
}