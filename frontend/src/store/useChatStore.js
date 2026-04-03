import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, users } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      const newMsg = res.data;

      const updatedUsers = users.map((user) => {
        if (user._id === selectedUser._id) {
          return {
            ...user,
            lastMessage: {
              text: newMsg.text || "Sent an image",
              sender: newMsg.senderId,
            },
            lastMessageAt: newMsg.createdAt || new Date().toISOString(),
          };
        }
        return user;
      });
      // Sort so the updated conversation goes to the top
      updatedUsers.sort((a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0));

      set({ messages: [...messages, newMsg], users: updatedUsers });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Prevent duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, users } = get();

      // Update messages if we have the chat currently open with the sender
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        set({ messages: [...messages, newMessage] });
      }

      // Update sidebar users list for real-time order and message preview
      const updatedUsers = users.map((user) => {
        // If the message is from the user OR we sent it to the user (though socket normally only receives from others)
        if (user._id === newMessage.senderId) {
          return {
            ...user,
            lastMessage: {
              text: newMessage.text || "Sent an image",
              sender: newMessage.senderId,
            },
            lastMessageAt: newMessage.createdAt || new Date().toISOString(),
          };
        }
        return user;
      });

      // Sort so the updated conversation goes to the top
      updatedUsers.sort((a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0));

      set({ users: updatedUsers });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
