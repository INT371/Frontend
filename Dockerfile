FROM node:18.2.0-alpine3.15 as build
WORKDIR /app
ARG backend_url
ENV VUE_APP_BACKEND_URL=$backend_url
COPY package*.json ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as after
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
