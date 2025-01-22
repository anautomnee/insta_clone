ARG VITE_BACKEND_URL=http://localhost:3001

# Use an official Node.js image as a base
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY . .

ENV VITE_ENV=local
ARG VITE_BACKEND_URL

# Build the React app
RUN npm run build

# Start a new image for serving the static files with Nginx
FROM nginx:alpine

# Copy the build output from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure React Router works by serving index.html for all routes
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

ARG VITE_BACKEND_URL

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]