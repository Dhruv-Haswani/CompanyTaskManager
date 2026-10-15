# Use node:20-alpine base image (required by Vite/Rolldown for node:util styleText support)
FROM node:20-alpine

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining frontend files
COPY . .

# Set environment variable
ENV REACT_APP_API_URL=http://localhost:5001

# Expose frontend port
EXPOSE 3000

# Set default command
CMD ["npm", "start"]
