FROM node:16-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
RUN npm install --save-dev ts-node

COPY . .

CMD ["npm", "start"]