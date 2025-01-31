import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents?populate=*&sort[0]=createdAt:desc`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});

		if (res.status === 200) {
			return NextResponse.json(res.data)
		} 
		// else {
		// 	return NextResponse.json(
		// 		{
		// 			error: "Failed to fetch project contents",
		// 			details: res.data,
		// 		},
		// 		{ status: res.status }
		// 	);
		// }
	} catch (err) {
		return NextResponse.json({ status: 404, error: 'Failed Fetching' }, { status: 404 })
	}
}