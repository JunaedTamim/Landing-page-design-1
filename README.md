# Form & Folio

A Next.js landing page and checkout flow for an independent-designer business toolkit.

## Admin content editor

Visit `/admin` and sign in with `ADMIN_PASSWORD`. In Vercel, add `ADMIN_PASSWORD` as a server-only environment variable and redeploy. Content changes are shared with visitors and persist across deployments when `DATABASE_URL` points to the project's PostgreSQL database. The admin endpoint creates its small `site_content` table automatically on first use.

The editor includes tabs for the dashboard, bilingual landing-page copy and section headings, toolkit items, both BDT pricing plans and their feature lists, FAQs, testimonials, and site settings. Add, edit, remove, and publish content without a code deployment. The public site has a whole-site English/Bangla switch, and the checkout, prices, navigation, content collections, and footer follow the selected language. Prices are stored and displayed in Bangladeshi taka (BDT). The light/dark theme preference is also remembered across visits.

Never expose `ADMIN_PASSWORD` through a `NEXT_PUBLIC_` variable. Use a strong, unique value.
