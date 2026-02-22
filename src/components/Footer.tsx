import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="border-t border-border/50 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <img src={logo} alt="Sitevyro" className="h-12 w-auto" width={48} height={48} loading="lazy" />
            <p className="mt-2 text-sm text-muted-foreground">{t.footer.address[lang]}</p>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>info@sitevyro.com</p>
            <p>0765804568</p>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sitevyro. {t.footer.rights[lang]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
