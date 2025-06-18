// import { useState, useEffect } from "react";
// import {io} from 'socket.io-client'

// export default function useSocket(user) {
//   const [socket, setSocket] = useState(null);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (!user?.username || !user?.userId) return;

//     // const newSocket = io('http://localhost:4000', {
//     //   withCredentials: true,
//     //   transports: ['websocket'
        
//     //   ]
//     // });
//     try {
//     const newSocket = io('http://localhost:4000', {
//       transports: ['websocket']
//     });
//     newSocket.on("connect_error", (err) => {
//       console.log("Connection error:", err);
//     });
//   } catch (err) {
//     console.error("Socket init error:", err);
//   }

//     setSocket(newSocket);

//     // Register user with both username and userId
//     newSocket.emit("newUser", {
//       username: user.username,
//       userId: user.userId
//     });

//     newSocket.on("getNotification", (notification) => {
//       setNotifications(prev => [notification, ...prev]);
//     });

//     return () => {
//       newSocket.off("getNotification");
//       newSocket.disconnect();
//     };
//   }, [user?.username, user?.userId]);

//   return { socket, notifications, setNotifications };
// }

import { useState, useEffect } from "react";
import { io } from 'socket.io-client';

// Helper function to safely parse localStorage data
const getStoredNotifications = () => {
  try {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse notifications:", error);
    return [];
  }
};

export default function useSocket(user) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState(getStoredNotifications());

  // Update localStorage when notifications change
   useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
   }, [notifications]);

   useEffect(() => {
    if (!user?.username || !user?.userId) return;

    try {
      const newSocket = io('http://localhost:4000', {
        transports: ['websocket']
      });

      newSocket.on("connect_error", (err) => {
        console.log("Connection error:", err);
      });

      // Load initial notifications from server if needed
      newSocket.on("connect", () => {
        newSocket.emit("newUser", {
          username: user.username,
          userId: user.userId
        });
      });
          
       newSocket.on("getNotification", (notification) => {
        setNotifications(prev => {
          const updated = [notification, ...prev];
          return updated;
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("getNotification");
        newSocket.disconnect();
      };
    } catch (err) {
      console.error("Socket init error:", err);
    }
  }, [user?.username, user?.userId]);

  // Optional: Clear notifications manually
  const clearNotifications = () => {
    localStorage.removeItem('notifications');
    setNotifications([]);
  };

  return { socket, notifications, setNotifications, clearNotifications };
}