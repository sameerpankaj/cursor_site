# Tutorial: How this Professional Website Works (Beginner-Friendly)

This tutorial is written for a **complete beginner** to frontend development. By the end, you’ll understand:

- What technologies are used and why
- How the pages, components, and styling fit together
- How the **Digital Twin** chat works (UI + backend API + OpenRouter)
- What you could improve next

> Note: Your OpenRouter API key is stored in `.env` and must **never** be committed or exposed to the browser.

---

## 1) Technology summary (what we used)

### Next.js (App Router)
This project is built with **Next.js** using the **App Router**:

- Pages live in `web/src/app/`
- `layout.tsx` is the “frame” around all pages (header, footer, background)
- `page.tsx` is the actual homepage content
- API routes live in `web/src/app/api/*`

### React (components)
The UI is made of **React components** (small reusable building blocks), e.g.:

- `Container`, `Section`, `Badge`, `Kpi`
- `DigitalTwinChat` (chat widget wrapper)
- `assistant-ui` thread components (modern chat UI)

### Tailwind CSS v4 (utility-first styling)
Tailwind provides classes like `flex`, `rounded-3xl`, `px-6`, etc. for styling directly in JSX.

### assistant-ui (modern chat widget UI)
We switched to **assistant-ui** (modern chat UI) which provides:

- A robust message list + composer input
- Suggestions (“starter prompts”)
- Good accessibility defaults
- A composable primitive-based API (you can customize the look)

### Vercel AI SDK v6 (`ai` + `@ai-sdk/openai`)
We use the AI SDK to:

- Convert UI messages into model messages
- Stream the response back to the UI

### OpenRouter (LLM gateway)
OpenRouter is used as the model provider, calling:

- Model: `openai/gpt-oss-120b:free`

---

## 2) Project structure (where things live)

At the repository root:

- `package.json`: convenience scripts to run the app in `web/`
- `Profile.pdf`: your source profile
- `.env`: contains `OPENROUTER_API_KEY=...` (keep it private)

Inside `web/` (the actual Next.js app):

```
web/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      api/
        chat/route.ts
    components/
      (UI components)
      assistant-ui/
        thread.tsx
        markdown-text.tsx
    lib/
      profile.ts
      digitalTwin.ts
```

---

## 3) How a Next.js App Router site renders (high level)

When you open the site in the browser:

1. Next.js loads `web/src/app/layout.tsx`
2. Inside that layout, Next.js renders the current page:
   - For the homepage, that’s `web/src/app/page.tsx`
3. Components referenced by `page.tsx` render the sections

**Key idea:** `layout.tsx` is your “shell” and `page.tsx` is your “content”.

---

## 4) Content model: `profile.ts` (your data)

The file `web/src/lib/profile.ts` is a structured version of what we extracted from `Profile.pdf`:

- Name, headline, location
- Summary paragraph
- Experience timeline
- Education
- Skills

This is helpful because:

- The website UI can render it consistently
- The AI “Digital Twin” can use the same data as grounding context

---

## 5) Styling (Tailwind + a simple design token approach)

### Tailwind utility classes
You’ll see className strings like:

```tsx
<div className="rounded-3xl border border-black/10 bg-white/70 px-4 py-3" />
```

This is Tailwind’s philosophy:

- Use small “utility” classes
- Compose them to make a design

### Global CSS variables
In `web/src/app/globals.css` there are CSS variables like:

- `--background`
- `--foreground`
- `--muted`

These allow a consistent “theme” without hardcoding colors everywhere.

---

## 6) The homepage: `page.tsx` (sections + layout)

The homepage (`web/src/app/page.tsx`) is a set of sections:

- Hero (name + intro + CTA)
- About
- Career journey
- Skills
- Portfolio placeholder
- **Digital Twin chat**
- Contact

Each section is typically:

- Wrapped in a `<Section />` component (headline + spacing)
- Filled with cards, badges, and content blocks

---

## 7) Digital Twin: the big picture

The “Digital Twin” feature has **two halves**:

### A) Frontend chat widget (what users see)
- Implemented with `assistant-ui`
- Renders messages, suggestions, and the composer input
- Sends messages to our backend API endpoint

### B) Backend API route (what talks to OpenRouter)
- `POST /api/chat` in `web/src/app/api/chat/route.ts`
- Calls OpenRouter using the AI SDK
- Streams the response back to the browser

---

## 8) Digital Twin grounding: `digitalTwin.ts`

File: `web/src/lib/digitalTwin.ts`

This builds a **system prompt** from your profile data, so the model answers questions about your career accurately.

Conceptually:

```ts
const system = buildDigitalTwinSystemPrompt();
// The model sees this system message every request.
```

This is important because:

- Models can hallucinate if not grounded
- Your Digital Twin should be consistent with your actual profile

---

## 9) Backend: `/api/chat` (OpenRouter + streaming)

File: `web/src/app/api/chat/route.ts`

What it does:

1. Reads the `OPENROUTER_API_KEY` from server env
2. Parses incoming messages from the UI
3. Builds the system prompt (Digital Twin grounding)
4. Calls OpenRouter (OpenAI-compatible endpoint) using AI SDK v6
5. Returns a **streaming response** so the UI can show tokens as they arrive

### Why it’s server-side
We do **not** call OpenRouter directly from the browser because:

- That would expose your API key
- Anyone could steal it

### Why streaming matters
Streaming provides a more modern UX:

- The user sees the answer “typing” in
- Long answers feel responsive

---

## 10) Frontend: assistant-ui “Thread” (modern chat UI)

There are a few layers:

### A) `DigitalTwinChat.tsx` (wires runtime + UI)
File: `web/src/components/DigitalTwinChat.tsx`

What it does:

- Creates a runtime with `useChatRuntime`
- Points it at our endpoint (`/api/chat`)
- Configures starter prompts (suggestions)
- Renders the `Thread` component

### B) `assistant-ui/thread.tsx` (the actual chat layout)
File: `web/src/components/assistant-ui/thread.tsx`

This defines:

- A scrollable viewport for messages
- A welcome screen + suggestion cards
- Separate rendering for user vs assistant messages
- A composer input and send/stop buttons

### C) `assistant-ui/markdown-text.tsx` (markdown rendering)
File: `web/src/components/assistant-ui/markdown-text.tsx`

This renders assistant responses as markdown, so bullets/links/code look nice.

---

## 11) A beginner-friendly code review (what to look for)

This section walks you through the most important files and patterns.

### 11.1 `web/src/app/layout.tsx`
**Purpose:** global wrapper for every page.

Look for:

- `<Header />` and `<Footer />` around `{children}`
- Background layers for a premium look
- `suppressHydrationWarning` (prevents dev overlay warnings caused by browser extensions injecting HTML attributes)

### 11.2 `web/src/app/page.tsx`
**Purpose:** homepage content and section ordering.

Look for:

- `Section` components with an `id` (so the header nav can jump to anchors)
- The Digital Twin section:
  - `id="digital-twin"`
  - `<DigitalTwinChat />`

### 11.3 `web/src/lib/profile.ts`
**Purpose:** the “single source of truth” for your career data.

Look for:

- `experience` list: used by timeline UI
- `education` list
- skills/highlights used in badges/cards

### 11.4 `web/src/lib/digitalTwin.ts`
**Purpose:** produce the system prompt used by the model.

Look for:

- “Rules” section telling the model to stay grounded
- Rendered experience + education summaries

### 11.5 `web/src/app/api/chat/route.ts`
**Purpose:** server-side chat endpoint.

Look for:

- `createOpenAI({ baseURL: "https://openrouter.ai/api/v1" })`
- `openrouter.chat("openai/gpt-oss-120b:free")`
- `streamText(...)`
- `return result.toUIMessageStreamResponse()`

Also notice:

- The code accepts both `parts` and older `content` formats for messages.
  This makes it robust if the frontend changes slightly.

### 11.6 `web/src/components/DigitalTwinChat.tsx`
**Purpose:** connects the assistant-ui runtime to our endpoint.

Look for:

- `new AssistantChatTransport({ api: "/api/chat" })`
- `Suggestions([...])` starter prompts
- `AssistantRuntimeProvider` wrapping `<Thread />`

### 11.7 `web/src/components/assistant-ui/thread.tsx`
**Purpose:** modern chat widget layout.

Look for:

- `ThreadPrimitive.Messages` rendering user vs assistant bubbles
- `ComposerPrimitive.Input` (your text box)
- `ComposerPrimitive.Send` and `ComposerPrimitive.Cancel` (send/stop)

---

## 12) How to run it locally (commands)

From the repository root:

```bash
cd /Users/sam/Cursor_projects/site
npm run dev
```

Then open the printed URL (often `http://localhost:3001` if `3000` is already in use).

---

## 13) Self-review: 5 ways to improve next

1. **Add rate limiting + basic abuse protection**
   - Prevent bots from spamming `/api/chat` and burning tokens.

2. **Add persistent chat history**
   - Store messages in localStorage (simple) or a DB (advanced) so refresh doesn’t wipe the conversation.

3. **Improve server validation**
   - Use a schema validator (e.g. Zod) for `messages` input to avoid runtime surprises.

4. **Add automated tests**
   - Unit test `buildDigitalTwinSystemPrompt()`
   - Integration test `/api/chat` (mock OpenRouter)

5. **Stronger content grounding**
   - Add more structured facts (projects, tools, accomplishments) and explicitly instruct the model to cite which part of the profile it’s using.

