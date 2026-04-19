# syntax=docker/dockerfile:1

# ------------------------------
# Base image
# Shared base for all stages to ensure the Node version is consistent.
# ------------------------------
FROM node:22-alpine AS base
WORKDIR /app

# Some Next.js packages work better on Alpine with libc compatibility.
RUN apk add --no-cache libc6-compat


# ------------------------------
# Dependencies
# Only install dependencies from the lockfile to optimize Docker caching.
# ------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci


# ------------------------------
# Builder
# Copy the project source and build the final Next.js production app.
# ------------------------------
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# ------------------------------
# Runner
# Only the necessary files for running production are copied.
# This simple method doesn't require extra changes in next.config.ts.
# ------------------------------
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts

EXPOSE 3000

# Run the application on port 3000
CMD ["npm", "run", "start"]
