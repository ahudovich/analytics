# syntax=docker/dockerfile:1

ARG NODE_VERSION=24

# ------------------------------------------------------
# Base image with Node.js
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

# ------------------------------------------------------
# Base image with system dependencies, pnpm and turbo
FROM base AS base-deps

RUN apk update && apk add --no-cache libc6-compat

# Configure pnpm global installation path
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Install Turbo globally (major version is enough here)
RUN pnpm add -g turbo@^2

# ------------------------------------------------------
# Generate pruned monorepo workspace
FROM base-deps AS workspace-prepare

COPY . .

RUN turbo prune api --docker

# ------------------------------------------------------
# Production dependencies
FROM base-deps AS prod-deps

# Copy pruned JSON workspace
COPY --from=workspace-prepare /app/out/json/ .

# Install production dependencies with cache
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

# ------------------------------------------------------
# Build stage
FROM base-deps AS builder

# Copy workspace package.json files
COPY --from=workspace-prepare /app/out/json/ .

# Install only required dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy full workspace
COPY --from=workspace-prepare /app/out/full/ .

# Build the app
RUN pnpm turbo run build --filter=api

# ------------------------------------------------------
# Final runtime image
FROM base AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

USER api

# Copy production node_modules preserving monorepo structure
COPY --from=prod-deps --chown=api:nodejs /app/node_modules ./node_modules
COPY --from=prod-deps --chown=api:nodejs /app/apps/api/node_modules ./apps/api/node_modules

# Copy built output
COPY --from=builder --chown=api:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=api:nodejs /app/apps/api/package.json ./apps/api/package.json

# Set working directory to the app
WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/index.js"]
