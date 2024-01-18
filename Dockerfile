# Use an official Node.js image as the base
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the Angular CLI
RUN npm install -g @angular/cli 

# Install dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the Angular app
RUN ng build --configuration=development

# Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built Angular app to the web server's directory
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 4200
EXPOSE 80

# Configure NGINX to handle client-side routing
# This configuration redirects all requests to index.html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
