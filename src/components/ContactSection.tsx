import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading">{t.contact.title[lang]}</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">{t.contact.subtitle[lang]}</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            {[
              { icon: Phone, label: "0765804568" },
              { icon: Mail, label: "info@sitevyro.com" },
              { icon: MapPin, label: t.footer.address[lang] },
            ].map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground text-lg">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
