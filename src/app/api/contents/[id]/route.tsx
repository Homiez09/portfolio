import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(_: null, { params }: { params: { id: string } }) {
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
		return NextResponse.json({ status: 404, error: 'Failed to fetch project contents' }, { status: 404 })
	}
}