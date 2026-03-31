import { create } from "zustand";

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
};

export const useThemeStore = create((set) => {
  const stored = localStorage.getItem("chat-theme") || "dark";
  applyTheme(stored);
  return {
    theme: stored,
    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      applyTheme(theme);
      set({ theme });
    },
  };
});
