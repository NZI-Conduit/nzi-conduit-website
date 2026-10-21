import { hydrateRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { preloadRouteChunk } from "./lib/routes.js";
import "./styles/index.css";

function getInitialRouteKey() {
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page");
  const key = pathname || pageParam || "home";
  const valid = ["home", "services", "pricing", "cybersecurity", "seo", "webdev", "about"];
  if (valid.includes(key)) return key;
  return pathname ? "404" : "home";
}

async function boot() {
  const initialKey = getInitialRouteKey();

  // Resolve current route chunk before rendering so lazy components never suspend on boot
  if (initialKey !== "home") {
    try {
      await preloadRouteChunk(initialKey);
    } catch (e) {
      console.error("Route chunk preload error:", e);
    }
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  hydrateRoot(rootElement, <App />, {
    onRecoverableError(error, errorInfo) {
      console.error("HYDRATION ERROR:", error?.message || error, errorInfo?.componentStack);
    },
  });
}

boot();