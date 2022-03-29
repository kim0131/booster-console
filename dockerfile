# 사용할 이미지 지정
FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm i -y 

COPY . . 

RUN npm run build

EXPOSE 4000 

CMD [ "npm", "run", "start"]