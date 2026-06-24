// src/sections/Projects.jsx
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

function ProjectDetailModal({ project, onClose, setActiveZoomImage }) {
  // Hardened Scroll Gating System with instant state reflection
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      // Prevent structural elastic scroll bounce on iOS/Safari engines
      document.body.style.height = "100vh";
    }
    
    return () => {
      // Forcefully clear style string properties on component unmount
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [project]);

  if (!project) return null;

  const projectImages = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl p-4 md:p-12 flex items-center justify-center select-none"
      style={{ zIndex: 9999 }} // Direct priority override above standard page tracks
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 15 }}
        transition={{ type: "spring", damping: 30, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl bg-[#050816] border border-cyan-500/20 rounded-2xl p-6 md:p-10 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Top Header Dashboard Ribbon */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
          <div>
            <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase block mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              PROJECT // DETAILED_ARCHITECTURAL_LOG
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h2>
              {project.status === "IN_PROGRESS" ? (
                <span className="font-mono text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-bold tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ⚡ IN_PROGRESS_VAL
                </span>
              ) : (
                <span className="font-mono text-[9px] text-green-400 bg-green-400/10 border border-green-400/30 px-2 py-0.5 rounded font-bold tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ✓ SYSTEM_READY
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="font-mono text-[10px] tracking-wider text-gray-400 hover:text-cyan-400 border border-white/10 bg-white/5 px-4 py-2 rounded transition-all cursor-pointer hover:border-cyan-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            [ CLOSE_MODULE ]
          </button>
        </div>

        {/* Scrollable Data Terminal Panel */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-modal-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT CHANNEL: Documentation Specifications */}
            <div className="lg:col-span-7 space-y-5 text-[14px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              <section>
                <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x01 // PROBLEM CONSTRAINTS ]</h4>
                <p className="text-gray-400">{project.problem}</p>
              </section>

              <section>
                <h4 className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x02 // DEPLOYED IMPLEMENTATION / ARCHITECTURE ]</h4>
                <p className="text-slate-300 bg-cyan-950/10 border border-cyan-500/10 rounded-xl p-4">
                  {project.solution}
                </p>
              </section>

              {project.verificationPlan && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <section className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h4 className="font-mono text-[10px] text-amber-400 tracking-widest uppercase mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x03 // VERIFICATION STRATEGY ]</h4>
                    <p className="text-gray-400 text-[13px] leading-normal">{project.verificationPlan}</p>
                  </section>
                  <section className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                    <h4 className="font-mono text-[10px] text-red-400 tracking-widest uppercase mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x04 // AUTOMATED BUG TRACE LOG ]</h4>
                    <p className="text-gray-400 text-[13px] leading-normal">{project.bugsFound}</p>
                  </section>
                </div>
              )}
            </div>

            {/* RIGHT CHANNEL: Waveform/Simulation Frame Interface */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x05 // SIMULATION_WAVEFORMS & SCHEMATICS ]</h4>
              
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (projectImages && projectImages.length > 0) {
                    setActiveZoomImage({ 
                      src: projectImages[activeImageIndex], 
                      alt: project.title,
                      images: projectImages,
                      index: activeImageIndex
                    });
                  }
                }}
                className="w-full h-52 rounded-xl bg-gradient-to-br from-slate-900 to-black border border-cyan-500/10 relative overflow-hidden flex items-center justify-center p-2 cursor-pointer group/img"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.015)_1px,transparent_1px)] background-size-[20px_24px] pointer-events-none" />
                
                {projectImages.length > 0 ? (
                  <img 
                    src={projectImages[activeImageIndex]} 
                    alt="Active Trace Frame" 
                    className="w-full h-full object-contain opacity-90 group-hover/img:opacity-100 transition-all duration-300 mix-blend-screen"
                  />
                ) : (
                  <span className="font-mono text-[10px] text-gray-700 tracking-[0.25em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ LOG_WAVEFORM_STREAMING ]</span>
                )}
                
                <div className="absolute bottom-3 right-3 bg-slate-950 border border-cyan-400/50 px-2.5 py-1 rounded font-mono text-[9px] text-cyan-400 tracking-wider shadow-lg">
                  EXPAND SIM_FRAME
                </div>
              </div>

              {projectImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {projectImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(idx);
                      }}
                      className={`w-14 h-10 rounded border flex-shrink-0 bg-black overflow-hidden p-0.5 transition-all cursor-pointer ${
                        idx === activeImageIndex ? "border-cyan-400 shadow-md" : "border-white/5 opacity-50"
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover mix-blend-screen" />
                    </button>
                  ))}
                </div>
              )}

              {project.youtubeId && (
                <div className="space-y-1.5">
                  <h4 className="font-mono text-[10px] text-gray-500 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ 0x06 // TESTBENCH_SIM_EXECUTION ]</h4>
                  <div className="w-full h-36 rounded-xl border border-cyan-500/10 bg-black overflow-hidden relative">
                    <iframe
                      className="w-full h-full opacity-90"
                      src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                      title="Simulation Trace"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LOWER PARAMETER SPECIFICATION DECKS */}
          <div className="border-t border-white/5 pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div className="text-gray-500 font-bold mb-1.5 tracking-wider uppercase">// COMPILER_ENVIRONMENT_STACK</div>
                <div className="text-gray-400 mb-2"><span className="text-gray-600">ENV_REG:</span> {project.stack}</div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map(t => (
                    <span key={t} className="text-[10px] text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <div className="text-green-400 font-bold mb-1.5 tracking-wider uppercase">// CRITICAL_COVERAGE_METRICS</div>
                <div className="text-green-400/90 font-bold leading-normal">
                  <span className="text-gray-600 font-normal">GRADING_OUT:</span> {project.coverageMetrics || "Functional Testing Verified Successfully"}
                </div>
                <div className="text-gray-500 text-[10px] mt-1">LOG: {project.impact}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-end border-t border-white/5 pt-4 mt-3 shrink-0">
          {project.github !== "#" && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold rounded transition-all shadow-lg hover:shadow-cyan-400/10 cursor-pointer"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              📥 FETCH_SOURCE_REPOS
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Projects({ activeZoomImage, setActiveZoomImage }) {
  const [activeFilter, setActiveFilter] = useState("VLSI");
  const [selectedProject, setSelectedProject] = useState(null);
  const filters = ["ALL", "VLSI", "AI HARDWARE", "EMBEDDED", "SECURITY", "IOT"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
      
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 pb-6 border-b border-white/5">
        <SectionTitle
          label="PROJECT ARCHIVE"
          title="Project Database"
          subtitle="Pre-silicon simulation testbenches, automated verification assertions, and physical logic design prototypes."
        />
        <div className="flex flex-wrap gap-2 lg:mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-[11px] tracking-wider px-3.5 py-1.5 rounded transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-cyan-400/10 border border-cyan-400 text-cyan-400"
                  : "bg-transparent border border-white/5 text-gray-500 hover:text-gray-300"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              key={project.title}
              className="group border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-xl p-5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between w-full max-w-[400px] h-[520px]"
              style={{ boxShadow: "0 12px 44px rgba(0,0,0,0.3)" }}
            >
              <div>
                <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-black border border-white/5 mb-4 relative overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 mix-blend-screen" />
                  ) : (
                    <span className="font-mono text-[9px] text-gray-700 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>[ LOG_SIM_TRACE_ACTIVE ]</span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-gray-500 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// {project.category}</span>
                  <div className="flex items-center gap-1.5">
                    {project.status === "IN_PROGRESS" ? (
                      <span className="font-mono text-[8px] text-amber-500 font-bold tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>IN PROGRESS</span>
                    ) : (
                      <span className="font-mono text-[8px] text-green-400 font-bold tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>VERIFIED_PASS</span>
                    )}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-2 min-h-[44px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
                <p className="text-gray-400 text-xs font-sans line-clamp-3 mb-4">{project.problem}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="font-mono text-[9px] text-gray-400 border border-white/5 bg-slate-900/40 px-2 py-0.5 rounded" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tech}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(project.image) {
                        const currentCollectionImages = project.images && project.images.length > 0 ? project.images : [project.image];
                        setActiveZoomImage({ src: project.image, alt: project.title, images: currentCollectionImages, index: 0 });
                      }
                    }}
                    disabled={!project.image}
                    className={`w-full py-2 border rounded transition-all ${project.image ? "border-white/5 text-gray-400 hover:text-cyan-400 cursor-pointer" : "border-white/5 text-gray-700 cursor-not-allowed"}`}
                  >
                    VIEW IMAGE
                  </button>
                  <button onClick={() => setSelectedProject(project)} className="w-full py-2 border border-cyan-500/30 bg-cyan-400/5 text-cyan-400 rounded font-bold cursor-pointer">
                    DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic Stacking Portal Anchor Engine Container */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetailModal 
            key="architectural_portal_node"
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            setActiveZoomImage={setActiveZoomImage} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}