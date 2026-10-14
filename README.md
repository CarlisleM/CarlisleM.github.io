# Roblox portfolio

Personal portfolio site with live Roblox game stats. React + Vite + Tailwind, hosted free on GitHub Pages.

## Editing content

Everything personal lives in `src/config/`:

| File | What it holds |
|---|---|
| `site.ts` | Name, Roblox user ID (for the avatar), tagline, bio, socials, services, skills, GitHub repo |
| `games.ts` | Each game's place ID, `owned` / `contributed`, role, blurb, tags, optional `peakCcuOverride` |
| `brands.ts` | Brands and studios for the logo marquee; `logo` can be a path in `public/` |

Game names, thumbnails, icons, visits, favorites, ratings and CCU all come from Roblox automatically.

## How stats work

`.github/workflows/stats.yml` runs every 30 minutes on GitHub Actions (free and unlimited on public repos). It runs `scripts/fetch-stats.ts`, which:

- reads current players, visits, favorites and votes for every game in `games.ts`
- keeps an all-time peak CCU (the highest value it has ever sampled) and a 120-day daily history
- writes `stats.json` to the `data` branch, amending a single commit so history never grows

The live site reads `stats.json` from `raw.githubusercontent.com`, so stats update without redeploying.

Roblox has no API for historical peaks, so tracking starts when the workflow first runs. Set `peakCcuOverride` on a game to show a known earlier peak; the site displays whichever is higher.

## Local development

```sh
npm install
npm run stats   # writes public/data/stats.json from live Roblox data
npm run dev
```

## Deploying

1. Create a public repo named `<username>.github.io` and push this project to `main`.
2. In `src/config/site.ts`, set `github.owner` and `github.repo`.
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. **Actions → Update Roblox stats → Run workflow** once to create the `data` branch.

Pushes to `main` deploy through `.github/workflows/deploy.yml`.

GitHub pauses scheduled workflows in repos with no activity for 60 days. If stats stop updating, re-enable the workflow from the Actions tab.
