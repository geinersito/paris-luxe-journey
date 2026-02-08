import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config"; // Importar configuración de i18n
import {
  registerServiceWorker,
  unregisterServiceWorkers,
} from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker after the app is mounted (production only)
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

if (isLocalhost) {
  window.addEventListener("load", () => {
    unregisterServiceWorkers().catch(console.warn);
  });
} else if (import.meta.env.PROD) {
  window.addEventListener("load", () => {
    registerServiceWorker().catch(console.error);
  });
}
