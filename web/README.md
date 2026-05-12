## Sameer Pankaj — Professional Website

A local-first Next.js site with an “enterprise meets edgy” aesthetic, built from `Profile.pdf` and ready for future portfolio links.

## Getting Started

From this `web/` folder, install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

The app reads environment variables from the project root `.env` file. Start
from the root `.env.example`:

```bash
cp ../.env.example ../.env
```

Required values:

- `OPENROUTER_API_KEY`: Server-only key for the Digital Twin chat.
- `SITE_URL`: Canonical URL for metadata, sitemap, and OpenRouter headers.
- `ALLOWED_ORIGINS`: Comma-separated origins allowed to call `/api/chat`.
- `OPENROUTER_TITLE`: OpenRouter analytics title.

## Where to edit content

- `src/lib/profile.ts`: profile content (roles, skills, links)
- `src/app/page.tsx`: layout and sections
- `src/app/globals.css`: global styling and background grid

## Adding portfolio links

Update the cards in `src/app/page.tsx` under the “Portfolio” section and provide `href` values.

## Deployment checklist

- Rotate any API key that has ever been shared or pasted into tools.
- Set `OPENROUTER_API_KEY`, `SITE_URL`, `ALLOWED_ORIGINS`, and `OPENROUTER_TITLE` in the host's secret/env settings.
- Confirm `/api/chat` works from the deployed domain and rejects other origins.
- Confirm `/robots.txt` and `/sitemap.xml` are generated.

