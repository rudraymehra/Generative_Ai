import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { personas, PersonaId } from "@/lib/personas";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { messages, personaId } = await req.json();

    if (!personaId || !personas[personaId as PersonaId]) {
      return NextResponse.json({ error: "Invalid persona" }, { status: 400 });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const persona = personas[personaId as PersonaId];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: persona.systemPrompt,
    });

    // Gemini uses "model" role instead of "assistant"
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
