import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun, Monitor, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going? 👋", isSent: false },
  { id: 2, content: "Amazing! Just using this beautiful chat app ✨", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "2rem",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background orb */}
      <div aria-hidden style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 60%)",
        bottom: "-15%", left: "-10%", pointerEvents: "none",
      }} />

      <div
        style={{
          maxWidth: 620,
          margin: "0 auto",
          padding: "0 1.25rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Page title */}
        <div style={{ marginBottom: "1.5rem", animation: "fade-up 0.4s ease both" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Settings
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Customize your experience
          </p>
        </div>

        {/* Appearance card */}
        <div
          className="glass-card"
          style={{ padding: "1.5rem", marginBottom: "1rem", animation: "fade-up 0.5s ease 0.1s both" }}
        >
          <h2 style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem" }}>
            Appearance
          </h2>

          {/* Theme cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {[
              { value: "dark", label: "Dark Mode", icon: Moon, desc: "Easy on the eyes" },
              { value: "light", label: "Light Mode", icon: Sun, desc: "Classic and clean" },
            ].map(({ value, label, icon: Icon, desc }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  style={{
                    padding: "1.25rem 1rem",
                    borderRadius: "var(--radius-lg)",
                    border: active
                      ? "2px solid var(--accent-primary)"
                      : "1px solid var(--border-color)",
                    background: active ? "var(--bg-active)" : "var(--bg-input)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "var(--transition)",
                    boxShadow: active ? "0 0 0 4px var(--accent-glow-soft)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--border-color-hover)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--border-color)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Icon
                      size={18}
                      style={{ color: active ? "var(--accent-primary)" : "var(--text-muted)" }}
                    />
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", color: active ? "var(--accent-primary)" : "var(--text-primary)" }}>
                      {label}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "1.6rem" }}>
                    {desc}
                  </p>
                  {active && (
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--accent-primary)",
                        background: "var(--accent-glow-soft)",
                        borderRadius: 99,
                        padding: "2px 8px",
                        marginLeft: "1.6rem",
                        display: "inline-block",
                        width: "fit-content",
                        fontWeight: 600,
                      }}
                    >
                      Active
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Toggle row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 1.25rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {isDark ? (
                <Moon size={16} style={{ color: "var(--accent-primary)" }} />
              ) : (
                <Sun size={16} style={{ color: "#fbbf24" }} />
              )}
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                {isDark ? "Dark" : "Light"} mode active
              </span>
            </div>

            {/* Toggle switch */}
            <div
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{
                width: 48,
                height: 26,
                borderRadius: 99,
                background: isDark ? "var(--accent-primary)" : "var(--border-color-hover)",
                position: "relative",
                cursor: "pointer",
                transition: "var(--transition)",
                boxShadow: isDark ? "0 0 0 3px var(--accent-glow-soft)" : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#fff",
                  top: 3,
                  left: isDark ? 25 : 3,
                  transition: "var(--transition)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div
          className="glass-card"
          style={{ padding: "1.5rem", animation: "fade-up 0.5s ease 0.2s both" }}
        >
          <h2 style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
            Preview
          </h2>

          {/* Mock chat preview */}
          <div
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {/* Mock header */}
            <div
              style={{
                padding: "0.75rem 1rem",
                borderBottom: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                background: "var(--glass-bg)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                }}
              >
                J
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>Jane Doe</div>
                <div style={{ fontSize: "0.72rem", color: "var(--online-color)" }}>Active now</div>
              </div>
            </div>

            {/* Mock messages */}
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {PREVIEW_MESSAGES.map((m) => (
                <div key={m.id} style={{ display: "flex", justifyContent: m.isSent ? "flex-end" : "flex-start" }}>
                  <div className={m.isSent ? "bubble-sent" : "bubble-received"} style={{ fontSize: "0.85rem" }}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Mock input */}
            <div
              style={{
                padding: "0.75rem 1rem",
                borderTop: "1px solid var(--border-color)",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                background: "var(--glass-bg)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "0.5rem 0.875rem",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 99,
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                }}
              >
                Type a message…
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px var(--accent-glow)",
                }}
              >
                <Send size={14} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
