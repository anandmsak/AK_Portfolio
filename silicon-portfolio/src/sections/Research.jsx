import { achievements } from "../data/achievements";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

export default function Research() {
  const researchPapers = achievements.filter((item) => item.type === "research");

  return (
    <section id="research" className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10">
      <SectionTitle
        label="RESEARCH VAULT"
        title="Research Vault"
        subtitle="Innovation tracking and future publication vector logs targeting hardware design acceleration."
      />

      {/* Structured 2-Column Engineering Layout Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COMPONENT COLUMN: Academic Abstract Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {researchPapers.map((paper, i) => (
            <Reveal key={paper.title} delay={i * 0.1}>
              <div className="border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent backdrop-blur-xl rounded-xl p-5 relative overflow-hidden space-y-4">
                <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[9px] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-2 py-0.5 rounded tracking-widest uppercase">
                      // {paper.org} REFEREED
                    </span>
                    <span className="font-mono text-[9px] text-gray-600">YEAR: {paper.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 tracking-tight leading-snug">
                    {paper.detail}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400 border-t border-white/5 pt-3 font-sans">
                  <div>
                    <strong className="font-mono text-[9px] text-gray-600 uppercase tracking-widest block mb-1">[ RESEARCH PROBLEM ]</strong>
                    <p className="leading-relaxed">Developing power-aware computer vision detection filters running on space-constrained edge nodes.</p>
                  </div>
                  <div>
                    <strong className="font-mono text-[9px] text-cyan-400/70 uppercase tracking-widest block mb-1">[ CURRENT APPROACH ]</strong>
                    <p className="leading-relaxed text-gray-300">Deploying hardware-accelerated regression arrays and custom sparse data channel weights.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* RIGHT COMPONENT COLUMN: Larger Featured Research Visualization Array (5 Cols) */}
        <div className="lg:col-span-5 h-full min-h-[350px]">
          <div className="w-full h-full border border-cyan-500/10 bg-slate-950/40 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
            {/* PCB Pattern Background Decorator Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.01)_1px,transparent_1px)] background-size-[24px_24px] opacity-40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-cyan-400/10" />

            <div className="space-y-4 relative z-10">
              <span className="font-mono text-[9px] text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 px-2,5 py-1 rounded tracking-widest uppercase inline-block">
                ✦ ACTIVE RESEARCH NODE
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                Low Power AI Accelerator Optimization Engine
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Developing neural computation architectures that eliminate switching redundancies inside multi-axis MAC arithmetic arrays. Aiming for low latency with minimal micro-architectural area footprint.
              </p>
            </div>

            <div className="bg-black/50 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-gray-500 space-y-1 relative z-10">
              <div className="text-cyan-400 font-bold mb-1.5 tracking-wider">// SCHEMATIC_VAULT_INDEX</div>
              <div><span className="text-gray-700">TARGET_CORES:</span> DI_DISEASE_DETECTION_CORE</div>
              <div><span className="text-gray-700">STATUS:</span> IN_SUBMISSION_VAL</div>
              <div><span className="text-gray-700">DOCUMENTATION:</span> RESEARCH_PAPER_STYLE_LAYOUT</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}