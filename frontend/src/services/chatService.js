const API_BASE_URL = "https://vishnu-ai-backend.onrender.com";

export async function sendChatMessage(message, history = []) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Failed to get response from backend"
    );
  }

  return response.json();
}