import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents/${id}?populate=*`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		if (res.status === 200) {
			return NextResponse.json(res.data)
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