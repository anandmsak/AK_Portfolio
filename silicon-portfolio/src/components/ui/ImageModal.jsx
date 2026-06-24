import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ImageModal({ src, alt, projectImages = [], setActiveZoomImage, onClose }) {
  // Synchronize internal index tracker with whichever image was clicked initially
  const initialIndex = projectImages.indexOf(src);
  const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  // Touch gesture state registers for mobile phone swiping
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum pixel distance required to register a swipe event
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (projectImages.length <= 1) return;
    const nextIdx = (currentIndex + 1) % projectImages.length;
    setCurrentIndex(nextIdx);
    setActiveZoomImage({ src: projectImages[nextIdx], alt: alt, images: projectImages, index: nextIdx });
  };

  const handlePrev = () => {
    if (projectImages.length <= 1) return;
    const prevIdx = (currentIndex - 1 + projectImages.length) % projectImages.length;
    setCurrentIndex(prevIdx);
    setActiveZoomImage({ src: projectImages[prevIdx], alt: alt, images: projectImages, index: prevIdx });
  };

  // Keyboard Event Registry Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, projectImages]);

  // Mobile Touch Acceleration Vector Calculators
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-zoom-out"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          
          {/* Main Viewer Frame Display Node */}
          <motion.img
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            src={projectImages[currentIndex] || src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl mix-blend-screen"
          />

          {/* Desktop Overlay UI Indicator Arrows */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950/60 border border-white/10 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 font-mono rounded-full items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                ◀
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950/60 border border-white/10 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 font-mono rounded-full items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Diagnostic Bottom Status Panel HUD bar */}
        <div className="mt-6 font-mono text-[10px] text-gray-500 flex items-center gap-6 relative z-10 select-none" onClick={(e) => e.stopPropagation()}>
          <span>HUD_FRAME_REGISTER: [0x0{currentIndex + 1} / 0x0{projectImages.length}]</span>
          <span className="hidden sm:inline text-gray-600">// USE LEFT/RIGHT KEYS OR TOUCH SWIPE</span>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-cyan-400 border border-white/10 bg-white/5 px-3 py-1 rounded transition-colors cursor-pointer text-[9px]"
          >
            ✕ TERMINATE_VIEW
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}