import Navbar from "@/components/Navbar";
import SocialFooter from "@/components/SocialFooter";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Check, Instagram, Facebook, Linkedin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { HorizontalScrollCarousel } from "@/components/ui/horizontal-scroll-carousel";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const platforms = [
  { name: "TikTok", icon: TikTokIcon },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "LinkedIn", icon: Linkedin },
];

const portfolioImages = [
  portfolio1, portfolio2, portfolio3, portfolio4,
  portfolio5, portfolio6, portfolio7,
];

export default function Social() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-black relative">
      <DottedSurface />
      <div className="relative z-10">
        <Navbar socialMode />

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold font-heading"
            >
              {t.socialMedia.title[lang]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t.socialMedia.subtitle[lang]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-base text-muted-foreground/80 max-w-2xl mx-auto"
            >
              {t.socialMedia.description[lang]}
            </motion.p>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {platforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlowCard
                    glowColor="purple"
                    customSize
                    className="!aspect-auto flex flex-col items-center justify-center gap-4 p-8"
                  >
                    <div className="flex items-center justify-center w-full">
                      <p.icon className="w-10 h-10 text-primary" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-center w-full">{p.name}</span>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services list */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold font-heading mb-8 text-center">
                {lang === "sv" ? "Vad som ingår" : "What's included"}
              </h2>
              <ul className="space-y-5">
                {t.socialMedia.services.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{s[lang]}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Om fotografen */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 md:p-12 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {lang === "sv" ? "Om Fotografen" : "About the Photographer"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4">
                {lang === "sv"
                  ? "Vår fotograf Simon Pieplow har över 5 års erfarenhet inom fotograferingsbranschen. Med ett öga för detaljer och en passion för att fånga det perfekta ögonblicket levererar han bilder som verkligen gör skillnad."
                  : "Our photographer Simon Pieplow has over 5 years of experience in the photography industry. With an eye for detail and a passion for capturing the perfect moment, he delivers images that truly make a difference."}
              </p>
              <p className="text-base text-muted-foreground/80 max-w-xl mx-auto">
                {lang === "sv"
                  ? "Simon har redan ett starkt nätverk av nöjda kunder och solida referenser från tidigare uppdrag inom restaurang, fastighet och event."
                  : "Simon already has a strong network of satisfied clients and solid references from previous assignments in restaurant, real estate and events."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Fotografens Tidigare Verk */}
        <section className="py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-4"
          >
            {lang === "sv" ? "Fotografens Tidigare Verk" : "Photographer's Previous Work"}
          </motion.h2>
          <HorizontalScrollCarousel images={portfolioImages} />
        </section>

        <SocialFooter />
      </div>
    </div>
  );
}
