FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173
#EXPOSE 8081

#RUN npm run build

CMD ["npm", "run", "dev"]