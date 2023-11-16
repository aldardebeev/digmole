FROM node:18.18-bullseye-slim as build
ARG STAGE=master
WORKDIR /app
COPY . .
RUN cp -rf .deploy/$STAGE/.env . && \
    yarn install --frozen-lockfile && \
    yarn build && \
    rm -rf .deploy

FROM node:18.18-bullseye-slim

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/.env ./.env
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["yarn", "start"]
