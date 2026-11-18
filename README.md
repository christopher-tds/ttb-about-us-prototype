# Tie Bar · About Us refresh prototype

Asana task 1218270042572092. Vite + React. The header and footer are from `tb-shirting-lp-prototype`.

```bash
npm run dev   # port 5199
```

## Steps

| # | Step | Status |
|---|---|---|
| 1 | Replica of thetiebar.com/about-us without the page banner and the "Here's Our Story" timeline | Done 2026-11-17 |
| 2 | The brand team's new images and copy, in their draft's order, inside the live blocks and spacing | Done 2026-11-17 |
| 3 | Replace or rebuild sections to fit the content | In progress: the three columns are now alternating image / text rows with Belizio headers, and the live "Style experts weigh in" block from /wedding is added above the footer (2026-11-17) |
| 4 | Figma, then the Asana comment | Figma done 2026-11-17 (frames "About Us · 1440" 14388:1499 and "About Us · 393" 14390:1393, DS header/footer on the canvas beside them). Asana comment not started |

## Step 1 sources

- **Measurements:** Live page measured 2026-11-17 at 393, 820 and 1440. Every section's offset matches live within 1px at all three widths.
- **Copy, alt text and images:** Copied verbatim from live into `src/content.js`. Images load from the Shopify CDN.
- **Fonts:** Belizio and Poynter load from Tie Bar's own Shopify CDN, the same files thetiebar.com serves. No font files are in the repo.

## Step 2 sources

- **Layout and copy:** the brand team's draft, Figma cJWxrGOar5mTGxUzhx4caF, "About Page - Nov 2026" (node 14379:1306).
- **Images:** the brand team's Drive folder, saved to `public/assets/img/` at their exported sizes (1100 × 601, 350 × 335, 1100 × 500).
- **Alt text:** Written new for each image, since the draft has none (C13).

## Step 2 open items

- The three column images are 350px wide. That's soft on retina screens and on phones, where the column is 353px wide. Ask for 2x exports.
- The CTA reads "Explore the collection", in leaf-dark. C6 bans "Explore", and the CTA question is still open.
- Drive also has AboutUs_CXV1 (Oct 9). The draft uses CollectionRackV2.
- Spacing is still live's: 16 + 28px between the heading and the columns, and 24px under each full-width image.

## Collage (image placeholders)

- **Placement:** Four placeholder frames between the intro and "Our Approach", recreating the editorial scroll gallery on openai.com/index/chip-ganassi-racing.
- **Geometry:** The same formulas as the reference, interpolated from 375 to 1440. It matches the reference to the pixel at 1440 and 393, and includes a light parallax that's off with reduced motion. The code is in `src/sections/Collage.jsx`.
- **Figma:** cJWxrGOar5mTGxUzhx4caF, page "About Page - Nov 2026", section "About Us · Collage (image placeholders)" (14381:1306). Components "Collage / Image 1–4" (14383:1307–1310) hold the photos; the 1440 and 393 collages are instances, so each photo is placed once.
- **Photos (2026-11-17):** Pulled from those components at source size into `public/assets/img/collage-1…4.jpg` (1613 × 1152 landscape, 1152 × 1613 portrait). Each keeps its Figma crop from the 1440 component, and the alt text is new.
- **Parallax:** Downward only, from where the collage sits on load. Max drift per image is 56 / 80 / 120 / 96px (tuned 2026-11-17), so the lowest photo clears "Our Approach" by at least 27px at 1440 and 35px at 393.

## Fade-up reveals

- **What:** The intro, collage photos, "Our Approach", each row's image and text, the ties photo, closing paragraph, CTA, contact block and press band fade up 24px over 700ms as they enter the viewport. Siblings are staggered (collage 120ms apart, row text 120ms after its image, contact columns 80ms apart).
- **How:** `src/useReveal.js` (IntersectionObserver, reveals once), with the start state set in `main.jsx` before the first paint so nothing flashes.
- **Reduced motion:** Off. Content shows immediately (C14).

## Contact information

- **Source:** The "Contact Information" block from thetiebar.com/contact (2026-11-17), with the icons removed: Email, Phone, Text and Corporate Headquarters. It sits under the CTA, above the press quotes.
- **Layout:** Live type. A full-bleed 1px gray-30 rule sits above it, and the rule-to-heading gap matches the last-line-to-press-band gap (68px). The columns sit flush with the heading on an equal grid with 24px gutters: one column, two from 600, four from 1000.

## In the news block

- **Source:** Rebuilt from tb-shopify-hydrogen `InTheNews.tsx` and `swiper-custom.css`. The quotes come from `home.data.provider.ts`, and the logos are copied from `components/Icons`.
- **Fidelity:** Matches live /wedding to the pixel at 393, 820 and 1440.
- **Live traits kept as they are:** The kicker is uppercase coral-dark (breaks C2; see TB-O1). The logo tabs are 30px tall, under the 48px mobile hit area (C10).

## Step 1: live issues that were mirrored (since replaced by step 2 content)

- The intro paragraph opens with the banner subtitle and has no period after it.
- A stray `\` renders under "Still got a burning question for us?".
- The email and phone icons never load, so they render 0px tall but keep their 32px of margin.
- Copy: "number #1 priority", "compliment" (should be "complement"), and "Tie Bar" vs "The Tie Bar".
- Alt text is weak ("Image for bow-tie", "Image which show office interior").
- The CTA is `btn--primary` in slate #253236, which isn't a TB-5 token. Title case.
- Carousel arrows use Phosphor carets (C16) instead of the live Material chevrons.

## Figma (2026-11-17)

- **Where:** File cJWxrGOar5mTGxUzhx4caF, page "About Page - Nov 2026", to the right of the collage section.
- **Frames:** "About Us · 1440" (14388:1499) and "About Us · 393" (14390:1393). Sections are named 01–08 in page order (C9).
- **Fonts:** Placeholders (Roboto Slab, Roboto, Roboto Condensed), bound to the local collection "About Us / Font (swap)". Alias those to the DS `font/family/*` variables in Figma desktop to swap in Belizio and Poynter.
- **DS instances:** The DS Navigation is inside the 1440 frame. The mobile Navigation and both Footers sit on the canvas directly above or below their frames, because their brand fonts can't be nested through the API.
- **Colors:** Bound to TTB DS variables (gray-80, gray-30, leaf-dark, coral-dark). brand-ink (#1E1E1E) and the press band (#FAF7F3) are hex values, since no matching DS variable was found.

## Hosting

- **Repo:** Public, christopher-tds/ttb-about-us-prototype, live at https://christopher-tds.github.io/ttb-about-us-prototype/. A GitHub Action (`.github/workflows/pages.yml`) builds and deploys on every push to `main`.
- **Fonts:** The hosted site loads Belizio and Poynter from Tie Bar's Shopify CDN. The URLs change with storefront deploys; if they stop resolving, text falls back to Roboto until the URLs in `src/styles.css` are updated.

## Build

- `npm run build` writes `dist/`, a static React build with relative paths.
