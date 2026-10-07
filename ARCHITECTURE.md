# Architecture Decision Record & Technical Strategy

**Project:** Moh Thoriqi Sahal Portfolio  
**Status:** M9 Production Deployment Hardened (Domain: https://thorx.my.id)  
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

### Containerization Architecture (Production-Ready Docker)

The containerization strategy is designed for a compact footprint, privilege reduction, and direct compatibility with the eventual Linux/VPS reverse-proxy deployment (e.g. Caddy/Nginx reverse-proxying to the Next.js container):

- **Base Image:** `node:22-alpine` (Alpine Linux) chosen as an official lightweight base to minimize unnecessary system utilities and target a compact container footprint.
- **Multi-Stage Build Pipeline:**
  1. `deps`: Installs system dependencies (`libc6-compat`) and strictly runs `npm ci` from `package-lock.json` to ensure deterministic builds.
  2. `builder`: Ingests dependencies and project source, disables telemetry (`NEXT_TELEMETRY_DISABLED=1`), and compiles the Next.js production build with Turbopack.
  3. `runner`: A fresh Alpine runtime image that completely discards source code, development dependencies, and build tools.
- **Standalone Output Optimization:** Next.js `output: "standalone"` traces runtime dependencies, outputting a self-contained Node server (`server.js`) into `.next/standalone`. The runner stage copies only `.next/standalone`, public assets (`public/`), and static files (`.next/static/`), targeting an optimized runtime image without full development dependencies or unneeded source trees.
- **Security & Non-Root Execution:** The container explicitly creates an unprivileged system user and group (`nextjs:nodejs`, UID/GID 1001). Dropping root privileges (`USER nextjs`) applies the principle of least privilege, reducing operating privileges and helping limit the impact if an application component is compromised.
- **Healthcheck & Observability:** Uses BusyBox's built-in `wget` to poll the internal `/api/health` HTTP endpoint periodically from inside the container (`HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3`), allowing container runtimes and supervisors to verify application health without requiring additional packages.
- **Host Binding:** Binds `HOSTNAME=0.0.0.0` and `PORT=3000` to allow traffic ingress from Docker bridge networks and host reverse proxies.

### Continuous Integration (CI/CD)

The automated GitHub Actions workflow (`.github/workflows/ci.yml`) validates every Pull Request and push to `main`:

1. Dependency integrity (`npm ci`)
2. Code style formatting (`npm run format`)
3. Lint rules (`npm run lint`)
4. Strict TypeScript checking (`npm run typecheck`)
5. Unit and component tests (`npm run test` via Vitest + React Testing Library)
6. Production bundle build (`npm run build`)
7. End-to-end smoke tests (`npm run test:e2e` via Playwright Chromium)
8. Production Docker image build validation (`docker/build-push-action` with `push: false`, tagging `portfolio:ci`)

The CI workflow currently validates that the repository can successfully produce its production Docker image. Container registry publishing (e.g. GitHub Packages / GHCR, Docker Hub) and automated server deployment are intentionally deferred to future milestones.

---

## 5. Managed Deployment Strategy (M8 / M9)

To achieve high availability and rapid public delivery without introducing premature server management overhead, the production hosting follows a two-track architecture:

1. **Managed Platform (Vercel):**
   - **Role:** Production hosting tier for Milestone 8 and Milestone 9.
   - **Rationale:** Next.js App Router native environment, zero server administration, global edge CDN distribution, automatic SSL certificate provisioning, and instant immutable rollbacks.
   - **Integration:** Webhook-based integration directly linked to the GitHub repository. Pushes to `main` trigger automated production builds; Pull Requests trigger isolated preview environments.
   - **Standalone Compatibility:** Vercel natively builds and runs the application without conflict with the `output: "standalone"` configuration in `next.config.ts`.
   - **Zero Database:** The application remains strictly zero-database, relying on Git-versioned structured content.

2. **Self-Hosted Container Laboratory (Docker / VPS — M10):**
   - **Role:** DevOps learning lab for systems engineering, Linux administration, reverse proxying (Caddy/Nginx), and custom container orchestration.
   - **Preservation:** The multi-stage production Dockerfile and CI Docker build pipeline remain active, tested, and ready for containerized deployment when Milestone 10 begins.

For operational guidelines, environment variable specifications, and rollback procedures, refer to [DEPLOYMENT.md](DEPLOYMENT.md).
