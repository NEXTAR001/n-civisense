import os
import json
import time
import asyncio
import torch
import tempfile
from threading import Thread
from contextlib import asynccontextmanager
from typing import Dict, List, Tuple

import redis
import whisper
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
    TextIteratorStreamer,
)
from rapidfuzz import fuzz

# ==================== ENV CONFIG ====================
MODEL_NAME = os.getenv("MODEL_NAME", "NCAIR1/N-ATLaS")
HF_TOKEN = os.getenv("HF_TOKEN")
USE_REMOTE_INFERENCE = os.getenv("USE_REMOTE_INFERENCE", "false").lower() in ("1", "true")
WHISPER_MODEL = os.getenv("WHISPER_MODEL", "base")
MAX_CONCURRENT_GENERATIONS = int(os.getenv("MAX_CONCURRENT_GENERATIONS", "2"))
SESSION_TTL = int(os.getenv("SESSION_TTL", "3600"))

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))

# ==================== APP ====================
app = FastAPI(title="N-ATLaS API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
generation_semaphore = asyncio.Semaphore(MAX_CONCURRENT_GENERATIONS)

# ==================== GLOBAL MODELS ====================
tokenizer = None
model = None
stt_model = None

# ==================== LIFESPAN ====================
@asynccontextmanager
async def lifespan(app: FastAPI):
    global tokenizer, model, stt_model

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_NAME,
        token=HF_TOKEN,
        trust_remote_code=True,
    )

    if USE_REMOTE_INFERENCE:
        raise RuntimeError("Remote inference flag enabled but no client implemented")

    bnb = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_use_double_quant=True,
    )

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        device_map="auto",
        quantization_config=bnb,
        torch_dtype=torch.float16,
        token=HF_TOKEN,
        trust_remote_code=True,
    )

    stt_model = whisper.load_model(WHISPER_MODEL)
    yield

app.router.lifespan_context = lifespan

# ==================== SCHEMA ====================
class ChatRequest(BaseModel):
    text: str
    context: str = "NIMC"
    session_id: str

class ChatResponse(BaseModel):
    success: bool
    response: str
    detected_language: str
    out_of_scope: bool
    matched_keywords: List[str]
    confidence: float
    latency_ms: int

# ==================== SCOPE CONFIG ====================
CATEGORY_KEYWORDS = {
    "NIMC": ["nin", "nimc", "identity"],
    "FIRS": ["tax", "vat", "tin"],
    "FRSC": ["driver", "license", "vehicle", "plate", "car"],
}

OUT_OF_SCOPE = "I can only help with NIMC, FIRS, and FRSC services."

# ==================== HELPERS ====================
def detect_language(_: str) -> str:
    return "English"  # Placeholder


def is_query_in_scope(text: str) -> Tuple[bool, List[str], float]:
    text_lower = text.lower()
    matched = []
    scores = []

    for category, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                matched.append(f"{category}:{kw}")
                scores.append(1.0)

    if matched:
        return True, list(set(matched)), 100.0

    for category, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            score = fuzz.partial_ratio(kw, text_lower) / 100
            if score >= 0.85:
                matched.append(f"{category}:{kw}")
                scores.append(score)

    if matched:
        return True, list(set(matched)), round(max(scores) * 100, 2)

    return False, [], 0.0


def get_session(sid: str) -> List[Dict]:
    data = redis_client.get(sid)
    return json.loads(data) if data else []


def save_session(sid: str, msgs: List[Dict]):
    redis_client.setex(sid, SESSION_TTL, json.dumps(msgs))


def format_chat(msgs: List[Dict], ctx: str) -> str:
    system_prompts = {
        "NIMC": "You are a NIMC government service assistant.",
        "FIRS": "You are a FIRS tax service assistant.",
        "FRSC": "You are a FRSC road safety assistant.",
    }

    text = f"<|system|>{system_prompts.get(ctx, system_prompts['NIMC'])}\n"
    for m in msgs:
        text += f"<|{m['role']}|>{m['content']}\n"
    return text + "<|assistant|>"

# ==================== CHAT ====================
@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    start = time.time()

    if req.context not in CATEGORY_KEYWORDS:
        req.context = "NIMC"

    lang = detect_language(req.text)
    ok, matched, confidence = is_query_in_scope(req.text)

    if not ok:
        return ChatResponse(
            success=True,
            response=OUT_OF_SCOPE,
            detected_language=lang,
            out_of_scope=True,
            matched_keywords=[],
            confidence=0.0,
            latency_ms=int((time.time() - start) * 1000),
        )

    msgs = get_session(req.session_id)
    msgs.append({"role": "user", "content": req.text})

    prompt = format_chat(msgs, req.context)
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    async with generation_semaphore:
        try:
            with torch.no_grad():
                out = model.generate(
                    **inputs,
                    max_new_tokens=128,
                    do_sample=True,
                    temperature=0.7,
                )
        except RuntimeError as e:
            raise HTTPException(status_code=500, detail=str(e))

    decoded = tokenizer.decode(out[0], skip_special_tokens=True)
    response = decoded.split("<|assistant|>")[-1].strip()

    msgs.append({"role": "assistant", "content": response})
    save_session(req.session_id, msgs)

    return ChatResponse(
        success=True,
        response=response,
        detected_language=lang,
        out_of_scope=False,
        matched_keywords=matched,
        confidence=confidence,
        latency_ms=int((time.time() - start) * 1000),
    )

# ==================== STREAMING ====================
@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    async def gen():
        start = time.time()
        yield f"data: {json.dumps({'type': 'meta'})}\n\n"

        ok, matched, confidence = is_query_in_scope(req.text)
        if not ok:
            yield f"data: {json.dumps({'type': 'done', 'response': OUT_OF_SCOPE})}\n\n"
            return

        msgs = get_session(req.session_id)
        msgs.append({"role": "user", "content": req.text})
        prompt = format_chat(msgs, req.context)

        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        streamer = TextIteratorStreamer(
            tokenizer,
            skip_special_tokens=True,
            skip_prompt=True,
        )

        async with generation_semaphore:
            t = Thread(
                target=model.generate,
                kwargs={**inputs, "streamer": streamer, "max_new_tokens": 128},
            )
            t.start()
            full = ""
            for tok in streamer:
                full += tok
                yield f"data: {json.dumps({'type': 'token', 'text': tok})}\n\n"
                await asyncio.sleep(0)

        msgs.append({"role": "assistant", "content": full})
        save_session(req.session_id, msgs)
        yield f"data: {json.dumps({'type': 'done', 'latency_ms': int((time.time()-start)*1000)})}\n\n"

    return StreamingResponse(gen(), media_type="text/event-stream")

# ==================== AUDIO ====================
@app.post("/audio/transcribe")
async def transcribe(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        res = stt_model.transcribe(tmp_path)
        return {"text": res["text"]}
    finally:
        os.unlink(tmp_path)

# ==================== SESSION ====================
@app.delete("/session/{sid}")
async def clear_session(sid: str):
    redis_client.delete(sid)
    return {"success": True}
