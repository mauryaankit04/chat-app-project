import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div
      style={{
        height: "100vh",
        paddingTop: "64px",
        display: "flex",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* Main chat panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          margin: "0.75rem",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-color)",
          background: "var(--glass-bg)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          boxShadow: "var(--glass-shadow)",
          overflow: "hidden",
        }}
      >
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
