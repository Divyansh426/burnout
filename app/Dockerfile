FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --include=dev --legacy-peer-deps --no-audit --no-fund

RUN npm install @rollup/rollup-linux-x64-gnu --save-dev --legacy-peer-deps

COPY . .

RUN npm run build


FROM node:22-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]