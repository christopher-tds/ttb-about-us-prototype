// "Style experts weigh in" — the live In The News block from thetiebar.com/wedding (and the home page),
// rebuilt from tb-shopify-hydrogen app/components/Home/InTheNews.tsx and swiper-custom.css (2026-11-17).
// Live: two linked Swipers. Quotes swipe one per view; the press logos act as tabs (30% opacity,
// 100% when active). Here: a native scroll-snap track for the quotes, logos as buttons that scroll to
// their quote, and the active logo follows the quote in view. Never auto-advances (C14).
import { useEffect, useRef, useState } from "react";
import { BusinessInsiderIcon, CnnIcon, EsquireIcon, HiconsumptionIcon } from "../parts/pressLogos.jsx";

// Copy from app/data/home.data.provider.ts (inTheNewsSectionData), shop name filled in.
const NEWS = {
  title: "Style experts weigh in on The Tie Bar",
  slides: [
    { source: "CNN", Logo: CnnIcon, quote: "“The Tie Bar is your one-stop shop for all the best men's finishing touches.”" },
    { source: "Business Insider", Logo: BusinessInsiderIcon, quote: "“The 100% cotton button-ups from The Tie Bar are perfect for a rare night out or a day at the office.”" },
    { source: "Hiconsumption", Logo: HiconsumptionIcon, quote: "“A tie remains an excellent way to finish off a work outfit.”" },
    { source: "Esquire", Logo: EsquireIcon, quote: "“The Best Wedding Outfits to Wear This Summer”" },
  ],
};

export default function InTheNews() {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = track.current;
    const onScroll = () => setActive(Math.round(t.scrollLeft / t.clientWidth));
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, []);

  const show = (i) => {
    const t = track.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: i * t.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setActive(i);
  };

  return (
    <section className="news" aria-label="In the news">
      <div className="news__reveal" data-reveal>
      <h2 className="news__kicker">{NEWS.title}</h2>
      <ul className="news__quotes" ref={track}>
        {NEWS.slides.map((s, i) => (
          <li key={s.source} className="news__slide" aria-label={`${i + 1} / ${NEWS.slides.length}`} aria-hidden={i !== active}>
            <blockquote className="news__quote">
              <p>{s.quote}</p>
              <footer className="sr-only">{s.source}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
      <div className="news__logos" role="group" aria-label="Choose a publication">
        {NEWS.slides.map(({ source, Logo }, i) => (
          <button key={source} type="button" className="news__logo" aria-pressed={i === active} onClick={() => show(i)}>
            <Logo title={source} />
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}
