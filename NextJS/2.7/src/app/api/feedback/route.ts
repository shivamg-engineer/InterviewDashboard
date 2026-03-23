import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, feedback } = body;
  console.log("Name:", name);
  console.log("Feedback:", feedback);

  return NextResponse.json({ message: "OK" });
}
