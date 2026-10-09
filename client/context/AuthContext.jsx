import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUser = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAuthUser(data.data);
        connectSocket(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const value = {
    backendUrl,
    token,
    authUser,
    onlineUsers,
    socket,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
