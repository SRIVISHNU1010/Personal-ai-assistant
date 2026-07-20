import "./Message.css";

function Message({ text, sender }) {
  return (
    <div className={`message-row ${sender}`}>
      <div className="message-inner">
        <div className="message-avatar">
          {sender === "user" ? "V" : "AI"}
        </div>

        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}

export default Message;