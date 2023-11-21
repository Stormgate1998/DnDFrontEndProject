import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap";
import "./custom.scss";
import { AuthProvider } from "react-oidc-context";
import { App } from "./App";

const oidcConfig = {
  authority: "https://barlowtestkeycloak.duckdns.org:2320/realms/DND",
  client_id: "dnduser",
  redirect_uri: "https://dndbarlowproject.duckdns.org:2001/",
  scope: "openid profile",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
