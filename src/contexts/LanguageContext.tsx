import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "sv" | "en";

const translations = {
  nav: {
    services: { sv: "Tjänster", en: "Services" },
    about: { sv: "Om oss", en: "About" },
    contact: { sv: "Kontakt", en: "Contact" },
  },
  hero: {
    badge: { sv: "Vision Your Reach Online", en: "Vision Your Reach Online" },
    title1: { sv: "Webbsidor", en: "Websites" },
    title2: { sv: "för alla", en: "for everybody" },
    subtitle: {
      sv: "Vi skapar exceptionella digitala upplevelser genom innovativ design och banbrytande teknologi.",
      en: "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
    },
    cta: { sv: "Kom igång", en: "Get Started" },
    ctaSecondary: { sv: "Våra tjänster", en: "Our Services" },
  },
  services: {
    title: { sv: "Våra Tjänster", en: "Our Services" },
    subtitle: {
      sv: "Allt du behöver för en framgångsrik digital närvaro",
      en: "Everything you need for a successful digital presence",
    },
    webdesign: {
      title: { sv: "Webbdesign", en: "Web Design" },
      desc: {
        sv: "Moderna, responsiva webbplatser som imponerar på dina besökare och konverterar.",
        en: "Modern, responsive websites that impress your visitors and convert.",
      },
    },
    uiux: {
      title: { sv: "UI/UX Design", en: "UI/UX Design" },
      desc: {
        sv: "Användarvänliga gränssnitt med fokus på upplevelse och konvertering.",
        en: "User-friendly interfaces focused on experience and conversion.",
      },
    },
    seo: {
      title: { sv: "SEO Optimering", en: "SEO Optimization" },
      desc: {
        sv: "Få din webbplats att ranka högre och nå fler potentiella kunder.",
        en: "Get your website to rank higher and reach more potential customers.",
      },
    },
    maintenance: {
      title: { sv: "Underhåll", en: "Maintenance" },
      desc: {
        sv: "Kontinuerligt underhåll och uppdateringar för att hålla din webbplats säker.",
        en: "Continuous maintenance and updates to keep your website secure.",
      },
    },
    hosting: {
      title: { sv: "Serverhosting", en: "Server Hosting" },
      desc: {
        sv: "Snabb och pålitlig hosting med hög tillgänglighet och säkerhet.",
        en: "Fast and reliable hosting with high availability and security.",
      },
    },
    logo: {
      title: { sv: "Logotyp Skapande", en: "Logo Creation" },
      desc: {
        sv: "Unika och minnesvärda logotyper som representerar ditt varumärke.",
        en: "Unique and memorable logos that represent your brand.",
      },
    },
  },
  about: {
    title: { sv: "Om Sitevyro", en: "About Sitevyro" },
    subtitle: {
      sv: "Vi är passionerade om att skapa digitala upplevelser",
      en: "We are passionate about creating digital experiences",
    },
    p1: {
      sv: "Sitevyro grundades med en vision — att göra professionell webbdesign tillgänglig för alla företag. Vi tror att varje företag förtjänar en webbplats som inte bara ser fantastisk ut, utan också presterar exceptionellt.",
      en: "Sitevyro was founded with a vision — to make professional web design accessible to every business. We believe every business deserves a website that not only looks amazing but also performs exceptionally.",
    },
    p2: {
      sv: "Vårt team av designers och utvecklare kombinerar kreativitet med teknisk expertis för att leverera webbplatser som verkligen gör skillnad.",
      en: "Our team of designers and developers combines creativity with technical expertise to deliver websites that truly make a difference.",
    },
    stat1Label: { sv: "Projekt levererade", en: "Projects Delivered" },
    stat2Label: { sv: "Nöjda kunder", en: "Happy Clients" },
    stat3Label: { sv: "Års erfarenhet", en: "Years Experience" },
  },
  contact: {
    title: { sv: "Kontakta Oss", en: "Contact Us" },
    subtitle: {
      sv: "Redo att ta ditt företag online? Hör av dig!",
      en: "Ready to take your business online? Get in touch!",
    },
    name: { sv: "Namn", en: "Name" },
    email: { sv: "E-post", en: "Email" },
    message: { sv: "Meddelande", en: "Message" },
    send: { sv: "Skicka meddelande", en: "Send Message" },
    namePlaceholder: { sv: "Ditt namn", en: "Your name" },
    emailPlaceholder: { sv: "din@email.com", en: "your@email.com" },
    messagePlaceholder: { sv: "Berätta om ditt projekt...", en: "Tell us about your project..." },
  },
  socialMedia: {
    title: { sv: "Sociala Medier", en: "Social Media" },
    subtitle: {
      sv: "Vi hjälper er att vara aktiva och professionella på sociala medier utan att ni behöver lägga tid på det själva.",
      en: "We help you stay active and professional on social media without you having to spend time on it yourself.",
    },
    description: {
      sv: "Vi planerar, skapar och publicerar innehåll som stärker ert varumärke och gör att ni uppfattas som seriösa när kunder söker upp er.",
      en: "We plan, create and publish content that strengthens your brand and makes you appear professional when customers look you up.",
    },
    services: [
      { sv: "Innehållsplanering", en: "Content Planning" },
      { sv: "Grafisk design", en: "Graphic Design" },
      { sv: "Publicering & schemaläggning", en: "Publishing & Scheduling" },
      { sv: "Profiloptimering", en: "Profile Optimization" },
    ],
    cta: { sv: "Kontakta oss", en: "Contact Us" },
  },
  footer: {
    rights: { sv: "Alla rättigheter förbehållna.", en: "All rights reserved." },
    address: { sv: "Värnamo, Sverige", en: "Värnamo, Sweden" },
  },
  faq: {
    title: { sv: "Vanliga Frågor", en: "Frequently Asked Questions" },
    subtitle: {
      sv: "Här hittar du svar på de vanligaste frågorna om våra tjänster",
      en: "Find answers to the most common questions about our services",
    },
    items: [
      {
        q: { sv: "Vem är du?", en: "Who are you?" },
        a: {
          sv: "Jag heter William Lindsjö, är 16 år och grundare av siteVyro. Jag brinner för att hjälpa småföretag att synas online – med en personlig, långsiktig och prisvärd lösning.",
          en: "My name is William Lindsjö, I'm 16 years old and the founder of siteVyro. I'm passionate about helping small businesses get noticed online – with a personal, long-term and affordable solution.",
        },
      },
      {
        q: { sv: "Varför ska jag välja dig – du är ju bara 16 år?", en: "Why should I choose you – you're only 16?" },
        a: {
          sv: "Min ålder är min styrka! Jag har vuxit upp med internet, är hungrig, engagerad och har låga omkostnader. Du får samma kvalitet som en dyr byrå till en bråkdel av priset – och jag finns kvar i decennier.",
          en: "My age is my strength! I grew up with the internet, I'm hungry, dedicated and have low overhead. You get the same quality as an expensive agency at a fraction of the price – and I'll be around for decades.",
        },
      },
      {
        q: { sv: "Måste jag betala något löpande?", en: "Do I have to pay anything monthly?" },
        a: {
          sv: "Ja, webbunderhåll kostar 225 kr/månad (2 700 kr/år). Det ingår hosting, backup, 3 uppdateringar/mån, statistik och support. Ingen bindningstid.",
          en: "Yes, web maintenance costs SEK 225/month (SEK 2,700/year). It includes hosting, backup, 3 updates/month, statistics and support. No contract period.",
        },
      },
      {
        q: { sv: "Hur lång tid tar det att få min hemsida?", en: "How long does it take to get my website?" },
        a: {
          sv: "Inom 7 dagar från att du godkänt underlag har du ett första utkast att titta på.",
          en: "Within 7 days of approving the brief, you'll have a first draft to review.",
        },
      },
      {
        q: { sv: "Vad kostar en domän?", en: "How much does a domain cost?" },
        a: {
          sv: "Domänförnyelse kostar 250 kr/år. Det är en ren vidarefakturering – du betalar samma pris som jag.",
          en: "Domain renewal costs SEK 250/year. It's a pure pass-through – you pay the same price as I do.",
        },
      },
      {
        q: { sv: "Finns det någon kampanj just nu?", en: "Are there any promotions right now?" },
        a: {
          sv: "Ja! Tom 15 april får du GRATIS översättning till engelska (värde 3 000 kr) när du beställer webbpaket + underhåll.",
          en: "Yes! Until April 15 you get FREE English translation (value SEK 3,000) when you order a web package + maintenance.",
        },
      },
      {
        q: { sv: "Fungerar hemsidan i mobilen?", en: "Does the website work on mobile?" },
        a: {
          sv: "Absolut! Alla sidor byggs med mobile first – snabba, snygga och lättanvända i mobilen.",
          en: "Absolutely! All pages are built mobile first – fast, sleek and easy to use on mobile.",
        },
      },
      {
        q: { sv: "Syns jag på Google?", en: "Will I show up on Google?" },
        a: {
          sv: "Ja, alla paket innehåller grundläggande SEO. Välj tilläggen SEO (från 1 500 kr) eller GEO + SEO (från 2 500 kr) för extra synlighet – även i AI-chattbotar som ChatGPT.",
          en: "Yes, all packages include basic SEO. Choose the SEO add-on (from SEK 1,500) or GEO + SEO (from SEK 2,500) for extra visibility – even in AI chatbots like ChatGPT.",
        },
      },
      {
        q: { sv: "Hur får jag hjälp om något krånglar?", en: "How do I get help if something goes wrong?" },
        a: {
          sv: "Du når mig alltid direkt på 076-580 45 68 eller Info@sitevyro.com. Jag svarar inom 24 timmar.",
          en: "You can always reach me directly at 076-580 45 68 or Info@sitevyro.com. I respond within 24 hours.",
        },
      },
    ],
  },
};

type Translations = typeof translations;

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("sv");
  const toggleLang = useCallback(() => setLang((l) => (l === "sv" ? "en" : "sv")), []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
