FROM node:12.18.3

WORKDIR C:\Users\Madhuni\Desktop\assign\service1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]