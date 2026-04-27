# Rater - Next.js 14 Reporting Flow

This project is a 3-page passenger reporting flow built with Next.js 14 App Router.

- Landing page: QR scan
- Report page: category, description, optional photo/video
- Thank-you page: animation + auto-redirect

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Prisma ORM
- PostgreSQL (Vercel Postgres)
- Vercel Blob (media upload)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`:

```env
DATABASE_URL="your-vercel-postgres-url"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

3. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

4. Run development server:

```bash
npm run dev
```

5. Open:

`http://localhost:3000`

## Prisma Migrations

### Development

Create and apply a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

Regenerate client manually (if needed):

```bash
npx prisma generate
```

### Production

Apply existing migrations:

```bash
npx prisma migrate deploy
```

## Deploy to Vercel

1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. Add environment variables in Vercel Project Settings:
   - `DATABASE_URL` (from Vercel Postgres)
   - `BLOB_READ_WRITE_TOKEN` (from Vercel Blob)
4. Set build command in Vercel to ensure migrations run:

```bash
npx prisma migrate deploy && npm run build
```

5. Deploy.

## Production Notes

- API route `app/api/report/route.ts` runs on Node.js runtime (`export const runtime = "nodejs"`), which is required for Prisma and Blob uploads.
- Prisma client is initialized in `lib/db.ts` with a singleton pattern for stable server/runtime behavior.
- `postinstall` runs `prisma generate`, so Prisma client is generated during install/build environments.
