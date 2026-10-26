# InterViewX backend (Express) — devops-24ESKCS104
FROM node:20-alpine

WORKDIR /app

# Install production dependencies first (better layer caching).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ARG GIT_COMMIT=dev
ENV GIT_COMMIT=$GIT_COMMIT
ENV NODE_ENV=production
ENV PORT=6000

EXPOSE 6000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:6000/health || exit 1

CMD ["node", "index.js"]
