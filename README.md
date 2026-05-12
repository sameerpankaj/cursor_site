## Professional Website (Next.js)

The Next.js app lives in `web/`.

### Run locally

```bash
cd web
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env` in the project root and fill in your
OpenRouter key:

```bash
cp .env.example .env
```

Required for AI chat:

- `OPENROUTER_API_KEY`: OpenRouter API key.
- `SITE_URL`: Canonical site URL, used for metadata and OpenRouter headers.
- `ALLOWED_ORIGINS`: Comma-separated origins allowed to call `/api/chat`.
- `OPENROUTER_TITLE`: Display title sent to OpenRouter.

Never commit `.env`; it is intentionally ignored by git.

