import { useState, useEffect, useRef } from "react";
import { skills } from "../data/skills";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import { motion } from "framer-motion";

const iconMap = {
  verification: "◈",
  chip:         "🔶",
  cpu:          "📦",
  code:         "⚡",
  tools:        "⚙️",
};

// Micro-Component to handle individual text line row timers independently
function InteractiveSkillText({ text, skillColor }) {
  const [styleState, setStyleState] = useState({ color: "rgba(156, 163, 175, 1)", scale: 1, textShadow: "none" });
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStyleState({
      color: "#ffffff",
      scale: 1.05,
      textShadow: `0 0 12px ${skillColor}`
    });
  };

  const handleMouseLeave = () => {
    setStyleState({
      color: skillColor,
      scale: 1,
      textShadow: `0 0 6px ${skillColor}`
    });

    timeoutRef.current = setTimeout(() => {
      setStyleState({
        color: "rgba(156, 163, 175, 1)",
        scale: 1,
        textShadow: "none"
      });
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isMonospace = text.match(/(UVM|HVL|HDL|OOP|SVA|RTL|APB|AHB|AXI|EDA|FSM|CDC)/);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: styleState.color,
        transform: `scale(${styleState.scale}) translateX(${styleState.scale > 1 ? "4px" : "0px"})`,
        textShadow: styleState.textShadow,
        fontFamily: isMonospace ? "'JetBrains Mono', monospace" : "'Inter', sans-serif",
        display: "inline-block",
        transition: "color 400ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1), text-shadow 400ms ease",
      }}
      className="text-[12px] font-medium origin-left select-all"
    >
      {text}
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "7rem 2.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <SectionTitle
        label="Expertise"
        title="Technical Arsenal"
        subtitle="Pre-silicon validation matrices, architectural checking competencies, and industry-standard EDA simulation toolsets."
      />

      {/* Primary 5-Column High-Density Verification Grid Chassis */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {skills.map((skill, i) => (
          <Reveal key={skill.category} delay={i * 0.08}>
            <motion.div
              whileHover={{ 
                y: -6,
                boxShadow: `0 20px 40px ${skill.color}15, 0 0 0 1px ${skill.color}30`
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ "--skill-color": skill.color }}
              className="group/card w-full h-full min-h-[300px] rounded-[14px] overflow-hidden relative flex items-center justify-center bg-[#070b19] border border-white/5 shadow-xl cursor-pointer transition-all duration-300"
            >
              
              {/* BACK LEVEL BLOB: Continuously loops and bounces inside your card framework */}
              <div 
                style={{
                  backgroundColor: skill.color,
                  animation: "blob-bounce 7s infinite ease-in-out"
                }}
                className="absolute z-1 top-1/2 left-1/2 w-32 h-32 rounded-full opacity-0 group-hover/card:opacity-[0.25] transition-opacity duration-500 filter blur-[28px] pointer-events-none"
              />

              {/* FOREGROUND CARD CONTENT CHASSIS PANEL */}
              <div 
                className="
                  absolute top-[1px] left-[1px] right-[1px] bottom-[1px] z-[2] 
                  bg-[#070b19]/95 backdrop-blur-[20px] rounded-[13px] p-5 flex flex-col justify-between overflow-hidden
                  transition-colors duration-300
                "
              >
                <div>
                  {/* Category Header Area */}
                  <div className="flex items-center gap-2.5 mb-5 select-none">
                    <span style={{ color: skill.color }} className="text-base leading-none">
                      {iconMap[skill.icon] || "◈"}
                    </span>
                    <h3
                      className="font-bold tracking-wide text-[13px] uppercase"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: skill.color }}
                    >
                      {skill.category}
                    </h3>
                  </div>

                  {/* Technical Capability String Listing */}
                  <div className="flex flex-col gap-2.5">
                    {skill.items.map((item) => (
                      <div 
                        key={item} 
                        className="flex items-center gap-2 group/item relative"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 transform group-hover/item:scale-[1.5]"
                          style={{ 
                            background: skill.color, 
                            opacity: 0.4,
                            boxShadow: `0 0 8px ${skill.color}` 
                          }}
                        />

                        <InteractiveSkillText text={item} skillColor={skill.color} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Functional Semantic Ribbon Accent Line */}
                <div
                  className="mt-5 h-px w-full rounded opacity-20 group-hover/card:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${skill.color}, transparent)`,
                  }}
                />
              </div>

            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* UPGRADED: High-Visibility Adjacent Domains Interactive Section Footer Area */}
      <Reveal delay={0.45}>
        <div
          className="mt-12 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          style={{
            background: "linear-gradient(135deg, rgba(7, 11, 25, 0.7) 0%, rgba(13, 21, 39, 0.4) 100%)",
            backdropFilter: "blur(12px)"
          }}
        >
          {/* Decorative subtle ambient cyan corner glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-4">
            
            {/* High-visibility Label with an active blinking terminal prompt icon */}
            <div className="flex items-center gap-2.5 select-none">
              <span className="w-1.5 h-3 bg-cyan-400 animate-[pulse_1s_infinite] shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span 
                className="text-[11px] font-bold text-cyan-400 tracking-[0.25em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                // ADJACENT DOMAINS (CO-DESIGN & ARCHITECTURE)
              </span>
            </div>

            {/* Glowing Tag Array Matrix */}
            <div className="flex flex-wrap gap-2.5 items-center">
              {[
                "Edge AI Accelerators", "Python Machine Learning", "Neural Network Mapping", 
                "OpenCV Computer Vision", "Sensors & Telemetry Arrays", "Circuit Automation Models"
              ].map((domain) => (
                <motion.span
                  key={domain}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="
                    text-[12px] px-3.5 py-2 rounded-lg text-slate-300 transition-all duration-300 cursor-default font-medium
                    border border-white/5 hover:border-cyan-400/30 hover:text-cyan-300
                    shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
                  "
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    background: "rgba(255, 255, 255, 0.02)"
                  }}
                >
                  {domain}
                </motion.span>
              ))}
            </div>

          </div>
        </div>
      </Reveal>
    </section>
  );
}