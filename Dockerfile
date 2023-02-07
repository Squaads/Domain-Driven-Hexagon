FROM node:18.13.0-alpine as build
WORKDIR /srv/
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . ./

FROM build as dev
WORKDIR /srv/
EXPOSE ${PORT:-5000}
CMD [ "npm", "run", "watch"]

FROM node:18.13.0-alpine as prod
WORKDIR /srv/
COPY --from=build /srv/dist .
COPY --from=build package.json package-lock.json
RUN npm ci --production --ignore-scripts
EXPOSE ${PORT:-5000}
CMD [ "node", "main.js" ]
