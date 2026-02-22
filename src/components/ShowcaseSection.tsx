import { useLanguage } from "@/contexts/LanguageContext";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ShowcaseSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">
              {lang === "sv" ? "Se vad vi kan göra" : "See what we can do"}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold font-heading">
              <span className="text-foreground">
                {lang === "sv" ? "Webbplatser som" : "Websites that"}
              </span>
              <br />
              <span className="gradient-text glow-text">
                {lang === "sv" ? "imponerar" : "impress"}
              </span>
            </h2>
          </div>
        }
      >
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-background rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              { label: lang === "sv" ? "Responsiv Design" : "Responsive Design", icon: "📱" },
              { label: lang === "sv" ? "Snabb Laddning" : "Fast Loading", icon: "⚡" },
              { label: "SEO", icon: "🔍" },
              { label: lang === "sv" ? "Modern UI" : "Modern UI", icon: "✨" },
              { label: lang === "sv" ? "Säkerhet" : "Security", icon: "🔒" },
              { label: lang === "sv" ? "Support" : "Support", icon: "💬" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-xl p-6 text-center glow-border hover-glow"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
