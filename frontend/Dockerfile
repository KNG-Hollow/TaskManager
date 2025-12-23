FROM node:alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

#  __________________________________________________________

# TODO If Running Development Server            (Development)

#CMD ["npm", "run", "dev"]

#  ___________________________________________________________

# TODO If Serving Built Assets With Nginx       (Release)

# Compile With Vite
RUN npx vite build
# Use Minimal Base Image
FROM nginx:alpine
# Delete any existing default configurations that may cause conflicts
RUN rm /etc/nginx/conf.d/default.conf
# Copy your own configuration
COPY nginx.conf /etc/nginx/nginx.conf
# Adjust according to your build output folder
COPY --from=frontend-builder /app/dist /etc/nginx/html  

#  ______________________________________________________________
