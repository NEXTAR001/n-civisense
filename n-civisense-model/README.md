

# N-ATLaS API (Google Cloud CPU Edition)

**N-ATLaS** is a production-ready, cost-optimized FastAPI service designed to run the **N-ATLaS LLM** (Nigerian Atlas for Languages & AI at Scale) efficiently on CPU infrastructure.

By leveraging **GGUF quantization** and **Llama.cpp**, this version allows you to deploy a powerful 8B parameter model on affordable cloud instances without requiring expensive GPUs.

### Key Capabilities:
*  **Multilingual Chat:** Native support for English, Hausa, Igbo, and Yoruba.
*  **CPU Inference:** High-speed token generation using `llama-cpp-python`.
*  **Voice Intelligence:** Speech-to-Text powered by OpenAI Whisper (CPU optimized).
*  **Context Guardrails:** RapidFuzz-based filtering for strict domain adherence (NIMC, FIRS, FRSC).
*  **Session Memory:** Redis-backed conversation history.

---

## Architecture Overview

This architecture is designed for the **Google Cloud C4 / E2 Series**, maximizing performance while minimizing cost.

```mermaid
graph TD
    Client[Client (Web/Mobile)] -->|HTTP / SSE| NGINX
    NGINX -->|Reverse Proxy| FastAPI
    
    subgraph "GCP Compute Engine (C4-Standard-4)"
        FastAPI[FastAPI Service]
        
        FastAPI -->|Check Scope| RapidFuzz[RapidFuzz Guardrail]
        FastAPI -->|Read/Write History| Redis[(Redis DB)]
        
        FastAPI -->|Inference| LlamaCPP[Llama.cpp Engine]
        LlamaCPP -->|Load Model| RAM[System RAM (16GB)]
        
        FastAPI -->|Audio Upload| Whisper[OpenAI Whisper]
        Whisper -->|Process| FFMPEG
    end
````

-----

## Project Structure

```
n-atlas-api/
├── app.py                 # Main FastAPI application
├── requirements.txt       # CPU-optimized dependencies
├── n-atlas-model.gguf     # Quantized Model File (Downloaded on startup)
├── .env                   # Configuration secrets
└── README.md              # Documentation
```



## Requirements & Infrastructure

### Recommended Cloud Spec (Google Cloud)

To run this efficiently without crashing, use the following VM configuration:

  * **Platform:** Google Compute Engine
  * **Machine Series:** **C4** (Compute Optimized) or **E2** (Cost Optimized)
  * **Machine Type:** `c3-standard-4` (4 vCPU, 15GB RAM)
  * **OS Image:** **Ubuntu 22.04 LTS** (x86/64)
      * *⚠️ Warning: Do not use "Deep Learning VM" images as they waste disk space with unused GPU drivers.*
  * **Disk Size:** 50 GB (Balanced Persistent Disk)

### System Dependencies

  * Python 3.10+
  * FFmpeg (Required for Whisper)
  * Redis Server

-----

##  Deployment Guide (Ubuntu)

###  System Setup

SSH into your Google Cloud VM and install the necessary system tools:

```bash
sudo apt update
sudo apt install -y python3-pip python3-venv build-essential python3-dev ffmpeg redis-server
```

### Configure Redis

Start the database service:

```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
# Test connection
redis-cli ping  # Should return "PONG"
```

### Python Environment

Clone your code (or upload files via SFTP) and set up the virtual environment:

```bash
# Create environment
python3 -m venv venv
source venv/bin/activate

# Install CPU-optimized PyTorch first
pip install torch torchvision torchaudio --index-url [https://download.pytorch.org/whl/cpu](https://download.pytorch.org/whl/cpu)

# Install remaining dependencies
pip install -r requirements.txt
```

### Run the Server

Use `uvicorn` to start the API. The model will auto-download on the first run (approx 5GB).

**For Testing (Foreground):**

```bash
sudo ./venv/bin/uvicorn app:app --host 0.0.0.0 --port 80
```

**For Production (Background Service):**

```bash
sudo nohup ./venv/bin/uvicorn app:app --host 0.0.0.0 --port 80 > server.log 2>&1 &
```

-----

##  API Endpoints

### 1\. Streaming Chat (SSE)

Designed for real-time typewriter effects.

  * **URL:** `POST /chat/stream`
  * **Body:**
    ```json
    {
      "text": "Yaya zan yi in sami katina na NIN?",
      "context": "NIMC",
      "session_id": "user-123"
    }
    ```
  * **Response:** A stream of server-sent events (`data: {"type": "token", "text": "..."}`).

### 2\. Audio Transcription

Upload a voice note to get text back.

  * **URL:** `POST /audio/transcribe`
  * **Body:** `multipart/form-data` with file field `file`.
  * **Response:** `{"text": "How do I register my car?"}`

### 3\. Clear Session

Wipe the Redis memory for a specific user.

  * **URL:** `DELETE /session/{session_id}`

-----

##  Performance & Optimization

  * **Quantization:** This deployment uses **4-bit quantization (Q4\_K\_M)**. This reduces memory usage from \~16GB to \~6GB with negligible loss in accuracy.
  * **FP32 Mode:** Whisper is explicitly set to use `fp32` to avoid CPU warnings and ensure transcription accuracy on non-GPU hardware.
  * **Context Guardrails:** The `RapidFuzz` logic runs *before* the LLM. If a user asks "Who is Messi?", the request is rejected instantly (0ms latency cost), saving CPU cycles for valid government queries.

-----



