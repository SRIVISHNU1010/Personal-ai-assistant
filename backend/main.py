import json
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Vishnu AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "https://srivishnu1010.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
PROFILE_FILE = BASE_DIR / "memory" / "profile.json"

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is missing from the .env file.")

client = Groq(api_key=GROQ_API_KEY)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


def load_profile() -> dict:
    try:
        with PROFILE_FILE.open("r", encoding="utf-8") as file:
            return json.load(file)

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=500,
            detail="profile.json was not found."
        ) from exc

    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=500,
            detail="profile.json contains invalid JSON."
        ) from exc


@app.get("/")
def home():
    return {
        "message": "Vishnu AI Backend is running"
    }


@app.get("/profile")
def get_profile():
    return load_profile()


@app.post("/chat")
def chat(request: ChatRequest):
    question = request.message.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    profile = load_profile()

    profile_context = json.dumps(
        profile,
        indent=2,
        ensure_ascii=False
    )

    system_prompt = f"""
You are VK's Personal AI Assistant.

You help Vishnu with personal, professional, technical,
career, and interview-related questions.

Here is Vishnu's stored profile:

{profile_context}

Instructions:

1. When the user asks about Vishnu, use the stored profile.
2. Never invent personal information that is not in the profile.
3. If personal information is missing, say it is not stored yet.
4. You can answer general technical and educational questions using your knowledge.
5. Keep responses clear, friendly, and professional.
6. For greetings, greet the user naturally as VK's AI Assistant.
7. When discussing Vishnu's career, tailor your response to his profile.
"""
    
    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    for item in request.history:
        if item.role in ["user", "assistant"]:
            messages.append(
                {
                    "role": item.role,
                    "content": item.content
                }
            )

    messages.append(
        {
            "role": "user",
            "content": question
        }
    )

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.4,
            max_tokens=700
        )

        reply = completion.choices[0].message.content

        return {
            "reply": reply
        }

    except Exception as exc:
        print("Groq API Error:", exc)

        raise HTTPException(
            status_code=500,
            detail="Unable to generate AI response."
        ) from exc