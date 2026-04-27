import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    
    const reply = "{}";
    return NextResponse.json({
      reply: reply,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      reply: "Server error while calling Gemini API.",
    });
  }
}