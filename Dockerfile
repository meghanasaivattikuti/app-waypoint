FROM node:20-slim

WORKDIR /usr/src/app

# Copy root package.json and install deps
COPY package*.json ./
RUN npm install --production

# Copy the rest of the code
COPY . .

EXPOSE 8080
CMD ["node", "app/server.js"]
