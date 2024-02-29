import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { UserContext } from './user-info-provider';

export const WebSocketProvider = createContext<any | null>(null);

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any | null>(null);
  const { accessToken } = useContext(UserContext)
  useEffect(() => {
    if(accessToken) {
      const wsPath = "https://dev-launchpad-api.themeteor.io/notifications"
      const accessToken = localStorage.getItem("access_token")
      const newSocket =  io(wsPath, {
        reconnectionDelayMax: 5000,
        auth: { token: accessToken },
      }) 
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [accessToken]);


  return (
    <WebSocketProvider.Provider value={{socket: socket}}>
      {children}
    </WebSocketProvider.Provider>
  );
};
