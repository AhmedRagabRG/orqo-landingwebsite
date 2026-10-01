# Build the static site
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_CONTACT_ENDPOINT=""
ARG PUBLIC_SHOW_REVIEW="false"
ENV PUBLIC_CONTACT_ENDPOINT=$PUBLIC_CONTACT_ENDPOINT PUBLIC_SHOW_REVIEW=$PUBLIC_SHOW_REVIEW
RUN npm run build

# Serve it with nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
