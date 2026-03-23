import { NextResponse } from "next/server";

export async function GET() {
  try {
    // simulate error
    throw new Error("Database connection failed");

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}