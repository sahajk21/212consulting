This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Lead Capture Form & Google Sheets Integration

The landing page includes a lead form (`#get-started`) that appends submissions to a Google Sheet via the API route `app/api/lead/route.ts`.

### Required Environment Variables

Create an `.env.local` file with:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id_here
```

Notes:

-   Escape newlines in the private key with `\n` if putting it on one line.
-   The sheet must have a tab named `Leads` with columns A-E available (Timestamp, Name, Email, Company, Message).
-   Make sure the service account has edit access to the sheet.

### Testing Locally

1. Add env vars.
2. Run `npm run dev`.
3. Submit the form. Check the Google Sheet for a new row.

### Error Handling

-   Missing required fields returns 400.
-   Missing credentials returns 500.
-   API returns JSON `{ success: boolean; error?: string }`.

## Deployment

Provide the same environment variables in your hosting platform (e.g., Vercel project settings). Private key must preserve line breaks or `\n` escapes.

## Next Steps / Enhancements

-   Add server-side validation & rate limiting.
-   Add captcha for spam protection.
-   Replace basic inputs with shadcn `Input` & `Textarea` components via CLI (`npx shadcn@latest add input textarea`).
-   Send confirmation email on submission.
