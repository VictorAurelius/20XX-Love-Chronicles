# Development Dockerfile for 20XX Love Chronicles
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
