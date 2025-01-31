import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: { search: string } }) {
	const param = params.search.split('|');
	const [search, tag] = param;

	try {
		const res = await axios.get(`${process.env.BACKEND_URI}/api/project-contents?populate=*&sort[0]=createdAt:desc&filters[$or][0][title][$containsi]=${search}&filters[$or][1][description][$containsi]=${search}&filters[$and][2][tags][name][$containsi]=${tag==="All"? "" : tag}`, {
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