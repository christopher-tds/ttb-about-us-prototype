// The About Us page in page order. Step 2: the brand team's draft content in the live page's blocks and spacing.
// Class names describe the block so the "replace or rebuild" pass can swap one at a time.
import { ABOUT } from "../content.js";

// Page opener (2026-11-17): first on the page, capped at a readable measure. `revised` swaps in the draft
// revision; the default copy is the brand team's draft.
export function Intro({ revised = false }) {
  return <p className="about__p about__intro" data-reveal>{revised ? ABOUT.introRevised : ABOUT.intro}</p>;
}

// Full-width image (live: the hero carousel's slot, 24px below)
export function FullImage({ image, className = "" }) {
  return <img data-reveal className={`about__image ${className}`.trim()} src={image.src} width={image.width} height={image.height} alt={image.alt} />;
}

export function ApproachHeading() {
  return (
    <div className="about__block">
      <h3 className="about__h3 approach__title" data-reveal>{ABOUT.approach.title}</h3>
    </div>
  );
}

export function Approach({ revised = false }) {
  const { columns } = ABOUT.approach;
  return (
    <>
      {/* Step 3: the three columns become alternating rows. Image left / text right, then flipped,
          from sm-md (800) up; stacked image-then-text below. */}
      <div className="approach-rows">
        {columns.map((c, i) => (
          <div key={c.title} className={`approach-row${i % 2 ? " approach-row--flip" : ""}`}>
            <img className="approach-row__img" data-reveal src={c.src} width="350" height="335" alt={c.alt} loading="lazy" />
            <div className="approach-row__text" data-reveal style={{ "--reveal-delay": "120ms" }}>
              <h4 className="approach-row__title">{c.title}</h4>
              <p className="approach-row__body">{revised ? c.bodyRevised : c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Closing({ revised = false }) {
  return <p className="about__p about__closing" data-reveal>{revised ? ABOUT.closingRevised : ABOUT.closing}</p>;
}

export function Cta() {
  const { label, href } = ABOUT.cta;
  return <a className="btn-primary btn-primary--leaf" data-reveal style={{ "--reveal-delay": "120ms" }} href={href}>{label}</a>;
}

// Contact information, from the live "Contact Information" block on thetiebar.com/contact (2026-11-17),
// without the icons. Type is live's (title Poynter 24/38.4, body 16/24, links underlined in brand-ink).
// Layout (2026-11-17): full-bleed rule; columns flush with the heading on an equal 4-column grid.
const CONTACT = [
  { title: "Email", body: <p>Customer Service:<br /><a className="link" href="mailto:info@thetiebar.com">info@thetiebar.com</a></p> },
  { title: "Phone", body: <p>312-690-2900</p> },
  { title: "Text", body: <p>+1 872-240-5589</p> },
  { title: "Corporate Headquarters", body: <p>Tie Bar Holdings LLC<br />404 S Wells St,<br />Suite 300<br />Chicago, IL 60607</p> },
];

export function ContactInfo() {
  return (
    <section className="contact-band">
    <div className="contact-info">
      <h3 className="contact-info__title" data-reveal>Contact Information</h3>
      <div className="contact-info__cols">
        {CONTACT.map((c) => (
          <div key={c.title} className="contact-info__col" data-reveal style={{ "--reveal-delay": `${CONTACT.indexOf(c) * 80}ms` }}>
            <div className="contact-info__label">{c.title}</div>
            <div className="contact-info__body">{c.body}</div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
