

#  n-CiviSense

**Nigeria's Indigenous AI-Powered Government Services Platform**

n-CiviSense is a bespoke, all-in-one intelligent application bridging the gap between citizens and government services. Built on **N-ATLaS** (Nigeria's first indigenous Large Language Model), it provides contextually accurate, multi-lingual guidance on core parastatals like NIMC, FIRS, and FRSC.

This repository is a **monorepo** containing the Next.js Frontend and the GPU-free, CPU-optimized FastAPI Backend.

-----

## Features

### Powered by Indigenous AI

  * **N-ATLaS Integration:** Built on a quantized version of the N-ATLaS LLM, ensuring responses are culturally relevant and tailored to the Nigerian context.
  * **Multi-Language Support:** Fluent interaction in **English, Hausa, Igbo, and Yoruba**.
  * **Strict Context Guardrails:** Uses `RapidFuzz` logic to restrict conversations strictly to government services, preventing hallucination on unrelated topics.

### Comprehensive Service Coverage

  * **NIMC:** NIN enrollment, verification, and identity management.
  * **FIRS:** Tax filing, TIN generation, and revenue services.
  * **FRSC:** Driver's license renewal, vehicle registration, and road safety protocols.
  * **General Services:** Health, Education, and Agriculture inquiries.

###  Technical Capabilities

  * **Real-Time Streaming:** Server-Sent Events (SSE) for instant, typewriter-style responses.
  * **Voice Intelligence:** Integrated **OpenAI Whisper** (CPU optimized) for speech-to-text, allowing voice queries in local accents.
  * **Cost-Optimized Inference:** Runs high-performance inference on standard CPUs using **Llama.cpp** and **GGUF quantization**, eliminating the need for expensive GPUs.

-----

## Architecture Overview

The system is designed for cost-efficiency on **Google Cloud (C4/E2 Series)**.

```mermaid
graph TD
    User((Citizen)) -->|Voice/Text| NextJS[Frontend (Next.js)]
    NextJS -->|HTTP / SSE| NGINX[Reverse Proxy]
    NGINX -->|API Request| FastAPI[Backend API]
    
    subgraph "GCP Compute Engine (CPU Optimized)"
        FastAPI -->|Guardrails| RapidFuzz[Scope Check]
        FastAPI -->|Session Memory| Redis[(Redis DB)]
        
        FastAPI -->|Inference| LlamaCPP[Llama.cpp Engine]
        LlamaCPP -->|Context| Model[N-ATLaS GGUF Model]
        
        FastAPI -->|Audio Processing| Whisper[OpenAI Whisper]
        Whisper -->|Decode| FFMPEG[FFmpeg]
    end
```

-----

##  Tech Stack

### Frontend

  * **Framework:** Next.js 16 (React 19)
  * **Language:** TypeScript
  * **Styling:** Tailwind CSS v4
  * **State:** React Context API & Hooks
  * **UI:** Lucide React, Framer Motion

### Backend & AI

  * **API Framework:** FastAPI (Python 3.10+)
  * **Inference Engine:** Llama.cpp (via `llama-cpp-python`)
  * **Model Format:** GGUF (4-bit Quantized)
  * **Speech-to-Text:** OpenAI Whisper
  * **Database:** Redis (Session Management)
  * **Infrastructure:** Google Cloud Compute Engine (Ubuntu 22.04)



## Getting Started

### Prerequisites

  * **Node.js** 18+ and **npm/yarn**
  * **Python** 3.10+
  * **Redis Server** (running locally or remotely)
  * **FFmpeg** (Required for voice processing)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/civisense.git
cd civisense
```

### Backend Setup (AI Engine)

The backend handles the heavy lifting. Navigate to the backend folder:

```bash
cd backend
```

**Install System Dependencies (Ubuntu/Debian):**

```bash
sudo apt update && sudo apt install -y ffmpeg redis-server python3-venv
sudo systemctl start redis-server
```

**Setup Python Environment:**

```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install CPU-optimized PyTorch first
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Install application dependencies
pip install -r requirements.txt
```

**Configure Environment:**
Create a `.env` file in `/backend`:

```env
MODEL_REPO=QuantFactory/N-ATLaS-GGUF
MODEL_FILE=N-ATLaS.Q4_K_M.gguf
WHISPER_MODEL=base
REDIS_HOST=localhost
REDIS_PORT=6379
N_THREADS=4
```

**Run the Server:**

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

*Note: The first run will download the \~5GB Model file automatically.*

### Frontend Setup (Client)

Open a new terminal and navigate to the frontend folder:

```bash
cd ../frontend
```

**Install Dependencies:**

```bash
npm install
```

**Configure Environment:**
Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Run the App:**

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to start using n-CiviSense.

-----

##  API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | User registration |
| `POST` | `/chat/stream` | **Main AI Endpoint.** Streams text token-by-token (SSE). |
| `POST` | `/audio/transcribe` | Uploads audio file, returns transcribed text. |
| `DELETE` | `/session/{id}` | Clears conversation history for a user. |

-----

## Deployment Guide (Google Cloud)

For production deployment on **Google Cloud Platform (GCP)**:

1.  **Provision VM:** Use **C4-Standard-4** or **E2-Standard-4** (4 vCPU, 15GB RAM).
2.  **OS:** Select **Ubuntu 22.04 LTS** (Avoid Deep Learning images to save disk space).
3.  **Storage:** 50GB Balanced Persistent Disk.
4.  **Backend:**
      * SSH into VM.
      * Follow "Backend Setup" steps above.
      * Run with `nohup` for background persistence:
        ```bash
        sudo nohup ./venv/bin/uvicorn app:app --host 0.0.0.0 --port 80 > server.log 2>&1 &
        ```
5.  **Frontend:** Deploy via **Vercel** or on the same VM using NGINX as a reverse proxy.

