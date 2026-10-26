# Deployment — InterViewX (devops-24ESKCS104)

## Live site

🔗 Live: https://skit-devops-2026.github.io/devops-24ESKCS104/

The frontend (React + Vite, in `client/`) is built by the CI
`deploy-pages` job and deployed to GitHub Pages on every push to `main`.
Repository Settings > Pages source must be set to **GitHub Actions**.

## Run everything locally with Docker

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:8080 |
| Backend | http://localhost:6000 |
| Backend health | http://localhost:6000/health |
| Backend metrics | http://localhost:6000/metrics |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 (admin / admin) |

## Images

CI pushes images to GitHub Container Registry on every push to `main`:

- `ghcr.io/skit-devops-2026/devops-24eskcs104-backend:latest`
- `ghcr.io/skit-devops-2026/devops-24eskcs104-frontend:latest`

The backend image reports the deployed commit at `GET /health`
(`GIT_COMMIT` build arg, set to the commit SHA by CI).

## Monitoring

Prometheus scrapes the backend's `/metrics` endpoint
(see `monitoring/prometheus.yml` and `monitoring/README.md`).
The Grafana dashboard is `monitoring/grafana-dashboard.json`, and
`monitoring/sample-metrics.txt` contains real metrics captured from a
local backend run. Alert rules live in `monitoring/alert-rules.yml`.

## Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

See `k8s/README.md` for the Deployments and Services.

## Optional: Render backend

`render.yaml` is a Blueprint for a free Render Docker service built from
the root `Dockerfile`, with `/health` as its health-check path.
It is optional — the graded deployment above is GitHub Pages.

## Deployment diagram

![Deployment diagram](deployment.png)
