# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Expose port (change if needed)
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]
