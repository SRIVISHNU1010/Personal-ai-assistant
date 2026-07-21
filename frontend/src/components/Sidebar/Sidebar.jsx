import "./Sidebar.css";

function Sidebar({ onNewChat }) {
  return (
    <div className="sidebar">
      <div className="logo">
        Personal AI
      </div>

      <button
        className="new-chat"
        onClick={onNewChat}
      >
        + New Chat
      </button>

      <div className="chat-history">
        <div className="chat-item active">
          Current Chat
        </div>

        <div className="chat-item">
          Resume
        </div>

        <div className="chat-item">
          Interview Prep
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