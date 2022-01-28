# Dockerfile for Node Express backend

FROM node:16

# Create App directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# COPY app source code
COPY . .

EXPOSE 8000

CMD ["npm", "run", "server"]