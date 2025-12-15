// store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const formData = new FormData();
      
      // Handle different types of data
      if (data.profilePic && data.profilePic.startsWith('data:image')) {
        // Convert base64 to blob if it's a base64 image
        const response = await fetch(data.profilePic);
        const blob = await response.blob();
        formData.append('profilePic', blob, 'profile.jpg');
      } else if (data.profilePic instanceof File) {
        // If it's already a File object
        formData.append('profilePic', data.profilePic);
      }
      
      // Append other fields if present
      if (data.fullName) formData.append('fullName', data.fullName);
      if (data.email) formData.append('email', data.email);
      
      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  
  // Add these socket methods if not present
  connectSocket: () => {
    // Your socket connection logic
  },
  
  disconnectSocket: () => {
    // Your socket disconnection logic
  }
}));