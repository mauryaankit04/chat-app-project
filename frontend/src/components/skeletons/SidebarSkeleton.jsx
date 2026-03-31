const SidebarSkeleton = () => {
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
      }}
      className="sidebar-aside"
    >
      {/* Header skeleton */}
      <div style={{ padding: "1rem 0.75rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0 }} />
          <div className="skeleton sidebar-label" style={{ height: 14, width: 80, display: "none" }} />
        </div>
        <div className="skeleton sidebar-label" style={{ height: 36, borderRadius: 99, display: "none" }} />
      </div>

      {/* Contact skeletons */}
      <div style={{ flex: 1, padding: "0.5rem 0", display: "flex", flexDirection: "column", gap: 0 }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.6rem 0.75rem",
              opacity: 1 - i * 0.1,
            }}
          >
            <div
              className="skeleton"
              style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0 }}
            />
            <div className="sidebar-label" style={{ flex: 1, display: "none", flexDirection: "column", gap: 6 }}>
              <div className="skeleton" style={{ height: 12, width: "70%" }} />
              <div className="skeleton" style={{ height: 10, width: "45%" }} />
            </div>
          </div>
        ))}
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

export default SidebarSkeleton;
