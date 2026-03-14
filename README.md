# Regulate

**A signal-driven self-regulation engine for ADHD, emotional balance, recovery, and daily orientation.**

Regulate is a client-side Angular application that turns subjective inner states into structured, actionable feedback. Users adjust sliders representing dimensions like arousal, mood, clarity, or emotional pressure — and the system responds in real time with computed metrics, contextual interventions, and mode-specific guidance.

No accounts. No backend. No telemetry. Just a sharp, focused tool that runs entirely in the browser.

---

## What It Does

Each dashboard is a **configuration-driven regulation engine**. A set of weighted slider inputs feeds into computed metrics, which in turn resolve into prioritized modes — each with tailored interventions and reflective questions.

**Six specialized dashboards ship out of the box:**

| Dashboard | Focus |
|-----------|-------|
| **ADHS-Regulation** | Attention, activation, deep work, executive function |
| **Emotions-Regulation** | Emotional pressure, shame, frustration, inner safety |
| **Recovery** | Energy monitoring, burnout prevention, sleep quality |
| **Abend-Check-in** | End-of-day wind-down, letting go, transition to rest |
| **Orientierungs-Check** | Situational clarity, decision readiness, direction |
| **Soziale Regulation** | Social energy, boundaries, connection balance |

**Core interaction loop:**

1. **Adjust sliders** — rate your current inner state across 5–7 dimensions
2. **Read computed metrics** — see derived scores like regulation capacity, friction, or emotional load
3. **Receive mode + interventions** — the engine resolves the most relevant mode and surfaces concrete actions
4. **Track over time** — save snapshots with an optional intention note, compare states across a session

---

## Features

- **Real-time signal graph** — all state flows through Angular signals and computed derivations. Change one slider, everything reacts instantly.
- **Radar chart** — interactive SVG spider chart with draggable nodes. See your state at a glance, adjust it by dragging.
- **Per-slider feedback** — each slider has severity-ranked feedback zones (severe / moderate / mild) with specific intervention suggestions.
- **Paged interventions** — multi-card carousel with dot navigation when the active mode offers several strategies.
- **Snapshots (Verlauf)** — save timestamped state captures to sessionStorage. Restore, compare, delete. Each snapshot records slider values, computed metrics, active mode, and an optional intention.
- **Intention journal** — free-text field with dashboard-specific placeholders ("Was beschäftigt dich gerade?", "Was hat diesen Abend geprägt?") saved alongside each snapshot.
- **Dismissible disclaimer** — first-visit info banner, stored in localStorage.
- **Info tooltips** — hover-triggered explanations for each computed metric.
- **Micro-labels** — clickable mini-tags on sliders that jump to the relevant intervention.
- **Dynamic page titles** — each dashboard sets its own browser tab title.
- **Fully responsive** — mobile-first layout with dedicated breakpoints for desktop.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Angular 19** (standalone components, signals, computed, effect) |
| Styling | **Tailwind CSS 4** (utility-first, no component library) |
| State | **Angular Signals** — no RxJS, no NgRx, no external state management |
| Routing | **@angular/router** with lazy-loaded page components |
| Build | **Angular CLI 19** / esbuild |
| Testing | **Karma + Jasmine** |
| Storage | **sessionStorage** (snapshots) / **localStorage** (preferences) |
| Backend | **None** — fully client-side |

---

## Architecture

```
src/app/
├── dashboard/              # Main dashboard engine (template + logic)
├── components/             # Shared UI (MetricCard, ProgressBar, RadarChart, InfoTooltip)
├── models/
│   ├── dashboard-config.ts # DashboardConfig interface & types
│   ├── engine.ts           # Metric computation, mode resolution, feedback collection
│   ├── snapshot.ts         # Snapshot persistence layer
│   └── constants.ts        # Shared constants
├── configs/                # One file per dashboard (pure data, no logic)
│   ├── adhs-regulation.config.ts
│   ├── emotion-regulation.config.ts
│   ├── recovery.config.ts
│   ├── evening-checkin.config.ts
│   ├── orientation-check.config.ts
│   └── social-regulation.config.ts
├── pages/                  # Static pages (Home, Impressum, Co-Founder, Datenschutz)
└── app.routes.ts           # Route definitions
```

**Key design decisions:**

- **Configuration over code** — dashboards are pure data objects. Adding a new dashboard means writing a config file, nothing else.
- **Signals everywhere** — no `async` pipes, no `subscribe()`. The entire reactive graph is built with `signal()`, `computed()`, and `effect()`.
- **Weighted metric engine** — each computed metric is a weighted sum of slider inputs with optional `invert` and `offset` modifiers, clamped to 0–100.
- **Priority-based mode resolution** — modes are evaluated top-down by priority. First matching rule wins. Supports conditions on both raw sliders and computed metrics.
- **Zero dependencies beyond Angular + Tailwind** — no chart library, no state library, no UI kit. The radar chart is hand-rolled SVG.

---

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). Pick a dashboard. Move sliders. That's it.

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | Dev server on `localhost:4200` with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests (Karma + Jasmine) |

---

## Status

Early-stage product. Six dashboards are fully functional with complete slider configurations, metric engines, mode resolution, interventions, and snapshot tracking. The app runs entirely client-side with no backend dependency.

**What's live:**
- All six regulation dashboards with full intervention systems
- Interactive radar chart with drag-to-adjust
- Snapshot timeline with restore and comparison
- Intention journaling per snapshot
- Responsive layout optimized for desktop and mobile
- Landing page with dashboard overview

**What's next:**
- Historical snapshot visualization across sessions
- Custom / user-created dashboards
- Potential freemium model with extended features
