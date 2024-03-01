import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <GoogleOAuthProvider clientId="401427703030-n1bmmd93k7ag77sneqgmrujc99429t7l.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);
