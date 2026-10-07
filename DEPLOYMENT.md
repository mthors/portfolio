# Deployment Guide & Operations Manual

**Project:** Moh Thoriqi Sahal Portfolio  
**Milestone:** M8 — CI/CD  
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
| `NEXT_PUBLIC_SITE_URL`    | **Public** (Client & Server) | **Yes**              | Canonical site URL used for Open Graph tags, canonical links, and sitemaps.<br>Example: `https://portfolio.example.com`                    |
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

Immediately following a production deployment, perform the following verification checks on the live URL:

- [ ] **Health Endpoint Check:**  
      Navigate to `https://<YOUR-DOMAIN>/api/health` or run:

  ```bash
  curl -i https://<YOUR-DOMAIN>/api/health
  ```

  Expected output: HTTP `200 OK` with JSON payload:

  ```json
  {
    "status": "healthy",
    "uptime": "<number>",
    "timestamp": "<iso-timestamp>"
  }
  ```

- [ ] **Homepage & SEO Metadata:**  
      Verify the homepage loads with status `200`, title matches `Moh Thoriqi Sahal | IT Engineer & Software Developer`, and Open Graph tags reflect the configured `NEXT_PUBLIC_SITE_URL`.

- [ ] **Interactive Elements:**  
      Test mobile navigation toggle, filter badges, and outbound external links.

- [ ] **Browser Console:**  
      Inspect the browser developer console for zero uncaught errors, failed asset loads, or hydration mismatches.

- [ ] **Performance & Accessibility:**  
      Run a quick Lighthouse audit to ensure performance, accessibility, best practices, and SEO scores meet project standards.

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

## 9. Developer Setup Guide: Connecting Vercel (Manual Dashboard Steps)

Because platform-level authentication and dashboard configuration must not be performed from automated scripts, the project owner should perform the following one-time setup:

### Prerequisites

- A [Vercel](https://vercel.com/) account (sign in with GitHub).
- Access to the GitHub repository.

### Initial Setup Steps

1. **Import the Repository:**
   - In the Vercel dashboard, click **Add New...** > **Project**.
   - Select your GitHub repository (`portfolio`).

2. **Configure Project Settings:**
   - **Framework Preset:** Select `Next.js` (auto-detected).
   - **Root Directory:** Leave as `./`.
   - **Build Command:** Leave as default (`next build` / `npm run build`).
   - **Output Directory:** Leave as default (`.next`).
   - **Install Command:** Leave as default (`npm install` or `npm ci`).

3. **Configure Environment Variables:**
   - In the **Environment Variables** section, add:
     - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` (or custom production domain).
     - Select environments: **Production**, **Preview**, **Development**.

4. **Deploy:**
   - Click **Deploy**.
   - Vercel will fetch the repository, run `npm ci` and `next build`, and provide the live production URL.

5. **Subsequent Releases:**
   - Any future push to `main` will automatically build and deploy to production.
   - Any pull request will automatically produce preview deployments.
