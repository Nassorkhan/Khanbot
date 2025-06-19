# Base image
FROM node:lts

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        imagemagick \
        webp && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --omit=dev && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Expose bot default port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the bot
CMD ["npm", "run", "start"]
