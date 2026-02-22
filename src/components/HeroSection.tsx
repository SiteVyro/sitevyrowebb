import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="hero">
      <HeroGeometric
        badge={t.hero.badge[lang]}
        title1={t.hero.title1[lang]}
        title2={t.hero.title2[lang]}
        subtitle={t.hero.subtitle[lang]}
      >
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:scale-105"
          >
            {t.hero.cta[lang]}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass glow-border font-semibold text-sm text-foreground transition-all duration-300 hover:bg-secondary/80 hover:scale-105"
          >
            {t.hero.ctaSecondary[lang]}
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </motion.div>
      </HeroGeometric>
    </section>
  );
}
