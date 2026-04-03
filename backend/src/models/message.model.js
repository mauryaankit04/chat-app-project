import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
    },

    image: {
      type: String, // Cloudinary URL
    },

    messageType: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },

    seen: {
      type: Boolean,
      default: false,
    },

    seenAt: Date,
  },
  { timestamps: true }
);

// 🔥 important for performance
messageSchema.index({ conversationId: 1 });
messageSchema.index({ senderId: 1 });

export default mongoose.model("Message", messageSchema);
