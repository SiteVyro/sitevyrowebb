import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ShowcaseSection from "@/components/ShowcaseSection";
import { BackgroundPathsParallax } from "@/components/ui/background-paths";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundPathsParallax>
        <Navbar />
        <HeroSection />
        <ShowcaseSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </BackgroundPathsParallax>
    </div>
  );
};

export default Index;
