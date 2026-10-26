# Monitoring — InterViewX (devops-24ESKCS104)

## What is scraped

The Express backend in `server/` exposes Prometheus metrics at `GET /metrics`:

- `interviewx_uptime_seconds` — seconds since the server started
- `interviewx_http_requests_total{method,path}` — HTTP requests by method and path
- `interviewx_resident_memory_bytes` — server process resident memory

`GET /health` returns `{"status":"ok","commit":"..."}` and does not need
the database, so it stays up while MongoDB is still connecting.

## Files

- `prometheus.yml` — scrape config used by docker compose
  (backend is `backend:6000` inside the compose network)
- `../prometheus.yml` — same scrape config for Prometheus run outside
  compose (backend is `localhost:6000`)
- `alert-rules.yml` — `BackendDown` and `BackendHighMemory` alerts
- `dashboard.json` / `grafana-dashboard.json` — Grafana dashboard for the
  metrics above (auto-provisioned by docker compose)
- `sample-metrics.txt` — real `/metrics` output captured from a local run

## Run it

```bash
docker compose up --build
# Backend:   http://localhost:6000/health
# Metrics:   http://localhost:6000/metrics
# Prometheus: http://localhost:9090
# Grafana:   http://localhost:3000 (admin / admin)
```
