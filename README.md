# Moh Thoriqi Sahal — Portfolio

> Personal professional portfolio and full-stack engineering showcase for **Moh Thoriqi Sahal** (IT Engineer &amp; Software Developer).  
> Designed and built following principles of simplicity, maintainability, and production engineering.

---

## Tech Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Design Tokens configured via CSS variables)
- **Validation:** Zod
- **Unit / Component Testing:** Vitest, React Testing Library, jsdom
- **End-to-End Testing:** Playwright
- **Linting & Formatting:** ESLint, Prettier
- **Containerization:** Docker (Multi-stage build, standalone output)
- **CI/CD:** GitHub Actions

---

## Architecture Principles

- **Zero Database in V1:** Content is Git-controlled and data-driven (`content/projects/`). Adding future projects requires adding content entries and assets, with zero layout modifications.
- **Server Components First:** Client components are used only where interactivity is strictly required (e.g. mobile navigation drawer).
- **No Unnecessary Infrastructure:** No separate Express backend, no prematurely added database (Firebase/Supabase/PostgreSQL deferred until justified by real requirements). See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed rationale.

---

## Project Structure

```text
portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml             # Automated CI pipeline
├── app/
│   ├── globals.css            # Design tokens & base styles
│   ├── layout.tsx             # Root layout with Navbar and Footer shells
│   └── page.tsx               # Homepage shell & foundation verification
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Responsive navigation shell with mobile menu
│   │   └── Footer.tsx         # Clean footer adhering to DESIGN.md
│   └── ui/
│       ├── Badge.tsx          # Badge primitive
│       ├── Button.tsx         # Button primitive with link support
│       ├── Container.tsx      # Responsive max-width container primitive
│       └── SectionHeading.tsx # Section heading with eyebrow & description
├── content/
│   ├── experience/            # Structured experience data
│   ├── projects/              # Data-driven project entries & queries
│   └── skills/                # Categorized technical skill sets
├── lib/
│   └── utils.ts               # Class name utility helper
├── public/
│   └── images/projects/       # Project screenshots and preview vectors
├── tests/
│   ├── e2e/
│   │   └── smoke.spec.ts      # Playwright E2E smoke tests
│   ├── unit/
│   │   ├── content.test.ts    # Content schema & project entry tests
│   │   └── primitives.test.tsx# UI primitive & layout shell unit tests
│   └── setup.ts               # Testing library setup
├── types/                     # TypeScript definitions & Zod schemas
├── ARCHITECTURE.md            # Architecture decision records
├── DEPLOYMENT.md              # Deployment guide & operational manual
├── Dockerfile                 # Multi-stage production container
├── .dockerignore
├── .env.example               # Environment variables template
├── package.json
└── tsconfig.json
```

---

## Local Development

### Prerequisites

- Node.js >= 20.x (Recommended: Node 22 or Node 24)
- npm >= 10.x

### Getting Started

1. Clone the repository and install dependencies:

   ```bash
   npm ci
   ```

2. Copy the environment configuration:

   ```bash
   cp .env.example .env.local
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Commands

### Development & Build

- `npm run dev`: Start Next.js development server
- `npm run build`: Create an optimized production standalone build
- `npm run start`: Start production server from build
- `npm run typecheck`: Run TypeScript compiler type checking (`tsc --noEmit`)

### Quality & Testing

- `npm run lint`: Run ESLint
- `npm run format`: Check formatting with Prettier
- `npm run format:write`: Automatically format code with Prettier
- `npm run test`: Run unit and component tests with Vitest
- `npm run test:watch`: Run Vitest in interactive watch mode
- `npm run test:e2e`: Run Playwright end-to-end smoke tests

---

## Running with Docker

The project includes a production-ready, multi-stage `Dockerfile` leveraging Next.js standalone output to minimize image footprint.

> **Note on Local vs. CI Docker:**
>
> - **CI Validation:** GitHub Actions automatically tests and validates the production Docker build on every push and pull request.
> - **No Registry Publishing:** The image is built during CI to ensure build reproducibility, but is not pushed to any container registry. Registry publishing and automated deployment are intentionally deferred to a future milestone.
> - **Local Docker is Optional:** Having Docker installed locally is optional; development and automated tests run locally with standard Node.js tooling.

### 1. Build the Docker Image (Local)

```bash
docker build -t moh-thoriqi-sahal-portfolio:latest .
```

### 2. Run the Container

```bash
docker run -d --name portfolio -p 3000:3000 moh-thoriqi-sahal-portfolio:latest
```

- **Exposed Port:** The container exposes port `3000` (mapped to `3000` on host via `-p 3000:3000`).
- **Network Binding:** Next.js binds to `0.0.0.0` within the container, making it accessible from the host.

### 3. Verify the Container is Running

- **Check container status and health:**
  ```bash
  docker ps
  ```
- **Inspect container logs:**
  ```bash
  docker logs portfolio
  ```
- **Verify HTTP response & health endpoint:**
  ```bash
  curl http://localhost:3000/api/health
  ```
  Or navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Stop and Remove the Container

```bash
# Stop the running container
docker stop portfolio

# Remove the container
docker rm portfolio
```

---

## Deployment

The portfolio uses a two-track deployment model aligned with the project roadmap:

1. **Managed Production Deployment (Current — M8/M9):**
   - Hosted on **Vercel** via native GitHub repository integration.
   - Every push to `main` triggers a production release; Pull Requests receive isolated Preview deployments.
   - Built directly on Next.js App Router serverless capabilities with zero server management overhead.
   - Fast, zero-downtime instant rollbacks available from the dashboard.

2. **Self-Hosted DevOps Lab (M10):**
   - The repository maintains an active multi-stage [Dockerfile](Dockerfile) validated by GitHub Actions.
   - Local container runs and future VPS/Docker Compose deployments run the same standalone Next.js server (`server.js`).

For full operational steps, environment variables, verification checklists, and rollback instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Environment Variable Policy

- Never commit `.env`, `.env.local`, or any private secrets to Git.
- Always update `.env.example` when introducing new configuration parameters.
- Production and CI secrets are injected via GitHub Actions secrets or hosting platform environment managers.
