# Containerized Web Application

A containerized Node.js web application deployed behind an Nginx reverse proxy using Docker and Docker Compose.

## Architecture

```text
                    Client
                      │
                      │ HTTP :8080
                      ▼
            ┌─────────────────────┐
            │   Nginx Reverse     │
            │       Proxy         │
            │     Container       │
            │       :80           │
            └──────────┬──────────┘
                       │
                       │ Docker Network
                       ▼
            ┌─────────────────────┐
            │   Node.js           │
            │   Web Application   │
            │     Container       │
            │       :3000         │
            └─────────────────────┘
```

## Overview

This project demonstrates a containerized web application architecture using Docker Compose.

The Node.js application runs in its own container and is not directly exposed to the host. Nginx acts as a reverse proxy and provides the public entry point to the application.

The application includes a dedicated health endpoint that can be used for container health monitoring.

## Technologies

* Node.js
* Express.js
* Docker
* Docker Compose
* Nginx
* Linux
* Git

## Project Structure

```text
containerized-web-application/
├── app/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── nginx/
│   └── nginx.conf
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Docker Architecture

The application consists of two services:

### Web Application

The Node.js application runs on port `3000` inside its Docker container.

Port `3000` is intentionally not published directly to the host. It is accessible to other services through the Docker Compose network.

### Nginx Reverse Proxy

Nginx runs on port `80` inside its container and is published on host port `8080`.

Traffic flow:

```text
localhost:8080
      │
      ▼
Nginx :80
      │
      ▼
web-application:3000
```

## Health Check

The Node.js application provides:

```text
GET /health
```

A successful response is:

```json
{
  "status": "healthy"
}
```

Docker Compose also uses this endpoint as the container health check.

## Running the Application

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd containerized-web-application
```

Start the application:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

## Verify the Application

Test the application through the Nginx reverse proxy:

```bash
curl http://localhost:8080
```

Test the health endpoint:

```bash
curl http://localhost:8080/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

## Container Health

Check the application container health status:

```bash
docker inspect web-application --format='{{.State.Health.Status}}'
```

Expected result:

```text
healthy
```

## Nginx Configuration

Nginx is configured as a reverse proxy and forwards incoming requests to the Node.js application over the Docker internal network.

The Node.js container does not require direct host port exposure.

## Docker Security

The Node.js application container runs as the non-root `node` user.

The Nginx configuration is mounted as read-only:

```text
./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
```

Environment files and local dependencies are excluded from version control through `.gitignore` and `.dockerignore`.

## Stopping the Application

```bash
docker compose down
```

## Development Notes

This project is designed as the foundation for a broader DevOps workflow. Future stages can extend the same application with:

* GitHub Actions CI/CD
* Docker image publishing
* Kubernetes deployment
* Terraform infrastructure
* AWS EKS deployment
* Automated deployment workflows
