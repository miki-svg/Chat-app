import { create } from "zustand";

// Apply theme on load
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("chat-theme") || "coffee";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

export const useThemeStore = create((set) => ({
  theme: typeof window !== "undefined" ? (localStorage.getItem("chat-theme") || "coffee") : "coffee",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
}));