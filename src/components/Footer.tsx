import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Shield } from "lucide-react";
import AdminLoginModal from "./AdminLoginModal";

export default function Footer() {
  const { lang, t } = useLanguage();
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <footer className="border-t border-border/50 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-xl font-heading font-bold">
              Site<span className="text-primary">vyro</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.footer.address[lang]}</p>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>info@sitevyro.com</p>
            <p>
              <span className="text-foreground font-medium">Sitevyro:</span> 0765804568
            </p>
            <p>
              <span className="text-foreground font-medium">{lang === "sv" ? "Fotograf:" : "Photographer:"}</span> 0732505039
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sitevyro. {t.footer.rights[lang]}
            </p>
            <div className="mt-2 flex md:justify-end gap-3 items-center">
              <Link
                to="/vilkor"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Vilkor
              </Link>
              <button
                onClick={() => setAdminOpen(true)}
                aria-label="Admin"
                title="Admin"
                className="text-muted-foreground/40 hover:text-primary transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminLoginModal open={adminOpen} onOpenChange={setAdminOpen} />
    </footer>
  );
}
