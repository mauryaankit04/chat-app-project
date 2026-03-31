import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

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

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
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
        <div aria-hidden style={{
          position: "absolute", width: 550, height: 550, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)",
          bottom: "-15%", left: "-15%", pointerEvents: "none",
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
              Create account
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Join ChatGrid — it's free forever
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <InputField
                icon={User}
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

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
                placeholder="Min. 6 characters"
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
              disabled={isSigningUp}
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.8rem" }}
            >
              {isSigningUp ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <Loader2 size={17} className="animate-spin" /> Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent-primary)", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT: Pattern */}
      <div className="auth-pattern-panel">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
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

export default SignUpPage;
