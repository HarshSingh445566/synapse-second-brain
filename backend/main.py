from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import sqlite3

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect("synapse.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS memory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT,
                    type TEXT,
                    content TEXT,
                    url TEXT,
                    page_title TEXT,
                    timestamp TEXT
                 )""")
    conn.commit()
    conn.close()

init_db()

@app.post("/capture")
async def capture(request: Request):
    data = await request.json()
    data["timestamp"] = data.get("timestamp", datetime.utcnow().isoformat())

    conn = sqlite3.connect("synapse.db")
    c = conn.cursor()
    c.execute("INSERT INTO memory (user_id, type, content, url, page_title, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
              (data.get("user_id"), data.get("type"), data.get("content"), data.get("url"),
               data.get("page_title"), data["timestamp"]))
    conn.commit()
    conn.close()
    return {"status": "success", "data": data}
