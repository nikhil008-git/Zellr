# request-handler

## Purpose
Serves deployed static sites via **subdomain-based routing**.  
This service resolves deployment IDs from subdomains, fetches built assets from AWS S3, and serves them with correct content types.

---

## Tech Stack
- **Node.js**
- **Express.js**
- **AWS S3**
- **Content-Type (MIME) Detection**
- **Redis** (for deployment status & queue visibility)

---

## Quick Start

```bash
cd request-handler
npm install
npm run dev


