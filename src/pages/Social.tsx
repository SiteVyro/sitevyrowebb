import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Check, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Social() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-black relative">
      <DottedSurface />
      <div className="relative z-10">
        <Navbar />

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
                  className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-8 flex flex-col items-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <p.icon className="w-10 h-10 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{p.name}</span>
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

        {/* CTA */}
        <section className="py-16 px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              <a href="/#contact">{t.socialMedia.cta[lang]}</a>
            </Button>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
