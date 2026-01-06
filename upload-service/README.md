# upload-service

## Purpose
Handles **repository uploads** and **build queue management**.  
This service accepts deployment requests, clones repositories, uploads source files to object storage, and queues build jobs using Redis.

---

## Tech Stack
- **Node.js**
- **Express.js**
- **Redis** (queue & deployment status)
- **AWS S3 / Cloudflare R2**
- **simple-git**
- **cors**

---

## Quick Start

```bash
cd upload-service
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