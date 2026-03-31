const MessageSkeleton = () => {
  const rows = [
    { sent: false, widths: ["55%", "40%"] },
    { sent: true, widths: ["60%"] },
    { sent: false, widths: ["50%", "35%", "45%"] },
    { sent: true, widths: ["45%", "30%"] },
    { sent: false, widths: ["65%"] },
    { sent: true, widths: ["50%"] },
  ];

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: row.sent ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: "0.5rem",
            opacity: 1 - i * 0.07,
          }}
        >
          {/* Avatar */}
          <div className="skeleton" style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0 }} />

          {/* Bubble lines */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: row.sent ? "flex-end" : "flex-start",
            }}
          >
            {row.widths.map((w, j) => (
              <div
                key={j}
                className="skeleton"
                style={{
                  height: 38,
                  width: w,
                  minWidth: 100,
                  borderRadius: row.sent
                    ? j === 0 ? "18px 18px 4px 18px" : "18px"
                    : j === 0 ? "18px 18px 18px 4px" : "18px",
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
