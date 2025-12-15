# N-ATLaS API

**N-ATLaS is a GPU‑accelerated, production‑ready FastAPI service for:

* 💬 Conversational LLM inference (streaming & non‑streaming)
* 🎙️ Speech‑to‑Text (Whisper)
* 🧠 Contextual memory & retrieval (Redis)
* 🚀 Optimized deployment on **DigitalOcean GPU Droplets** using Docker

This repository is designed for **real‑world deployment**, not demos or notebooks.

---

## ✨ Features

* **FastAPI backend** with async endpoints
* **Token streaming (SSE)** for chat responses
* **Hugging Face Transformers** (GPU‑accelerated)
* **Whisper speech‑to‑text** with FFmpeg
* **Redis** for conversation memory & caching
* **Docker + Docker Compose** (reproducible builds)
* **NGINX‑friendly** (buffering disabled for streaming)
* **Scales vertically** on A10 / A100 GPUs

---

## 🧱 Architecture Overview

```
Client (Web / Mobile)
        │
        │  HTTP / SSE
        ▼
     NGINX
        │
        ▼
 FastAPI (N‑ATLaS)
        │
        ├── LLM Inference (GPU)
        ├── Whisper STT (GPU)
        └── Redis (Context / Cache)
```

---

## 📁 Project Structure

```
n-atlas-api/
├── app.py                 # FastAPI entry point
├── requirements.txt       # Python dependencies
├── Dockerfile             # GPU‑ready container
├── docker-compose.yml     # API + Redis
├── .env.example           # Environment variable template
├── README.md              # This file
└── utils/                 # Helpers (LLM, audio, memory, etc.)
```

---

## 🔐 Environment Variables

Create a `.env` file **on the server** (never commit it).

```env
# Model
MODEL_NAME=NCAIR1/N-ATLaS
HF_TOKEN=your_huggingface_token

# Whisper
WHISPER_MODEL=base

# Runtime
USE_REMOTE_INFERENCE=false
MAX_CONCURRENT_GENERATIONS=1

# Redis
REDIS_URL=redis://redis:6379/0

# Server
HOST=0.0.0.0
PORT=8000

# Logging
LOG_LEVEL=info
```

---

## 📦 Requirements

### Local (for development)

* Python 3.10+
* FFmpeg
* Redis
* NVIDIA GPU (optional but recommended)

### Production (recommended)

* **DigitalOcean GPU Droplet**
* Ubuntu 22.04
* Docker + Docker Compose
* NVIDIA Container Toolkit

---

## 🐳 Docker Setup (Recommended)

### Dockerfile (GPU‑enabled)

* CUDA 12
* cuDNN 8
* Optimized for inference workloads

### docker‑compose.yml

Includes:

* `api` – N‑ATLaS FastAPI service
* `redis` – context & caching layer

GPU access is enabled via:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

---

## 🚀 Deployment (DigitalOcean GPU Droplet)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/anthon793/n-atlas-api.git
cd n-atlas-api
```

### 2️⃣ Configure environment

```bash
cp .env.example .env
nano .env
```

### 3️⃣ Build & start services

```bash
docker compose build
docker compose up -d
```

### 4️⃣ Verify

```bash
docker logs -f n-atlas-api
```

---

## 🌐 NGINX Configuration (CRITICAL)

Streaming **will break** if buffering is enabled.

```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_cache off;
    chunked_transfer_encoding on;
}
```

---

## 📡 API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{"status": "ok"}
```

---

### Chat (Non‑Streaming)

```
POST /chat
```

```json
{
  "message": "Explain transformers",
  "session_id": "user123"
}
```

---

### Chat (Streaming – SSE)

```
POST /chat/stream
```

* Returns token‑by‑token output
* Requires NGINX buffering disabled

---

### Audio Transcription

```
POST /audio/transcribe
```

* Accepts audio file (wav, mp3, m4a)
* Uses Whisper on GPU

---

## 🧠 Memory & Context

* Conversation history stored in **Redis**
* Session‑based context (`session_id`)
* Automatic truncation to fit model limits

---

## ⚙️ Performance Notes

* Limit concurrent generations on small GPUs
* A10: `MAX_CONCURRENT_GENERATIONS=1–2`
* A100: `MAX_CONCURRENT_GENERATIONS=4+`
* Use `bitsandbytes` for lower VRAM usage

---

## 🔒 Security Best Practices

* Never expose Redis publicly
* Use HTTPS (TLS) via NGINX
* Rotate Hugging Face tokens regularly
* Restrict firewall to ports 22, 80, 443

---

## 🧪 Testing

```bash
curl http://localhost:8000/health
```

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

---

## 🛣️ Roadmap

* [ ] Authentication & rate limiting
* [ ] Multi‑tenant session isolation
* [ ] Vector database integration
* [ ] Prometheus metrics
* [ ] CI/CD (GitHub Actions)

---

## 📜 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome.
Please open an issue for major changes before submitting.

---

## 📫 Support

For deployment, scaling, or optimization questions:

* Open an issue
* Or contact the maintainer directly

---

**N‑ATLaS is built for real workloads, real users, and real GPUs.** 🚀
