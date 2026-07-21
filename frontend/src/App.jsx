import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";
import ResumePage from "./pages/ResumePage";

function App() {
  const [chatKey, setChatKey] = useState(0);
  const [activePage, setActivePage] = useState("chat");

  const handleNewChat = () => {
    setChatKey((previousKey) => previousKey + 1);
    setActivePage("chat");
  };

  return (
    <div className="app">
      <Sidebar
        onNewChat={handleNewChat}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {activePage === "chat" && (
        <ChatWindow key={chatKey} />
      )}

      {activePage === "resume" && (
        <ResumePage />
      )}
    </div>
  );
}

export default App;