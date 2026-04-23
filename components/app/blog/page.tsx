import Head from "next/head";
import React from "react";

// ─── SEO SCHEMAS (JSON-LD Structured Data) ───────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Vitamin D3 and K2 Are Important and Why They Should Be Taken Together",
  description:
    "A science-backed guide covering the individual benefits of Vitamin D3 and K2, the biochemical synergy between them, and why SIPA Nutrition's vegan D3+K2 sachets are India's smartest daily supplement.",
  image: "https://www.sipanutrition.com/hero.jpeg",
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
  author: {
    "@type": "Organization",
    name: "SIPA Nutrition",
    url: "https://www.sipanutrition.com",
  },
  publisher: {
    "@type": "Organization",
    name: "SIPA Nutrition",
    url: "https://www.sipanutrition.com",
    logo: { "@type": "ImageObject", url: "https://www.sipanutrition.com/logo.png" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.sipanutrition.com/blog/vitamin-d3-k2-together",
  },
  keywords: ["Vitamin D3","Vitamin K2","D3 K2 together","vegan supplement","bone health","immunity","MK-7","cholecalciferol","India supplement"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can I take Vitamin D3 without K2?", acceptedAnswer: { "@type": "Answer", text: "You can, but it is not advisable. Vitamin D3 significantly increases calcium absorption. Without K2 to activate the proteins that guide calcium into bones, that calcium can be deposited in arteries and soft tissues. For long-term safety, always pair D3 with K2." } },
    { "@type": "Question", name: "Is vegan Vitamin D3 as effective as regular D3?", acceptedAnswer: { "@type": "Answer", text: "Yes. Vegan D3 sourced from lichen via VitaShine® is chemically identical to D3 from animal sources (lanolin). Your body absorbs and uses both forms identically." } },
    { "@type": "Question", name: "When should I take a D3 + K2 supplement?", acceptedAnswer: { "@type": "Answer", text: "Both D3 and K2 are fat-soluble vitamins. They absorb best when taken with a fat-containing meal. Morning after breakfast — with eggs, nuts, or whole milk — is the optimal time." } },
    { "@type": "Question", name: "Is it safe to take D3 and K2 every day long-term?", acceptedAnswer: { "@type": "Answer", text: "Yes. At a daily maintenance dose of 600 IU of D3 and 55 mcg of K2 (MK-7), daily long-term supplementation is clinically safe and doctor-recommended without a prescription." } },
    { "@type": "Question", name: "How soon will I see results from Vitamin D3 and K2?", acceptedAnswer: { "@type": "Answer", text: "Vitamin D levels typically begin restoring within the first week. Immunity and muscle function improvements are often noticeable after one month. Structural bone benefits are measurable around the three-month mark." } },
    { "@type": "Question", name: "Are SIPA Nutrition's D3 + K2 sachets suitable for vegans?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely. SIPA Nutrition uses VitaShine® D3, sourced from lichen — a 100% plant-based source. There are no animal-derived ingredients of any kind." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sipanutrition.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.sipanutrition.com/blog" },
    { "@type": "ListItem", position: 3, name: "Why Vitamin D3 and K2 Should Be Taken Together", item: "https://www.sipanutrition.com/blog/vitamin-d3-k2-together" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SIPA Nutrition Vitamin D3 + K2 Daily Sachets",
  description: "India's first vegan daily Vitamin D3 + K2 sachet. 600 IU D3 via VitaShine® lichen + 55 mcg K2 MK-7. 100% lab tested. No sugar.",
  brand: { "@type": "Brand", name: "SIPA Nutrition" },
  offers: { "@type": "Offer", price: "599", priceCurrency: "INR", availability: "https://schema.org/PreOrder", url: "https://www.sipanutrition.com/#order" },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface NumberedCard { num: string; tag: string; title: string; body: string; }
interface StatCard { tag: string; big: string; desc: string; }
interface AudienceCard { icon: string; title: string; desc: string; }
interface IngredientCard { num: string; tag: string; name: string; dose: string; rda: string; body: string; }
interface TimelineItem { num: string; when: string; title: string; body: string; }
interface FaqItem { num: string; question: string; answer: string; }
interface Reference { authors: string; title: string; journal: string; doi: string; doiUrl: string; }

// ─── Data ─────────────────────────────────────────────────────────────────────

const k2Cards: NumberedCard[] = [
  { num: "01", tag: "Bone Mineralisation", title: "Activates Osteocalcin", body: "K2 is the trigger that enables osteocalcin to bind absorbed calcium into bone tissue — the crucial final step most people miss." },
  { num: "02", tag: "Arterial Protection", title: "Activates Matrix Gla-Protein", body: "K2 activates MGP to prevent calcium from hardening in artery walls — a key factor in long-term cardiovascular and kidney health." },
  { num: "03", tag: "Cellular Energy", title: "Mitochondrial Support", body: "Emerging research shows K2 supports mitochondrial membrane function, contributing to energy production at the cellular level." },
  { num: "04", tag: "Dental Health", title: "Tooth Mineralisation", body: "The same osteocalcin that mineralises bone also strengthens tooth enamel — making K2 important for long-term dental resilience." },
];

const d3Stats: StatCard[] = [
  { tag: "Statistic", big: "~76%", desc: "of Indians are estimated to be Vitamin D deficient or insufficient" },
  { tag: "Statistic", big: "200+", desc: "tissues and organ types in the body carry Vitamin D receptors" },
  { tag: "Statistic", big: "1,000+", desc: "genes are estimated to be directly regulated by Vitamin D" },
];

const d3Cards: NumberedCard[] = [
  { num: "01", tag: "Bone Health", title: "Calcium Absorption", body: "D3 stimulates intestinal uptake of calcium and phosphorus. Without it, your bones cannot access dietary calcium — no matter how much dairy you consume." },
  { num: "02", tag: "Immunity", title: "Immune Regulation", body: "D3 modulates both innate and adaptive immune responses, helping the body distinguish between genuine threats and healthy tissue." },
  { num: "03", tag: "Muscle Strength", title: "Muscle Function & Fatigue", body: "Low D3 is directly linked to muscle weakness, chronic fatigue, and a higher risk of falls — especially in adults over 40." },
  { num: "04", tag: "Mental Wellness", title: "Mood & Cognitive Function", body: "D3 receptors are found throughout the brain. Deficiency has been associated with low mood, seasonal depression, and accelerated cognitive decline." },
  { num: "05", tag: "Cardiovascular", title: "Heart & Blood Pressure", body: "D3 plays a role in regulating blood pressure and reducing systemic inflammation — both central to long-term cardiovascular health." },
];

const audienceCards: AudienceCard[] = [
  { icon: "🏢", title: "Office Workers", desc: "8–10 hrs indoors = near-zero UVB. Supplementation is essential." },
  { icon: "🌱", title: "Vegans & Vegetarians", desc: "K2 is almost absent in plant-based diets. Non-negotiable to supplement." },
  { icon: "🕐", title: "Adults Over 40", desc: "Skin D3 synthesis and bone density both decline steadily with age." },
  { icon: "🏋️", title: "Athletes", desc: "Heavy training raises demand for bone mineralisation and muscle recovery." },
  { icon: "🤱", title: "Pregnant & Nursing", desc: "Critical for the baby's skeletal structure and immune development." },
  { icon: "🦴", title: "Post-Menopausal Women", desc: "Accelerated bone density loss after menopause makes D3 + K2 essential." },
];

const chooseCards: NumberedCard[] = [
  { num: "01", tag: "Source", title: "Vegan D3 (Lichen-Sourced)", body: "Most D3 is derived from lanolin — a wax from sheep's wool — disqualifying it for vegetarians and vegans. Insist on lichen-sourced D3, biologically identical and 100% plant-based." },
  { num: "02", tag: "K2 Form", title: "MK-7, Not MK-4", body: "MK-4 has a half-life of just a few hours. MK-7 remains active for 24+ hours, making once-daily dosing clinically effective. Always verify the form on the label." },
  { num: "03", tag: "Trust", title: "Third-Party Lab Testing", body: "Supplements are not as tightly regulated as pharmaceuticals. 100% independent lab testing — verifying potency, purity, and safety — is the gold standard." },
  { num: "04", tag: "Dosage", title: "100% RDA — No More, No Less", body: "The optimal daily maintenance dose is 600 IU D3 and 55 mcg K2 MK-7. Clinically safe for long-term use without a prescription." },
];

const ingredientCards: IngredientCard[] = [
  { num: "01 · Active Compound", tag: "Vitamin D3", name: "Cholecalciferol", dose: "600 IU", rda: "100% RDA", body: "Via VitaShine® lichen — the purest plant-based D3 available, bioidentical to sun-derived D3." },
  { num: "02 · Active Compound", tag: "Vitamin K2", name: "Menaquinone MK-7", dose: "55 mcg", rda: "100% RDA", body: "Longest-acting K2 form available — sustains full protein activation for 24+ hours per dose." },
  { num: "03 · Flavouring", tag: "Natural Flavour", name: "Natural Orange", dose: "q.s.", rda: "Natural", body: "No added sugar. No artificial additives. Just a clean, pleasant daily taste." },
  { num: "04 · Base", tag: "Excipients", name: "Carrier Agents", dose: "q.s.", rda: "GRAS", body: "Generally Recognised As Safe by all major global regulatory bodies. Nothing hidden, nothing extra." },
];

const timelineItems: TimelineItem[] = [
  { num: "01", when: "Quantity", title: "One Sachet Per Day", body: "One slim 1g sachet daily — precisely dosed, no measuring, no guesswork." },
  { num: "02", when: "Timing", title: "After Morning Breakfast", body: "Consistent morning use builds the habit and aligns with natural absorption patterns." },
  { num: "03", when: "Absorption", title: "With a Fat-Containing Food", body: "Both D3 and K2 are fat-soluble — pair with eggs, nuts, or whole milk to maximise absorption." },
  { num: "04", when: "Duration", title: "Daily Maintenance — Long Term", body: "Formulated for sustained use. Results build over weeks; the real payoff is month-on-month consistency." },
];

const certLabels = ["ISO 9001 Certified","WHO-GMP Certified","FDA Registered","VitaShine® D3","FSSAI Certified","100% Lab Tested"];

const faqItems: FaqItem[] = [
  { num: "01", question: "Can I take Vitamin D3 without Vitamin K2?", answer: "You can, but it is not advisable. Vitamin D3 increases calcium absorption significantly. Without K2 to activate the proteins that guide calcium into bones, that calcium can accumulate in arteries and soft tissues over time. For long-term bone and cardiovascular safety, always take D3 alongside K2." },
  { num: "02", question: "Is vegan Vitamin D3 as effective as lanolin-sourced D3?", answer: "Yes, completely. Vegan D3 sourced from lichen via VitaShine® is chemically identical to D3 from animal sources. Your body absorbs and uses both forms in precisely the same way. The only difference is the source." },
  { num: "03", question: "When is the best time to take a D3 + K2 supplement?", answer: "Both vitamins are fat-soluble and absorb best when taken with a fat-containing meal. Morning after breakfast — with eggs, nuts, avocado, or whole dairy — is the optimal window for absorption and habit consistency." },
  { num: "04", question: "Is it safe to take D3 + K2 every day long-term?", answer: "Yes. At a daily maintenance dose of 600 IU D3 and 55 mcg K2 MK-7, long-term daily supplementation is clinically safe and widely recommended by doctors without requiring a prescription." },
  { num: "05", question: "How soon will I notice results from Vitamin D3 and K2?", answer: "Vitamin D levels typically begin restoring within the first week. Immunity and muscle function improvements are often felt after about one month. Measurable bone strength improvements typically appear around the three-month mark." },
  { num: "06", question: "Are SIPA Nutrition's sachets suitable for vegans and vegetarians?", answer: "Yes — 100%. SIPA Nutrition uses VitaShine® D3 sourced from lichen, a completely plant-based ingredient. There are no animal-derived ingredients of any kind in the formulation." },
  { num: "07", question: "Does SIPA Nutrition's product contain sugar or artificial additives?", answer: "No. The formula contains no added sugar, no artificial flavours, and no artificial additives — only natural orange flavour and GRAS-certified excipients recognised as safe by all major global regulatory bodies." },
];

const references: Reference[] = [
  { authors: "Holick, M.F. (2007).", title: "Vitamin D Deficiency.", journal: "New England Journal of Medicine, 357(3), 266–281.", doi: "doi:10.1056/NEJMra070553", doiUrl: "https://doi.org/10.1056/NEJMra070553" },
  { authors: "Aparna, P. et al. (2018).", title: "Vitamin D deficiency in India.", journal: "Journal of Family Medicine and Primary Care, 7(2), 324–330.", doi: "doi:10.4103/jfmpc.jfmpc_78_18", doiUrl: "https://doi.org/10.4103/jfmpc.jfmpc_78_18" },
  { authors: "Schurgers, L.J. et al. (2007).", title: "Vitamin K–containing dietary supplements: comparison of synthetic vitamin K1 and natto-derived menaquinone-7.", journal: "Blood, 109(8), 3279–3283.", doi: "doi:10.1182/blood-2006-08-040709", doiUrl: "https://doi.org/10.1182/blood-2006-08-040709" },
  { authors: "Knapen, M.H.J. et al. (2013).", title: "Three-year low-dose menaquinone-7 supplementation helps decrease bone loss in healthy postmenopausal women.", journal: "Osteoporosis International, 24(9), 2499–2507.", doi: "doi:10.1007/s00198-013-2325-6", doiUrl: "https://doi.org/10.1007/s00198-013-2325-6" },
  { authors: "van Ballegooijen, A.J. et al. (2017).", title: "The synergistic interplay between vitamins D and K for bone and cardiovascular health.", journal: "International Journal of Endocrinology, 2017, 7454376.", doi: "doi:10.1155/2017/7454376", doiUrl: "https://doi.org/10.1155/2017/7454376" },
  { authors: "Aranow, C. (2011).", title: "Vitamin D and the immune system.", journal: "Journal of Investigative Medicine, 59(6), 881–886.", doi: "doi:10.2310/JIM.0b013e31821b8755", doiUrl: "https://doi.org/10.2310/JIM.0b013e31821b8755" },
  { authors: "Sato, T. et al. (2012).", title: "Comparison of menaquinone-4 and menaquinone-7 bioavailability in healthy women.", journal: "Nutrition Journal, 11, 93.", doi: "doi:10.1186/1475-2891-11-93", doiUrl: "https://doi.org/10.1186/1475-2891-11-93" },
  { authors: "Cashman, K.D. (2020).", title: "Vitamin D deficiency: Defining, prevalence, causes, and strategies of addressing.", journal: "Calcified Tissue International, 106(1), 14–29.", doi: "doi:10.1007/s00223-019-00559-4", doiUrl: "https://doi.org/10.1007/s00223-019-00559-4" },
];

// ─── Shared Tailwind class strings ───────────────────────────────────────────
const serifFont = { fontFamily: "'Playfair Display', Georgia, serif" } as React.CSSProperties;
const chip = (active = false) =>
  `border rounded-full px-3.5 py-1 text-[0.74rem] font-medium ${active ? "text-orange-700 border-orange-200" : "text-stone-500 border-stone-200"}`;

// ─── Small reusable components ────────────────────────────────────────────────

const SLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`text-[0.67rem] font-semibold tracking-[0.14em] uppercase text-orange-700 ${className}`}>{children}</span>
);

const SectionHeader: React.FC<{ label: string; title: React.ReactNode }> = ({ label, title }) => (
  <div className="mb-8">
    <SLabel className="block mb-2">{label}</SLabel>
    <h2 style={serifFont}
      className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-normal text-neutral-900 leading-snug
                 hover:text-orange-700 transition-colors duration-300">
      {title}
    </h2>
  </div>
);

const PullQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote className="border-l-[3px] border-orange-700 pl-6 py-4 my-10 bg-orange-900/[0.08] rounded-r-xl">
    <p style={serifFont} className="text-[1.22rem] text-neutral-900 italic leading-[1.52] m-0">{children}</p>
  </blockquote>
);

const InlineCTA: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div className="bg-orange-900/10 border border-orange-200 rounded-xl px-7 py-6 my-11 flex items-center gap-6 flex-wrap">
    <div className="flex-1">
      <strong className="block text-neutral-900 text-base mb-1">{title}</strong>
      <p className="text-[0.87rem] text-stone-500 m-0">{body}</p>
    </div>
    <a href="https://www.sipanutrition.com/#order"
      className="shrink-0 bg-orange-700 text-white px-6 py-2.5 rounded-lg text-[0.88rem] font-semibold
                 no-underline whitespace-nowrap hover:opacity-85 transition-opacity">
      Order Now →
    </a>
  </div>
);

// ─── Larger section components ────────────────────────────────────────────────

const NumberedCardList: React.FC<{ cards: NumberedCard[] }> = ({ cards }) => (
  <div className="flex flex-col gap-3 my-8">
    {cards.map((c) => (
      <div key={c.num}
        className="flex gap-5 items-start bg-stone-50 border border-stone-200 rounded-xl px-6 py-5
                   hover:border-orange-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-900/10
                   transition-all duration-300">
        <span className="text-[0.7rem] font-bold text-orange-700 shrink-0 pt-0.5 min-w-[1.8rem]">{c.num}</span>
        <div>
          <span className="block text-[0.64rem] font-semibold tracking-[0.1em] uppercase text-stone-400 mb-1">{c.tag}</span>
          <h3 style={serifFont} className="text-[1.05rem] font-normal text-neutral-900 mb-1.5">{c.title}</h3>
          <p className="text-[0.875rem] text-stone-500 leading-relaxed m-0">{c.body}</p>
        </div>
      </div>
    ))}
  </div>
);

const StatGrid: React.FC<{ stats: StatCard[] }> = ({ stats }) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-3 my-8">
    {stats.map((s, i) => (
      <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl px-6 py-6 text-center">
        <span className="block text-[0.64rem] font-semibold tracking-[0.1em] uppercase text-stone-400 mb-3">{s.tag}</span>
        <span style={serifFont} className="block text-[2.7rem] text-neutral-900 leading-none mb-2">{s.big}</span>
        <span className="text-[0.8rem] text-stone-500 leading-snug">{s.desc}</span>
      </div>
    ))}
  </div>
);

const AudienceGrid: React.FC<{ cards: AudienceCard[] }> = ({ cards }) => (
  <div className="flex flex-wrap justify-center gap-4 my-8">
    {cards.map((c) => (
      <div key={c.title}
        className="bg-white border border-stone-200 rounded-xl pt-6 px-5 pb-5 text-center flex flex-col
                   items-center flex-[0_1_calc(33.333%-1rem)] min-w-[180px] max-sm:flex-[1_1_100%]
                   hover:border-orange-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/10
                   transition-all duration-300">
        <span className="text-[2.2rem] flex items-center justify-center w-14 h-14 rounded-full
                         bg-orange-900/10 mb-3 shrink-0" role="img" aria-hidden="true">{c.icon}</span>
        <h3 style={serifFont} className="text-[0.95rem] font-medium text-neutral-900 mb-1.5">{c.title}</h3>
        <p className="text-[0.78rem] text-stone-500 leading-relaxed m-0">{c.desc}</p>
      </div>
    ))}
  </div>
);

const IngredientGrid: React.FC<{ cards: IngredientCard[] }> = ({ cards }) => (
  <div className="grid grid-cols-2 gap-4 my-8 max-sm:grid-cols-1">
    {cards.map((c) => (
      <div key={c.num}
        className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-6
                   hover:border-orange-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-900/[0.06]
                   transition-all duration-300">
        <span className="block text-[0.63rem] font-semibold tracking-[0.1em] uppercase text-stone-400 mb-3">{c.num}</span>
        <span className="block text-[0.67rem] font-semibold tracking-[0.1em] uppercase text-orange-700 mb-1">{c.tag}</span>
        <h3 style={serifFont} className="text-[1.15rem] font-normal text-neutral-900 mb-2">{c.name}</h3>
        <span className="block text-[1.55rem] font-bold text-orange-700 mb-1">{c.dose}</span>
        <span className="inline-block text-[0.72rem] text-stone-500 border border-stone-200 rounded-full px-3 py-0.5 mb-3">{c.rda}</span>
        <p className="text-[0.82rem] text-stone-500 leading-relaxed m-0">{c.body}</p>
      </div>
    ))}
  </div>
);

const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
  <div className="flex flex-col my-8">
    {items.map((item, idx) => (
      <div key={item.num} className="flex gap-6 pb-8 last:pb-0 max-sm:gap-4">
        <div className="shrink-0 flex flex-col items-center">
          <div className="w-9 h-9 bg-stone-50 border border-orange-200 rounded-full flex items-center
                          justify-center text-[0.62rem] font-bold text-orange-700">{item.num}</div>
          {idx < items.length - 1 && <div className="flex-1 w-px bg-stone-200 mt-1.5" />}
        </div>
        <div>
          <span className="block text-[0.67rem] font-semibold tracking-[0.1em] uppercase text-orange-700 mb-1">{item.when}</span>
          <h3 style={serifFont} className="text-base font-normal text-neutral-900 mb-1">{item.title}</h3>
          <p className="text-[0.87rem] text-stone-500 leading-relaxed m-0">{item.body}</p>
        </div>
      </div>
    ))}
  </div>
);

const SynergyBlock: React.FC = () => (
  <div className="bg-gradient-to-br from-[#fffaf6] to-[#f8f4ef] border border-stone-200 rounded-2xl
                  px-10 py-12 my-10 relative overflow-hidden max-sm:px-5 max-sm:py-8">
    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle,rgba(194,65,12,.08),transparent 70%)" }} />
    <SLabel className="block text-center mb-2">Mechanism of Action</SLabel>
    <h3 style={serifFont} className="text-[1.4rem] font-normal text-neutral-900 text-center mb-1.5">The D3 + K2 Calcium Pathway</h3>
    <p className="text-[0.87rem] text-stone-500 text-center mb-9 leading-relaxed">
      The exact 3-step biochemical sequence that only functions when both vitamins are taken daily.
    </p>
    <div className="flex flex-col max-w-lg mx-auto">
      {/* Step D3 */}
      <div className="flex gap-5 items-start">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-[0.72rem] font-bold
                          bg-orange-900/10 text-orange-700 border-2 border-orange-300/50">D3</div>
          <div className="w-0.5 h-7 my-1 bg-[repeating-linear-gradient(to_bottom,#e5e0d8_0,#e5e0d8_4px,transparent_4px,transparent_8px)]" />
        </div>
        <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 flex-1 mb-1
                        hover:border-orange-200 hover:translate-x-1 transition-all duration-200">
          <span className="block text-[1.3rem] mb-1">☀️</span>
          <p style={serifFont} className="text-[1.05rem] font-medium text-neutral-900 mb-1">Vitamin D3 Absorbs Calcium</p>
          <p className="text-[0.82rem] text-stone-500 leading-relaxed m-0">D3 triggers calcium uptake in the gut. Without D3, only ~10–15% of dietary calcium is absorbed.</p>
        </div>
      </div>
      {/* Step K2 */}
      <div className="flex gap-5 items-start">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-[0.72rem] font-bold
                          bg-emerald-50 text-emerald-700 border-2 border-emerald-300/50">K2</div>
          <div className="w-0.5 h-7 my-1 bg-[repeating-linear-gradient(to_bottom,#e5e0d8_0,#e5e0d8_4px,transparent_4px,transparent_8px)]" />
        </div>
        <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 flex-1 mb-1
                        hover:border-orange-200 hover:translate-x-1 transition-all duration-200">
          <span className="block text-[1.3rem] mb-1">🧭</span>
          <p style={serifFont} className="text-[1.05rem] font-medium text-neutral-900 mb-1">Vitamin K2 Directs Calcium</p>
          <p className="text-[0.82rem] text-stone-500 leading-relaxed m-0">K2 activates osteocalcin and Matrix Gla-Protein — guiding calcium into bones and away from arteries.</p>
        </div>
      </div>
      {/* Step Result */}
      <div className="flex gap-5 items-start">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-[0.8rem] font-bold
                          bg-orange-700 text-white border-2 border-orange-700">✓</div>
        </div>
        <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl px-5 py-4 flex-1">
          <span className="block text-[1.3rem] mb-1">🦴</span>
          <p style={serifFont} className="text-[1.1rem] font-medium text-white mb-1">Calcium Reaches the Right Place</p>
          <p className="text-[0.82rem] text-white/80 leading-relaxed m-0">Bones mineralise. Arteries stay clear. The full cycle completes — only when both D3 and K2 are taken daily.</p>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-2 flex-wrap mt-8">
      {["Bone density","Arterial safety","Calcium balance","Daily synergy"].map((label) => (
        <span key={label} className="inline-flex items-center gap-1.5 bg-white border border-stone-200
                                     rounded-full px-3 py-1.5 text-[0.72rem] text-stone-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-700" />{label}
        </span>
      ))}
    </div>
  </div>
);

const CalciumRoutingDiagram: React.FC = () => (
  <div className="border border-stone-200 rounded-xl my-8 overflow-x-auto px-6 py-7
                  bg-gradient-to-br from-[#fff9f5] to-[#f8f4ef]">
    <p className="text-center text-[0.67rem] font-semibold tracking-[0.14em] uppercase text-orange-700 mb-4">
      The Calcium Routing Problem — Why K2 Is Essential
    </p>
   <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Vitamin K2 and calcium routing</title>
  <desc>Without K2, calcium goes to arteries. With K2 (MK-7), it goes to bones and teeth.</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  {/* <!-- D3 absorption --> */}
  <rect x="40" y="40" width="160" height="52" rx="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#633806" font-family="system-ui" x="120" y="62" text-anchor="middle" dominant-baseline="central">D3 absorption</text>
  <text font-size="12" fill="#854F0B" font-family="system-ui" x="120" y="80" text-anchor="middle" dominant-baseline="central">raises blood calcium</text>

  {/* <!-- Arrow down --> */}
  <line x1="120" y1="92" x2="120" y2="124" stroke="#888" stroke-width="1" marker-end="url(#arrow)"/>

  {/* <!-- Ca²⁺ in blood --> */}
  <rect x="40" y="126" width="160" height="52" rx="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#633806" font-family="system-ui" x="120" y="148" text-anchor="middle" dominant-baseline="central">Ca²⁺ in blood</text>
  <text font-size="12" fill="#854F0B" font-family="system-ui" x="120" y="166" text-anchor="middle" dominant-baseline="central">freely circulating</text>

  {/* <!-- Branch to arteries (up-right) --> */}
  <path d="M200 142 L270 142 L270 90 L358 90" fill="none" stroke="#A32D2D" stroke-width="1" marker-end="url(#arrow)"/>

  {/* <!-- Branch to bones (down-right) --> */}
  <path d="M200 162 L270 162 L270 232 L358 232" fill="none" stroke="#0F6E56" stroke-width="1" marker-end="url(#arrow)"/>

  {/* <!-- Without K2 label --> */}
  <text font-size="12" font-weight="500" fill="#A32D2D" font-family="system-ui" x="480" y="52" text-anchor="middle">Without K2</text>

  {/* <!-- Arteries box --> */}
  <rect x="360" y="62" width="240" height="52" rx="4" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#501313" font-family="system-ui" x="480" y="82" text-anchor="middle" dominant-baseline="central">Arteries &amp; soft tissue</text>
  <text font-size="12" fill="#A32D2D" font-family="system-ui" x="480" y="100" text-anchor="middle" dominant-baseline="central">vascular calcification</text>

  {/* <!-- With K2 label --> */}
  <text font-size="12" font-weight="500" fill="#0F6E56" font-family="system-ui" x="480" y="210" text-anchor="middle">With K2 (MK-7)</text>

  {/* <!-- Bones box --> */}
  <rect x="360" y="218" width="240" height="52" rx="4" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#04342C" font-family="system-ui" x="480" y="238" text-anchor="middle" dominant-baseline="central">Bones &amp; teeth</text>
  <text font-size="12" fill="#0F6E56" font-family="system-ui" x="480" y="256" text-anchor="middle" dominant-baseline="central">osteocalcin + MGP activated</text>

  {/* <!-- K2 activates box --> */}
  <rect x="40" y="210" width="160" height="44" rx="4" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#04342C" font-family="system-ui" x="120" y="228" text-anchor="middle" dominant-baseline="central">K2 activates</text>
  <text font-size="12" fill="#0F6E56" font-family="system-ui" x="120" y="244" text-anchor="middle" dominant-baseline="central">protein carboxylation</text>

  {/* <!-- Dashed arrow K2 → bones --> */}
  <line x1="200" y1="232" x2="358" y2="244" stroke="#0F6E56" stroke-width="1" stroke-dasharray="5 3" marker-end="url(#arrow)"/>
</svg>
  </div>
);

const SunlightInfographic: React.FC = () => (
  <div className="border border-stone-200 rounded-xl my-8 overflow-x-auto px-8 py-10
                  bg-gradient-to-br from-[#fff9f5] to-[#f8f4ef]">
    <p className="text-center text-[0.87rem] font-semibold tracking-[0.14em] uppercase text-orange-700 mb-6">
      How Your Body Makes Vitamin D3
    </p>
   <svg width="100%" viewBox="0 0 680 160" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Vitamin D synthesis pathway</title>
  <desc>UVB sunlight triggers skin D3 synthesis, liver and kidney convert to active calcitriol</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  {/* <!-- Sun (simple geometric icon) --> */}
  <circle cx="52" cy="80" r="14" fill="none" stroke="#888" stroke-width="1.5"/>
  <line x1="52" y1="58" x2="52" y2="52" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="52" y1="102" x2="52" y2="108" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="30" y1="80" x2="24" y2="80" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="74" y1="80" x2="80" y2="80" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="36" y1="64" x2="31" y2="59" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="68" y1="96" x2="73" y2="101" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="68" y1="64" x2="73" y2="59" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="36" y1="96" x2="31" y2="101" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  <text font-size="12" fill="#888" font-family="system-ui" x="52" y="120" text-anchor="middle">UVB</text>

  {/* <!-- Arrow 1 --> */}
  <line x1="88" y1="80" x2="118" y2="80" stroke="#888" stroke-width="1" marker-end="url(#arrow)"/>

  {/* <!-- Box 1: Skin --> */}
  <rect x="122" y="52" width="130" height="56" rx="4" fill="#f5f5f3" stroke="#ccc" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#2c2c2a" font-family="system-ui" x="187" y="76" text-anchor="middle" dominant-baseline="central">Skin</text>
  <text font-size="12" fill="#888" font-family="system-ui" x="187" y="96" text-anchor="middle" dominant-baseline="central">7-DHC → D3</text>

  {/* <!-- Arrow 2 --> */}
  <line x1="256" y1="80" x2="286" y2="80" stroke="#888" stroke-width="1" marker-end="url(#arrow)"/>

  {/* <!-- Box 2: Liver + Kidney --> */}
  <rect x="290" y="52" width="160" height="56" rx="4" fill="#f5f5f3" stroke="#ccc" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#2c2c2a" font-family="system-ui" x="370" y="76" text-anchor="middle" dominant-baseline="central">Liver + Kidney</text>
  <text font-size="12" fill="#888" font-family="system-ui" x="370" y="96" text-anchor="middle" dominant-baseline="central">D3 → Calcitriol</text>

  
  <line x1="454" y1="80" x2="484" y2="80" stroke="#888" stroke-width="1" marker-end="url(#arrow)"/>

  
  <rect x="488" y="52" width="152" height="56" rx="4" fill="#0F6E56" stroke="#085041" stroke-width="0.5"/>
  <text font-size="14" font-weight="500" fill="#fff" font-family="system-ui" x="564" y="70" text-anchor="middle" dominant-baseline="central">Cell action</text>
  <text font-size="12" fill="rgba(255,255,255,0.8)" font-family="system-ui" x="564" y="90" text-anchor="middle" dominant-baseline="central">Calcium · Immunity</text>
  <text font-size="12" fill="rgba(255,255,255,0.8)" font-family="system-ui" x="564" y="105" text-anchor="middle" dominant-baseline="central">Muscle function</text>
</svg>
  </div>
);

const FaqList: React.FC<{ items: FaqItem[] }> = ({ items }) => (
  <div className="flex flex-col gap-3 my-8">
    {items.map((item) => (
      <div key={item.num} className="bg-stone-50 border border-stone-200 rounded-xl px-6 py-5"
        itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
        <dl>
          <dt className="flex gap-3.5 items-start text-[0.9rem] font-semibold text-neutral-900 mb-2"
            itemProp="name">
            <span className="text-[0.64rem] text-orange-700 font-bold tracking-[0.08em] pt-0.5 shrink-0">{item.num}</span>
            {item.question}
          </dt>
          <dd className="text-[0.87rem] text-stone-500 leading-relaxed pl-8"
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <span itemProp="text">{item.answer}</span>
          </dd>
        </dl>
      </div>
    ))}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function blog() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HEAD — All SEO signals live here. Nothing visible to
          users, everything visible to Google and social platforms.
          ════════════════════════════════════════════════════════ */}
      <Head>
        {/* Primary SEO
            — title: shown as the blue link text in Google results
            — description: the grey paragraph under the title
            — keywords: secondary signal, still worth including
            — robots: tells Googlebots to index and follow all links
            — canonical: prevents duplicate content issues if the page is
                         accessible from multiple URLs */}
        <title>Why Vitamin D3 + K2 Are Important & Why They Should Be Taken Together | SIPA Nutrition</title>
        <meta name="description" content="Discover why Vitamin D3 and K2 must be taken together for optimal bone health, immunity, and heart protection. SIPA Nutrition's vegan D3+K2 sachets: lab-tested, sugar-free, India's smartest daily supplement." />
        <meta name="keywords" content="Vitamin D3 K2 together, Vitamin D3 benefits, Vitamin K2 MK-7 benefits, vegan Vitamin D3 India, D3 K2 supplement sachets, cholecalciferol, menaquinone MK7, bone health supplement India, immunity supplement India, SIPA Nutrition" />
        <meta name="author" content="SIPA Nutrition" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.sipanutrition.com/blog/vitamin-d3-k2-together" />

        {/* Open Graph — controls the preview card when someone shares
            your URL on WhatsApp, LinkedIn, Facebook, Slack, etc.
            Without these, the platform shows a blank or broken preview.
            og:image should be 1200×630px for best display. */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Why Vitamin D3 and K2 Are Important and Why They Should Be Taken Together" />
        <meta property="og:description" content="Two essential vitamins. One powerful synergy. Discover the science of D3+K2 and why India's first vegan sachet is the smarter way to supplement." />
        <meta property="og:url" content="https://www.sipanutrition.com/blog/vitamin-d3-k2-together" />
        <meta property="og:site_name" content="SIPA Nutrition" />
        <meta property="og:image" content="https://www.sipanutrition.com/hero.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content="2026-04-02" />
        <meta property="article:modified_time" content="2026-04-02" />
        <meta property="article:author" content="SIPA Nutrition" />
        <meta property="article:section" content="Wellness Education" />
        <meta property="article:tag" content="Vitamin D3" />
        <meta property="article:tag" content="Vitamin K2" />
        <meta property="article:tag" content="Bone Health" />
        <meta property="article:tag" content="Immunity" />

        {/* Twitter / X Card — controls preview on Twitter.
            summary_large_image = big image card format */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Vitamin D3 and K2 Should Always Be Taken Together" />
        <meta name="twitter:description" content="The science behind the D3+K2 synergy — and India's first vegan sachet that gets it right." />
        <meta name="twitter:image" content="https://www.sipanutrition.com/hero.jpeg" />

        {/* JSON-LD: Article schema
            Tells Google this is editorial content with an author and
            publish date. Feeds into E-E-A-T trust scoring for health
            content and Google News eligibility. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        {/* JSON-LD: FAQPage schema — MOST VALUABLE ONE
            Makes your FAQ answers appear as expandable dropdowns
            directly inside Google search results without the user
            clicking your link. Doubles your SERP real estate for free. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* JSON-LD: BreadcrumbList schema
            Shows "sipanutrition.com › Blog › Article Title" in the
            URL line of your search result instead of a raw URL. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* JSON-LD: Product schema
            Enables Google to show your product with price in
            Google Shopping results and the product knowledge panel. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#f7f4ef] text-neutral-900 overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>

        {/* ── NAV ── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between h-[62px] px-8
                        bg-[rgba(247,244,239,0.98)] backdrop-blur-md border-b border-stone-200
                        shadow-[0_2px_20px_rgba(194,65,12,0.08)]">
          <div className="flex items-center gap-5">
            <a href="https://www.sipanutrition.com" style={serifFont}
              className="text-[1.18rem] text-neutral-900 no-underline hover:text-orange-700 transition-colors">
              SIPA <em className="text-orange-700 not-italic">Nutrition</em>
            </a>
            <div className="w-px h-[18px] bg-stone-200" />
            <span className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-stone-500">Wellness Blog</span>
          </div>
          <a href="https://www.sipanutrition.com/#order"
            className="bg-orange-700 text-white text-[0.82rem] font-semibold px-4 py-2 rounded-md
                       no-underline hover:opacity-85 transition-opacity">
            Order — ₹599
          </a>
        </nav>

        {/* ── BREADCRUMB — matches BreadcrumbList schema above ── */}
        <nav aria-label="Breadcrumb" className="px-8 py-3.5 border-b border-stone-200 text-[0.74rem] text-stone-500">
          <ol className="flex items-center list-none m-0 p-0 flex-wrap gap-1">
            <li><a href="https://www.sipanutrition.com" className="text-stone-500 no-underline hover:text-orange-700">Home</a></li>
            <li className="mx-1">›</li>
            <li><a href="https://www.sipanutrition.com/blog" className="text-stone-500 no-underline hover:text-orange-700">Blog</a></li>
            <li className="mx-1">›</li>
            <li className="text-neutral-900">Why Vitamin D3 and K2 Should Be Taken Together</li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <header className="relative px-8 pt-[4.5rem] pb-14 text-center overflow-hidden
                           bg-gradient-to-br from-[#f9f7f3] to-[#f2efea]">
          <img
            src="https://www.sipanutrition.com/hero.jpeg"
            alt="SIPA Nutrition Vitamin D3 and K2 sachets — India's first vegan D3+K2 daily supplement for bone health and immunity"
            className="absolute inset-0 w-full h-full object-cover object-center -z-10 opacity-40"
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 30% 20%,rgba(194,65,12,.08),transparent 60%),radial-gradient(ellipse 40% 30% at 70% 80%,rgba(194,65,12,.06),transparent)" }} />
          <div className="max-w-[980px] mx-auto px-6 relative">
            <SLabel className="mb-5">Wellness Education · Science-Backed</SLabel>
            {/* h1 — single most important heading, contains primary keywords */}
            <h1 style={serifFont}
              className="text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.18] text-neutral-900 max-w-[900px] mx-auto mb-6">
              Why Taking Vitamin D3 Alone Is a Mistake —<br />
              The Critical Synergy of <em className="text-orange-700 not-italic">D3 + K2</em>
            </h1>
            <p className="text-stone-500 text-[1.05rem] font-light max-w-[680px] mx-auto mb-9 leading-[1.7]">
              Two essential vitamins. One non-negotiable partnership. Discover why most standard D3 supplements fall
              drastically short, and why combining them with K2 is the only science-backed way to protect both your
              bones and your heart.
            </p>
            <div className="flex justify-center flex-wrap gap-2 mb-10">
              {[["Science-Backed", true], ["10 Min Read", false], ["Published 2 April 2026", false], ["By SIPA Nutrition", false]].map(([label, active]) => (
                <span key={label as string} className={chip(active as boolean)}>{label as string}</span>
              ))}
            </div>
            <div className="flex justify-center gap-8 flex-wrap pt-7 border-t border-stone-200
                            text-[0.78rem] text-stone-400 max-w-[480px] mx-auto">
              <span>🦴 Bone Health</span><span>🛡️ Immunity</span><span>❤️ Heart Health</span><span>💪 Muscle Function</span>
            </div>
          </div>
        </header>

        {/* ── ARTICLE ── */}
        <main>
          <article itemScope itemType="https://schema.org/Article">
            {/* Microdata reinforcement — hidden, machine-readable */}
            <meta itemProp="headline" content="Why Vitamin D3 and K2 Are Important and Why They Should Be Taken Together" />
            <meta itemProp="datePublished" content="2026-04-02" />
            <meta itemProp="author" content="SIPA Nutrition" />

            <div className="max-w-[980px] mx-auto px-6">

              {/* Table of Contents */}
              <nav aria-label="Table of contents"
                className="bg-stone-50 border border-stone-200 rounded-xl px-8 py-7 my-14">
                <p className="text-[0.67rem] font-semibold tracking-[0.13em] uppercase text-orange-700 mb-4">In This Article</p>
                <ol className="list-none m-0 p-0 flex flex-col gap-1.5">
                  {[
                    ["01","#k2","What Is Vitamin K2 and Why It's Overlooked"],
                    ["02","#d3","What Is Vitamin D3 and Why It Matters"],
                    ["03","#synergy","Why D3 and K2 Must Be Taken Together"],
                    ["04","#who","Who Needs D3 + K2 the Most"],
                    ["05","#choose","What to Look for in a D3 + K2 Supplement"],
                    ["06","#sipa","Why SIPA Nutrition's Sachets Are Different"],
                    ["07","#faq","Frequently Asked Questions"],
                  ].map(([num, href, label]) => (
                    <li key={num} className="flex items-baseline gap-3">
                      <span className="text-[0.7rem] text-stone-400 font-semibold w-6 shrink-0">{num}</span>
                      <a href={href} className="text-stone-500 text-[0.9rem] no-underline hover:text-orange-700 transition-colors">{label}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Intro */}
              <p className="text-neutral-900 mb-5 leading-[1.8]">If you're taking a standard Vitamin D3 supplement, you might only be solving half the problem. While modern blood tests consistently urge us to boost our Vitamin D levels, they leave out a crucial missing piece.</p>
              <p className="text-neutral-900 mb-5 leading-[1.8]"><strong>Vitamin D3 is mathematically incomplete without Vitamin K2.</strong></p>
              <p className="text-neutral-900 mb-5 leading-[1.8]">These two nutrients share an undeniable biochemical link. D3 absorbs calcium into your bloodstream, but it has absolutely no control over where that calcium goes next. Without K2 acting as a precise guide, excess calcium can deposit in your arteries and soft tissues instead of your skeleton.</p>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 01 — K2 */}
              <section id="k2" className="pt-12">
                <SectionHeader label="Section 01 · Vitamin K2"
                  title={<>What Is Vitamin K2 —<br />the Nutrient <em className="text-orange-700 not-italic">Most Supplements Ignore?</em></>} />
                <img src="vitamin-k2-mk7-structure.png"
                  alt="Vitamin K2 Menaquinone-7 MK-7 molecular structure — the superior long-acting form of K2 for bone and cardiovascular health in India"
                  className="max-w-full h-auto rounded-xl mb-10 shadow-sm bg-white p-6" loading="lazy" />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Vitamin K2 is arguably nutrition science's most underappreciated compound. Many people confuse it with Vitamin K1 (which handles blood clotting via leafy greens). However, K2 serves an entirely different, critical function.</p>
                <p className="text-neutral-900 mb-5 leading-[1.8]"><strong>Cause:</strong> You ingest K2.<br /><strong>Effect:</strong> It activates dormant structural proteins.<br /><strong>Outcome:</strong> Calcium is safely routed away from your heart and permanently locked into your bones.</p>
                <p className="text-neutral-900 mb-5 leading-[1.8]">Specifically, K2 turns on two essential proteins. Found in the bone matrix, <strong>osteocalcin</strong> actively binds circulating calcium into your skeleton to improve density. Meanwhile, <strong>Matrix Gla-Protein (MGP)</strong> acts as a biochemical sweeper, actively preventing free calcium from calcifying over soft tissues.</p>
                <p className="text-neutral-900 mb-5 leading-[1.8]">When selecting a supplement, the <strong>MK-7 (menaquinone-7)</strong> form of K2 is vastly superior. Unlike the older MK-4 form which degrades in mere hours, MK-7 continuously activates proteins for over 24 hours from just a single dose.</p>
                <PullQuote>"Vitamin K2 is the body's calcium traffic controller. It dictates exactly where the calcium (that D3 absorbed) should go — and more importantly, where it should never go."</PullQuote>
                <CalciumRoutingDiagram />
                <NumberedCardList cards={k2Cards} />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 02 — D3 */}
              <section id="d3" className="pt-12">
                <SectionHeader label="Section 02 · Vitamin D3"
                  title={<>What Is Vitamin D3 —<br />and Why Are We <em className="text-orange-700 not-italic">Globally Deficient?</em></>} />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Vitamin D3 (<strong>cholecalciferol</strong>) is the precise form of Vitamin D your body synthesises from natural UVB sunlight. Despite its name, it isn't actually a vitamin — it's a powerful steroid hormone.</p>
                <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80"
                  alt="Athletic person outdoors — representing the connection between sunlight, Vitamin D3 deficiency in India, and bone strength"
                  className="max-w-full h-auto rounded-xl my-8 shadow-sm" loading="lazy" />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Indoor office lifestyles, severe air pollution blocking UVB rays, naturally darker skin tones, and daily sunscreen use have created a perfect storm. Today, D3 deficiency remains one of the world's most widespread hidden health crises.</p>
                <StatGrid stats={d3Stats} />
                <SunlightInfographic />
                <h3 style={serifFont} className="text-[1.2rem] font-normal text-neutral-900 mt-6 mb-2">What Vitamin D3 Does in the Body</h3>
                <NumberedCardList cards={d3Cards} />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 03 — Synergy */}
              <section id="synergy" className="pt-12">
                <SectionHeader label="Section 03 · The Biochemistry"
                  title={<>The Calcium Paradox: Why D3<br />Requires a <em className="text-orange-700 not-italic">Co-Pilot</em></>} />
                <img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/7155/hb-vitamins-01162072646615.jpg"
                  alt="Vitamin D supplement capsule — illustrating why D3 must be combined with K2 for complete bone and cardiovascular supplementation"
                  className="max-w-full h-auto rounded-xl mb-10 shadow-sm" loading="lazy" />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Here is the medical truth that standard supplement labels completely ignore: <strong>supplementing high daily doses of Vitamin D3 without K2 is biologically reckless.</strong></p>
                <p className="text-neutral-900 mb-5 leading-[1.8]">When you take D3, your body dramatically upregulates its absorption of calcium. Without K2 to activate the "calcium-guiding" proteins, that free-floating mineral settles into blood vessel walls, joints, and kidneys — a biological error known as <strong>vascular calcification</strong>.</p>
                <SynergyBlock />
                <h3 style={serifFont} className="text-[1.2rem] font-normal text-neutral-900 mt-6 mb-2">What the Research Says</h3>
                <p className="text-neutral-900 mb-5 leading-[1.8]">A landmark study in the <em>Journal of Bone and Mineral Research</em> demonstrated that combined D3 and K2 supplementation was significantly more effective at improving bone mineral density than D3 alone. Separately, a three-year trial published in <em>Thrombosis and Haemostasis</em> found that MK-7 supplementation markedly reduced arterial stiffness in postmenopausal women.</p>
                <InlineCTA title="Ready to supplement the right way?" body="SIPA Nutrition's daily sachet delivers both in the clinically recommended ratio — vegan, 100% lab tested, and just ₹19.9/day." />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 04 — Who */}
              <section id="who" className="pt-12">
                <SectionHeader label="Section 04 · Who Needs It"
                  title={<>Built for Your <em className="text-orange-700 not-italic">Body's Needs</em></>} />
                <p className="text-neutral-900 mb-5 leading-[1.8]">While both nutrients benefit nearly everyone, certain groups have a particularly pressing need for consistent daily supplementation:</p>
                <AudienceGrid cards={audienceCards} />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 05 — Choose */}
              <section id="choose" className="pt-12">
                <SectionHeader label="Section 05 · Buying Guide"
                  title={<>Nothing Hidden,<br /><em className="text-orange-700 not-italic">Nothing Extra</em></>} />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Not all D3 + K2 supplements are created equal. Five criteria separate a well-formulated product from marketing noise:</p>
                <NumberedCardList cards={chooseCards} />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 06 — Product */}
              <section id="sipa" className="pt-12">
                <SectionHeader label="Section 06 · The Product"
                  title={<>Everyday Health,<br /><em className="text-orange-700 not-italic">Expertly Designed</em></>} />
                <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80"
                  alt="Clean supplement formulation representing SIPA Nutrition's purity standards — no sugar, no fillers, lab tested vegan D3 K2"
                  className="max-w-full h-auto rounded-xl mb-10 shadow-sm" loading="lazy" />
                <p className="text-neutral-900 mb-5 leading-[1.8]">SIPA Nutrition's Vitamin D3 + K2 sachets deliver a precise, clinically-effective stack. No sugars, no fillers, no compromises. Just a clean, active compound designed to protect your skeletal and cardiovascular systems in one simple daily step.</p>
                <IngredientGrid cards={ingredientCards} />
                <h3 style={serifFont} className="text-[1.2rem] font-normal text-neutral-900 mt-6 mb-2">A Simple Daily Ritual</h3>
                <Timeline items={timelineItems} />
                <div className="grid grid-cols-3 gap-x-14 gap-y-5 bg-stone-50 border border-stone-200
                                rounded-xl px-8 py-6 my-8 max-sm:grid-cols-2 max-sm:gap-x-6">
                  {certLabels.map((cert) => (
                    <span key={cert} className="flex items-center gap-1.5 text-[0.75rem] text-stone-500 font-medium">
                      <span className="text-orange-700 font-bold">✓</span>{cert}
                    </span>
                  ))}
                </div>
              </section>

              {/* Main CTA */}
              <div className="relative bg-stone-50 border border-stone-200 rounded-2xl px-10 py-14 my-16 text-center overflow-hidden">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[210px] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse,rgba(232,112,42,.13),transparent 70%)" }} />
                <SLabel className="mb-4">Let's Get Better Together</SLabel>
                <h2 style={serifFont}
                  className="text-[clamp(1.8rem,4vw,2.6rem)] font-normal text-neutral-900 mb-3 leading-tight">
                  India's best Vegan Daily<br />D3 + K2 Sachet — <em className="text-orange-700 not-italic">Just ₹19.9 a Day</em>
                </h2>
                <p className="text-stone-500 max-w-lg mx-auto mb-8 text-[0.94rem]">
                  Clinically dosed. 100% vegan via VitaShine®. Independently lab tested. No sugar, no fillers.
                </p>
                <p style={serifFont} className="text-[3rem] text-neutral-900 leading-none mb-1">₹599</p>
                <p className="text-[0.82rem] text-stone-500 mb-7">30 sachets · 30-day supply · ≈ ₹19.9/day</p>
                <a href="https://www.sipanutrition.com/#order"
                  className="inline-block bg-orange-700 text-white px-10 py-4 rounded-lg font-semibold text-base
                             no-underline hover:opacity-90 hover:-translate-y-0.5 hover:scale-[1.02]
                             hover:shadow-[0_8px_25px_rgba(194,65,12,.3)] transition-all duration-150">
                  Order Now
                </a>
                <div className="flex justify-center flex-wrap gap-2 mt-6">
                  {[["✅ 100% Vegan", true],["🧪 Lab Tested",false],["🍬 No Sugar",false],["🏭 WHO-GMP",false],["📋 No Rx Needed",false]].map(([label, active]) => (
                    <span key={label as string} className={chip(active as boolean)}>{label as string}</span>
                  ))}
                </div>
                <p className="mt-6 text-[0.85rem] text-stone-500">
                  <strong>Limited Batch:</strong> First 500 orders ship free. Stock ends soon.
                </p>
              </div>

              {/* Social sharing */}
              <div className="flex gap-4 justify-center text-[0.8rem] mt-8">
                {[
                  { href: "https://twitter.com/intent/tweet?url=https://www.sipanutrition.com/blog/vitamin-d3-k2-together&text=Why Vitamin D3 + K2 must be taken together", label: "🐦 Share" },
                  { href: "https://www.linkedin.com/sharing/share-offsite/?url=https://www.sipanutrition.com/blog/vitamin-d3-k2-together", label: "💼 LinkedIn" },
                  { href: "https://wa.me/?text=Why D3+K2 together: https://www.sipanutrition.com/blog/vitamin-d3-k2-together", label: "📱 WhatsApp" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-stone-500 no-underline hover:text-orange-700 transition-colors">{s.label}</a>
                ))}
              </div>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Section 07 — FAQ
                  itemScope + itemType mirrors the FAQPage JSON-LD above
                  for double-reinforcement of the schema */}
              <section id="faq" className="pt-12" itemScope itemType="https://schema.org/FAQPage">
                <SectionHeader label="Section 07 · FAQ"
                  title={<>Good Questions<br /><em className="text-orange-700 not-italic">Deserve Answers</em></>} />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Everything you need to know before you begin your daily D3 + K2 routine.</p>
                <FaqList items={faqItems} />
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* Conclusion */}
              <section className="pt-12">
                <SectionHeader label="Conclusion" title="The Bottom Line" />
                <p className="text-neutral-900 mb-5 leading-[1.8]">Vitamin D3 and K2 are arguably the two most important daily nutrients for your long-term health trajectory. But as the science clearly shows, their true power only activates when they are taken together.</p>
                <PullQuote>"Don't just supplement. Supplement biologically smart. D3 without K2 is a mathematical half-answer to a whole-body problem."</PullQuote>
                <p className="text-neutral-900 mb-5 leading-[1.8]">SIPA Nutrition was built on exactly this principle — to offer India's first daily D3 + K2 sachet that's vegan, clean, clinically dosed, and independently lab-tested.</p>
                <InlineCTA title="Let's Get Better Together." body="Try SIPA Nutrition's Vitamin D3 + K2 sachets — 30 sachets, one a day, ₹599. Vegan. 100% lab tested." />
                <p className="mt-8 text-[0.78rem] text-stone-400 leading-[1.6] italic">
                  Disclaimer: This article is for informational and educational purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare professional before starting any new supplement regimen.
                </p>
              </section>

              <hr className="border-none border-t border-stone-200 my-12" />

              {/* References */}
              <section className="pt-12">
                <SectionHeader label="Sources" title={<>References &amp; <em className="text-orange-700 not-italic">Citations</em></>} />
                <ol className="text-[0.82rem] text-stone-500 leading-[1.9] pl-5">
                  {references.map((ref, i) => (
                    <li key={i}>{ref.authors} {ref.title} <em>{ref.journal}</em>{" "}
                      <a href={ref.doiUrl} target="_blank" rel="noopener noreferrer"
                        className="text-orange-700 no-underline hover:underline">{ref.doi}</a>
                    </li>
                  ))}
                </ol>
              </section>

            </div>
          </article>
        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-stone-200 px-8 py-10 text-center text-stone-400 text-[0.78rem]">
          <span style={serifFont} className="block text-[1.1rem] text-neutral-900 mb-2">
            SIPA <em className="text-orange-700 not-italic">Nutrition</em>
          </span>
          <p>Daily Vitamin D3 + K2 · Est. 2026</p>
          <p className="mt-2">
            <a href="https://www.sipanutrition.com" className="text-stone-500 no-underline hover:text-orange-700">sipanutrition.com</a>
            &nbsp;·&nbsp;
            <a href="mailto:hello@sipanutrition.com" className="text-stone-500 no-underline hover:text-orange-700">hello@sipanutrition.com</a>
          </p>
          <p className="max-w-[600px] mx-auto mt-4 text-[0.72rem] leading-[1.55]">
            Health supplement only. Not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use. © 2026 SIPA Nutrition.
          </p>
        </footer>

      </div>

      {/* fadeInUp animation — one small global keyframe */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
  
}
