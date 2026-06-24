// src/sections/Hero.jsx
import { motion } from "framer-motion";
import { Suspense } from "react";
import Button from "../components/ui/Button";
import SiliconScene from "../components/3d/SiliconScene";
import WaveformViewer from "../components/ui/WaveformViewer"; // Injected Waveform Viewer
import profileImg from "../assets/images/profile.jpg";
import resumeFile from "../assets/Resume-Anandha_Krishnan.pdf";

const HEADLINE = [
  { text: "VERIFYING", textStyle: { color: "#ffffff" } },
  { text: "INTELLIGENT", textStyle: { background: "linear-gradient(to right, #00c8ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } },
  { text: "SILICON SYSTEMS", textStyle: { color: "#ffffff" } },
];

function CinematicHeadline() {
  return (
    <h1
      className="leading-[1.05] tracking-tight uppercase"
      style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700 }}
    >
      {HEADLINE.map((line, i) => (
        <motion.span
          key={line.text}
          className="block"
          style={line.textStyle}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.38 + i * 0.18, duration: 0.65, ease: "easeOut" }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen max-h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* 3D Scene Background Substrate Layer */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <SiliconScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── PRIORITY 1: SILICON VERIFICATION HUD PANEL OVERLAY ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute right-[52px] top-[48px] hidden xl:flex flex-col gap-3 p-4 rounded-xl border border-white/5 bg-[#050816]/70 backdrop-blur-md w-[240px] pointer-events-none select-none z-10"
      >
        <div className="flex items-center justify-between font-mono text-[9px] text-gray-500 border-b border-white/5 pb-2">
          <span>DUT_METRICS // CORE_LOG</span>
          <span className="text-cyan-400 animate-pulse">RUNNING</span>
        </div>

        {/* HUD Data Telemetry Rows */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">ENV_TARGET:</span>
            <span className="text-white font-bold font-sans">UVM_TESTBENCH</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">ASSERTIONS:</span>
            <span className="text-green-400 font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-green-400 shadow-[0_0_6px_#10b981]" />
              PASSING
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500">FUNC_COVERAGE:</span>
              <span className="text-cyan-400 font-bold">94.2%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94.2%" }}
                transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-cyan-400 shadow-[0_0_8px_#00c8ff]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-white/5 text-[11px]">
            <span className="text-gray-500">RTL_STATUS:</span>
            <span className="text-green-400 font-bold">VERIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* Primary Left Engineering Information Deck */}
      <div
        className="relative flex flex-col justify-center flex-1 h-full"
        style={{ zIndex: 5, paddingLeft: "52px", paddingRight: "52px", maxWidth: "660px" }}
      >
        
        {/* ── OPTION 1: THE "DV ENGINEER ID NODE" INDUSTRIAL TERMINAL BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6"
        >
          <div 
            className="relative w-[110px] h-[145px] sm:w-[130px] sm:h-[165px] rounded-md border border-cyan-400/30 bg-[#070c1e]/80 p-2 flex flex-col justify-between shrink-0 shadow-[0_0_20px_rgba(0,200,255,0.08)] select-none group"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center justify-between font-mono text-[8px] tracking-wider shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span className="text-gray-500">ID_NODE: 01</span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                <span className="text-green-400 font-bold">ONLINE</span>
              </div>
            </div>

            <div className="relative flex-1 my-1.5 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 pointer-events-none z-10 opacity-15"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,200,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "6px 6px"
                }}
              />
              <motion.div 
                animate={{ y: [-5, 110, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[1px] bg-cyan-400/50 z-20 pointer-events-none"
              />
              <img 
                src={profileImg} 
                alt="Anandha Krishnan P" 
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div 
              className="font-mono text-[7px] sm:text-[8px] text-cyan-400/70 space-y-0.5 leading-none shrink-0"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <div className="flex justify-between"><span className="text-gray-600">SYS:</span> ANANDHA_KP</div>
              <div className="flex justify-between"><span className="text-gray-600">SPEC:</span> DV_ENGINEER</div>
            </div>
          </div>

          <div className="space-y-1.5 pb-1">
            <span 
              className="font-mono text-[9px] text-gray-500 tracking-[0.25em] block uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // HARDWARE_REGISTRY_CORE
            </span>
            <h3 
              className="text-white font-bold text-xl tracking-wide uppercase font-display" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Anandha Krishnan P
            </h3>
            
            <div 
              className="font-mono text-[9px] text-cyan-400/80 space-y-0.5 leading-none pt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <div><span className="text-gray-600">STATUS:</span> PRE_SILICON_READY</div>
              <div><span className="text-gray-600">STACK:</span> SV // UVM // SVA // COVERAGE</div>
            </div>

            <div className="inline-flex items-center gap-2 mt-1 px-2.5 py-1 rounded border border-cyan-400/15 bg-cyan-400/5">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[8px] text-cyan-400 tracking-[0.18em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                ECE · MAHENDRA ENG COLLEGE · 2028
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px w-48 bg-gradient-to-r from-cyan-400/40 to-transparent origin-left mb-5"
        />

        <div className="mb-4">
          <CinematicHeadline />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-gray-400 leading-[1.6] mb-5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14.5px", maxWidth: "520px" }}
        >
          I engineer verification environments that ensure RTL designs behave correctly before silicon fabrication — 
          focusing on SystemVerilog, UVM methodologies, assertion-based verification, constrained random testing, and 
          coverage-driven debugging.
        </motion.p>

        {/* Dynamic Verification Field Matrix Tag Belt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-2 mb-5"
        >
          {["SYSTEMVERILOG", "UVM", "SVA ASSERTIONS", "FUNCTIONAL COVERAGE", "RTL DEBUGGING", "FPGA VALIDATION"].map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + idx * 0.05, duration: 0.3 }}
              className="text-gray-400 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 cursor-default"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", padding: "4px 10px", borderRadius: "4px", letterSpacing: "0.08em" }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Target Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Button variant="primary" href="#projects" className="rounded-[4px]! px-[20px]! py-[9px]! text-[11px]! uppercase tracking-wider font-semibold">
            View Verification Work →
          </Button>
          <a
            href={resumeFile}
            download
            className="inline-flex items-center gap-2 px-[20px] py-[9px] font-semibold text-amber-400 border border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/60 transition-all duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", borderRadius: "4px", letterSpacing: "0.05em" }}
          >
            Download Resume ↓
          </a>
        </motion.div>

        {/* Core Hardware Metrics Deck */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-12 pt-4 border-t border-white/8"
        >
          {[
            { value: "10+", label: "RTL Modules Verified" },
            { value: "500+", label: "Simulation Test Cases" },
            { value: "ACTIVE", label: "Verification Stack", isMono: true },
          ].map((stat) => (
            <div key={stat.label}>
              <p 
                className={stat.isMono ? "text-cyan-400" : "text-white"} 
                style={{ 
                  fontFamily: stat.isMono ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif", 
                  fontSize: stat.isMono ? "1.25rem" : "1.5rem", 
                  fontWeight: 700,
                  lineHeight: 1
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 mt-2 tracking-widest uppercase text-[9px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PRIORITY 2: ANIMATED WAVEFORM VIEWER INJECTION PANEL ── */}
      <div className="absolute bottom-16 right-[52px] hidden lg:block w-[380px] z-10 pointer-events-auto">
        <WaveformViewer />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-gray-600 tracking-[0.4em]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-cyan-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}