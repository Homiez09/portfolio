import { pool } from "@/db/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = await axios.get(`${process.env.BACKEND_URI}/api/tags`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            }
        });

        if (res.status === 200) return NextResponse.json({ data: res.data.data })
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
                name,
                created_at AS "createdAt",
                updated_at AS "updatedAt",
                published_at AS "publishedAt",
                name
            FROM tags
            WHERE published_at IS NOT NULL
            `);
        return NextResponse.json({ data: dbRes.rows });
    } catch (err) {
        return NextResponse.json({ status: 404, error: 'Failed Fetching' }, { status: 404 });
    }
}