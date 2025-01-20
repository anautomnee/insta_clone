# Base image
FROM node:18

LABEL authors="anastasiakozlova"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire server folder (including src, .env, and other files)
COPY . .

# Build the TypeScript code
RUN npm run build

# Specify the command to run your app (using the `dist` folder as output)
CMD ["node", "dist/index.js"]

# Expose the port your app runs on (optional, e.g., 3000)
EXPOSE 3001
