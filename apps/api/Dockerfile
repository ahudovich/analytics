FROM node:24-alpine AS base

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Configure pnpm global installation path
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Use only the major version of `turbo` here
RUN pnpm add -g turbo@^2

# ------------------------------------------------------
FROM base AS prepare

# Copy the project
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace
RUN turbo prune api --docker

# ------------------------------------------------------
FROM base AS prod-deps

# Install only production dependencies
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ------------------------------------------------------
FROM base AS builder

# Install only required dependencies
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy full pruned workspace to build
COPY --from=prepare /app/out/full/ .

# Build the app
RUN pnpm turbo run build --filter=api

# ------------------------------------------------------
FROM base AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

# Copy the entire node_modules structure (preserving workspace structure)
COPY --from=prod-deps --chown=api:nodejs /app/node_modules ./node_modules
COPY --from=prod-deps --chown=api:nodejs /app/apps/api/node_modules ./apps/api/node_modules

# Copy built output
COPY --from=builder --chown=api:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=api:nodejs /app/apps/api/package.json ./apps/api/package.json

# Set working directory to the app
WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/index.js"]
