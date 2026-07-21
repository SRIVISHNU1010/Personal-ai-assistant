import { useState } from "react";

import "./ChatWindow.css";
import Header from "../Header/Header";
import Message from "../Message/Message";
import ChatInput from "../Input/ChatInput";
import { sendChatMessage } from "../../services/chatService";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      text: "Hello Vishnu! Ask me something about your stored profile.",
      sender: "bot",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const userMessage = {
      text: trimmedText,
      sender: "user",
    };

    // Convert existing chat messages into LLM conversation history
    const history = messages.map((message) => ({
      role: message.sender === "user" ? "user" : "assistant",
      content: message.text,
    }));

    // Show the user's new message immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setIsTyping(true);

    try {
      // Send current message + previous conversation history
      const data = await sendChatMessage(
        trimmedText,
        history
      );

      const botMessage = {
        text: data.reply,
        sender: "bot",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage = {
        text: `Sorry, I couldn't connect to the backend. ${error.message}`,
        sender: "bot",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-window">
      <Header />

      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={`${message.sender}-${index}`}
            text={message.text}
            sender={message.sender}
          />
        ))}

        {isTyping && (
          <Message
            text="Thinking..."
            sender="bot"
          />
        )}
      </div>

      <ChatInput
        onSend={handleSend}
        disabled={isTyping}
      />
    </div>
  );
}

export default ChatWindow;