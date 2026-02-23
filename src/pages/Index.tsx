import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ShowcaseSection from "@/components/ShowcaseSection";
import { DottedSurface } from "@/components/ui/dotted-surface";

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <DottedSurface />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ShowcaseSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
