"use client";

import { AssistantRuntimeProvider, Suggestions, useAui } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";

export function DigitalTwinChat({ className }: { className?: string }) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api: "/api/chat" }),
  });

  const aui = useAui({
    suggestions: Suggestions([
      {
        title: "Function Owner",
        label: "what it means in practice",
        prompt: "What do you do as a Function Owner?",
      },
      {
        title: "Career journey",
        label: "in 5 bullets",
        prompt: "Summarize your career journey in 5 bullets.",
      },
      {
        title: "Strengths",
        label: "for integration testing",
        prompt:
          "What are your strongest skills for an integration test role?",
      },
      {
        title: "Recent experience",
        label: "Pixida / BMW project",
        prompt: "What are you currently doing at Pixida?",
      },
    ]),
  });

  return (
    <div
      className={[
        "rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(11,18,32,0.05),0_18px_55px_-40px_rgba(59,130,246,0.25)]",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      <AssistantRuntimeProvider aui={aui} runtime={runtime}>
        <Thread />
      </AssistantRuntimeProvider>
    </div>
  );
}

