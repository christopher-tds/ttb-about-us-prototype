// Step 2 (2026-11-17): the brand team's new copy and images, laid out as in their draft
// (Figma cJWxrGOar5mTGxUzhx4caF, "About Page - Nov 2026", node 14379:1306).
// Images come from his Drive folder (AboutUs_*_Oct26_*.jpg) and are saved at the size he exported.
// Alt text is new (C13); his draft has none. The step 1 replica copy is listed in README.md.

export const ABOUT = {
  // Revision drafted 2026-11-17 for review (TB copy voice: decision-first, "you", no brand "we", no serial comma).
  // Facts from live: born in a Naperville garage in 2004 (old timeline); "dress better without spending a fortune"
  // and in-house design (old "Why The Tie Bar"); Chicago headquarters (/contact). "Designed in Chicago" needs confirming.
  introRevised: "The Tie Bar started in a Naperville garage in 2004 with one belief: well-made ties shouldn't cost a fortune. That belief now runs through your dress shirts, suits and accessories, all designed in\u00a0Chicago.",
  intro: "Born in Chicago. We are inspired by the grit, creativity, and energy of our beloved hometown. We celebrate the spirit of the city: resilient, diverse, and always moving forward. Our mission is to make premium menswear accessible to everyone. Since 2004, we've been crafting high-quality ties, dress shirts, suits, and accessories that combine classic style with modern\u00a0sophistication.",

  // AboutUs_ChicagoStory_Oct26_1100x600 (1100 × 601). Replaces the five-image store carousel.
  story: { src: "assets/img/chicago-story.jpg", width: 1100, height: 601, alt: "Man in a dark double-breasted suit, white shirt and black tie standing in a Chicago alley" },

  // Row revisions (bodyRevised) drafted 2026-11-17 in the intro revision's voice. Facts from the brand team's draft and the
  // old live page: in-house design, styling advice in stores and by chat (interviews, weddings; confirm chat), selling direct.
  approach: {
    // Live heading was "Why The Tie Bar?" with a lead line; the draft drops the lead line.
    title: "Our Approach To Menswear",
    columns: [
      {
        src: "assets/img/green-sweater.jpg",
        alt: "Close-up of a man in a dark green knit with a white shirt cuff",
        title: "Design Driven",
        bodyRevised: "Every piece is designed in-house, starting with a deliberate choice of color, pattern and texture. Traditional menswear sets the foundation; unexpected combinations make it your own.",
        body: "Each piece we create is designed for those who want to look and feel their best. Our approach balances familiar influences with unexpected combinations of color, pattern, and texture. Rooted in traditional menswear but informed by a contemporary perspective.",
      },
      {
        // Drive also has AboutUs_CXV1_Oct26 (Oct 9); the draft uses this V2.
        src: "assets/img/collection-rack.jpg",
        alt: "Rack of shirts, sweaters and jackets with ties hung above them",
        title: "Customer Experience",
        bodyRevised: "Shopping should feel simple. Ask for styling advice in a store or by chat, whether it's for an interview or a whole wedding party, and get a look that works.",
        body: "Finding the right wardrobe shouldn't feel complicated. We aim to make every step of the experience easier. Whether you're shopping for something specific or discovering something unexpected, we want you to feel confident in every choice.",
      },
      {
        src: "assets/img/yellow-sweater.jpg",
        alt: "Hand lifting a mustard sweater to show a burgundy patterned tie and jeans",
        title: "Handcrafted Quality",
        bodyRevised: "Quality shows in the details: selected materials, careful construction and richly textured silk. The standard was set in a Naperville garage, and every piece still has to meet it.",
        body: "Quality is found in the details. Thoughtfully selected materials, considered construction, and distinctive designs shape our approach to every collection. From richly textured silk ties to tailored essentials, we focus on pieces that look as good together as they do individually.",
      },
    ],
  },

  // AboutUs_ItalianTies_Oct26_1100x500. Replaces "Innovation In Stores" and the store carousel.
  ties: { src: "assets/img/italian-ties.jpg", width: 1100, height: 500, alt: "Patterned silk ties laid out across a woven rug" },

  // Revision drafted 2026-11-17 and approved for the prototype, same voice as introRevised. Facts: the brand team's draft
  // (ties first, everyday to once-in-a-lifetime occasions, intentional design and details).
  closingRevised: "It started with ties. Today it covers everything from your workweek to your wedding day, built on the same idea: intentional design and the right details give you the confidence to dress well.",
  closing: "From our beginnings in ties to our expanding menswear collection, one belief remains constant: great style is the foundation of individuality. We believe in intentional design, personal details, and the confidence that comes from dressing well. From everyday milestones to once-in-a-lifetime celebrations, we strive to make every occasion more memorable.",

  // Draft: leaf-dark button. Link from the brand team's task comment (2026-10-14). Replaces "Find A Store Near You";
  // "Get In Touch" and the contact cards are removed (brand team, 2026-10-26).
  cta: { label: "Explore the collection", href: "https://www.thetiebar.com/c/best-sellers" },
};
