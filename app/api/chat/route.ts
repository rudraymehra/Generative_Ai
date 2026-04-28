import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { personas, PersonaId } from "@/lib/personas";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

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
      safetySettings,
    });

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;

    const candidate = response.candidates?.[0];
    const finishReason = candidate?.finishReason;

    if (finishReason === "SAFETY") {
      return NextResponse.json({
        message:
          "I'd rather not weigh in on that one — let's talk about something else. What else is on your mind?",
      });
    }

    if (finishReason === "RECITATION") {
      return NextResponse.json({
        message:
          "Hmm, let me rephrase that thought. Can you ask me from a different angle?",
      });
    }

    const text = response.text();

    if (!text || !text.trim()) {
      return NextResponse.json({
        message:
          "I couldn't quite form a response there — could you rephrase your question?",
      });
    }

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Chat API error:", err);
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return NextResponse.json(
      { error: `Something went wrong: ${message}` },
      { status: 500 }
    );
  }
}
