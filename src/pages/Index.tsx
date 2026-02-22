import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { BackgroundPathsParallax } from "@/components/ui/background-paths";

const ShowcaseSection = lazy(() => import("@/components/ShowcaseSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundPathsParallax>
        <Navbar />
        <HeroSection />
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <ShowcaseSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </BackgroundPathsParallax>
    </div>
  );
};

export default Index;
