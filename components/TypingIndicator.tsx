export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
        ...
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <p className="text-xs text-gray-500 mb-1">{name}</p>
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
