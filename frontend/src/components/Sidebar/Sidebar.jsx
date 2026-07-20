import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        🤖 <span>Nexus AI</span>
      </div>

      <button className="new-chat">
        + New Chat
      </button>

      <div className="chat-history">
        <div className="chat-item active">💬 Current Chat</div>
        <div className="chat-item">📄 Resume</div>
        <div className="chat-item">🎯 Interview Prep</div>
      </div>

      <div className="sidebar-footer">
        <div className="avatar">V</div>
        <span>Vishnu</span>
      </div>
    </aside>
  );
}

export default Sidebar;