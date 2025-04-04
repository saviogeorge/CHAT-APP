import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001"

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
            //since in axios we have defined it
            //with the base url 
          const res = await axiosInstance.get("/auth/check");

          set({authUser:res.data});
          //if you are authenticated you are 
          //logged in 
          // connect to socket
          get().connectSocket();
        }catch (error) {
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
        //As we sign up we login 
        //and connect to socket
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
        //as soon as you login
        //connect to socket
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
    },

    connectSocket: () => {

      //if user is not authenticated
      //do not connect
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL)
      socket.connect();

      set({socket:socket});
      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });})
    },
    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    },
    
}));