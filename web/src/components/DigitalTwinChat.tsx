"use client";

import { useMemo, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Card } from "@/components/Card";
import { cn } from "@/lib/cn";

type Msg = { role: "user" | "assistant"; content: string };

const starterQuestions = [
  "What do you do as a Function Owner?",
  "Summarize your career journey in 5 bullets.",
  "What are your strongest skills for an integration test role?",
] as const;

export function DigitalTwinChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ask me anything about Sameer’s career — roles, skills, experience, or what he’s looking for next.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const canSend = useMemo(
    () => !loading && input.trim().length > 0,
    [loading, input],
  );

  async function send(content: string) {
    const text = content.trim();
    if (!text || loading) return;

    setError(null);
    setLoading(true);

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? "…" },
      ]);
    } catch (e) {
      if ((e as { name?: string }).name === "AbortError") return;
      setError(
        e instanceof Error ? e.message : "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={className} innerClassName="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-[var(--muted)]">
            <Sparkles className="h-4 w-4 text-[var(--muted-2)]" />
            Digital Twin
          </div>
          <div className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            AI chat about my career
          </div>
          <div className="text-sm leading-relaxed text-[var(--muted)]">
            Powered by OpenRouter. Ask about roles, experience, strengths, or
            background.
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {starterQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-black/20 hover:bg-white hover:text-[var(--foreground)]"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="max-h-[360px] overflow-auto rounded-2xl border border-black/10 bg-white/60 p-4">
          <div className="space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 text-black"
                      : "bg-white/80 text-[var(--foreground)]",
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-white/80 px-4 py-3 text-sm text-[var(--muted)]">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="h-11 flex-1 rounded-2xl border border-black/10 bg-white/70 px-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-2)] outline-none transition focus:border-black/20"
          />
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition",
              canSend
                ? "bg-black text-white hover:bg-black/90"
                : "cursor-not-allowed bg-black/10 text-black/40",
            )}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>
    </Card>
  );
}

