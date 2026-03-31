import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { getUsers(); }, [getUsers]);

  const filtered = users
    .filter((u) => showOnlineOnly ? onlineUsers.includes(u._id) : true)
    .filter((u) => u.fullName.toLowerCase().includes(search.toLowerCase()));

  const onlineCount = onlineUsers.length - 1;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      style={{
        height: "100%",
        width: "72px",
        flexShrink: 0,
        background: "var(--bg-sidebar)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
      className="sidebar-aside"
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem 0.75rem 0.75rem",
          borderBottom: "1px solid var(--border-color)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              background: "var(--accent-glow-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Users size={15} style={{ color: "var(--accent-primary)" }} />
          </div>
          <span
            className="sidebar-label"
            style={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "var(--text-primary)",
              display: "none",
            }}
          >
            Contacts
          </span>
          <span
            className="sidebar-label"
            style={{
              marginLeft: "auto",
              fontSize: "0.72rem",
              background: "var(--accent-glow-soft)",
              color: "var(--accent-primary)",
              padding: "2px 7px",
              borderRadius: 99,
              fontWeight: 600,
              display: "none",
            }}
          >
            {onlineCount} online
          </span>
        </div>

        {/* Search */}
        <div
          className="sidebar-label"
          style={{ position: "relative", display: "none" }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            className="input-glass"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: "2rem",
              fontSize: "0.82rem",
              height: 36,
              borderRadius: "var(--radius-full)",
            }}
          />
        </div>

        {/* Online filter */}
        <label
          className="sidebar-label"
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => setShowOnlineOnly((v) => !v)}
            style={{
              width: 32,
              height: 18,
              borderRadius: 99,
              background: showOnlineOnly
                ? "var(--accent-primary)"
                : "var(--border-color-hover)",
              position: "relative",
              transition: "var(--transition)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#fff",
                top: 2,
                left: showOnlineOnly ? 16 : 2,
                transition: "var(--transition)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Online only
          </span>
        </label>
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
        {filtered.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: isSelected ? "var(--bg-active)" : "transparent",
                border: "none",
                borderLeft: isSelected
                  ? "3px solid var(--accent-primary)"
                  : "3px solid transparent",
                cursor: "pointer",
                transition: "var(--transition)",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: isSelected
                      ? "2px solid var(--accent-primary)"
                      : "2px solid var(--border-color)",
                    transition: "var(--transition)",
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

              {/* Info */}
              <div
                className="sidebar-label"
                style={{ minWidth: 0, display: "none", flex: 1 }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.fullName}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: isOnline ? "var(--online-color)" : "var(--text-muted)",
                    marginTop: 1,
                  }}
                >
                  {isOnline ? "● Online" : "○ Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              padding: "2rem 1rem",
              fontSize: "0.8rem",
            }}
            className="sidebar-label"
          >
            No users found
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .sidebar-aside { width: 280px !important; }
          .sidebar-label { display: flex !important; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
