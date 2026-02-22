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
  footer: {
    rights: { sv: "Alla rättigheter förbehållna.", en: "All rights reserved." },
    address: { sv: "Värnamo, Sverige", en: "Värnamo, Sweden" },
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
