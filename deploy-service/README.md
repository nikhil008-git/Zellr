# Deployment Worker Service

## Purpose
Build a background worker that processes queued deployment jobs.  
This service consumes build tasks from a Redis queue, builds the project, and uploads the final assets to AWS S3.

---

## Tech Stack
- **Node.js**
- **Redis** (Queue consumer)
- **AWS S3** (Artifact storage)
- **child_process** (for running build commands)

---

## Quick Start

```bash
cd deploy-service
npm install
npm run dev

## start redis locally 

```bash
# Install Redis  
brew install redis  # macOS  
sudo apt-get install redis-server  # Ubuntu  
  
# Start Redis server  
redis-server  
  
# Open Redis CLI in another terminal  
redis-cli