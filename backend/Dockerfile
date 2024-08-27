FROM node:22.7-alpine3.19
# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install
# Bundle app source
COPY . .
# Expose port
EXPOSE 3000
# Start the server using the development build
CMD ["npm", "run", "start:dev"]