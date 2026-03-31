import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* Animated background blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 65%)",
          top: "10%",
          left: "5%",
          animation: "blob-move 10s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 65%)",
          bottom: "10%",
          right: "5%",
          animation: "blob-move 14s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%)",
          top: "55%",
          left: "45%",
          animation: "blob-move 12s ease-in-out infinite 2s",
          pointerEvents: "none",
        }}
      />

      {/* Glass card */}
      <div
        className="liquid-glass"
        style={{
          maxWidth: 400,
          width: "calc(100% - 3rem)",
          padding: "3rem 2.5rem",
          textAlign: "center",
          animation: "fade-up 0.6s ease both",
        }}
      >
        {/* Animated icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "24px",
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            animation: "float 4s ease-in-out infinite",
            boxShadow: "0 8px 32px var(--accent-glow)",
          }}
        >
          <MessageSquare size={36} color="#fff" />
        </div>

        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary), #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.2,
          }}
        >
          Start a Conversation
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
          }}
        >
          Select a contact from the sidebar to begin chatting. Your conversations are
          end-to-end beautiful. ✨
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <Sparkles size={13} style={{ color: "var(--accent-tertiary)" }} />
            <span>Real-time messaging powered by ChatGrid</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
