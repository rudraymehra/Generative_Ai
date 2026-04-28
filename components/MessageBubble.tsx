import { Persona } from "@/lib/personas";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
  persona: Persona;
}

export default function MessageBubble({ message, persona }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-4">
      <div
        className={`w-8 h-8 rounded-full ${persona.bgColor} flex items-center justify-center text-xs font-bold ${persona.color} flex-shrink-0`}
      >
        {persona.avatar}
      </div>
      <div className="max-w-[75%] bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <p className={`text-xs font-semibold mb-1 ${persona.color}`}>{persona.name}</p>
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
