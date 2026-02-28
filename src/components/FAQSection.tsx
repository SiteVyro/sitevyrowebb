import { useLanguage } from "@/contexts/LanguageContext";
import ScrollFAQAccordion from "@/components/ui/scroll-faqaccordion";

export default function FAQSection() {
  const { lang, t } = useLanguage();

  const faqData = t.faq.items.map((item, index) => ({
    id: index + 1,
    question: item.q[lang],
    answer: item.a[lang],
  }));

  return (
    <section id="faq">
      <ScrollFAQAccordion
        data={faqData}
        title={t.faq.title[lang]}
        subtitle={t.faq.subtitle[lang]}
      />
    </section>
  );
}
