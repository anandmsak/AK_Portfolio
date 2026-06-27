// src/App.jsx
import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 

import CursorTrail from "./components/ui/CursorTrail";
import ParticleField from "./components/ui/ParticleField";
import PCBBackground from "./components/ui/PCBBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Research from "./sections/Research";
import Achievements from "./sections/Achievements";
import VerificationMethodology from "./components/VerificationMethodology"; // Verification Flow Blueprint// Verification Flow Carousel
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import ImageModal from "./components/ui/ImageModal"; 
import BootScreen from "./components/ui/BootScreen"; 

function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(0,245,255,0.1), rgba(245,158,11,0.06), transparent)",
        margin: "0 auto",
      }}
    />
  );
}

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeZoomImage, setActiveZoomImage] = useState(null);

  // Keyboard Navigation for Image Magnification Modals
  useEffect(() => {
    if (!activeZoomImage || !activeZoomImage.images || activeZoomImage.images.length <= 1) return;

    const handleKeyDown = (e) => {
      const { images, index, alt } = activeZoomImage;

      if (e.key === "ArrowRight") {
        const nextIdx = (index + 1) % images.length;
        setActiveZoomImage({ src: images[nextIdx], alt, images, index: nextIdx });
      }
      if (e.key === "ArrowLeft") {
        const prevIdx = (index - 1 + images.length) % images.length;
        setActiveZoomImage({ src: images[prevIdx], alt, images, index: prevIdx });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeZoomImage]);

  const [touchStart, setTouchStart] = useState(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !activeZoomImage || !activeZoomImage.images || activeZoomImage.images.length <= 1) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const { images, index, alt } = activeZoomImage;
    if (distance > minSwipeDistance) {
      const nextIdx = (index + 1) % images.length;
      setActiveZoomImage({ src: images[nextIdx], alt, images, index: nextIdx });
    } else if (distance < -minSwipeDistance) {
      const prevIdx = (index - 1 + images.length) % images.length;
      setActiveZoomImage({ src: images[prevIdx], alt, images, index: prevIdx });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050a18] text-white">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot-sequence" onComplete={() => setIsBooted(true)} />
        ) : (
          <motion.div 
            key="app-workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CursorTrail />
            <ParticleField />
            <PCBBackground />

            <Navbar />

            <main className="relative z-10">
              <Hero />
              <SectionDivider />
              <About />
              
              <SectionDivider />
              <Skills />
              <SectionDivider />
              
              {/* 1. Verification Flow Blueprint renders here first */}
              <VerificationMethodology />
              <SectionDivider />

              {/* 2. STANDALONE POSITION: Rendered directly below the Blueprint track */}
              

              <SectionDivider />
              
              <Projects activeZoomImage={activeZoomImage} setActiveZoomImage={setActiveZoomImage} />
              
              <SectionDivider />
              <Research />
              <SectionDivider />
              <Achievements />
              
              <SectionDivider />
              <Certifications setActiveZoomImage={setActiveZoomImage} />
              
              <SectionDivider />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Modal Overlay rendering context */}
      {activeZoomImage && (
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0"
          style={{ zIndex: 999999 }}
        >
          <ImageModal 
            src={activeZoomImage.src} 
            alt={activeZoomImage.alt} 
            projectImages={activeZoomImage.images || [activeZoomImage.src]}
            setActiveZoomImage={setActiveZoomImage}
            onClose={() => setActiveZoomImage(null)} 
          />
        </div>
      )}
    </div>
  );
}

export default App;