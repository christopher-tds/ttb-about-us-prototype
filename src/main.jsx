import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";

// Fade-up reveals: switch on the hidden start state before the first paint, so content doesn't flash visible
// and then hide. Skipped with reduced motion or without IntersectionObserver (see useReveal.js).
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
