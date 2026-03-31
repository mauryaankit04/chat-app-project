import { X, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div
      style={{
        padding: "0.875rem 1.25rem",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/* User info */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{ position: "relative" }}>
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--border-accent)",
            }}
          />
          {isOnline && (
            <span
              style={{
                position: "absolute",
                bottom: 1,
                right: 1,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--online-color)",
                border: "2px solid var(--bg-primary)",
              }}
            />
          )}
        </div>
        <div>
          <h3
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            {selectedUser.fullName}
          </h3>
          <p
            style={{
              fontSize: "0.75rem",
              color: isOnline ? "var(--online-color)" : "var(--text-muted)",
              marginTop: 2,
            }}
          >
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <button className="btn-icon" title="Voice call" style={{ display: "none" }} id="voice-call-btn">
          <Phone size={16} />
        </button>
        <button className="btn-icon" title="Video call" style={{ display: "none" }} id="video-call-btn">
          <Video size={16} />
        </button>
        <button className="btn-icon" title="Close" onClick={() => setSelectedUser(null)}>
          <X size={16} />
        </button>
      </div>

      <style>{`
        @media (min-width: 640px) {
          #voice-call-btn, #video-call-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default ChatHeader;
