FROM node:alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx vite build

# TODO If Running Development Server
CMD ["npm", "run", "dev"]


# TODO If Serving Built Assets With Nginx

# Use Minimal Base Image
#FROM nginx:alpine
# Delete any existing default configurations that may cause conflicts
#RUN rm /etc/nginx/conf.d/default.conf
# Copy your own configuration
#COPY nginx.conf /etc/nginx/nginx.conf
# Adjust according to your build output folder
#COPY --from=frontend-builder /app/dist /etc/nginx/html  
