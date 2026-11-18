import { useEffect, useState } from "react";
import { TUNE_KEY, applyTune } from "./config.js";

// TEMPORARY type tuner (adapted from tb-shirting-lp-prototype). Sizes snap to the C4 scale, and each size
// brings its C4 line height. The first stop is the value set in styles.css, marked "set", so Reset returns to it. Mobile = below 1000 (md), Desktop = 1000 and up.
const C4 = { 12: 16, 14: 20, 16: 24, 20: 28, 24: 32, 32: 40, 40: 48, 56: 64 };
const size = (prefix, label, liveSize, liveLh) => {
  const stops = ["live", ...Object.keys(C4).map(Number)];
  return {
    id: prefix, label, value: "live", stops,
    show: (x) => (x === "live" ? `${liveSize}/${liveLh} set` : `${x}/${C4[x]}`),
    vars: (x) => (x === "live"
      ? { [`${prefix.replace("*", "size")}`]: liveSize + "px", [`${prefix.replace("*", "lh")}`]: liveLh + "px" }
      : { [`${prefix.replace("*", "size")}`]: x + "px", [`${prefix.replace("*", "lh")}`]: C4[x] + "px" }),
  };
};

// Text width cap (max-width), in rem (16px root). The last stop is the full 1132 container (70.75rem).
// Phones are narrower than every stop, so this only shows from about 600 up.
const width = (v, label, value) => ({
  id: v, label, value,
  stops: [30, 35, 40, 45, 50, 55, 60, 65, 70.75],
  show: (x) => (x === 70.75 ? "full" : `${x}rem`),
  vars: (x) => ({ [v]: x + "rem" }),
});

// Collage parallax: the most each image moves (px) as the collage scrolls through the viewport.
const drift = (n, value) => ({
  id: `--collage-drift-${n}`, label: `Image ${n}`, value,
  stops: [0, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120],
  show: (x) => `${x}px`,
  vars: (x) => ({ [`--collage-drift-${n}`]: String(x) }),
});

// Space above (from the header) and below (to the collage) the intro, kept equal. Base-4 steps.
const space = (v, label, value) => ({
  id: v, label, value,
  stops: [32, 40, 48, 56, 64, 72, 80, 96, 112, 120, 128, 144, 160],
  show: (x) => `${x}px`,
  vars: (x) => ({ [v]: x + "px" }),
});

const GROUPS = [
  { name: "Collage parallax (max drift, downward)", rows: [drift(1, 24), drift(2, 48), drift(3, 80), drift(4, 40)] },
];
const ROWS = GROUPS.flatMap((g) => g.rows);
const DEFAULTS = Object.fromEntries(ROWS.map((r) => [r.id, r.value]));
const STATE_KEY = TUNE_KEY + "-state";
const OPEN_KEY = TUNE_KEY + "-open";

function load() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STATE_KEY) || "null"); } catch (e) { /* storage blocked */ }
  const v = { ...DEFAULTS, ...(saved || {}) };
  for (const r of ROWS) if (!r.stops.includes(v[r.id])) v[r.id] = r.value;
  return v;
}

export default function Tuner() {
  const [values, setValues] = useState(load);
  const [open, setOpen] = useState(() => { try { return localStorage.getItem(OPEN_KEY) === "1"; } catch (e) { return false; } });
  const [copied, setCopied] = useState(false);

  // Write only changed controls, so Reset leaves the CSS defaults in charge.
  useEffect(() => {
    const vars = {};
    for (const r of ROWS) if (values[r.id] !== r.value) Object.assign(vars, r.vars(values[r.id]));
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(Object.fromEntries(Object.entries(values).filter(([k, x]) => x !== DEFAULTS[k]))));
      localStorage.setItem(TUNE_KEY, JSON.stringify(vars));
    } catch (e) { /* storage blocked */ }
    applyTune();
    document.querySelector(".vp-stage iframe")?.contentWindow?.dispatchEvent(new StorageEvent("storage", { key: TUNE_KEY }));
  }, [values]);
  useEffect(() => { try { localStorage.setItem(OPEN_KEY, open ? "1" : "0"); } catch (e) { /* storage blocked */ } }, [open]);

  const copy = () => {
    const lines = GROUPS.flatMap((g) => g.rows.flatMap((r) =>
      Object.entries(r.vars(values[r.id])).map(([k, x]) => `${k}: ${x}; /* ${g.name}, ${r.label} */`)));
    navigator.clipboard?.writeText(lines.join("\n")).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); });
  };

  return (
    <section className="tuner" aria-label="Type tuner (temporary)">
      <button type="button" className="tuner__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Tuner</button>
      <div className="tuner__body" hidden={!open}>
        {GROUPS.map((g) => (
          <div key={g.name}>
            <p className="tuner__group">{g.name}</p>
            {g.rows.map((r) => (
              <label key={r.id} className="tuner__row">
                <span>{r.label}</span>
                <input type="range" min={0} max={r.stops.length - 1} step={1}
                  value={Math.max(0, r.stops.indexOf(values[r.id]))}
                  onChange={(e) => setValues((p) => ({ ...p, [r.id]: r.stops[+e.target.value] }))} />
                <output>{r.show(values[r.id])}</output>
              </label>
            ))}
          </div>
        ))}
        <div className="tuner__actions">
          <button type="button" onClick={() => setValues({ ...DEFAULTS })}>Reset</button>
          <button type="button" onClick={copy}>{copied ? "Copied" : "Copy CSS"}</button>
        </div>
      </div>
    </section>
  );
}
