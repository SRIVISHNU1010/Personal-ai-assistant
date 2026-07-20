import { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setInput("");
  };

  return (
    <div className="composer-wrap">
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Ask something about me..."
          value={input}
          disabled={disabled}
          onChange={(event) => setInput(event.target.value)}
        />

        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !input.trim()}
          aria-label="Send message"
        >
          {"\u2191"}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;