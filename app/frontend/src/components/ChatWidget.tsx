import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, RotateCcw } from "lucide-react";
import { trpc } from "@/providers/trpc";

type Msg = { role: "user" | "assistant"; content: string; failed?: boolean };

const SUGGESTIONS = [
  "How do I register a team?",
  "What is the scoring scheme?",
  "Who are the event coordinators?",
  "Which team leads the leaderboard?",
];

const ERROR_COPY: Record<string, string> = {
  AiUnavailable: "Nitro is out of fuel — the AI quota is exhausted. Please ask the site admin to top up on Kimi, or check the Team page for answers.",
  AiMisconfigured: "Nitro's radio is misconfigured. The site needs to be republished — please contact the organisers.",
  ContentRejected: "I can't answer that one. Try rephrasing your question about the event.",
  AiTransient: "Signal interference on the pit radio — please try again in a moment.",
  AiInvalidRequest: "That question didn't come through cleanly. Try asking something shorter.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey racer! I'm Nitro, the Burnout pit-crew AI. Ask me anything about the event — registration, scoring, schedule, teams.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const ask = trpc.chat.ask.useMutation();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, ask.isPending]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || ask.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    ask.mutate(
      { messages: next.slice(-12).map((m) => ({ role: m.role, content: m.content })) },
      {
        onSuccess: (res) => {
          if (res.reply) {
            setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
          } else {
            const copy = ERROR_COPY[res.error ?? "AiTransient"] ?? ERROR_COPY.AiTransient;
            setMessages((m) => [...m, { role: "assistant", content: copy, failed: true }]);
          }
        },
        onError: () => {
          setMessages((m) => [
            ...m,
            { role: "assistant", content: ERROR_COPY.AiTransient, failed: true },
          ]);
        },
      }
    );
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center bg-[#d2ff00] shadow-[0_0_24px_rgba(210,255,0,0.35)] transition-transform hover:-translate-y-1"
      >
        {open ? <X className="h-6 w-6 text-[#12140e]" /> : <Bot className="h-6 w-6 text-[#12140e]" />}
      </button>

      {open && (
        <div className="fixed bottom-[84px] right-4 z-[60] flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col border border-border bg-[#101208] shadow-2xl sm:right-5">
          {/* header */}
          <div className="flex items-center justify-between border-b border-border bg-[#0c0e09] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-[#d2ff00]">
                <Bot className="h-5 w-5 text-[#12140e]" />
              </span>
              <div>
                <p className="font-display text-base uppercase leading-none text-[#f4f4ed]">Nitro</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#b4b8a5]">
                  <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[#d2ff00]" />
                  Pit-crew AI · online
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setMessages([
                  {
                    role: "assistant",
                    content: "Fresh start! What do you want to know about Burnout?",
                  },
                ])
              }
              className="flex h-9 w-9 items-center justify-center text-[#b4b8a5] hover:text-[#d2ff00]"
              aria-label="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#d2ff00] text-[#12140e]"
                      : m.failed
                        ? "border border-[#ff6b4a]/40 bg-[#1a1410] text-[#ffb199]"
                        : "border border-border bg-[#171a10] text-[#f4f4ed]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {ask.isPending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 border border-border bg-[#171a10] px-4 py-3">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#d2ff00]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#d2ff00]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#d2ff00]" />
                </div>
              </div>
            )}
            {messages.length <= 1 && (
              <div className="grid grid-cols-1 gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-border bg-[#0c0e09] px-3 py-2.5 text-left text-xs text-[#b4b8a5] transition-colors hover:border-[#d2ff00]/50 hover:text-[#d2ff00]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* input */}
          <form
            className="flex items-center gap-2 border-t border-border bg-[#0c0e09] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Burnout…"
              maxLength={500}
              className="h-11 flex-1 border border-border bg-[#12140e] px-3 text-sm text-[#f4f4ed] outline-none placeholder:text-[#6b705c] focus:border-[#d2ff00]"
            />
            <button
              type="submit"
              disabled={ask.isPending || !input.trim()}
              className="flex h-11 w-11 items-center justify-center bg-[#d2ff00] text-[#12140e] disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
