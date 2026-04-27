import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        reply: "Missing Gemini API key in .env.local",
      });
    }
 const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents:[
            {
              role: "user",
              parts: [{ text: message }],
            },
          ]

   
        });
        const data = response.text;

    console.log("Gemini response:", JSON.stringify(data, null, 2)); // 👈 DEBUG

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      reply: reply || "No response generated from Gemini.",
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      reply: "Server error while calling Gemini API.",
    });
  }
}