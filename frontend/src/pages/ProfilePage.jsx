import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Shield, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.875rem 1.25rem",
        background: "var(--bg-input)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-md)",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <Icon size={15} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{label}</span>
      </div>
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "55%",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );

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
      {/* Background orb */}
      <div aria-hidden style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 60%)",
        top: "-20%", right: "-15%", pointerEvents: "none",
      }} />

      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "0 1.25rem",
          position: "relative",
          zIndex: 1,
          animation: "fade-up 0.5s ease both",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>
            My Profile
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Manage your account details
          </p>
        </div>

        {/* Avatar card */}
        <div
          className="glass-card"
          style={{ padding: "2rem", marginBottom: "1rem", textAlign: "center" }}
        >
          <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid var(--accent-primary)",
                boxShadow: "0 0 0 6px var(--accent-glow-soft)",
              }}
            />
            <label
              htmlFor="avatar-upload"
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isUpdatingProfile ? "not-allowed" : "pointer",
                boxShadow: "0 2px 10px var(--accent-glow)",
                opacity: isUpdatingProfile ? 0.6 : 1,
                animation: isUpdatingProfile ? "pulse-glow 1.5s ease-in-out infinite" : "none",
              }}
            >
              <Camera size={14} color="#fff" />
              <input
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
            {authUser.fullName}
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {isUpdatingProfile ? "Uploading…" : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* Info fields */}
        <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.875rem" }}>
            Account Details
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <InfoRow icon={User} label="Full Name" value={authUser.fullName} />
            <InfoRow icon={Mail} label="Email" value={authUser.email} />
          </div>
        </div>

        {/* Account info */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.875rem" }}>
            Account Info
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Member since</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>
                {authUser.createdAt?.split("T")[0]}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Account Status</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.12)",
                  padding: "3px 10px",
                  borderRadius: 99,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Shield size={11} /> Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
