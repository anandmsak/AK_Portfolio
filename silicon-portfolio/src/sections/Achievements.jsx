// sections/Achievements.jsx
import { achievements } from "../data/achievements";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

export default function Achievements() {
  // Enhanced tracking system: Natively loops all milestones including your IEEE paper presentation
  return (
    <section id="achievements" className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
      <SectionTitle
        label="ACHIEVEMENT LOG"
        title="Achievement Log"
        subtitle="Verified validation milestones, hackathon tracks, and hardware expo victories mapped on a circuit timeline."
      />

      <div className="max-w-4xl mx-auto relative pl-10 md:pl-0">
        
        {/* Center Circuit Line Path */}
        <div className="absolute left-3.5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-40 shadow-[0_0_10px_rgba(0,245,255,0.2)]" />

        <div className="space-y-12">
          {achievements.map((record, i) => {
            const isEven = i % 2 === 0;

            return (
              <div key={record.title} className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}>
                
                {/* PCB Connection Node Point Pin */}
                <div className="absolute left-[-23px] md:left-1/2 md:-translate-x-1/2 top-3 z-20 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-black border-[2px] border-cyan-400 shadow-[0_0_8px_#00f5ff] pulse-glow" />
                </div>

                {/* Left/Right Alternate Glass Card Container */}
                <div className="w-full md:w-1/2 md:px-8">
                  <Reveal direction={isEven ? "left" : "right"}>
                    <div className="border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-5 rounded-xl transition-all duration-300 relative group">
                      
                      {/* Top Diagnostic Ribbon */}
                      <div className="flex items-center justify-between gap-4 mb-3 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="text-cyan-400 tracking-widest text-[9px] font-bold uppercase">// TELEMETRY_NODE_0{i+1}</span>
                        <span className="text-cyan-400 font-bold bg-cyan-400/10 border border-cyan-500/20 px-3 py-0.5 text-xs rounded-md shadow-[0_0_10px_rgba(0,245,255,0.1)]">
                          {record.year}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-100 tracking-tight mb-1.5 font-display group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {record.title}
                      </h4>
                      
                      <p className="text-gray-400 text-xs font-sans leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {record.detail}
                      </p>

                      <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-gray-500 bg-black/40 border border-white/5 rounded px-2.5 py-1 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="text-gray-700">VERIFIED_ISSUER:</span>
                        <span className="text-gray-400 font-semibold">{record.org}</span>
                      </div>

                    </div>
                  </Reveal>
                </div>

                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}