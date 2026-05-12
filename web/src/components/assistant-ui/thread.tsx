"use client";

import {
  AuiIf,
  ComposerPrimitive,
  MessagePrimitive,
  SuggestionPrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { ArrowUp, Square } from "lucide-react";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { cn } from "@/lib/cn";

export function Thread() {
  return (
    <ThreadPrimitive.Root className="grid h-[560px] grid-rows-[1fr_auto]">
      <ThreadPrimitive.Viewport className="min-h-0 overflow-auto px-4 py-5 sm:px-6">
        <AuiIf condition={(s) => s.thread.isEmpty}>
          <Welcome />
        </AuiIf>

        <ThreadPrimitive.Messages>
          {({ message }) =>
            message.role === "user" ? <UserMessage /> : <AssistantMessage />
          }
        </ThreadPrimitive.Messages>
      </ThreadPrimitive.Viewport>

      <ThreadPrimitive.ViewportFooter className="border-t border-black/10 bg-white/70 px-4 py-4 sm:px-6">
        <ThreadPrimitive.ScrollToBottom className="mb-3 inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-sm transition hover:bg-white hover:text-[var(--foreground)] disabled:opacity-50" />
        <Composer />
      </ThreadPrimitive.ViewportFooter>
    </ThreadPrimitive.Root>
  );
}

function Welcome() {
  return (
    <div className="pb-6">
      <div className="text-balance text-lg font-semibold tracking-tight text-[var(--foreground)]">
        Ask my Digital Twin anything.
      </div>
      <div className="mt-2 text-sm text-[var(--muted)]">
        Try a starter prompt, or type your own question below.
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <ThreadPrimitive.Suggestions>
          {() => <SuggestionCard />}
        </ThreadPrimitive.Suggestions>
      </div>
    </div>
  );
}

function SuggestionCard() {
  return (
    <SuggestionPrimitive.Trigger
      send
      className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-left shadow-sm transition hover:bg-white"
    >
      <div className="text-sm font-semibold text-[var(--foreground)]">
        <SuggestionPrimitive.Title />
      </div>
      <div className="mt-1 text-xs text-[var(--muted)]">
        <SuggestionPrimitive.Description />
      </div>
    </SuggestionPrimitive.Trigger>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="mt-3 flex justify-end">
      <div className="max-w-[min(680px,92%)] rounded-3xl bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 px-5 py-3 text-black shadow-sm">
        <MessagePrimitive.Parts>
          {({ part }) => (part.type === "text" ? <MarkdownText /> : null)}
        </MessagePrimitive.Parts>
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="mt-3 flex justify-start">
      <div className="max-w-[min(680px,92%)] rounded-3xl border border-black/10 bg-white/80 px-5 py-3 shadow-sm">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
          Digital Twin
        </div>
        <MessagePrimitive.Parts>
          {({ part }) => (part.type === "text" ? <MarkdownText /> : null)}
        </MessagePrimitive.Parts>
        <MessagePrimitive.Error>
          <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Something went wrong generating a response. Please try again.
          </div>
        </MessagePrimitive.Error>
      </div>
    </MessagePrimitive.Root>
  );
}

function Composer() {
  return (
    <ComposerPrimitive.Root className="flex items-end gap-2">
      <ComposerPrimitive.Input
        className={cn(
          "min-h-11 flex-1 resize-none rounded-3xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[var(--foreground)]",
          "placeholder:text-[var(--muted-2)] shadow-sm outline-none transition focus:border-black/20",
        )}
        placeholder="Ask about roles, skills, projects, or experience…"
      />

      <AuiIf condition={(s) => !s.thread.isRunning}>
        <ComposerPrimitive.Send asChild>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-3xl bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-black/90"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
            Send
          </button>
        </ComposerPrimitive.Send>
      </AuiIf>

      <AuiIf condition={(s) => s.thread.isRunning}>
        <ComposerPrimitive.Cancel asChild>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-3xl border border-black/10 bg-white/80 px-4 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:bg-white"
            aria-label="Stop generating"
          >
            <Square className="h-4 w-4" />
            Stop
          </button>
        </ComposerPrimitive.Cancel>
      </AuiIf>
    </ComposerPrimitive.Root>
  );
}

