import { useCallback, useEffect, useRef, useState } from "react";

// Phosphor Regular icon from public/assets/icons (C16). Shared with SiteHeader.
const icon = (name, size = 24) => <img src={`assets/icons/${name}.svg`} alt="" width={size} height={size} />;
export { icon };

// Carousel matching the live Swiper rows: a fixed number of slides per view, no gap, arrows centered
// vertically over the track's edges, and an arrow hidden when there's nothing further that way
// (live: disabled:hidden). The arrows move one slide; swipe and trackpad scroll natively with snapping.
// Never auto-advances (C14). Live arrows are Material chevrons; the replica uses Phosphor carets (C16).
export function Carousel({ label, perView = 1, className = "", children }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const t = track.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft <= 1, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 1 });
  }, []);

  useEffect(() => {
    const t = track.current;
    update();
    t.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir) => {
    const t = track.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * (t.clientWidth / perView), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label} style={{ "--per-view": perView }}>
      <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label="Previous slide" hidden={edge.start} onClick={() => step(-1)}>
        <span className="glyph" aria-hidden="true" style={{ "--glyph": `url(${new URL("assets/icons/caret-left.svg", document.baseURI)})`, "--size": "24px" }} />
      </button>
      <button type="button" className="carousel__arrow carousel__arrow--next" aria-label="Next slide" hidden={edge.end} onClick={() => step(1)}>
        <span className="glyph" aria-hidden="true" style={{ "--glyph": `url(${new URL("assets/icons/caret-right.svg", document.baseURI)})`, "--size": "24px" }} />
      </button>
      <ul className="carousel__track" ref={track}>
        {children}
      </ul>
    </div>
  );
}
