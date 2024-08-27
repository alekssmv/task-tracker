# Specify the base image
FROM node:22.7-alpine3.19
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the app files
COPY . .
# Build the app
RUN npm run build
# Run the app
CMD ["npm", "start"]