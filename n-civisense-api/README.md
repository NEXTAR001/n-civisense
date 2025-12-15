
# 🚀 FastAPI Project — Installation Guide

Follow the steps below to set up and run this FastAPI project locally.

---

## 🔧 **Prerequisites**
- Python 3.10+
- Git

---

## 🛠️ **Installation**

### 1️⃣ Clone the repository
```bash
git clone https://github.com/fredrickray/n-civisense-api.git
cd n-civisense-api
````

### 2️⃣ Create and activate a virtual environment

#### macOS / Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

#### Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your configuration values.

### 5️⃣ Run database migrations (if applicable)

```bash
alembic upgrade head
```

### 6️⃣ Start the development server

```bash
uvicorn app.main:app --reload
```

Server will be available at:

```
http://127.0.0.1:8000
```

