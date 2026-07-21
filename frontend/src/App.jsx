import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";

function App() {
  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {
    setChatKey((previousKey) => previousKey + 1);
  };

  return (
    <div className="app">
      <Sidebar onNewChat={handleNewChat} />

      <ChatWindow key={chatKey} />
    </div>
  );
}

export default App;