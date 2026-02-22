import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [focused, setFocused] = useState<string | null>(null);

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

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {[
              { icon: Phone, label: "0765804568" },
              { icon: Mail, label: "info@sitevyro.com" },
              { icon: MapPin, label: t.footer.address[lang] },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground text-lg">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8 glow-border flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {(["name", "email"] as const).map((field) => (
              <div key={field} className="relative">
                <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact[field][lang]}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={t.contact[`${field}Placeholder`][lang]}
                  onFocus={() => setFocused(field)}
                  onBlur={() => setFocused(null)}
                  className={`w-full px-4 py-3 rounded-xl bg-background/60 border text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 ${
                    focused === field ? "border-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]" : "border-border"
                  }`}
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact.message[lang]}</label>
              <textarea
                rows={4}
                placeholder={t.contact.messagePlaceholder[lang]}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`w-full px-4 py-3 rounded-xl bg-background/60 border text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 resize-none ${
                  focused === "message" ? "border-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]" : "border-border"
                }`}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
            >
              {t.contact.send[lang]}
              <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
