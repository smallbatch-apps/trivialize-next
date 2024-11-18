import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const response = NextResponse.json({ message: "Cookie set" });
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return response;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  return NextResponse.json({ token });
}
