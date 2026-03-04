import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function SocialFooter() {
  const { lang } = useLanguage();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("0732505039");
    toast({
      title: lang === "sv" ? "Telefonnummer kopierat!" : "Phone number copied!",
      description: "0732505039",
    });
  };

  return (
    <footer className="border-t border-border/50 py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl text-center">
        <h3 className="text-2xl font-heading font-bold mb-8">
          {lang === "sv" ? "Kontakta Oss" : "Contact Us"}
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
          <a
            href="mailto:Info@sitevyro.com"
            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
            Info@sitevyro.com
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <span className="flex items-center gap-3 text-muted-foreground">
            <Phone className="w-5 h-5" />
            <span className="text-foreground font-medium">Sitevyro:</span> 0765804568
          </span>
          <span className="flex items-center gap-3 text-muted-foreground">
            <Phone className="w-5 h-5" />
            <span className="text-foreground font-medium">{lang === "sv" ? "Fotograf:" : "Photographer:"}</span> 0732505039
          </span>
        </div>
        <Button
          onClick={handleCopyPhone}
          size="lg"
          className="rounded-full px-10 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          {lang === "sv" ? "Kontakta oss" : "Contact Us"}
        </Button>
        <p className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sitevyro. {lang === "sv" ? "Alla rättigheter förbehållna." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
