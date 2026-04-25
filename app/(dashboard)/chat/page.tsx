'use client';

import { useState, useRef, useEffect } from "react";

const BOT_RESPONSES: Record<string, string> = {
  "course info":
    "For Semester 2, 2026, you can view all available modules via the Student Portal. Module registration closes on **March 10, 2026**.",
  "campus map":
    "The Belihuloya Campus has 5 main faculties. The Faculty of Computing is near the main gate.",
  "admin office":
    "The Administration Office is open Mon–Fri, 8:00 AM – 4:30 PM.",
  "deadlines":
    "📅 Key deadlines:\n• Module registration: March 10, 2026\n• Mid-sem exams: March 22–28, 2026",
  "faculty contacts":
    "📞 Faculty of Computing contacts available in the directory.",
  default:
    "That's a great question! Could you provide more details so I can help better?",
};

const QUICK_CHIPS = [
  { label: "Course Info", icon: "📘" },
  { label: "Campus Map", icon: "🗺️" },
  { label: "Admin Office", icon: "🏛️" },
  { label: "Deadlines", icon: "📅" },
  { label: "Faculty Contacts", icon: "📞" },
];

const INITIAL_CONVERSATIONS = [
  { id: 1, title: "Course Registration", active: true },
  { id: 2, title: "Library Opening Hours", active: false },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "bot",
    text: "Hello 👋 I'm UniMate, your AI assistant for Sabaragamuwa University.",
  },
];

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Chat() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [nextId, setNextId] = useState(10);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const currentId = nextId;

    setMessages((prev) => [...prev, { id: currentId, role: "user", text: trimmed }]);
    setNextId((n) => n + 1);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const key =
        Object.keys(BOT_RESPONSES).find((k) =>
          trimmed.toLowerCase().includes(k)
        ) ?? "default";

      setMessages((prev) => [
        ...prev,
        { id: currentId + 1, role: "bot", text: BOT_RESPONSES[key] },
      ]);
      setNextId((n) => n + 1);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-gray-50 overflow-hidden font-sans">

      {/* Sidebar */}
      <div
        className={`fixed md:sticky md:top-[60px] z-30 inset-y-0 left-0 w-64 bg-white border-r transform transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex-col`}
      >
        <div className="p-3 sm:p-4 border-b">
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden mb-3 text-gray-500"
          >
            ✕
          </button>
          <button className="w-full bg-red-900 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm">
            + New Chat
          </button>
        </div>

        <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm ${
                c.active
                  ? "bg-red-50 text-red-900 border border-red-900"
                  : "border border-dashed text-gray-500"
              }`}
            >
              📌 {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="bg-white border-b px-3 sm:px-4 md:px-5 py-2 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden text-lg sm:text-xl"
            >
              ☰
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-300 flex items-center justify-center text-base sm:text-xl">
              🤖
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm sm:text-base">UniMate AI Assistant</div>
              <div className="text-xs text-gray-400 hidden sm:block">Online</div>
            </div>
          </div>
          <div className="hidden sm:block text-xs bg-yellow-50 text-yellow-700 border border-yellow-300 px-2 sm:px-3 py-1 rounded-full">
            Response &lt; 3s
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-white border-b">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => sendMessage(chip.label.toLowerCase())}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm hover:border-red-900 hover:text-red-900 hover:bg-red-50"
            >
              {chip.icon} {chip.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[88%] md:max-w-[70%] ${
                msg.role === "bot" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={`px-4 py-3 text-sm leading-6 ${
                  msg.role === "bot"
                    ? "bg-white border rounded-2xl rounded-tl-sm"
                    : "bg-gradient-to-r from-red-900 to-red-700 text-white rounded-2xl rounded-tr-sm"
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <div key={i}>{renderText(line)}</div>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="self-start bg-white border rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
              Typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-3 sm:px-4 md:px-5 py-2 sm:py-3 flex gap-1.5 sm:gap-2">
          <input
            type="text"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border bg-gray-50 focus:bg-white focus:border-red-900 outline-none text-xs sm:text-sm min-w-0"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button className="px-2 sm:px-3 py-2 sm:py-3 border rounded-lg text-sm">🎙️</button>
          <button
            onClick={() => sendMessage(input)}
            className="px-3 sm:px-5 py-2 sm:py-3 bg-red-900 hover:bg-red-700 text-white rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}