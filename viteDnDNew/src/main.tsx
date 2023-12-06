import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap";
import "./custom.scss";
import { AuthProvider } from "react-oidc-context";
import { App } from "./App";
import { DarkModeProvider } from "./DarkModeContext";
import { WebsocketProvider } from "./WebsocketChatContext";

const oidcConfig = {
  authority: "https://barlowtestkeycloak.duckdns.org:2320/realms/DND",
  client_id: "dnduser",
  redirect_uri: window.location.href,
  scope: "openid profile",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <WebsocketProvider>
      <DarkModeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </DarkModeProvider>
    </WebsocketProvider>
  </AuthProvider>
);
