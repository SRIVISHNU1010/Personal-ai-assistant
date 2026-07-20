import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <ChatWindow />

    </div>
  );
}

export default App;