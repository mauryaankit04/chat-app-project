import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const InputField = ({ icon: Icon, type, placeholder, value, onChange, rightEl }) => (
  <div style={{ position: "relative" }}>
    <Icon
      size={16}
      style={{
        position: "absolute",
        left: "0.9rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none",
      }}
    />
    <input
      type={type}
      className="input-glass"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ paddingLeft: "2.4rem", paddingRight: rightEl ? "2.8rem" : "1rem" }}
      required
    />
    {rightEl}
  </div>
);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop:"20px",
        display: "grid",
        gridTemplateColumns: "1fr",
        background: "var(--bg-primary)",
      }}
      className="auth-layout"
    >
      {/* LEFT: Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background orb */}
        <div aria-hidden style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)",
          top: "-20%", right: "-20%", pointerEvents: "none",
        }} />

        <div
          className="liquid-glass"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "2.5rem 2rem",
            position: "relative",
            zIndex: 1,
            animation: "fade-up 0.5s ease both",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "18px",
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                boxShadow: "0 8px 24px var(--accent-glow)",
              }}
            >
              <MessageSquare size={26} color="#fff" />
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Sign in to continue to ChatGrid
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Email
              </label>
              <InputField
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Password
              </label>
              <InputField
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "0.9rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isLoggingIn}
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.8rem" }}
            >
              {isLoggingIn ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <Loader2 size={17} className="animate-spin" /> Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "var(--accent-primary)", fontWeight: 600, textDecoration: "none" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT: Pattern (hidden on mobile) */}
      <div className="auth-pattern-panel">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .auth-layout { grid-template-columns: 1fr 1fr !important; }
          .auth-pattern-panel { display: block !important; }
        }
        .auth-pattern-panel { display: none; }
      `}</style>
    </div>
  );
};

export default LoginPage;
