import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-heading text-primary glow-text">{count}+</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading">{t.about.title[lang]}</h2>
            <p className="mt-4 text-muted-foreground text-lg">{t.about.subtitle[lang]}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t.about.p1[lang]}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.about.p2[lang]}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-10 glow-border"
          >
            <div className="grid grid-cols-3 gap-8">
              <AnimatedCounter target={150} label={t.about.stat1Label[lang]} />
              <AnimatedCounter target={120} label={t.about.stat2Label[lang]} />
              <AnimatedCounter target={5} label={t.about.stat3Label[lang]} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
