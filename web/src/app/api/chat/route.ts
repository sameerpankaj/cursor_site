import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildDigitalTwinSystemPrompt } from "@/lib/digitalTwin";

export const maxDuration = 30;

export async function POST(req: Request) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return Response.json(
      {
        error:
          "Missing OPENROUTER_API_KEY. Add it to the project root .env file.",
      },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as null | {
    messages?: unknown[];
  };
  const rawMessages = body?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return Response.json(
      { error: "Body must include messages: UIMessage[] (non-empty)." },
      { status: 400 },
    );
  }

  // Back-compat: earlier iterations used `{ content: [...] }` instead of AI SDK v6 `{ parts: [...] }`.
  const messages = rawMessages.map((m) => {
    const msg = m as Partial<UIMessage> & { content?: UIMessage["parts"] };
    if (Array.isArray(msg.parts)) return msg as UIMessage;
    if (Array.isArray(msg.content)) return { ...msg, parts: msg.content } as UIMessage;
    return msg as UIMessage;
  });
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { error: "Body must include messages: UIMessage[] (non-empty)." },
      { status: 400 },
    );
  }

  const openrouter = createOpenAI({
    apiKey: key,
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      // Recommended by OpenRouter for analytics/rate-limits:
      "HTTP-Referer": "http://localhost",
      "X-Title": "Sameer Pankaj - Digital Twin",
    },
  });

  const system = buildDigitalTwinSystemPrompt();

  const result = streamText({
    model: openrouter.chat("openai/gpt-oss-120b:free"),
    temperature: 0.3,
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

