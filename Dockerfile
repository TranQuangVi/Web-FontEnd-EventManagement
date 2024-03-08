# Use the official Node.js image from Docker Hub
FROM node:14.21.3

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY . .

# Install the Node.js dependencies
RUN npm install

# Expose the port on which the application will run (4400)
EXPOSE 4200

# Start the application using the ng serve command
CMD ng serve --host 0.0.0.0 --port 4200