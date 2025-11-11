# Stage 1: Build the Vite project
FROM node:lts-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vue Vite application for production
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built assets from the 'build' stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]