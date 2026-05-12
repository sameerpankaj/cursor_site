import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { buildDigitalTwinSystemPrompt } from "@/lib/digitalTwin";

export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_PARTS_PER_MESSAGE = 20;
const MAX_MESSAGE_BYTES = 12_000;
const MAX_BODY_BYTES = 80_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const messagePartSchema = z.object({ type: z.string().min(1) }).passthrough();

const messageSchema = z
  .object({
    id: z.string().optional(),
    role: z.enum(["system", "user", "assistant"]),
    parts: z.array(messagePartSchema).min(1).max(MAX_PARTS_PER_MESSAGE),
  })
  .passthrough()
  .superRefine((message, ctx) => {
    const bytes = new TextEncoder().encode(JSON.stringify(message)).length;
    if (bytes > MAX_MESSAGE_BYTES) {
      ctx.addIssue({
        code: "custom",
        message: `Each message must be under ${MAX_MESSAGE_BYTES} bytes.`,
      });
    }
  });

const chatBodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
});

function getAllowedOrigins() {
  const configured = process.env.ALLOWED_ORIGINS ?? process.env.SITE_URL ?? "";
  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const allowedOrigins = getAllowedOrigins();

  if (process.env.NODE_ENV !== "production") {
    return (
      !origin ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:") ||
      allowedOrigins.includes(origin)
    );
  }

  return Boolean(origin && allowedOrigins.includes(origin));
}

function getClientId(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

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

  if (!isAllowedOrigin(req)) {
    return Response.json({ error: "Forbidden origin." }, { status: 403 });
  }

  const clientId = getClientId(req);
  if (isRateLimited(clientId)) {
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return Response.json(
      { error: `Request body must be under ${MAX_BODY_BYTES} bytes.` },
      { status: 413 },
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody || "{}");
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = chatBodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Body must include a valid messages array.",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const messages = parsed.data.messages as UIMessage[];

  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const openrouter = createOpenAI({
    apiKey: key,
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      "HTTP-Referer": siteUrl,
      "X-Title": process.env.OPENROUTER_TITLE ?? "Sameer Pankaj - Digital Twin",
    },
  });

  const system = buildDigitalTwinSystemPrompt();

  const result = streamText({
    model: openrouter.chat("openai/gpt-oss-120b:free"),
    temperature: 0.3,
    maxOutputTokens: 800,
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

