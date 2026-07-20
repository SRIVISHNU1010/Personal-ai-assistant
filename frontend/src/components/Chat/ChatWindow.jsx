import "./ChatWindow.css";
import { useState } from "react";

import Message from "../Message/Message";
import ChatInput from "../Input/ChatInput";

function ChatWindow() {

  const [messages, setMessages] = useState([
    {
      text: "👋 Hello Vishnu! I'm your Personal AI Assistant.",
      sender: "bot"
    }
  ]);

  const handleSend = (text) => {

    const newMessage = {
      text,
      sender: "user"
    };

    setMessages([...messages, newMessage]);

  };

  return (
    <div className="chat-window">

      <div className="messages">

        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            sender={msg.sender}
          />
        ))}

      </div>

      <ChatInput onSend={handleSend} />

    </div>
  );
}

export default ChatWindow;