import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section id="hero">
      <div className="relative min-h-screen w-full flex items-end justify-center pb-24">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium glass glow-border text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                {t.hero.badge[lang]}
              </span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="mt-8 text-5xl sm:text-6xl md:text-8xl font-bold font-heading tracking-tight">
                <span className="block text-foreground">{t.hero.title1[lang]}</span>
                <span className="block gradient-text glow-text mt-2">{t.hero.title2[lang]}</span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.hero.subtitle[lang]}
              </p>
            </motion.div>

            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
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
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-16"
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto" />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
