# LPTI: Who Is Your Waifu?

LPTI is a static bilingual anime waifu preference quiz built with Vue 3, TypeScript, and Vite. It is designed for GitHub Pages and can also be served locally with the included PowerShell script.

## Features

- English and Chinese UI with saved language preference.
- MBTI-inspired preference axes, but for anime waifu taste.
- 48-question pool with a balanced random 32-question quiz per attempt.
- 48-character result pool, balanced across 16 type buckets.
- External character art from MyAnimeList links.
- Deterministic scoring with fit, confidence, axis bars, and close matches.
- Local-only deploy/preview script for Windows PowerShell.

## Local Usage

Install, build, and serve locally:

```powershell
.\deploy-local.ps1
```

Skip dependency install:

```powershell
.\deploy-local.ps1 -SkipInstall
```

Use another port:

```powershell
.\deploy-local.ps1 -PreviewPort 4174
```

Default local URL:

```text
http://127.0.0.1:4173/
```

## Development

```bash
npm install
npm run dev
npm run build
npm run evaluate
```

`npm run evaluate` generates fake answer profiles and compares scoring outputs for sanity checks.

## GitHub Pages

The app uses Vite with:

```ts
base: '/'
```

The workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys through GitHub Pages Actions. In the repository settings, set Pages source to **GitHub Actions** and use the custom domain `waifu.ccwu.cc`.

## Translation Contributions

Translation help is welcome. Please open an issue or PR for:

- Awkward Chinese or English phrasing.
- Better anime/community slang.
- Character name corrections.
- More accurate question translations.

Main translation files:

- `src/i18n/index.ts`
- `src/data/questions.ts`
- `src/data/characters.ts`

## Notes

This is fandom entertainment only. It is not a psychological assessment, official MBTI typing, or official character classification.
