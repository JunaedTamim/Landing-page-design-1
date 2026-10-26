# Form & Folio

A Next.js landing page and checkout flow for an independent-designer business toolkit.

## Admin content editor

Visit `/admin` and sign in with `ADMIN_PASSWORD`. In Vercel, add `ADMIN_PASSWORD` as a server-only environment variable and redeploy. Content changes are shared with visitors and persist across deployments when `DATABASE_URL` points to the project's PostgreSQL database. The admin endpoint creates its small `site_content` table automatically on first use.

The editor currently publishes the brand name and the hero headline, description, and CTA in English and Bangla. Other page sections remain authored in English. The public header includes a Bangla/English toggle (Bangla for the navigation and hero content) and a persistent light/dark theme toggle.

Never expose `ADMIN_PASSWORD` through a `NEXT_PUBLIC_` variable. Use a strong, unique value.
