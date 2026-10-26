# Kubernetes — InterViewX (devops-24ESKCS104)

Images are published by the CI `docker` job to GitHub Container Registry:

- Backend: `ghcr.io/skit-devops-2026/devops-24eskcs104-backend:latest`
- Frontend: `ghcr.io/skit-devops-2026/devops-24eskcs104-frontend:latest`

## Deploy

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods,svc
```

## What is in each file

- `deployment.yaml` — backend Deployment (1 replica, container port 6000,
  `/health` readiness and liveness probes) and frontend Deployment
  (1 replica, container port 80).
- `service.yaml` — backend ClusterIP Service on port 6000 and frontend
  LoadBalancer Service on port 80. Selectors match the Deployment labels.
