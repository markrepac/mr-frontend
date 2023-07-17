# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "dev" ]