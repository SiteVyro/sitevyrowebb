import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function SocialMediaSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-10 md:p-16 hover-glow"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Share2 className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            {t.socialMedia.title[lang]}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            {t.socialMedia.subtitle[lang]}
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/social">
              {lang === "sv" ? "Läs mer" : "Learn more"}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
