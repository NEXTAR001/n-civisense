FROM python:3.10-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Install system dependencies
# - build-essential: Required to compile llama-cpp-python
# - ffmpeg: Required for OpenAI Whisper
# - git: Often required for checking out specific dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# 1. Install CPU-only PyTorch specifically (Drastically reduces image size)
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# 2. Install remaining requirements
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose the port (matches your uvicorn config)
EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]