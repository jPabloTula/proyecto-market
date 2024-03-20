# Stage #1 - Install dependencies
FROM node:18-slim AS development

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci

# Stage #2 - Build project
FROM node:18-slim AS build

WORKDIR /usr/app
COPY --from=development /usr/app/node_modules /usr/app/node_modules
COPY package*.json ./
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production

# Stage #3 - Copy production files
FROM node:18-slim AS production

COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]