import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Home, Briefcase, Users, Mail, Share2 } from "lucide-react";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const navItems = [
    { name: lang === "sv" ? "Hem" : "Home", href: "#hero", icon: <Home className="w-4 h-4" /> },
    { name: t.nav.services[lang], href: "#services", icon: <Briefcase className="w-4 h-4" /> },
    { name: t.nav.about[lang], href: "#about", icon: <Users className="w-4 h-4" /> },
    { name: lang === "sv" ? "Sociala Medier" : "Social Media", href: "/social", icon: <Share2 className="w-4 h-4" /> },
    { name: t.nav.contact[lang], href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 inset-x-0 mx-auto z-50 flex max-w-fit items-center justify-center gap-1 rounded-full bg-primary/[0.06] backdrop-blur-xl border border-primary/20 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)] px-2 py-2"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="text-base font-heading font-bold text-foreground tracking-tight px-4 pr-2"
        >
          Site<span className="text-primary">vyro</span>
        </a>

        {/* Nav items */}
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="relative text-sm font-medium text-muted-foreground px-4 py-2 rounded-full hover:text-primary hover:bg-primary/10 transition-all duration-300 hidden sm:block"
          >
            {item.name}
          </a>
        ))}

        {/* Mobile icons */}
        {navItems.map((item) => (
          <a
            key={`mobile-${item.href}`}
            href={item.href}
            className="text-muted-foreground p-2 rounded-full hover:text-primary hover:bg-primary/10 transition-all duration-300 sm:hidden"
          >
            {item.icon}
          </a>
        ))}

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 ml-1"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{lang === "sv" ? "EN" : "SV"}</span>
        </button>
      </motion.nav>
    </AnimatePresence>
  );
}
