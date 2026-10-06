# Multi-stage production Dockerfile for Next.js standalone output
# Base image: Official Node.js LTS Alpine Linux
FROM node:22-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manifests and lockfile for reproducible dependency installation
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Rebuild source code and generate Next.js standalone bundle
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Minimal production runtime image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run container as unprivileged non-root user to follow least privilege principles
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets and set up pre-render cache directory with correct ownership
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone build output and static bundles
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Container healthcheck using BusyBox wget built into Alpine to poll the internal HTTP endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
