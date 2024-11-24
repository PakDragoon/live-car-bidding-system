import { useEffect } from 'react';

const useWebSocket = (onMessage) => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000'); // Replace with your WebSocket server URL

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    return () => ws.close();
  }, [onMessage]);
};

export default useWebSocket;
