import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

function PhonePickerButtons({ onPick }: { onPick: (num: string, label: string) => void }) {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        className="rounded-full px-6 py-4 border-primary/30 hover:bg-primary/10"
        onClick={() => onPick("0765804568", "Sitevyro")}
      >
        <Phone className="w-4 h-4 mr-2" />
        Sitevyro — 0765804568
      </Button>
      <Button
        variant="outline"
        className="rounded-full px-6 py-4 border-primary/30 hover:bg-primary/10"
        onClick={() => onPick("0732505039", lang === "sv" ? "Fotograf" : "Photographer")}
      >
        <Phone className="w-4 h-4 mr-2" />
        {lang === "sv" ? "Fotograf" : "Photographer"} — 0732505039
      </Button>
    </div>
  );
}

export function ContactUsButton({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const [showPicker, setShowPicker] = useState(false);

  const handlePick = (num: string, label: string) => {
    navigator.clipboard.writeText(num);
    toast({
      title: lang === "sv" ? "Telefonnummer kopierat!" : "Phone number copied!",
      description: `${label}: ${num}`,
    });
    setShowPicker(false);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className ?? ""}`}>
      {!showPicker ? (
        <Button
          onClick={() => setShowPicker(true)}
          size="lg"
          className="rounded-full px-10 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
        >
          {lang === "sv" ? "Kontakta oss" : "Contact Us"}
        </Button>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-1">
            {lang === "sv" ? "Välj vilket nummer du vill kopiera:" : "Choose which number to copy:"}
          </p>
          <PhonePickerButtons onPick={handlePick} />
        </>
      )}
    </div>
  );
}

export default function SocialFooter() {
  const { lang } = useLanguage();

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
        <ContactUsButton />
        <p className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sitevyro. {lang === "sv" ? "Alla rättigheter förbehållna." : "All rights reserved."}
        </p>
        <Link
          to="/vilkor"
          className="mt-3 inline-block text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Vilkor
        </Link>
      </div>
    </footer>
  );
}
