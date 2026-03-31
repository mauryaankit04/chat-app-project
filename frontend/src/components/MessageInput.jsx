import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, Smile, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div
      style={{
        padding: "0.875rem 1.25rem",
        borderTop: "1px solid var(--border-color)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        flexShrink: 0,
      }}
    >
      {/* Image preview */}
      {imagePreview && (
        <div
          style={{
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 72,
                height: 72,
                objectFit: "cover",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
              }}
            />
            <button
              onClick={removeImage}
              type="button"
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "var(--danger)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--bg-input)",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--border-color)",
          padding: "0.4rem 0.5rem 0.4rem 1rem",
          transition: "var(--transition)",
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-primary)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow-soft)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Emoji button (visual only) */}
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            flexShrink: 0,
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <Smile size={19} />
        </button>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            fontFamily: "Inter, sans-serif",
          }}
        />

        {/* File input (hidden) */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {/* Attach image button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            background: "none",
            border: "none",
            color: imagePreview ? "var(--accent-primary)" : "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            flexShrink: 0,
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = imagePreview ? "var(--accent-primary)" : "var(--text-muted)"; }}
        >
          <Image size={19} />
        </button>

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: canSend
              ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
              : "var(--bg-hover)",
            border: "none",
            color: canSend ? "#fff" : "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: canSend ? "pointer" : "not-allowed",
            transition: "var(--transition)",
            flexShrink: 0,
            boxShadow: canSend ? "0 4px 16px var(--accent-glow)" : "none",
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
