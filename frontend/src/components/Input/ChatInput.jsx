import { useState } from "react";

import "./ChatInput.css";

function ChatInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || disabled) {
      return;
    }

    onSend(trimmedInput);
    setInput("");
  };

  return (
    <form
      className="chat-input-container"
      onSubmit={handleSubmit}
    >
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
        ➤
      </button>
    </form>
  );
}

export default ChatInput;