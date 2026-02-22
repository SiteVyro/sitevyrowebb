import { useLanguage } from "@/contexts/LanguageContext";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export default function ShowcaseSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg mb-4"
            >
              {lang === "sv" ? "Se vad vi kan göra" : "See what we can do"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-heading"
            >
              <span className="text-foreground">
                {lang === "sv" ? "Webbplatser som" : "Websites that"}
              </span>
              <br />
              <span className="gradient-text glow-text">
                {lang === "sv" ? "imponerar" : "impress"}
              </span>
            </motion.h2>
          </div>
        }
      >
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-background rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              { label: lang === "sv" ? "Responsiv Design" : "Responsive Design", icon: "📱" },
              { label: lang === "sv" ? "Snabb Laddning" : "Fast Loading", icon: "⚡" },
              { label: "SEO", icon: "🔍" },
              { label: lang === "sv" ? "Modern UI" : "Modern UI", icon: "✨" },
              { label: lang === "sv" ? "Säkerhet" : "Security", icon: "🔒" },
              { label: lang === "sv" ? "Support" : "Support", icon: "💬" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center glow-border hover-glow"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
