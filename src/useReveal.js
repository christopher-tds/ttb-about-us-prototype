import { useEffect } from "react";

// Fade-up reveals (2026-11-17). Elements marked data-reveal start 24px low and transparent, then ease up
// once as they enter the viewport. Anything visible on load reveals right away, staggered by --reveal-delay.
// The hidden start state only applies once <html> has .reveal-ready (set in main.jsx before the first paint),
// so content never stays hidden without JS.
// Reduced motion: everything shows immediately (styles.css), and nothing is observed.
export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-revealed");
        io.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    // Next frame, so the hidden start state paints before anything reveals (the transition needs a "from").
    const raf = requestAnimationFrame(() => document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el)));
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
}
