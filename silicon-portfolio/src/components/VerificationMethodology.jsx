// components/VerificationMethodology.jsx
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
    color: "#f59e0b",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l6-6" /></svg>)
  },
  {
    id: "STEP_02",
    phase: "Testbench Construction",
    title: "UVM OOP Architecture",
    desc: "Building modular, reusable verification environments containing transactions, drivers, monitors, scoreboards, and virtual sequencers.",
    metrics: "Framework: SV HVL / UVM Core",
    status: "ACTIVE",
    color: "#00c8ff",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>)
  },
  {
    id: "STEP_03",
    phase: "Stimulus Generation",
    title: "Constrained Random & SVA",
    desc: "Deploying random transaction distributions to sweep state boundaries while embedding SystemVerilog Assertions to catch protocol violations.",
    metrics: "Assert Engine: Active Loop",
    status: "RUNNING",
    color: "#7c3aed",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5" /></svg>)
  },
  {
    id: "STEP_04",
    phase: "Coverage Collection",
    title: "Metrics Dashboard & Debug",
    desc: "Compiling structural code coverage (line, branch, toggle, FSM) and functional cross-coverage metrics to trace verified design paths.",
    metrics: "Sim Error Log: 0 Bugs Detected",
    status: "MONITORING",
    color: "#ef4444",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M18 20V10M12 20V4M6 20v-6" /></svg>)
  },
  {
    id: "STEP_05",
    phase: "Signoff Checklist",
    title: "Coverage Closure",
    desc: "Iterative test debugging, refinement of constraints, and target coverage grading. Achieving full verification signoff metrics.",
    metrics: "Grade Target: 100% Closure",
    status: "PASSING",
    color: "#10b981",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>)
  }
];

const verificationSteps = [
  { label: "SystemVerilog", desc: "Object Oriented Programming, interfaces, virtual methods, and testbench structures.", color: "#00f2fe", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>), logId: "CORE_SV_HVL", state: "STABLE", metric: "HVL Standard Compliance: 100%" },
  { label: "UVM Architecture", desc: "Advanced operational factory overrides, structured phase methods, agents, drivers, and monitors.", color: "#4facfe", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>), logId: "UVM_FACTORY", state: "ACTIVE", metric: "Env Base Classes: Reusable" },
  { label: "Formal Verification", desc: "Mathematical property checking routines, bounded state space evaluation, and JasperGold operations.", color: "#00ff87", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l6-6" /></svg>), logId: "FORMAL_JASPER", state: "PROVING", metric: "State Space Depth: Bounded" },
  { label: "Constrained Random", desc: "Automated test generator randomization seed tracking distributions, and solver expressions.", color: "#667eea", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18" opacity="0.3" /></svg>), logId: "CRV_STIMULUS", state: "SOLVING", metric: "Distribution Weights: Active" },
  { label: "Functional Coverage", desc: "Functional covergroups, explicit cross coverage metrics, and sample events.", color: "#ff0844", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-3.75 3.75M12 4.5l3.75 3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15" /></svg>), logId: "FUNC_COV_DB", state: "SAMPLING", metric: "UCDB Target Grade: 94.2%" },
  { label: "SVA Assertions", desc: "Concurrent protocol assertions checking for temporal interface violations.", color: "#ffb199", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>), logId: "SVA_CONCURRENT", state: "MONITOR", metric: "Temporal Violation: 0 Fails" },
  { label: "Gate-Level Sim", desc: "Running netlist simulations backed by standard delay format (SDF) timing backannotations.", color: "#f12711", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>), logId: "GLS_TIMING", state: "RUNNING", metric: "SDF Backannotation: Active" },
  { label: "Testbench Scripting", desc: "Automated regression execution tracks using optimized Makefile engines, Python filters, and Perl scripts.", color: "#f5576c", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>), logId: "SCRIPT_AUTOMATE", state: "STANDBY", metric: "Python Parser Version: 3.11" },
  { label: "CI/CD Regressions", desc: "Continuous regression farm loops managed by Jenkins server pipelines inside high-density compute server farms.", color: "#b180ff", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>), logId: "CICD_REGRESSION", state: "EXECUTING", metric: "Compute Grid Load: Optimized" },
  { label: "Protocol Expertise", desc: "Pre-silicon bus expertise covering PCIe, AMBA AXI/AHB interconnects, and high-speed NVMe endpoints.", color: "#fed22a", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m1.5 7.5H3m1.5 3.75h15A2.25 2.25 0 0021.75 17.25v-10.5A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zM10.5 7.5v6.75m3.75-5.25v3.75m3.75-2.25V12" /></svg>), logId: "PROTOCOL_INTERCONNECT", state: "COMPLIANT", metric: "Bus Arbiters Checked: 100%" }
];

const SCALE = 0.85;
const CARD_W = Math.round(150 * SCALE);      
const CARD_H = Math.round(210 * SCALE);      
const ORBIT_RADIUS = Math.round(280 * SCALE); 

export default function VerificationMethodology() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isGlowAmplified, setIsGlowAmplified] = useState(false);
  const [selectedDisplaySource, setSelectedDisplaySource] = useState({ type: "PIPELINE", index: 0 });

  const dragStartX = useRef(0);
  const rotationAtStart = useRef(0);
  const carouselInnerRef = useRef(null);
  const backgroundTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const glowTimeoutRef = useRef(null);

  const QUANTITY = verificationSteps.length;
  const DRAG_SPEED_FACTOR = 0.35;

  useEffect(() => {
    const updatePhysicsClock = () => {
      backgroundTimeRef.current += 0.15;
      if (!isDragging && !isReturning && !isGlowAmplified) {
        setCurrentRotation((prev) => (prev - 0.15) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(updatePhysicsClock);
    };
    animationFrameRef.current = requestAnimationFrame(updatePhysicsClock);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isDragging, isReturning, isGlowAmplified]);

  const rotateToCardIndex = useCallback((idx, sourceCategory = "PIPELINE") => {
    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    
    const targetAngle = -((360 / QUANTITY) * idx);
    setIsReturning(true);
    setCurrentRotation(targetAngle);

    setTimeout(() => {
      setIsReturning(false);
      setIsGlowAmplified(true);
      setSelectedDisplaySource({ type: sourceCategory, index: idx });

      glowTimeoutRef.current = setTimeout(() => {
        setIsGlowAmplified(false);
        setIsReturning(true);
        const catchupTargetOffset = -(backgroundTimeRef.current % 360);
        setCurrentRotation(catchupTargetOffset);
        setTimeout(() => setIsReturning(false), 750);
      }, 5000);

    }, 350);
  }, [QUANTITY]);

  const handlePipelineStepClick = (idx) => {
    setActiveStep(idx);
    rotateToCardIndex(idx, "PIPELINE");
  };

  const handleOrbitCardClick = (idx) => {
    if (idx < lifecycleSteps.length) {
      setActiveStep(idx);
      rotateToCardIndex(idx, "PIPELINE");
    } else {
      rotateToCardIndex(idx, "CAROUSEL_ONLY");
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    setIsDragging(true);
    setIsReturning(false);
    setIsGlowAmplified(false);
    dragStartX.current = e.clientX;
    rotationAtStart.current = currentRotation;
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setCurrentRotation(rotationAtStart.current + deltaX * DRAG_SPEED_FACTOR);
  }, [isDragging]);

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsReturning(true);

    const anglePerCard = 360 / QUANTITY;
    const targetClosestAngle = Math.round(currentRotation / anglePerCard) * anglePerCard;
    setCurrentRotation(targetClosestAngle);

    let normalizedIndex = Math.round(-targetClosestAngle / anglePerCard) % QUANTITY;
    if (normalizedIndex < 0) normalizedIndex += QUANTITY;
    
    if (normalizedIndex < lifecycleSteps.length) {
      setActiveStep(normalizedIndex);
      setSelectedDisplaySource({ type: "PIPELINE", index: normalizedIndex });
    } else {
      setSelectedDisplaySource({ type: "CAROUSEL_ONLY", index: normalizedIndex });
    }

    setTimeout(() => {
      setIsReturning(false);
      setIsGlowAmplified(true);

      glowTimeoutRef.current = setTimeout(() => {
        setIsGlowAmplified(false);
        setIsReturning(true);
        const catchupTargetOffset = -(backgroundTimeRef.current % 360);
        setCurrentRotation(catchupTargetOffset);
        setTimeout(() => setIsReturning(false), 750);
      }, 5000);
    }, 350);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    } else {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    };
  }, [isDragging, handlePointerMove]);

  const renderedContextData = useMemo(() => {
    if (selectedDisplaySource.type === "PIPELINE") {
      const step = lifecycleSteps[selectedDisplaySource.index];
      return {
        logId: `${step.id}_ANALYST`,
        state: `SYS_STATE: ${step.status}`,
        title: step.title,
        desc: step.desc,
        metricLabel: "// ENGINE_METRIC:",
        metrics: step.metrics,
        color: step.color
      };
    } else {
      const step = verificationSteps[selectedDisplaySource.index];
      return {
        logId: `LOG_ID: ${step.logId}`,
        state: `DUT_STATE: ${step.state}`,
        title: step.label,
        desc: step.desc,
        metricLabel: "// STATUS_METRIC:",
        metrics: step.metric,
        color: step.color
      };
    }
  }, [selectedDisplaySource]);

  return (
    <section
      id="methodology"
      style={{
        padding: "5rem 2.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <SectionTitle
        label="Methodology"
        title="Verification Flow Blueprint"
        subtitle="How I prove pre-silicon design correctness: from structural specifications to comprehensive coverage closure signoff."
      />

      <div className="grid lg:grid-cols-12 gap-8 items-stretch mt-6">
        
        {/* ── LEFT COLUMN: PIPELINE STEPS SELECTOR ── */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-center select-none">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-2 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            // PIPELINE STAGES
          </p>
          
          {lifecycleSteps.map((step, idx) => {
            const isSelected = activeStep === idx && selectedDisplaySource.type === "PIPELINE";
            return (
              <Reveal key={step.id} delay={idx * 0.04}>
                <div
                  onClick={() => handlePipelineStepClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected 
                      ? "bg-white/5 border-cyan-400/30 shadow-[0_4px_20px_rgba(0,200,255,0.04)]" 
                      : "bg-white/1 border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-4">
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

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[11px] font-mono text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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

        {/* ── PARALLEL RIGHT COLUMN: RE-WIDENED EXTENDED CONTEXT TERMINAL ── */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between">
          <div 
            className="rounded-2xl p-6 border flex flex-col justify-between relative overflow-visible bg-gradient-to-b from-white/[0.03] to-transparent border-white/5 shadow-2xl min-h-[520px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top Terminal Header Bar Area */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/5 font-mono text-[10px] select-none shrink-0">
              <span className="text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {renderedContextData.logId}
              </span>
              <span style={{ color: renderedContextData.color, fontFamily: "'JetBrains Mono', monospace" }}>
                {renderedContextData.state}
              </span>
            </div>

            {/* INTEGRATED PERSPECTIVE INTERACTIVE HUB STAGE */}
            <div 
              className="w-full h-[220px] flex items-center justify-center relative touch-none select-none my-4 overflow-visible shrink-0"
              onPointerDown={handlePointerDown}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div 
                ref={carouselInnerRef}
                style={{ 
                  '--quantity': QUANTITY,
                  transform: `perspective(1200px) rotateX(-10deg) rotateY(${currentRotation}deg)`,
                  transformStyle: "preserve-3d",
                  transition: isReturning ? "transform 750ms cubic-bezier(0.23, 1, 0.32, 1)" : "none",
                  width: CARD_W,
                  height: CARD_H
                }}
                className="absolute"
              >
                {verificationSteps.map((step, idx) => {
                  const isCurrentActive = selectedDisplaySource.index === idx;
                  
                  const activeBoxShadow = isCurrentActive && isGlowAmplified
                    ? `0 0 30px ${step.color}, inset 0 0 14px ${step.color}`
                    : `0 0 12px ${step.color}15`;

                  return (
                    <div 
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); handleOrbitCardClick(idx); }}
                      style={{ 
                        '--index': idx,
                        transform: `rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(${ORBIT_RADIUS}px)`,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "visible",
                        borderColor: isCurrentActive && isGlowAmplified ? step.color : "rgba(255,255,255,0.06)",
                        boxShadow: activeBoxShadow,
                        transition: "border-color 450ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 450ms cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                      className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center rounded-[11px] bg-[#090d1a]/95 transition-all duration-300 cursor-pointer"
                    >
                      {/* Glassmorphic Panel Core Content Card */}
                      <div className="absolute inset-[2.5px] z-[2] bg-[#090d1a]/98 rounded-[9px] border border-white/10 flex items-center justify-center p-2.5 box-border">
                        <div className="text-white flex flex-col items-center gap-1.5 pointer-events-none text-center">
                          
                          {/* STAGGERED LINE DRAWING ICON WRAPPER CHASSIS */}
                          <div 
                            className="w-7 h-7 flex items-center justify-center drop-shadow-[0_0_8px_currentColor] mb-0.5 wireframe-trace-icon" 
                            style={{ color: step.color, '--icon-index': idx }}
                          >
                            {step.icon}
                          </div>

                          <h4 
                            className="m-0 text-[10px] font-bold tracking-wide font-mono uppercase leading-tight transition-colors duration-300" 
                            style={{ 
                              fontFamily: "'JetBrains Mono', monospace",
                              color: isCurrentActive && isGlowAmplified ? "#ffffff" : "#94a3b8"
                            }}
                          >
                            {step.label}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Ambient Base Glow Background Layer */}
                      <div 
                        style={{ backgroundColor: step.color }} 
                        className={`absolute z-[1] top-[20%] left-[20%] w-[90px] h-[95px] rounded-full filter blur-[15px] transition-opacity duration-500 ${isCurrentActive ? "opacity-35" : "opacity-[0.12]"}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SPLIT WIDE SQUARE LOWER COMPARTMENT READOUTS */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t border-white/5 items-end shrink-0 select-text">
              
              {/* Left Sub-Deck Layout: Phase Core Descriptions */}
              <div className="md:col-span-7 space-y-1">
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest select-none">// REAL-TIME CONTEXT DATA</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedDisplaySource.type}_${selectedDisplaySource.index}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    <h3 className="text-white text-base font-bold uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {renderedContextData.title}
                    </h3>
                    <p className="text-gray-400 text-[12.5px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {renderedContextData.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Sub-Deck Layout: Metric Blocks and Readouts */}
              <div className="md:col-span-5 space-y-3.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedDisplaySource.type}_${selectedDisplaySource.index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div 
                      className="rounded-lg p-2.5 border text-[11px] flex items-center justify-between font-mono select-none"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "rgba(0,0,0,0.2)",
                        borderColor: "rgba(255,255,255,0.05)"
                      }}
                    >
                      <span className="text-gray-500">{renderedContextData.metricLabel}</span>
                      <span style={{ color: renderedContextData.color }}>
                        {renderedContextData.metrics}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Unified Simulator Telemetry Box Row */}
                <div className="grid grid-cols-2 gap-2 text-center text-mono text-[10px] select-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <div className="p-2 rounded bg-black/30 border border-white/5">
                    <p className="text-gray-500 text-[8px] mb-0.5 uppercase">GLOBAL BUGS FOUND</p>
                    <p className="text-red-400 font-bold">14 RTL ERRORS</p>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/5">
                    <p className="text-gray-500 text-[8px] mb-0.5 uppercase">TOTAL ASSERTIONS</p>
                    <p className="text-green-400 font-bold">142 COMPLIANT</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes rotating_carousel {
          from { transform: perspective(1200px) rotateX(-10deg) rotateY(0deg); }
          to { transform: perspective(1200px) rotateX(-10deg) rotateY(360deg); }
        }
        @keyframes blob-bounce {
          0%, 100% { transform: translate(-25%, -25%) scale(1); }
          50% { transform: translate(30%, 35%) scale(1.1); }
        }
        @keyframes card_cascade_load {
          0% { opacity: 0; transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(0px) scale(0.8); }
          100% { opacity: 1; transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(210px) scale(1); }
        }

        /* HARDWARE-ACCELERATED SEQUENTIAL WIREFRAME SELF-DRAWING HOOKS */
        .wireframe-trace-icon path,
        .wireframe-trace-icon circle,
        .wireframe-trace-icon rect {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: self_drawing_sequence_wire 4.5s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
          animation-delay: calc(var(--icon-index) * 0.45s) !important;
        }

        @keyframes self_drawing_sequence_wire {
          0%, 15% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          30% {
            stroke-dashoffset: 100;
            opacity: 0.25;
          }
          75%, 100% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 4px currentColor);
          }
        }
      `}</style>
    </section>
  );
}