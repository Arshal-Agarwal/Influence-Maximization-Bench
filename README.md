# 📘 **Influence Maximization Bench**

An interactive platform for **running, comparing, and visualizing Influence Maximization (IM) algorithms** on multiple graph types using **FastAPI (backend)** and **React + Cytoscape.js (frontend)**.

This project provides:

* Efficient graph generators (sparse, dense, scale-free, random)
* Classic IM algorithms (Greedy, Greedy (DP), Degree Discount, LT variants)
* IC & LT diffusion models
* Monte Carlo evaluation engine
* Real-time graph visualization with seed highlighting & influence effects
* Clean research-style UI for IM exploration

---

# ✨ Features

### 🧠 **Implemented Algorithms**

#### **Independent Cascade (IC)**

* **Bruteforce** (only for tiny graphs ≤ 25 nodes)
* **Greedy**
* **Greedy (DP)**
* **Heuristic**
* **Degree Discount Heuristic**

#### **Linear Threshold (LT)**

* **Bruteforce**
* **Naive Greedy**
* **Greedy with Storage**
* **Local DAG Approximation**

No CELF or CELF++ are implemented in this version.

---

### 📊 **Graph Types**

| ID | Graph Type |
| -- | ---------- |
| 1  | Sparse     |
| 2  | Dense      |
| 3  | Scale-Free |
| 4  | Random     |

---

# 🔥 Backend Capabilities (FastAPI)

* Graph generation & caching
* Algorithm orchestration
* IC/LT diffusion model simulation
* Monte Carlo spread estimation
* Operation counting and runtime measurement
* Graph → Cytoscape conversion
* Result caching + metadata logging

The backend returns a **Cytoscape-ready graph** including:

* Seed nodes (`isSeed: true`)
* Influenced nodes (`isInfluenced: true`)
* Node degrees
* Edge activation info
* Optional backend layout positions

---

# 🎨 Frontend Capabilities (React)

* Cytoscape.js interactive visualization
* Pulsing animation for influenced nodes
* Green highlight for seed nodes
* Clean, research-grade graph styling
* Metric cards: spread, variance, operations, runtime
* Algorithm comparison view
* General info & computation details pages
* Error states, loading states, smooth transitions

---

# 🚀 Getting Started

## 1️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Start server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## 2️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📡 API Overview

### Run an Influence Maximization experiment

```
POST /api/run
```

### Example:

```bash
curl -X POST http://localhost:8000/api/run \
  -H "Content-Type: application/json" \
  -d '{
        "graph": 1,
        "model": "ic",
        "algorithm": "degree_discount",
        "seedSize": 10,
        "iterations": 500
      }'
```

### Response (simplified):

```json
{
  "run_id": "...",
  "seed_set": [...],
  "spread": 12.84,
  "variance": 1.13,
  "runtime": 0.032,
  "operations": 87849,
  "graph": { "nodes": 1024, "edges": 4096 },
  "elements": { "nodes": [...], "edges": [...] }
}
```

---

# 🤝 Contributing

Pull requests welcome — algorithms, visualizations, docs, and optimizations.

---