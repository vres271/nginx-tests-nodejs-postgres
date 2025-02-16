FROM node:22.14.0
WORKDIR /usr/src/tester
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "test"]