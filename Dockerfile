FROM node:8.7

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json mongoTest.js ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
