import { NextResponse } from "next/server";
import { getContentsLogic } from "@/libs/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "6");
    const search = searchParams.get("search") || "";
    const tag = searchParams.get("tag") || "";

    const data = await getContentsLogic({
      page,
      pageSize,
      search,
      tag,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in getAll API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
