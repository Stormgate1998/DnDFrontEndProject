// WebsocketProvider.tsx
import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { queryClient } from "./hooks/characterHooks";

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
  const webSocketServer = useRef<WebSocket | null>(null);

  useEffect(() => {
    const serverUrl = "ws://dndbarlowproject.duckdns.org:2323/chatws";
    webSocketServer.current = new WebSocket(serverUrl);

    webSocketServer.current.onopen = () => {
      console.log("Connection is open");
    };

    webSocketServer.current.onmessage = (event) => {
      const currentParty = localStorage.getItem("currentParty");
      if (currentParty && event.data.split("_")[0] === currentParty) {
        if (event.data.split("_")[1] === "refreshlist99876")
          queryClient.invalidateQueries({ queryKey: ["characters"] });
        else {
          addMessage(`Received: ${event.data.split("_")[1]}`);
        }
      }
    };

    webSocketServer.current.onclose = () => {
      console.log("Closing Connection");
    };

    webSocketServer.current.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    return () => {
      if (webSocketServer.current) {
        webSocketServer.current.close();
      }
    };
  }, []);

  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  const sendMessage = (msg: string) => {
    console.log(msg);
    console.log(webSocketServer.current?.readyState);
    if (webSocketServer.current?.readyState === WebSocket.OPEN) {
      webSocketServer.current.send(msg);
      // addMessage(`You: ${msg}`);
    }
  };

  return (
    <WebsocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
