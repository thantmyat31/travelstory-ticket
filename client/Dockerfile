# Dockerfile for react client

# Build react client
FROM node:16

# Working directory be app
WORKDIR usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# COPY local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]