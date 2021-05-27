FROM node:12.18.3

WORKDIR D:\GitHub\aecs_assignment_service1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "node", "app.js" ]