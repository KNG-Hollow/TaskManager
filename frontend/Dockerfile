FROM node:alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx vite build


# TODO If Serving Built Assets With Nginx
#FROM nginx:alpine
# Delete any existing default configurations that may cause conflicts
#RUN rm /etc/nginx/conf.d/default.conf
# Copy your own configuration
#COPY nginx.conf /etc/nginx/nginx.conf
# Adjust according to your build output folder
#COPY --from=frontend-builder /app/dist /etc/nginx/html  

# TODO REMOVE DEVELEPMENT OPTION WHEN READY
# If Running Development Server
EXPOSE 5173
EXPOSE 8081
EXPOSE 80
CMD ["npm", "run", "dev"]
