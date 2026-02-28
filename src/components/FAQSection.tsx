import { useLanguage } from "@/contexts/LanguageContext";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { motion } from "framer-motion";

export default function FAQSection() {
  const { lang, t } = useLanguage();

  const faqData = t.faq.items.map((item, index) => ({
    id: index + 1,
    question: item.q[lang],
    answer: item.a[lang],
  }));

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
            {t.faq.title[lang]}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            {t.faq.subtitle[lang]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FaqAccordion
            data={faqData}
            className="max-w-[700px] mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
