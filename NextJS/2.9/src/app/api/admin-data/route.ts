import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  //if user not logged in
  if (!session) {
    return NextResponse.json(
      { error: "Access denied. please login!" },
      { status: 403 },
    );
  }

  //user logged in but not admin
  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized . admin access required" },
      { status: 403 },
    );
  }

  //authorized admin
  return NextResponse.json({
    message: "Welcome , Admin",
    data: "Sensitive admin data here",
  });
}
