# Multi-stage Dockerfile optimized for Vue 3 + Vite with proper caching

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
ARG NODE_ENV=production
ARG VITE_API_BASE_URL

# Set environment variables
ENV NODE_ENV=production
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the Vue application with Vite
RUN npm run build

# Stage 3: Runner - Production image with nginx
FROM nginx:alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Copy built application from builder
# Vite outputs to dist directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional - nginx default config works for SPA)
# For Vue Router in history mode, you may need a custom nginx config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

