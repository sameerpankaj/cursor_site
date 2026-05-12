## Sameer Pankaj — Professional Website

A local-first Next.js site with an “enterprise meets edgy” aesthetic, built from `Profile.pdf` and ready for future portfolio links.

## Getting Started

From this `web/` folder, install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Where to edit content

- `src/lib/profile.ts`: profile content (roles, skills, links)
- `src/app/page.tsx`: layout and sections
- `src/app/globals.css`: global styling and background grid

## Adding portfolio links

Update the cards in `src/app/page.tsx` under the “Portfolio” section and provide `href` values.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
