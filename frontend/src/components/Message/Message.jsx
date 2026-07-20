import "./Message.css";

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="bubble">
        {text}
      </div>
    </div>
  );
}

export default Message;