# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files into the container
COPY . .

# Expose port 4000
EXPOSE 4000

# Run the app
CMD ["node", "index.js"]
