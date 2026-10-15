# Use node:18-alpine base image
FROM node:18-alpine

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining backend files
COPY . .

# Expose backend port
EXPOSE 5001

# Set default command
CMD ["npm", "start"]
