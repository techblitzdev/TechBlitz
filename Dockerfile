# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
# Use --no-frozen-lockfile to avoid issues with lockfile changes
RUN pnpm install --no-frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
# set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# copy the dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# copy the prisma schema from the deps stage
COPY --from=deps /app/prisma/schema/schema.prisma ./prisma/schema/schema.prisma

# copy the rest of the application code
COPY . .

# Skip Prisma's postinstall script for the build phase to avoid schema errors
ENV PRISMA_SKIP_POSTINSTALL=1
ENV NEXT_TELEMETRY_DISABLED=1

# Enables Hot Reloading Check https://github.com/vercel/next.js/issues/36774 for more information
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

RUN pnpm exec prisma generate

# Build the application
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown -R nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]