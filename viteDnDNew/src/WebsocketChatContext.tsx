// WebsocketProvider.tsx
import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface WebsocketChatContextType {
  messages: string[];
  sendMessage: (msg: string) => void;
}

export const WebsocketContext = createContext<WebsocketChatContextType>({
  messages: [],
  sendMessage: () => {},
});

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const serverUrl = "ws://dndbarlowproject.duckdns.org:2323/chatws"; // Change this to match your WebSocket server setup
    wsRef.current = new WebSocket(serverUrl);

    wsRef.current.onopen = () => {
      addMessage("Connected to the relay server.");
    };

    wsRef.current.onmessage = (event) => {
      addMessage(`Received: ${event.data}`);
    };

    wsRef.current.onclose = () => {
      addMessage("Disconnected from the server.");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
      addMessage(`You: ${msg}`);
    }
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
