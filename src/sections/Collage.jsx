// Image collage between the intro and "Our Approach" (2026-11-17).
// Photos (2026-11-17): from Figma components "Collage / Image 1–4" (cJWxrGOar5mTGxUzhx4caF, 14383:1307–1310), saved
// at source size. `crop` repeats each photo's placement in its 1440 component as % of the box (left, top, width;
// height follows the photo). The box keeps nearly the same proportions at every width, so the crop holds at 393.
// Recreates the 4-image editorial scroll gallery on openai.com/index/chip-ganassi-racing (measured 2026-11-17):
// - The box is full width (capped at 1440 here) with aspect-ratio 1 / (2.43 → 0.91), interpolated by container
//   width from 375 to 1440. Images bleed past both edges, clipped horizontally.
// - Each layer's left, top, width and height are percentages of the box, interpolated the same way (t below).
// - Layers stack 1 → 4 and drift slightly on scroll at different speeds (their parallax). Off with reduced motion.
import { useEffect, useRef } from "react";

// Placeholder tints (sage, sand, slate, clay) only tell the four frames apart; they aren't brand colors.
// [label, height%, left%, top%, width%] as `start + delta * t`, t = clamp((100cqw - 375px) / 1065px, 0, 1).
// Pixel sizes are the box at 1440 wide (1440 × 1310).
const LAYERS = [
  { n: 1, h: [37.5, 5], l: [-52.5, 36.9], t: [0, 0], w: [114, -65.6], drift: 40, tint: "#b2bda3", at1440: "697 × 557",
    photo: { src: "assets/img/collage-1.jpg", crop: [-6.457, -0.539, 112.92], alt: "Tie maker cutting a paper pattern on a workbench with a knife and a steel ruler" } },
  { n: 2, h: [33.6, 10.8], l: [50, -0.8], t: [15, -4.5], w: [112, -56.6], drift: 72, tint: "#e8d9c0", at1440: "798 × 582",
    photo: { src: "assets/img/collage-2.jpg", crop: [-2.502, -1.375, 104.92], alt: "Knit and textured ties laid across a workbench among scissors, a hammer and sewing tools" } },
  { n: 3, h: [25.4, 15.4], l: [27, 37], t: [71.3, -23.2], w: [94.5, -37.7], drift: 40, tint: "#b9c3cb", at1440: "818 × 535",
    photo: { src: "assets/img/collage-3.jpg", crop: [-0.944, -14.402, 100.99], alt: "Brown suit, white shirt, tie and black loafers packed in a patterned garment bag" } },
  { n: 4, h: [48.3, 13.2], l: [-20.6, 16.4], t: [37.5, 1], w: [93.6, -49], drift: 104, tint: "#d9b8a8", at1440: "642 × 806",
    photo: { src: "assets/img/collage-4.jpg", crop: [-42.296, -50.13, 179.37], alt: "Man in a dark double-breasted suit, sunglasses and black tie standing in a Chicago alley" } },
];
const T = "clamp(0, (100cqw - 375px) / 1065px, 1)";
const v = ([a, d]) => `calc(${a}% + ${d}% * ${T})`;

export default function Collage() {
  const box = useRef(null);

  // Parallax: each layer drifts down with scroll progress through the viewport, at different rates.
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // progress: -1 as the box enters at the bottom, 0 centered, 1 as it leaves at the top
      const range = innerHeight / 2 + r.height / 2;
      const clamp1 = (x) => Math.max(-1, Math.min(1, x));
      const p = clamp1((innerHeight / 2 - (r.top + r.height / 2)) / range);
      // Where the collage sits with the page scrolled to the top. Drift starts from there, so on first view
      // every photo is in its laid-out spot and the space under the intro is exactly --intro-space.
      const p0 = clamp1((innerHeight / 2 - (r.top + scrollY + r.height / 2)) / range);
      const progress = reduce.matches || p0 >= 1 ? 0 : Math.max(0, Math.min(1, (p - p0) / (1 - p0)));
      const rootStyle = getComputedStyle(document.documentElement);
      el.querySelectorAll(".collage__layer").forEach((layer, i) => {
        // Tuner override (temporary): --collage-drift-N on :root, else the default.
        const tuned = parseFloat(rootStyle.getPropertyValue(`--collage-drift-${i + 1}`));
        const drift = Number.isFinite(tuned) ? tuned : LAYERS[i].drift;
        // Max drift per image, tuned 2026-11-18: 40 / 72 / 40 / 104px. Travel is downward only, from 0 at the page's
        // starting scroll position to full drift as the collage leaves the top, so no photo rises into the space
        // under the intro.
        const px = progress * drift;
        layer.style.setProperty("--parallax", `${px.toFixed(2)}px`);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("tb-tune", onScroll); // tuner changed a value
    addEventListener("storage", onScroll); // tuner changed a value in the parent page (device frames)
    return () => {
      removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll);
      removeEventListener("tb-tune", onScroll); removeEventListener("storage", onScroll); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="collage" aria-label="Image collage">
      <div className="collage__box" ref={box}>
        {LAYERS.map((L) => (
          <div key={L.n} className="collage__layer"
            style={{ height: v(L.h), left: v(L.l), top: v(L.t), width: v(L.w), zIndex: L.n, "--tint": L.tint }}>
            {/* Fade-up wrapper: the layer itself carries the parallax transform. Staggered 1 → 4. */}
            <div className="collage__reveal" data-reveal style={{ "--reveal-delay": `${120 + (L.n - 1) * 120}ms` }}>
            {L.photo ? (
              <img className="collage__img" src={L.photo.src} alt={L.photo.alt} loading="lazy"
                style={{ left: `${L.photo.crop[0]}%`, top: `${L.photo.crop[1]}%`, width: `${L.photo.crop[2]}%` }} />
            ) : (
              <div className="collage__placeholder" role="img" aria-label={`Image ${L.n} placeholder`}>
                <span>Image {L.n}</span>
                <span className="collage__size">{L.at1440} at 1440</span>
              </div>
            )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
