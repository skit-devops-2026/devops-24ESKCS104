# InterViewX (devops-24ESKCS104) — React client + Express server.
# The CI pipeline calls these targets, so the names must not change.

.PHONY: install test build run docker-build docker-up

install:
	cd server && npm ci
	cd client && npm ci

test:
	cd server && npm test

build:
	cd client && npm run build

run:
	cd server && npm start

# Needed from M4 onwards
docker-build:
	docker compose build

docker-up:
	docker compose up --build
