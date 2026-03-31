import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <ChatHeader />

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {messages.map((message, i) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              style={{
                display: "flex",
                flexDirection: isSent ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "0.5rem",
              }}
            >
              {/* Avatar */}
              <img
                src={
                  isSent
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt=""
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  border: "1px solid var(--border-color)",
                }}
              />

              {/* Bubble */}
              <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", alignItems: isSent ? "flex-end" : "flex-start", gap: 4 }}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      marginBottom: 4,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }}
                  />
                )}
                {message.text && (
                  <div className={isSent ? "bubble-sent" : "bubble-received"}>
                    {message.text}
                  </div>
                )}
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    padding: "0 0.3rem",
                  }}
                >
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              gap: "0.4rem",
            }}
          >
            No messages yet — say hello! 👋
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
