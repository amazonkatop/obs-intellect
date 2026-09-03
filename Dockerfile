FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG DATABASE_URL
ARG PUBLIC_SITE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts/serve-static.mjs ./scripts/serve-static.mjs
EXPOSE 3000
CMD ["node", "scripts/serve-static.mjs"]
