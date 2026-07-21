import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


class ChatRequest(BaseModel):
    message: str


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
    return {"message": "Vishnu AI Backend is running"}


@app.get("/profile")
def get_profile():
    return load_profile()


@app.post("/chat")
def chat(request: ChatRequest):
    profile = load_profile()
    question = request.message.strip().lower()

    if not question:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    greetings = ["hi", "hello", "hey", "how are you", "hii", "hlo"]

    if any(greeting in question for greeting in greetings):
        return {
        "reply": "👋 Welcome to VK's AI Assistant! How can I help you today?"
    }

    if "who am i" in question or "about me" in question:
        return {
            "reply": (
                f"You are {profile['name']}, a {profile['role']} with "
                f"{profile['total_experience']} of total experience and "
                f"{profile['relevant_experience']}."
            )
        }

    if "current company" in question or "where do i work" in question:
        return {
            "reply": f"You currently work at {profile['current_company']}."
        }

    if "current ctc" in question or "current salary" in question:
        return {
            "reply": f"Your current CTC is {profile['current_ctc']}."
        }
    
    if "expected ctc" in question or "expected salary" in question:
        return {
            "reply": f"Your expected CTC is {profile['expected_ctc']}."
        }

    if "location" in question or "where do i live" in question:
        return {
            "reply": f"Your current location is {profile['current_location']}."
        }

    if "skills" in question:
        skills = ", ".join(profile["skills"])
        return {"reply": f"Your listed skills are: {skills}."}

    return {
        "reply": (
            "I could not find that information in your stored profile yet."
        )
    }