# InterViewX backend service (used by Render and docker compose).
# Build context is the repository root; the backend lives in server/.
FROM node:20-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

COPY server/ .

ARG GIT_COMMIT=dev
ENV GIT_COMMIT=$GIT_COMMIT
ENV NODE_ENV=production
ENV PORT=6000

EXPOSE 6000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:6000/health || exit 1

CMD ["node", "index.js"]
