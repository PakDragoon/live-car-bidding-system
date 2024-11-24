import React, { createContext, useEffect, useRef } from 'react';

export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080'); // Replace with your backend WebSocket server URL

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current.close(); // Clean up on component unmount
    };
  }, []);

  const sendMessage = (message) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ ws: ws.current, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
