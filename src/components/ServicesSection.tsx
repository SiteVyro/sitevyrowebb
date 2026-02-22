import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Palette, MousePointerClick, Search, Wrench, Server, Pen } from "lucide-react";

const serviceIcons = [Palette, MousePointerClick, Search, Wrench, Server, Pen];
const serviceKeys = ["webdesign", "uiux", "seo", "maintenance", "hosting", "logo"] as const;

export default function ServicesSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading">{t.services.title[lang]}</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">{t.services.subtitle[lang]}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group glass rounded-2xl p-8 hover-glow cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{t.services[key].title[lang]}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.services[key].desc[lang]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
