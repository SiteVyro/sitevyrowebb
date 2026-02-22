import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: t.nav.services[lang], href: "#services" },
    { label: t.nav.about[lang], href: "#about" },
    { label: t.nav.contact[lang], href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight">
          Site<span className="text-primary">vyro</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground px-4 py-2 rounded-full bg-primary/[0.06] backdrop-blur-xl border border-primary/20 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.25)] transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2 rounded-full bg-primary/[0.06] backdrop-blur-xl border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.25)] transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            {lang === "sv" ? "EN" : "SV"}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-all bg-primary/[0.06] backdrop-blur-xl border border-primary/20 px-2.5 py-1 rounded-full"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "sv" ? "EN" : "SV"}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-1">
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="block h-[2px] bg-foreground transition-all" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block h-[2px] bg-foreground" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="block h-[2px] bg-foreground transition-all" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden glass"
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
