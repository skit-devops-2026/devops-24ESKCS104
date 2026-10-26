[![CI](https://github.com/skit-devops-2026/devops-24ESKCS104/actions/workflows/ci.yml/badge.svg)](https://github.com/skit-devops-2026/devops-24ESKCS104/actions/workflows/ci.yml)

# InterViewX

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS104 | DEEKSHANT VERMA | Deekshant-codes |

## About

InterViewX is an AI based interview platform that resolves a major problem of practicing technical and HR interview. InterViewX builds that confidence that you need to perform excellently in a job interview. It asks, you answer and you become confident. Also, it provides a full report of your practice interview that helps you learn from the mistakes.

## Tech stack

- Frontend: React, Tailwind CSS, Motion, react-icons
- Backend: Node.js, Express.js, multer, axios, cors, cookie-parser, JWT, firebase, dotenv, mongoose
- Database: MongoDb-Atlas

## Running locally

```bash
make install
make run
```

## Live URL

🔗 Live: https://skit-devops-2026.github.io/devops-24ESKCS104/

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone
sheet for why this is required.

The backend also exposes Prometheus metrics at `GET /metrics`
(`interviewx_uptime_seconds`, `interviewx_http_requests_total`,
`interviewx_resident_memory_bytes`). Neither endpoint needs the database.

## Mid-term 2 — Modules 5–7

- **M5 Containerization:** `Dockerfile` (root, backend service),
  `server/Dockerfile`, `client/Dockerfile`, and `docker-compose.yml`
  (backend + frontend + Prometheus + Grafana). CI pushes images to
  `ghcr.io/skit-devops-2026/devops-24eskcs104-backend` and
  `ghcr.io/skit-devops-2026/devops-24eskcs104-frontend`.
- **M6 Deployment and monitoring:** the frontend is deployed to GitHub Pages
  (live URL above); `monitoring/prometheus.yml` scrapes the backend,
  `monitoring/dashboard.json` is the Grafana dashboard,
  `monitoring/sample-metrics.txt` holds real captured metrics, and
  `docs/deployment.md` + `docs/deployment.png` document the deployment.
- **M7 Kubernetes:** `k8s/deployment.yaml` (backend + frontend Deployments)
  and `k8s/service.yaml` (backend ClusterIP, frontend LoadBalancer).
