# Agent Instructions — Zenya

Single source of truth for AI coding agents (Claude Code, Codex, Gemini, GitHub Copilot, Cursor, Aider, …). Tool-specific entry files (`CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`) are thin pointers to this document — keep all guidance here.

## Project at a glance

Zenya is a **client-side Angular 19 application**: signal-driven self-regulation dashboards for ADHD, emotional balance, recovery, and daily orientation. No backend, no telemetry, no accounts — everything runs in the browser.

User-facing copy is **German**; code, identifiers, comments, commit messages are **English**.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Angular 19 — standalone components, `signal()` / `computed()` / `effect()` |
| Styling | Tailwind CSS 4 (utility-first, no component library) |
| State | Angular Signals only — no RxJS subscriptions, no NgRx |
| Routing | `@angular/router` with lazy-loaded page components |
| Build | Angular CLI 19 / esbuild |
| Tests | Karma + Jasmine (unit) · Playwright (e2e + screenshots) |
| Storage | `sessionStorage` (snapshots) · `localStorage` (preferences) |

## Repo layout

```
src/app/
├── dashboard/        # main dashboard engine (template + logic)
├── components/       # shared UI (MetricCard, ProgressBar, RadarChart, InfoTooltip)
├── models/           # engine.ts, snapshot.ts, dashboard-config.ts, constants.ts
├── configs/          # one file per dashboard — pure data, no logic
├── pages/            # static pages (Home, Impressum, Co-Founder, Datenschutz)
└── app.routes.ts
e2e/                  # Playwright specs + screenshots
skills/               # reusable agent workflows (tool-neutral)
public/showcase/      # showcase screenshots used on landing page
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm start` | Dev server on `http://localhost:4200` with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run watch` | Build in watch mode |
| `npm test` | Unit tests (Karma + Jasmine) |
| `npm run e2e:screenshots` | Run Playwright screenshot suite (Chromium) |

## Conventions

- **Configuration over code.** Adding a dashboard = a new file in `src/app/configs/`. Don't touch the engine for content changes.
- **Signals everywhere.** No `async` pipes, no `.subscribe()`. Build reactive graphs with `signal`, `computed`, `effect`.
- **No new dependencies** without being asked. The stack intentionally stays at Angular + Tailwind. No chart libs, no state libs, no UI kits — the radar chart is hand-rolled SVG, keep it that way.
- **Standalone components only.** No NgModules.
- **Tailwind only.** Don't introduce SCSS files or scoped CSS unless the task explicitly requires it.
- **Comments**: only when the *why* is non-obvious. Don't narrate what the code does.
- **Language**: UI strings German, everything else English.

## Dev server

The dev server may already be running on `http://localhost:4200`. Before starting it, check first — don't blindly `npm start` and create a duplicate. If you do start it, run it in the background and tail its output.

## Skills

Reusable, structured workflows live under [skills/](skills/). They are tool-neutral; any agent that supports skill-style workflows should pick them up from there.

| Skill | When to use |
|-------|-------------|
| [visual-feedback](skills/visual-feedback/SKILL.md) | Visual review loop: screenshot a page → suggest 1–3 improvements → implement ONE → re-screenshot. |

When adding a new skill, create `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`) and link it here.

## Testing visual changes

For UI work, prefer the [visual-feedback](skills/visual-feedback/SKILL.md) loop: screenshot, judge, change one thing, re-screenshot. Don't claim a UI task is done without seeing the result.

Showcase screenshots in `public/showcase/` are referenced by `src/app/pages/home/home.component.ts` (`showcaseTabs` array). Renaming a screenshot means updating that array.

## What not to do

- Don't add backend calls, telemetry, analytics, or account systems.
- Don't introduce RxJS-based state — use signals.
- Don't add CSS frameworks or component kits next to Tailwind.
- Don't write tests against mocked signals when a real `computed()` would do.
- Don't expand scope: a bug fix is a bug fix, a refactor is a refactor.
