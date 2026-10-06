# Architecture Decision Record & Technical Strategy

**Project:** Moh Thoriqi Sahal Portfolio  
**Status:** M0 Bootstrap Completed  
**Owner:** Moh Thoriqi Sahal (IT Engineer & Software Developer)

---

## 1. Architectural Principles

1. **Simplicity First:** Avoid adding infrastructure or frameworks merely because they are popular. Good engineering chooses the right tool for the actual problem.
2. **Data-Driven & Git-Controlled:** Content is stored as typed, Git-versioned structures. Adding new projects or experiences never requires changing layout or routing code.
3. **Server-First by Default:** Next.js Server Components are the default. Client components are introduced exclusively when client interactivity (e.g. mobile navigation menus, interactive forms) is strictly required.
4. **Zero-Database Baseline (V1):** No database (Firebase, Firestore, Supabase, PostgreSQL) is connected in V1. This eliminates hosting costs, operational maintenance, and public attack surfaces.
5. **Strict Type Safety:** TypeScript in strict mode alongside Zod schema validation ensures data contracts are verified at build and runtime.

---

## 2. Core Technology Decisions

### Why Next.js (App Router)?

- **Static Generation & SEO:** Pre-renders portfolio pages into static HTML for near-instant page load times, perfect Lighthouse performance, and rich Open Graph indexing.
- **Server Capabilities Without Extra Services:** Future server needs (such as the M6 contact form submission and validation) are handled within Next.js Route Handlers / Server Actions, eliminating the need to manage a separate backend.
- **Built-in Standalone Output:** Produces a minimal `.next/standalone` production bundle containing only the exact runtime dependencies needed to run `server.js`, optimizing container size.

### Why React?

- **Component Reusability:** Enables modular primitives (`Button`, `Badge`, `SectionHeading`, `Container`) composed across presentational layouts.
- **Industry Standard:** Directly aligns with modern software engineering expectations, matching the developer's learning path and technical showcase goals.

### Why TypeScript?

- **Compile-Time Correctness:** Strict mode (`strict: true`) catches nullability, typing, and refactoring errors before deployment.
- **Contract Enforcement:** Paired with Zod to enforce schema integrity on all content files (`content/projects/`).

### Why Tailwind CSS?

- **Centralized Design System:** Uses CSS variables mapped directly to tokens specified in `DESIGN.md` (`--bg-primary`, `--surface`, `--accent`, `--border`), allowing site-wide palette modifications in a single location.
- **Optimized Bundle Size:** Automatically purges unused utility classes, keeping stylesheet assets minimal.

---

## 3. Deliberately Deferred Technologies

### Why Firebase is Intentionally Deferred

- **No V1 Requirement:** A personal portfolio is read-heavy content that changes infrequently. Git-managed markdown and typed data files provide:
  - Complete version control history for all content.
  - Zero cloud hosting bills or subscription tiers.
  - No database administration, backup routines, or migration scripts.
  - Zero exposure to public database connection exploits.
- **Targeted Learning:** Firebase capabilities (realtime listeners, Firebase Auth, Firestore) will be learned thoroughly in a separate, dynamic application where Backend-as-a-Service provides tangible value.

### Why Not a Separate Express Backend?

- Creating an external Express, Nest, or Fastify server for a personal portfolio introduces unnecessary operational overhead (separate processes, CORS configuration, deployment coordination, port forwarding).
- Next.js natively handles server execution and API endpoints with zero additional infrastructure.

---

## 4. Planned Docker & CI/CD Architecture

### Containerization Strategy

- **Multi-Stage Build:**
  - `deps`: Installs production and build dependencies cleanly (`npm ci`).
  - `builder`: Builds Next.js in standalone mode with telemetry disabled.
  - `runner`: Uses a minimal `node:22-alpine` base image, runs under an unprivileged user (`nextjs:nodejs`), and copies only the standalone output and static assets.
- **Target Container Footprint:** Sub-150MB lightweight production container runnable via `docker run -p 3000:3000 portfolio`.

### Continuous Integration (CI/CD)

The automated GitHub Actions workflow (`.github/workflows/ci.yml`) validates every Pull Request and push to `main`:

1. Dependency integrity (`npm ci`)
2. Code style formatting (`npm run format`)
3. Lint rules (`npm run lint`)
4. Strict TypeScript checking (`npm run typecheck`)
5. Unit and component tests (`npm run test` via Vitest + React Testing Library)
6. Production bundle build (`npm run build`)
7. End-to-end smoke tests (`npm run test:e2e` via Playwright Chromium)
