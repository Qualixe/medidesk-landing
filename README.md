# MediDesk — marketing site

Landing page for MediDesk, the desktop practice-management app for doctors and small clinics in Bangladesh.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react. Every route is prerendered as static HTML; there is no backend.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| What | File |
| --- | --- |
| Download version, release date, installer URLs, sizes, checksums, macOS availability, "Notify me" endpoint | `src/config/downloads.ts` |
| Site URL, support email, WhatsApp number | `src/config/site.ts` |
| Prices and trial length | `src/config/pricing.ts` |
| **All page copy** (English) | `src/i18n/en.ts` |
| **All page copy** (Bangla) — same shape as `en.ts` | `src/i18n/bn.ts` |
| Logo artwork (original + cropped master) | `design/` — exported sizes in `src/assets/` and `src/app/icon.png`, `apple-icon.png`, `favicon.ico` |
| Brand colours, dark theme, fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Sections of the home page | `src/components/sections/*` |
| Privacy / Terms text | `legal` key in `src/i18n/en.ts` and `bn.ts` |

### How a few things work

- **OS-aware download buttons.** A tiny inline script in `<head>` sets `data-os`, `data-theme`, `data-mobile` and `lang` on `<html>` before first paint. The buttons are laid out by CSS from those attributes, so a Mac visitor sees the macOS button first with no flicker.
- **macOS not released yet.** While `downloads.mac.available` is `false`, the macOS button reads "Coming soon" and shows a "Notify me" email field. With `downloads.notify.endpoint` empty, submitting the field opens the visitor's email app addressed to `notify.fallbackEmail`. Put a form endpoint there (Formspree, Basin, Getform, …) to collect sign-ups instead; it receives a JSON POST `{ email, platform }`. Set `available: true` when the `.dmg` ships.
- **Language.** The page is prerendered in English and switches to Bangla on the client. The choice is stored in `localStorage` (`medidesk-lang`) and `<html lang>` is updated. In Bangla mode, numbers use Bangla digits (৳৯৯). The Noto Sans Bengali font is only downloaded in Bangla mode.
- **Theme.** Follows the system setting until the visitor uses the toggle; the choice is stored as `medidesk-theme`.
- **Colours.** Taken from the logo: mint `#5af4e8` → cyan `#30d3f6` → azure `#0c7cfc` → royal `#0136da`, navy `#0a3d8e` (see the top of `globals.css`). White text on the azure is only 3.96:1, below WCAG AA, so filled buttons use the logo's deeper blue `#0755f5` (5.79:1) and small blue text uses `#0149cf`. The full mint→royal gradient is used for decorative surfaces only, never behind small text.

## Deploy to Vercel

1. Push this folder to a new GitHub/GitLab/Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Next.js; keep the defaults (build `next build`, no environment variables needed).
3. Click **Deploy**.
4. Under **Settings → Domains**, add your domain, then set `site.url` in `src/config/site.ts` to that exact URL (no trailing slash). Commit and push to redeploy; this updates the canonical links, sitemap and Open Graph tags.

Every push to the main branch redeploys; other branches get preview URLs.
