// Review tools (viewport picker). Not part of the design.
// Set to false to hide them. ?clean hides them for screenshots.
export const REVIEW_TOOLS = true;

const params = new URLSearchParams(location.search);
export const inFrame = window.self !== window.top; // inside the Tablet / Mobile frame
export const clean = params.has("clean");
export const showReviewBar = REVIEW_TOOLS && !inFrame && !clean;

// TEMPORARY: tuner for the collage parallax (max drift per image).
// Values are CSS custom properties kept in localStorage; they apply to this page and, through storage events,
// to the device frames.
export const TUNE_KEY = "tb-about-tuner-parallax";
const TUNE_VARS = ["--collage-drift-1", "--collage-drift-2", "--collage-drift-3", "--collage-drift-4"];
export function applyTune() {
  if (!REVIEW_TOOLS) return;
  let t = null;
  try { t = JSON.parse(localStorage.getItem(TUNE_KEY) || "null"); } catch (e) { /* storage blocked */ }
  const root = document.documentElement;
  for (const k of TUNE_VARS) {
    if (t?.[k] !== undefined) root.style.setProperty(k, t[k]); else root.style.removeProperty(k);
  }
  window.dispatchEvent(new Event("tb-tune")); // lets JS-driven effects (collage parallax) re-read values
}
window.addEventListener("storage", (e) => { if (e.key === TUNE_KEY) applyTune(); });
applyTune();
