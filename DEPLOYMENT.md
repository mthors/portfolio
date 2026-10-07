# Deployment Guide & Operations Manual

**Project:** Moh Thoriqi Sahal Portfolio  
**Milestone:** M9 — Production Deployment Hardening  
**Production Domain:** https://thorx.my.id  
**Deployment Target:** Managed Next.js Platform (Vercel)

---

## 1. Overview & Strategy

This document describes the deployment architecture, configuration, operational procedures, and rollback strategies for the Moh Thoriqi Sahal portfolio website.

As defined in the project [PRD](PRD.md) and [ARCHITECTURE.md](ARCHITECTURE.md), the deployment path follows a deliberate two-track strategy:

1. **Managed Platform (Current — M8/M9):** Deploy to a managed, Next.js-native platform ([Vercel](https://vercel.com/)) for automated production releases, zero operational overhead, and robust edge delivery.
2. **DevOps Learning Lab (Deferred — M10):** The repository maintains a fully functional, multi-stage production [Dockerfile](Dockerfile) validated in CI. Self-hosted deployment (VPS, Linux administration, Docker Compose, reverse proxy, TLS hardening) is intentionally isolated to Milestone 10 as a dedicated systems engineering laboratory.

---

## 2. Platform Selection: Why Vercel Fits This Project

Vercel was selected as the managed deployment platform for this portfolio based on the following architectural criteria:

| Criterion                           | Why Vercel Fits                                                                                                                                                                   |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js App Router Native**       | Maintained by the creators of Next.js; native zero-configuration support for React 19, Server Components, Route Handlers (e.g. `/api/health`), and static page optimization.      |
| **Standalone Output Compatibility** | Does not require removing or altering `output: "standalone"` in `next.config.ts`, ensuring the existing Docker workflow remains completely intact.                                |
| **GitHub Native Integration**       | Direct webhook-based synchronization with GitHub: every push to `main` triggers a production build; Pull Requests automatically generate isolated Preview deployments.            |
| **Zero Database Requirement**       | Fully supports the static/serverless architecture without requiring database provisioning, connection pooling, or stateful infrastructure.                                        |
| **Environment Variable Management** | Clear dashboard interface to manage variables scoped by environment (Production, Preview, Development) and enforce separation between public client variables and server secrets. |
| **Instant Immutable Rollbacks**     | Every deployment creates an immutable build artifact. If a regression occurs, traffic can be instantly rolled back to any prior deployment in one click with zero rebuild time.   |
| **No Premature Infrastructure**     | Avoids introducing unneeded VPS, SSH, reverse proxy, or container registry complexity in M8, matching the PRD rule of keeping the portfolio architecture simple and maintainable. |

---

## 3. Separation of Responsibilities

To maintain clean repository hygiene and strict security, responsibilities are divided between code and dashboard:

### In Repository (Version Controlled)

- Application source code (`app/`, `components/`, `content/`, `lib/`, `types/`)
- Production build definition (`package.json`, `next.config.ts`, `tsconfig.json`)
- Continuous Integration quality gate (`.github/workflows/ci.yml`)
- Multi-stage production container (`Dockerfile`, `.dockerignore`)
- Environment variable contracts and templates (`.env.example`)
- Deployment architecture documentation (`DEPLOYMENT.md`, `ARCHITECTURE.md`)

### In Platform Dashboard (Human Developer Managed)

- Project creation and GitHub repository linkage
- Environment variable values (production URLs, contact API keys)
- Custom domain configuration and DNS records (M9)
- Deployment inspection, build logs, and runtime analytics
- Instant deployment rollbacks and promotion

---

## 4. Environment Variables Specification

The application enforces a strict separation between client-side (public) and server-side (private) variables.

### Variables Table

| Variable Name             | Exposure                     | Required in Prod     | Purpose & Example                                                                                                                          |
| :------------------------ | :--------------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | **Public** (Client & Server) | **Yes**              | Canonical site URL used for Open Graph tags, canonical links, and sitemaps.<br>Production: `https://thorx.my.id`                           |
| `NODE_ENV`                | **Server-side** (Runtime)    | Platform Managed     | Set automatically to `production` by the hosting platform during build.                                                                    |
| `PORT`                    | **Server-side** (Container)  | Container only       | Listening port for standalone Node.js server inside Docker (`3000`). In managed serverless hosting, port binding is handled automatically. |
| `HOSTNAME`                | **Server-side** (Container)  | Container only       | Network interface binding for Docker (`0.0.0.0`). Not required on managed platforms.                                                       |
| `CONTACT_EMAIL_RECIPIENT` | **Server-side** (Runtime)    | No (Deferred to M6+) | Target email address for contact form submissions.                                                                                         |
| `CONTACT_API_KEY`         | **Server-side** (Runtime)    | No (Deferred to M6+) | API token for transactional mail provider (e.g. Resend, SendGrid).                                                                         |

### Public vs. Server-Side Security Rules

1. **Public Variables (`NEXT_PUBLIC_*`):**
   - Variables prefixed with `NEXT_PUBLIC_` are **inlined into the JavaScript bundle at build time**.
   - **Never store secrets, passwords, or private API keys in `NEXT_PUBLIC_*` variables.**
   - Anyone visiting the site can view these values by inspecting the client script or network tab.

2. **Server-Side Variables:**
   - Variables without the `NEXT_PUBLIC_` prefix are only accessible in Node.js server runtimes and Route Handlers (such as `app/api/health/route.ts`).
   - They are never bundled or transmitted to the client browser.

3. **Commitment Policy:**
   - **NEVER** commit `.env`, `.env.local`, or any `.env.production` files containing real secrets to Git.
   - The `.gitignore` file explicitly blocks all environment files except `.env.example`.

---

## 5. Deployment Workflow & CI/CD Pipeline

```text
Developer Branch
      │
      ▼
Create Pull Request to `main`
      │
      ├───────────────────────────────────┬───────────────────────────────────┐
      ▼                                   ▼                                   ▼
GitHub Actions CI                   Vercel Preview Engine              Review & QA
├── Prettier formatting check       ├── Build Next.js preview          ├── Preview URL tested
├── ESLint analysis                 └── Deploy to unique URL           └── Automated checks pass
├── TypeScript typecheck                (e.g. pr-12-portfolio.vercel.app)
├── Vitest unit & component tests
├── Next.js production build
├── Playwright E2E smoke tests
└── Production Docker image build
      │
      ▼
Merge Pull Request to `main`
      │
      ├───────────────────────────────────┐
      ▼                                   ▼
GitHub Actions CI                   Vercel Production Deployment
└── Validates `main` branch         ├── Compiles production bundle
                                    ├── Deploys to edge CDN
                                    └── Updates live canonical URL
                                          │
                                          ▼
                                    Deployment Verification
                                    ├── Health Check: `/api/health`
                                    └── Smoke checks on live domain
```

### Automated Quality Gate (GitHub Actions)

Before any deployment reaches production, the CI pipeline (`.github/workflows/ci.yml`) validates:

1. `npm run format` — Code adheres to Prettier formatting standards.
2. `npm run lint` — Code satisfies ESLint rules and Next.js guidelines.
3. `npm run typecheck` — Strict TypeScript checking passes with zero type errors.
4. `npm run test` — All unit and component tests pass via Vitest.
5. `npm run build` — Next.js production build succeeds.
6. `npm run test:e2e` — Playwright end-to-end browser smoke tests pass.
7. `docker/build-push-action` — Production multi-stage Docker image builds cleanly.

---

## 6. Safe Production Deployment Procedure

Follow these steps for every release:

### Step 1: Develop on a Feature Branch

```bash
# Verify clean working tree
git status

# Create and switch to a feature or fix branch
git checkout -b feat/your-feature-name
```

### Step 2: Run Local Validation Suite

Before opening a Pull Request, run the full validation suite locally:

```bash
# Formatting
npm run format

# Linting
npm run lint

# Type checking
npm run typecheck

# Unit & component tests
npm run test

# Production build
npm run build

# End-to-end smoke tests
npm run test:e2e
```

### Step 3: Open Pull Request

Push your branch to GitHub and create a Pull Request targeting `main`.

- GitHub Actions CI will automatically run all 7 validation checks.
- Vercel will automatically generate a Preview deployment URL for visual and functional verification.

### Step 4: Verify Preview Deployment

Visit the generated preview URL and verify:

- Navigation and responsive layout work across breakpoints.
- Content loads accurately.
- No console errors appear in developer tools.

### Step 5: Merge to Main

Once CI is green and the preview is approved, merge the Pull Request into `main`. Vercel will immediately trigger the production deployment.

---

## 7. Post-Deployment Verification Checklist

Immediately following a production deployment, perform the following verification checks on the live URL (`https://thorx.my.id`):

- [ ] **Health Endpoint Check:**  
      Navigate to `https://thorx.my.id/api/health` or run:

  ```bash
  curl -i https://thorx.my.id/api/health
  ```

  Expected output: HTTP `200 OK` with JSON payload:

  ```json
  {
    "status": "healthy",
    "uptime": "<number>",
    "timestamp": "<iso-timestamp>"
  }
  ```

- [ ] **Security Headers Check:**  
      Run:

  ```bash
  curl -I https://thorx.my.id
  ```

  Verify the presence of:
  - `x-content-type-options: nosniff`
  - `x-frame-options: DENY`
  - `referrer-policy: strict-origin-when-cross-origin`
  - `permissions-policy: camera=(), microphone=(), geolocation=()`
  - `strict-transport-security: max-age=31536000`

- [ ] **Search Engine Discovery (`robots.txt` & `sitemap.xml`):**

  ```bash
  curl -s https://thorx.my.id/robots.txt
  curl -s https://thorx.my.id/sitemap.xml
  ```

  Confirm `robots.txt` points to `https://thorx.my.id/sitemap.xml`, and `sitemap.xml` returns valid XML containing the canonical production URL.

- [ ] **Custom 404 Error Page:**  
      Navigate to `https://thorx.my.id/unknown-route`. Confirm it renders the branded dark-themed 404 page with a functioning "Return Home" button.

- [ ] **Homepage & SEO Metadata:**  
      Verify the homepage loads with status `200`, title matches `Moh Thoriqi Sahal | IT Engineer & Software Developer`, and Open Graph tags reflect `https://thorx.my.id`.

- [ ] **Interactive Elements & Contact Links:**  
      Test mobile navigation drawer, WhatsApp CTA (`https://wa.me/...`), Email link, and GitHub links.

---

## 8. Rollback Strategy

If a regression or critical defect is detected in production, apply one of the following rollback mechanisms:

### Option A: Instant Dashboard Rollback (Recommended for Emergencies)

Vercel keeps immutable copies of every deployment, allowing instant rollback without rebuilding or waiting for CI:

1. Log in to the **Vercel Dashboard**.
2. Navigate to your **portfolio project** > **Deployments**.
3. Locate the previous known-good deployment (look for the green checkmark and previous commit hash).
4. Click the three dots (`...`) menu on the deployment entry and select **Promote to Production** (or **Instant Rollback**).
5. Traffic is immediately redirected to the prior build within seconds.

### Option B: Git Revert (Standard Code-Level Rollback)

To ensure the repository history matches production:

1. Identify the faulty commit on `main`.
2. Create a revert commit locally:
   ```bash
   git revert <faulty-commit-sha>
   ```
3. Push the revert commit to `main` (or through a hotfix PR).
4. CI runs the validation suite, and upon completion, Vercel deploys the reverted codebase.

---

## 9. M9 Deployment Status & Responsibility Matrix

### A. IMPLEMENTED IN CODE (Version-Controlled)

1. **Security Headers:** Configured in `next.config.ts` covering HSTS, clickjacking prevention (`X-Frame-Options`), MIME protection, referrer policy, and permissions restrictions.
2. **SEO & Metadata:** Wired `NEXT_PUBLIC_SITE_URL` to `metadataBase`, Open Graph tags, Twitter card metadata, and canonical URL in `app/layout.tsx`.
3. **Robots & Sitemap:** Native route handlers in `app/robots.ts` and `app/sitemap.ts` dynamically bound to `NEXT_PUBLIC_SITE_URL`.
4. **Site Favicon:** Lightweight branded Next.js icon handler in `app/icon.tsx` styled to match the dark/cyan technical palette.
5. **Error Handling:** Custom branded `app/not-found.tsx` (404) and client error boundary `app/error.tsx` (graceful recovery).
6. **Health Endpoint:** Standalone `/api/health` Route Handler in `app/api/health/route.ts`.
7. **Automated Testing:** E2E smoke tests in `tests/e2e/smoke.spec.ts` validating `/api/health`, `/robots.txt`, `/sitemap.xml`, and the 404 route.

### B. MANUAL VERCEL & DNS CONFIGURATION (Performed by Project Owner)

1. **Custom Domain Association:**
   - In the Vercel Dashboard, go to **Settings** > **Domains**.
   - Add `thorx.my.id` and optionally `www.thorx.my.id`.
2. **DNS Records at Registrar / DNS Provider:**
   - **Apex Domain (`thorx.my.id`):** Add an `A` record pointing to Vercel IP: `76.76.21.21`.
   - **Subdomain (`www.thorx.my.id`):** Add a `CNAME` record pointing to `cname.vercel-dns.com`.
   - Vercel automatically negotiates TLS certificates and configures HTTPS redirection.
3. **Production Environment Variables:**
   - In **Settings** > **Environment Variables**, verify:
     - `NEXT_PUBLIC_SITE_URL` = `https://thorx.my.id` (Environment: Production)
4. **Lightweight Uptime Monitoring (Zero Code SDKs):**
   - Configure a free external ping monitor (e.g., UptimeRobot, BetterStack, or GitHub Action schedule) targeting `https://thorx.my.id/api/health` every 5-10 minutes.
   - Do not install heavy monitoring agent dependencies in the client bundle.

### C. OPTIONAL FUTURE WORK (Milestone 10+)

- **DevOps Laboratory (M10):** Deploy containerized version to Linux VPS using multi-stage `Dockerfile`, Docker Compose, and Caddy/Nginx reverse proxy.
- **Dynamic Content & CMS (M11+):** Database integration deferred until editorial workflow or user management is explicitly required.
