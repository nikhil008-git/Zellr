# Zellr — static web-deployment platform

**Zellr** is a deployment platform that automatically builds and hosts GitHub repositories with **custom subdomain routing**, inspired by Vercel's architechture. Users simply submit a GitHub repo URL, and Zellr handles cloning, building, hosting, and serving the app.

---

## TL;DR

- Submit a GitHub repository URL  
- Zellr clones & builds it in the background  
- Built files are uploaded to S3 / Cloudflare R2  
- Application is served at `https://{id}.zellr.com`  
- Built with **Next.js + Node.js + Redis + S3**

---


---

## 🧩 Services

### Upload Service

**Port:** 3000  
**Purpose:** Handles GitHub repository submissions, uploads source code to storage, and queues build jobs.  
**Tech Stack:** Express.js, Redis (queue & status tracking), AWS S3 / Cloudflare R2, simple-git, cors  
**Endpoints:**  
- `POST /deploy` - Accepts GitHub URL, clones repo, uploads to S3, queues build job  
- `GET /status` - Retrieves deployment status from Redis  

### Deploy Service

**Purpose:** Background worker that processes queued deployments.  
**Tech Stack:** Node.js, Redis (queue consumer), AWS S3, child_process  
**Responsibilities:**  
- Polls `build-queue` for jobs 
- Downloads source, runs `npm install && npm run build` (utils.ts:4–7)  
- Uploads built assets to `dist/{id}/` in S3 (aws.ts:44–50)  
- Updates status to "deployed" in Redis 

### Request Handler

**Port:** 3001  
**Purpose:** Serves deployed apps via subdomain routing  
**Tech Stack:** Express.js, AWS S3, Content-Type detection  
**Features:**  
- Subdomain routing `{id}.zellr.com` 
- Serves files from `dist/{id}/{path}` 
- Dynamic MIME type detection for HTML/CSS/JS 

---

## Frontend (Next.js)

**Tech Stack:** Next.js 14+, React 18, TypeScript, Tailwind CSS, Axios  
**Features:**  
- GitHub repository URL input form  
- Deployment status polling  
- Displays deployed URL at `{id}.zellr.com`  

---

## Shared Infrastructure

### Redis

- **Queue:** `build-queue` (job distribution)  
- **Status Tracking:** `status` hash  
- **Publisher/Subscriber pattern:** For real-time status updates  

### AWS S3 / Cloudflare R2

- Endpoint: ``
- Bucket: `your own bucket`  
- Access keys configured for S3-compatible operations  

---

## Quick Start

### Prerequisites

- Node.js 18+  
- Redis server  
- AWS / Cloudflare R2 credentials  

### Installation

Start Redis:

```bash
redis-server

# Upload Service
cd upload-service
npm install
npm run dev

# Deploy Service
cd deploy-service
npm install
npm run dev

# Request Handler
cd request-handler
npm install
npm run dev

# Next.js Frontend yet to be added
cd frontend
npm install
npm run dev
