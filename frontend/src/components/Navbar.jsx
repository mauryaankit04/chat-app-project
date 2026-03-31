import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut, MessageSquare, Moon, Settings, Sun, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        background: "var(--bg-navbar)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        padding: "0 1.5rem",
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px var(--accent-glow)",
              flexShrink: 0,
            }}
          >
            <MessageSquare size={18} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            ChatGrid
          </span>
        </Link>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Theme toggle */}
          <button
            className="btn-icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ transition: "var(--transition)" }}
          >
            {isDark ? (
              <Sun size={17} style={{ color: "#fbbf24" }} />
            ) : (
              <Moon size={17} style={{ color: "var(--accent-primary)" }} />
            )}
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className="btn-icon"
            title="Settings"
            style={{ textDecoration: "none" }}
          >
            <Settings size={17} />
          </Link>

          {/* User dropdown */}
          {authUser && (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.3rem 0.6rem 0.3rem 0.3rem",
                  cursor: "pointer",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color-hover)";
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.background = "var(--bg-hover)";
                }}
              >
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--accent-primary)",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    display: "none",
                    whiteSpace: "nowrap",
                  }}
                  className="nav-username"
                >
                  {authUser.fullName?.split(" ")[0]}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 10px)",
                    width: 200,
                    background: "var(--glass-bg-strong)",
                    backdropFilter: "var(--glass-blur-heavy)",
                    WebkitBackdropFilter: "var(--glass-blur-heavy)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--glass-shadow)",
                    overflow: "hidden",
                    animation: "fade-up 0.2s ease both",
                    zIndex: 200,
                  }}
                >
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {authUser.fullName}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {authUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "0.65rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      background: "transparent",
                      border: "none",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    <User size={15} /> Profile
                  </button>
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "0.65rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      background: "transparent",
                      border: "none",
                      color: "var(--danger)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--danger-soft)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inline responsive style */}
      <style>{`
        @media (min-width: 640px) { .nav-username { display: inline !important; } }
      `}</style>
    </header>
  );
};

export default Navbar;
