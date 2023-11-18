import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap";
import "./custom.scss";
import { AuthProvider } from "react-oidc-context";
import { App } from "./App";

const oidcConfig = {
  authority: "https://barlowtestkeycloak.duckdns.org:2320/", // replace with your Keycloak base URL
  client_id: "DND User",
  redirect_uri: "https://dndbarlowproject.duckdns.org:2001/", // replace with your redirect URI
  // ...
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
