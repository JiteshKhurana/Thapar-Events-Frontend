# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the application with an Nginx server
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
