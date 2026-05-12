import { buildDigitalTwinSystemPrompt } from "@/lib/digitalTwin";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body as { messages?: ChatMessage[] }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { error: "Body must include messages: ChatMessage[] (non-empty)." },
      { status: 400 },
    );
  }

  const safeMessages = messages
    .slice(-16)
    .map((m) => ({
      role: m?.role,
      content: typeof m?.content === "string" ? m.content : "",
    }))
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content);

  const system = buildDigitalTwinSystemPrompt();

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Optional but recommended by OpenRouter for analytics/rate-limits:
      "HTTP-Referer": "http://localhost",
      // Must be ASCII (ByteString) for fetch headers:
      "X-Title": "Sameer Pankaj - Digital Twin",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      temperature: 0.3,
      messages: [{ role: "system", content: system }, ...safeMessages],
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return Response.json(
      {
        error: "OpenRouter request failed.",
        status: upstream.status,
        details: text.slice(0, 2000),
      },
      { status: 502 },
    );
  }

  const data = (await upstream.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    return Response.json(
      { error: "No response content from model." },
      { status: 502 },
    );
  }

  return Response.json({ message: content });
}

