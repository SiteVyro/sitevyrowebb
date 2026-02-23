import { useLanguage } from "@/contexts/LanguageContext";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import websitePreview from "@/assets/website-preview.jpg";

export default function ShowcaseSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={websitePreview}
        title={lang === "sv" ? "Webbplatser som imponerar" : "Websites that impress"}
        scrollToExpand={lang === "sv" ? "Scrolla för att utforska" : "Scroll to explore"}
        textBlend
      />
    </section>
  );
}
