const AuthImagePattern = ({ title, subtitle }) => {
  const bubbles = [
    { text: "Hey! How's it going? 👋", sent: false, delay: "0s" },
    { text: "I'm doing great! Working on something amazing ✨", sent: true, delay: "0.4s" },
    { text: "That sounds awesome! Tell me more 🚀", sent: false, delay: "0.8s" },
    { text: "It's a next-gen chat app 💬", sent: true, delay: "1.2s" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        padding: "2rem",
      }}
    >
      {/* Background blobs */}
      <div aria-hidden style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 60%)",
        top: "-10%", left: "-15%",
        animation: "blob-move 12s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", width: 450, height: 450, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)",
        bottom: "-10%", right: "-10%",
        animation: "blob-move 16s ease-in-out infinite reverse", pointerEvents: "none",
      }} />

      {/* Card */}
      <div
        className="glass-card"
        style={{ maxWidth: 420, width: "100%", padding: "2.5rem 2rem", zIndex: 1 }}
      >
        {/* Chat preview bubbles */}
        <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: b.sent ? "flex-end" : "flex-start",
                animation: `fade-up 0.5s ease ${b.delay} both`,
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "0.65rem 1rem",
                  borderRadius: b.sent ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: b.sent
                    ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
                    : "var(--glass-bg-strong)",
                  border: b.sent ? "none" : "1px solid var(--glass-border)",
                  color: b.sent ? "#fff" : "var(--text-primary)",
                  fontSize: "0.84rem",
                  lineHeight: 1.5,
                  backdropFilter: b.sent ? "none" : "blur(8px)",
                  boxShadow: b.sent ? "0 4px 16px var(--accent-glow)" : "none",
                }}
              >
                {b.text}
              </div>
            </div>
          ))}
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
