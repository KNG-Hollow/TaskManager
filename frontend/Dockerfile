FROM node:alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


# If Running Development Server
EXPOSE 5173
#EXPOSE 8081
CMD ["npm", "run", "dev"]


# If Serving Built Assets With Nginx
#FROM nginx:alpine
#COPY --from=frontend-builder /app/dist /usr/share/nginx/html  # Adjust according to your build output folder
#EXPOSE 80