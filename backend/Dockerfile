# ──────────────────────────────────────────────
# Backend Dockerfile — Node 18 Alpine (slim)
# MEAN Stack · Express + Mongoose API
# ──────────────────────────────────────────────

FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy dependency manifests first (leverages Docker layer cache)
COPY package*.json ./

# Install production dependencies only
RUN npm install 

# Copy the rest of the application source code
COPY . .

# Expose the port the Express server listens on
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
