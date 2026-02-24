# ──────────────────────────────────────────────
# Frontend Dockerfile — Multi-stage build
# Stage 1 : Build Angular 15 app with Node
# Stage 2 : Serve static files via Nginx
# ──────────────────────────────────────────────

# ── Stage 1: Build ──────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install ALL deps (dev included for Angular CLI)
COPY package*.json ./
RUN npm install

# Copy rest of source and build for production
COPY . .
RUN npm run build -- --configuration production

# ── Stage 2: Serve ──────────────────────────
FROM nginx:1.25-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled Angular output from builder stage
# Angular 15 outputs to dist/<project-name>
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html

# Copy custom Nginx config to handle Angular routing (HTML5 pushState)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
