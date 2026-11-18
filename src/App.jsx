import { useEffect, useState } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import { ABOUT } from "./content.js";
import { Approach, ApproachHeading, Closing, ContactInfo, Cta, FullImage, Intro } from "./sections/sections.jsx";
import InTheNews from "./sections/InTheNews.jsx";
import Collage from "./sections/Collage.jsx";
import useReveal from "./useReveal.js";
import ViewportSwitcher from "./review/ViewportSwitcher.jsx";
import Tuner from "./review/Tuner.jsx";
import { showReviewBar } from "./review/config.js";

// Step 2: the brand team's new copy and images (Figma "About Page - Nov 2026") in the live page's blocks.
// Step 1 was a replica of thetiebar.com/about-us without the banner and the timeline (see README.md).
const SHOW_STORY = false;

// Review toggle: the original copy or the revision (intro, row bodies, closing paragraph). Kept in localStorage so the device frames follow.
const INTRO_KEY = "tb-about-intro";
const readIntro = () => { try { return localStorage.getItem(INTRO_KEY) || "revised"; } catch (e) { return "revised"; } };

export default function App() {
  const [intro, setIntro] = useState(readIntro);
  useReveal();
  useEffect(() => {
    const onStorage = (e) => { if (e.key === INTRO_KEY) setIntro(readIntro()); };
    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);
  const chooseIntro = (v) => {
    setIntro(v);
    try { localStorage.setItem(INTRO_KEY, v); } catch (e) { /* storage blocked */ }
    document.querySelector(".vp-stage iframe")?.contentWindow?.dispatchEvent(new StorageEvent("storage", { key: INTRO_KEY }));
  };
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <div className="about">
        {/* TEMPORARILY HIDDEN (2026-11-17): the Chicago story photo. Set SHOW_STORY to true to bring it back. */}
        {SHOW_STORY && <FullImage image={ABOUT.story} />}
        <Intro revised={intro === "revised"} />
        </div>
        {/* Full-bleed collage (images bleed off both edges), between the intro and "Our Approach" */}
        <Collage />
        <div className="about about--cont">
        <ApproachHeading />
        <Approach revised={intro === "revised"} />
        <FullImage image={ABOUT.ties} className="about__image--ties" />
        <Closing revised={intro === "revised"} />
        <Cta />
        </div>
        {/* Full-bleed band so the rule spans the viewport */}
        <ContactInfo />
        {/* Full-bleed, so it sits outside the 1180 container */}
        <InTheNews />
      </main>
      <SiteFooter />
      {showReviewBar && (
        <div className="review-bar">
          <div className="vp-panel" role="group" aria-label="Copy version">
            {[["revised", "Copy: revision"], ["original", "Copy: original"]].map(([v, label]) => (
              <button key={v} type="button" aria-pressed={intro === v} onClick={() => chooseIntro(v)}>{label}</button>
            ))}
          </div>
          <ViewportSwitcher />
        </div>
      )}
    </>
  );
}
