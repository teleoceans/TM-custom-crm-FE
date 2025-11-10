# Multi-stage Dockerfile optimized for Nuxt 3 with proper caching
# This avoids Nix builds entirely by using Node.js base images

# Stage 1: Dependencies - Cache node_modules layer
FROM node:20-alpine AS deps

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies with npm ci for faster, reproducible builds
# Using --legacy-peer-deps if needed for compatibility
RUN npm ci --legacy-peer-deps --prefer-offline --no-audit || \
    npm install --legacy-peer-deps --prefer-offline --no-audit

# Stage 2: Builder - Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code and config files
COPY . .

# Build arguments for build-time configuration
ARG NUXT_PUBLIC_API_BASE
ARG CLOUDINARY_BASE_URL
ARG NODE_ENV=production

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE:-https://backend.locallyeg.com}
ENV CLOUDINARY_BASE_URL=${CLOUDINARY_BASE_URL}

# Build the Nuxt application
RUN npm run build

# Stage 3: Runner - Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Copy built application from builder
# Nuxt 3/Nitro bundles all dependencies in .output, so we only need the output
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# Nuxt 3's Nitro bundles dependencies in .output/server/node_modules
# If needed, install only production dependencies as fallback
# This is typically not needed as Nitro bundles everything, but kept for compatibility
RUN npm ci --omit=dev --prefer-offline --no-audit 2>/dev/null || true

# Switch to non-root user
USER nuxtjs

# Expose port (Nuxt defaults to 3000)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NITRO_PRESET=node-server

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", ".output/server/index.mjs"]

