import "./Sidebar.css";

function Sidebar({
  onNewChat,
  activePage,
  onNavigate,
}) {
  return (
    <div className="sidebar">
      <div className="logo">
        🤖 Dragon.AI
      </div>

      <button
        className="new-chat"
        onClick={onNewChat}
      >
        + New Chat
      </button>

      <div className="chat-history">
        <div
          className={`chat-item ${
            activePage === "chat" ? "active" : ""
          }`}
          onClick={() => onNavigate("chat")}
        >
          💬 Current Chat
        </div>

        <div
          className={`chat-item ${
            activePage === "resume" ? "active" : ""
          }`}
          onClick={() => onNavigate("resume")}
        >
          📄 Resume
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="avatar">
          V
        </div>

        <span>Vishnu</span>
      </div>
    </div>
  );
}

export default Sidebar;