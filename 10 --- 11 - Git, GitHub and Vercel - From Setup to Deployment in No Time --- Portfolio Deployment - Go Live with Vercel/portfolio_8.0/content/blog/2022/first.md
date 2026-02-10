---
publishedAt: 2023-07-12 17:15:00
toc: true
---

# Course Progress Guide — Folders 1 → 11

**Nuxt 3 / 4+ Supabase Masterclass**

This guide documents **what each course section (folder) teaches**,  
**what changes were introduced**, and **what concepts were unlocked**.

Use this to quickly recall _where_ a concept was introduced and _why_.

---

## 1 & 2 - Build a Nuxt Blog & Portfolio (Essentials)

**Modules, Tailwind, Components, SEO & Meta**

### What this section teaches

- Nuxt project structure and conventions
- How Nuxt modules work conceptually
- Tailwind CSS setup and usage
- Basic component-driven UI
- Page metadata and SEO fundamentals

### Key concepts introduced

- File-based routing (`pages/`)
- Layouts vs pages
- Reusable components
- Head/meta management
- Global vs local styles

### Why this section matters

This folder builds your **mental model of Nuxt**.  
Everything later assumes you understand how pages, layouts, and components relate.

---

## 3 & 4 — Build a Nuxt Blog & Portfolio

**Data Fetching Guide + Dark Mode**

### What this section teaches

- Client-side vs server-side data fetching
- Async data patterns in Nuxt
- Dark mode using `@nuxtjs/color-mode`

### Key concepts introduced

- `useFetch` / `useAsyncData`
- Reactive state from composables
- Theme persistence across reloads
- User preference vs system preference

### Why this section matters

This is where the app stops being static and starts reacting to data and users.

---

## 5 — Build a Nuxt Blog & Portfolio

**Nuxt Content (Basics)**

### What this section teaches

- Content-driven architecture
- Markdown as a data source
- Rendering content dynamically

### Key concepts introduced

- `content/` as a source of truth
- Frontmatter
- Content queries
- Markdown → Vue rendering

### Why this section matters

You decouple **content from code**, which is essential for blogs, docs, and CMS-style apps.

---

## 6 — Build a Nuxt Blog & Portfolio

**Advanced Nuxt Content Examples**

### What this section teaches

- Structured content schemas
- Validation and typing of content
- More complex queries and relationships

### Key concepts introduced

- `content.config.ts`
- Content collections
- Field validation
- Safer, predictable content models

### Why this section matters

This is the difference between “markdown files” and a **real content system**.

---

## 7 — Build a Nuxt Blog & Portfolio

**Advanced Content Examples (Transitions & Reusability)**

### What this section teaches

- Page and component transitions
- Reusable content components
- Improving UX with motion

### Key concepts introduced

- Vue transitions
- Content-driven layouts
- Reusable render components

### Why this section matters

This is where the app starts to _feel_ polished instead of just functional.

---

## 8 — Build a Nuxt Blog & Portfolio

**Advanced Content Examples (Architecture & Reuse)**

### What this section teaches

- Avoiding duplication
- Designing for scalability
- Cleaner content rendering patterns

### Key concepts introduced

- Component abstraction
- DRY content rendering
- Separation of concerns

### Why this section matters

You learn how to stop “copy-pasting your way into a mess”.

---

## 9 — Build a Nuxt Blog & Portfolio

**Responsive UI & Sitemap with Server Routes**

### What this section teaches

- Responsive design strategies
- SEO at scale
- Programmatic sitemap generation

### Key concepts introduced

- Responsive layouts
- Server routes (`server/api`)
- Dynamic sitemap generation
- SEO beyond meta tags

### Why this section matters

This is where the app becomes **search-engine aware** and production-friendly.

---

## 10 — Git, GitHub & Vercel

**From Setup to Deployment in No Time**

### What this section teaches

- Git as a deployment tool, not just version control
- Repo structure expectations
- Vercel build pipeline

### Key concepts introduced

- What Vercel expects:
  - `package.json`
  - build commands
  - output directories
- Root directory vs subproject deployment
- Build logs as a debugging tool

### Why this section matters

You learn that **deployment is mostly about structure**, not magic.

---

## 11 — Portfolio Deployment

**Go Live with Vercel**

### What this section teaches

- Final production setup
- Cleaning build artifacts
- Environment variables on Vercel
- Live deployment workflow

### Key concepts introduced

- `.gitignore` correctness
- What should vs should not be committed
- SSR vs static output
- Production sanity checks

### Why this section matters

This is where the project becomes _real_ — public, reproducible, and maintainable.

---

## Big Picture Takeaway

Each folder adds **one layer of maturity**:

1. Structure & UI
2. Data & state
3. Content systems
4. Reusability
5. UX polish
6. SEO & server logic
7. Deployment & production discipline

The course doesn’t just teach Nuxt —  
it teaches how a Nuxt app **grows without collapsing under its own weight**.

---

# Project Structure Guide

**Nuxt (3 / 4) + Supabase – Blog & Portfolio**

This document explains:

- what each folder is for
- what was configured or changed during the course
- where to look when something breaks or needs extending

---

## Root Files (the brainstem)

### `package.json`

Defines:

- project identity
- dependencies
- scripts (`dev`, `build`, `generate`, `preview`)
- Nuxt version (4.x here)

If something:

- fails to install → check here
- fails to build → check scripts
- behaves differently across machines → check dependency versions

---

### `nuxt.config.ts`

This is the **central nervous system** of the app.

Configured during the course:

- Supabase module
- Nuxt Content
- Tailwind
- Color mode
- Nitro / deployment options
- Runtime config (`runtimeConfig`)

If something:

- works locally but not on Vercel → check here
- involves modules, SSR, or env vars → check here
- affects the whole app → start here

---

### `tsconfig.json`

TypeScript behavior:

- path aliases
- strictness
- module resolution

Rarely touched after setup, but if types start acting cursed, this is where the demon usually lives.

---

### `postcss.config.cjs`

### `tailwind.config.js`

Styling pipeline configuration:

- Tailwind plugins (typography, etc.)
- content scanning paths
- theme extensions

If:

- Tailwind classes don’t apply
- typography styles vanish
- production CSS differs from dev

→ check these files.

---

## Application Structure (the visible body)

### `app/`

Everything UI-related lives here.

Created / modified during the course:

- layouts
- pages
- components
- composables

This is where **most future work will happen**.

---

### `app/pages/`

Routing = file system.

Includes:

- blog pages
- portfolio pages
- dynamic routes (`[slug].vue`)

If a page:

- 404s
- has the wrong URL
- loads the wrong data

→ start here.

---

### `app/layouts/`

Global layouts:

- default layout
- auth-aware layout
- blog layout

If:

- header/footer appears everywhere unexpectedly
- page layout feels “wrapped wrong”

→ check layouts.

---

### `app/components/`

Reusable UI components:

- cards
- navigation
- post previews
- forms

Rule of thumb:  
If it’s used in more than one page, it should live here.

---

### `app/composables/`

Logic without UI:

- Supabase queries
- auth helpers
- reusable state logic

If you think:

> “This feels like logic, not markup”

It belongs here.

---

## Content & Data (the memory)

### `content/`

Markdown / content-driven pages using Nuxt Content.

Added during the course for:

- blog posts
- static content pages

Source of truth:

- `.md` files live here
- schema lives in `content.config.ts`

If content:

- doesn’t render
- has missing fields
- breaks the build

→ check markdown files and schema.

---

### `content.config.ts`

Defines:

- content collections
- fields
- validation rules

If Nuxt Content complains loudly, this file is usually why.

---

### `.data/` (ignored)

Generated local database/cache (SQLite) for Nuxt Content.

- never commit
- always safe to delete
- rebuilt automatically

If content behaves weirdly, deleting this often magically fixes it.

---

## Server-Side Logic (the organs)

### `server/`

This is where Nuxt becomes **full-stack**.

Created during the course:

- API routes
- Supabase server calls
- secure, auth-aware logic

If something:

- works in dev but not production
- needs secret keys
- must never run in the browser

→ it belongs here.

---

### `server/api/`

Server-only endpoints:

- blog data
- finance data
- Supabase queries

These run **only on the server**.

If Supabase keys leak, something was put in the wrong place.

---

## Public Assets (the skin)

### `public/`

Static files:

- images
- icons
- `robots.txt`
- favicon

Directly accessible at `/filename`.

If an asset:

- should not be processed
- should be cacheable
- should have a stable URL

→ put it here.

---

## Build Outputs (the shed behind the house)

These are **never committed**.

### `.nuxt/`

Internal Nuxt build artifacts.

### `.output/`

Nitro SSR output (used by Vercel).

### `.nitro/`

Nitro internals (sometimes created).

### `dist/`

Static site output (`nuxt generate`).

### `.cache/`

Tooling caches.

If anything breaks:

1. delete these folders
2. reinstall dependencies
3. rebuild

They are all disposable.

---

## Dependency Folders

### `node_modules/`

Installed dependencies.

- never commit
- always regenerable

If weird runtime errors appear:

- delete this first
- reinstall

---

## Environment & Secrets

### `.env` (ignored)

Local secrets:

- Supabase URL
- Supabase anon / service keys

Never commit.

---

### `.env.example`

Documents required environment variables.

This is your **future onboarding file**.

---

## Mental Map Summary (keep this)

- **UI problems** → `app/`
- **Routing issues** → `app/pages/`
- **Layout weirdness** → `app/layouts/`
- **Logic reuse** → `app/composables/`
- **Data fetching / security** → `server/`
- **Content issues** → `content/` + `content.config.ts`
- **Build / deploy issues** → `nuxt.config.ts`
