// Tie Bar About Us refresh prototype. Every value here has a source:
// - Header and footer: the shared React chrome from tb-shirting-lp-prototype (measured on thetiebar.com 2026-11-08).
//   The announcement bar shows the first of the three live messages on 2026-11-17.
// - Breakpoints: tb-shopify-hydrogen/app/styles/config.css (sm 600, sm-md 800, md 1000, lg 1440).

export const BRAND = {
  name: "The Tie Bar",
  storeUrl: "https://www.thetiebar.com",
};

export const HEADER = {
  announcement: { text: "Our Holiday Gift Guide", link: "Shop Now" },
  nav: ["New", "Ties", "Bow Ties", "Dress Shirts", "Polos & Sweaters", "Suits & Jackets", "Accessories", "Wedding"],
  current: null, // About Us isn't a nav item
  secondary: "Support",
};

// Live thetiebar.com footer, copied 2026-11-08. Copy is kept exactly as live (title case included).
export const FOOTER = {
  subscribe: { title: "Subscribe", note: "Sign up and save 10% off your first purchase", placeholder: "Email address" },
  columns: [
    { title: "Help Links", links: ["Contact Us", "FAQ", "Shipping & Delivery", "Returns & Exchanges", "Tie Care"] },
    { title: "Quick Links", links: ["Promotions", "Wholesale", "Custom/Logo Neckties", "Gift Cards", "Tie Size Guide", "Shirt Size Guide", "Jackets Size Guide"] },
    { title: "About The Tie Bar", links: ["About Us", { label: "Careers", external: true }, "Chicago Store"], region: "Canada" },
  ],
  social: ["Facebook", "Instagram", "Pinterest", "YouTube"],
  copyright: "The Tie Bar Copyright © 2026 All Rights Reserved",
  legal: ["Accessibility", { label: "Do Not Sell or Share My Personal Information/Your Privacy Choices", external: true }, "Terms of Use", "Privacy Notice"],
  notice: "The Tie Bar may collect “identifiers”, “characteristics of protected classifications” under California, federal or other applicable law, “Commercial information”, “Internet or other electronic network activity”, and/or “Geolocation data” when you visit this website, and may use such information to draw inferences and for other operational and commercial purposes. For more information, please see our",
};
