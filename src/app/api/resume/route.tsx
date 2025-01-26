import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/resume-download-url`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		if (res.status === 200) {
			return NextResponse.json({uri : res.data.data.name})
		} else {
			return NextResponse.json(
				{
					error: "Failed to fetch project contents",
					details: res.data,
				},
				{ status: res.status }
			);
		}
	} catch (err) {
		return NextResponse.json({ status: 400 }, { status: 400 })
	}
}