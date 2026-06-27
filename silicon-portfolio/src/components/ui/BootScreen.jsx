import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootScreen({ onComplete }) {
  const [stage, setStage] = useState(1);
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    // Stage Transitions Timeline
    const timers = [
      setTimeout(() => setStage(2), 1200), // Move to Stage 2: Packaging
      setTimeout(() => setStage(3), 2400), // Move to Stage 3: Testbench Connected
      setTimeout(() => setStage(4), 3600), // Move to Stage 4: Execution & Counter
    ];

    const exitTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  // Fast-counting simulation stimulus regression counter for Stage 4
  useEffect(() => {
    if (stage !== 4) return;
    
    let currentCount = 0;
    const targetCount = 100000;
    const duration = 1600; // 1.6 seconds to complete the count
    const startTime = performance.now();

    const animateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function to slow down slightly near the end
      const easeOutQuad = progress * (2 - progress);
      currentCount = Math.floor(easeOutQuad * targetCount);
      
      setTestCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[999999] bg-[#020408] flex flex-col items-center justify-center p-6 font-mono text-xs select-none antialiased text-slate-300">
      
      {/* Background Silicon Wafer Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(6, 182, 212, 0.15) 2px, transparent 2px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="w-full max-w-md bg-black/40 border border-slate-900 p-6 rounded-xl shadow-2xl relative backdrop-blur-md">
        
        {/* Step-by-Step Node Header Indicator Tracker */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-6 text-[9px] tracking-widest text-slate-500">
          <span>FAB_LINE :: TSMC_N3_SIM</span>
          <div className="flex gap-1.5 font-bold">
            <span className={stage >= 1 ? "text-cyan-400" : "text-slate-800"}>STG1</span>
            <span>&gt;</span>
            <span className={stage >= 2 ? "text-cyan-400" : "text-slate-800"}>STG2</span>
            <span>&gt;</span>
            <span className={stage >= 3 ? "text-cyan-400" : "text-slate-800"}>STG3</span>
            <span>&gt;</span>
            <span className={stage >= 4 ? "text-cyan-400" : "text-slate-800"}>STG4</span>
          </div>
        </div>

        {/* Content Stages Matrix Pipeline */}
        <div className="space-y-5 min-h-[140px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* STAGE 1: Wafer Fabrication Complete */}
            {stage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-2 text-center"
              >
                <div className="text-slate-500 text-[10px] tracking-widest uppercase">Stage 1: Lithography & Etching</div>
                <div className="text-cyan-400 font-bold tracking-[0.2em] text-sm animate-pulse">FAB PROCESS COMPLETE</div>
                <p className="text-[10px] text-slate-500 mt-1">Silicon wafer handling extraction authorized.</p>
              </motion.div>
            )}

            {/* STAGE 2: Chip Packaging Complete */}
            {stage === 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-2 text-center"
              >
                <div className="text-slate-500 text-[10px] tracking-widest uppercase">Stage 2: Flip-Chip Ball Grid Assembly</div>
                <div className="text-amber-400 font-bold tracking-[0.2em] text-sm">ASIC CORE INITIALIZED</div>
                <p className="text-[10px] text-slate-500 mt-1">Die layout bonded. VDD/VSS pins drawing nominal power.</p>
              </motion.div>
            )}

            {/* STAGE 3: Testbench Connected */}
            {stage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-2 text-center"
              >
                <div className="text-slate-500 text-[10px] tracking-widest uppercase">Stage 3: Pre-Silicon Verification Top</div>
                <div className="text-indigo-400 font-bold tracking-[0.2em] text-sm">TESTBENCH CONNECTED</div>
                <p className="text-[10px] text-slate-500 mt-1">UVM virtual interfaces bound to structural hardware DUT.</p>
              </motion.div>
            )}

            {/* STAGE 4: Random Stochastics Regression Execution Loop */}
            {stage === 4 && (
              <motion.div
                key="stage-4"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 text-center"
              >
                <div className="text-slate-500 text-[10px] tracking-widest uppercase">Stage 4: Randomized Constrained Coverage</div>
                
                <div className="font-bold text-slate-200 tabular-nums tracking-wider text-sm bg-slate-950/60 py-2 px-4 rounded border border-slate-900 inline-block min-w-[220px]">
                  {testCount.toLocaleString()} <span className="text-[10px] text-cyan-400 font-normal">TESTS</span>
                </div>
                
                {testCount >= 100000 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-emerald-400 font-bold tracking-[0.25em] text-xs pt-1.5 uppercase"
                  >
                    SIGNOFF READY ✓
                  </motion.div>
                ) : (
                  <div className="text-slate-500 text-[10px] tracking-wider animate-pulse">EXECUTING RANDOM REGRESSIONS...</div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Hardware Metric Display Status Bar */}
        <div className="border-t border-slate-900 pt-3 mt-6 flex justify-between text-[8px] text-slate-600 tracking-widest">
          <span>DUT_REV: 1.0A</span>
          <span>SIG_STATE: LOCKED</span>
        </div>

      </div>
    </div>
  );
}