// components/VerificationMethodology.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./animations/Reveal";
import SectionTitle from "./ui/SectionTitle";

const lifecycleSteps = [
  {
    id: "STEP_01",
    phase: "Specification Analysis",
    title: "Verification Planning",
    desc: "Extracting architectural boundaries, listing functional features, establishing corner cases, and defining the formal checking strategy.",
    metrics: "Target: 100% Feature Mapping",
    status: "COMPLETE",
    color: "#f59e0b" // WARNING Amber (In Development/Planning State)
  },
  {
    id: "STEP_02",
    phase: "Testbench Construction",
    title: "UVM OOP Architecture",
    desc: "Building modular, reusable verification environments containing transactions, drivers, monitors, scoreboards, and virtual sequencers.",
    metrics: "Framework: SV HVL / UVM Core",
    status: "ACTIVE",
    color: "#00c8ff" // Verification Cyan
  },
  {
    id: "STEP_03",
    phase: "Stimulus Generation",
    title: "Constrained Random & SVA",
    desc: "Deploying random transaction distributions to sweep state boundaries while embedding SystemVerilog Assertions to catch protocol violations.",
    metrics: "Assert Engine: Active Loop",
    status: "RUNNING",
    color: "#7c3aed" // Research Purple
  },
  {
    id: "STEP_04",
    phase: "Coverage Collection",
    title: "Metrics Dashboard & Debug",
    desc: "Compiling structural code coverage (line, branch, toggle, FSM) and functional cross-coverage metrics to trace verified design paths.",
    metrics: "Sim Error Log: 0 Bugs Detected",
    status: "MONITORING",
    color: "#ef4444" // BUG/FAIL Red (Active Checking)
  },
  {
    id: "STEP_05",
    phase: "Signoff Checklist",
    title: "Coverage Closure",
    desc: "Iterative test debugging, refinement of constraints, and target coverage grading. Achieving full verification signoff metrics.",
    metrics: "Grade Target: 100% Closure",
    status: "PASSING",
    color: "#10b981" // PASS Green
  }
];

export default function VerificationMethodology() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="methodology"
      style={{
        padding: "7rem 2.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <SectionTitle
        label="Methodology"
        title="Verification Flow Blueprint"
        subtitle="How I prove pre-silicon design correctness: from structural specifications to comprehensive coverage closure signoff."
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT COLUMN: PIPELINE STEPS SELECTOR (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-3">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            // PIPELINE STAGES
          </p>
          
          {lifecycleSteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <Reveal key={step.id} delay={idx * 0.05}>
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected 
                      ? "bg-white/5 border-cyan-400/30 shadow-[0_4px_20px_rgba(0,200,255,0.04)]" 
                      : "bg-white/1 border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step ID Code Segment */}
                    <span 
                      className="text-[11px] font-bold px-2 py-1 rounded bg-black/40 border transition-colors duration-300"
                      style={{ 
                        fontFamily: "'JetBrains Mono', monospace", 
                        color: isSelected ? "#00c8ff" : "#64748b",
                        borderColor: isSelected ? "rgba(0,200,255,0.2)" : "rgba(255,255,255,0.05)"
                      }}
                    >
                      {step.id}
                    </span>
                    
                    {/* Phase Titles */}
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {step.phase}
                      </p>
                      <h4 
                        className="text-[15px] font-bold transition-colors duration-200" 
                        style={{ 
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: isSelected ? "#ffffff" : "#94a3b8"
                        }}
                      >
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  {/* Operational Status Tickers */}
                  <div className="flex items-center gap-3">
                    <span 
                      className="hidden sm:inline text-[11px] font-mono text-gray-500"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {step.status}
                    </span>
                    <span 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? "animate-pulse" : ""}`}
                      style={{ 
                        background: step.color,
                        boxShadow: isSelected ? `0 0 10px ${step.color}` : "none"
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── RIGHT COLUMN: TELEMETRY INTERACTIVE MONITOR (5 Cols) ── */}
        <div className="lg:col-span-5 h-full">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            // REAL-TIME CONTEXT VIEW
          </p>
          
          <div 
            className="rounded-2xl p-6 border h-full transition-all duration-300"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              borderColor: "rgba(255,255,255,0.07)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Simulated Monitor Terminal Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 font-mono text-[10px]">
                  <span className="text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    LOG_ID: {lifecycleSteps[activeStep].id}_ANALYST
                  </span>
                  <span style={{ color: lifecycleSteps[activeStep].color, fontFamily: "'JetBrains Mono', monospace" }}>
                    SYS_STATE: {lifecycleSteps[activeStep].status}
                  </span>
                </div>

                {/* Core Description Text Block */}
                <div className="space-y-2">
                  <h3 className="text-white text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {lifecycleSteps[activeStep].title}
                  </h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {lifecycleSteps[activeStep].desc}
                  </p>
                </div>

                {/* Live Variables Sub-Block */}
                <div 
                  className="rounded-lg p-3 border text-[12px] flex items-center justify-between"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "rgba(0,0,0,0.2)",
                    borderColor: "rgba(255,255,255,0.05)"
                  }}
                >
                  <span className="text-gray-500">// ENGINE_METRIC:</span>
                  <span style={{ color: lifecycleSteps[activeStep].color }}>
                    {lifecycleSteps[activeStep].metrics}
                  </span>
                </div>

                {/* Cumulative Micro Dashboard Panel */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <p className="text-[10px] text-gray-600 font-mono tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    // GLOBAL SIMULATOR TELEMETRY
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-center text-mono text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <div className="p-2.5 rounded bg-black/30 border border-white/5">
                      <p className="text-gray-500 text-[9px] mb-1">GLOBAL BUGS FOUND</p>
                      <p className="text-red-400 font-bold">14 RTL ERRORS</p>
                    </div>
                    <div className="p-2.5 rounded bg-black/30 border border-white/5">
                      <p className="text-gray-500 text-[9px] mb-1">TOTAL ASSERTIONS</p>
                      <p className="text-green-400 font-bold">142 COMPLIANT</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}