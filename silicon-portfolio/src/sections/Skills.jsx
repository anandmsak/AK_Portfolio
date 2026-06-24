// components/Skills.jsx
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

      {/* Primary 5-Column High-Density Verification Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {skills.map((skill, i) => (
          <Reveal key={skill.category} delay={i * 0.08}>
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: `0 20px 50px ${skill.color}12, 0 0 1px ${skill.color}30`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="h-full rounded-2xl p-5 transition-all duration-300 bg-card"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Category Header Area */}
              <div className="flex items-center gap-2.5 mb-5">
                <span style={{ color: skill.color, fontSize: "16px", lineHeight: 1 }}>
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
              <div className="flex flex-col gap-2">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                      style={{ background: skill.color, opacity: 0.6 }}
                    />
                    <span
                      className="text-[12px] text-gray-400 group-hover:text-white transition-colors duration-200"
                      style={{ 
                        fontFamily: item.match(/(UVM|HVL|HDL|OOP|SVA|RTL|APB|AHB|AXI|EDA|FSM|CDC)/) 
                          ? "'JetBrains Mono', monospace" 
                          : "'Inter', sans-serif" 
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Functional Semantic Ribbon Accent */}
              <div
                className="mt-5 h-px w-full rounded"
                style={{
                  background: `linear-gradient(to right, ${skill.color}40, transparent)`,
                }}
              />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Downscaled Adjacent Domains Ribbon Layer */}
      <Reveal delay={0.45}>
        <div
          className="mt-8 rounded-2xl p-5 flex flex-wrap gap-2.5 items-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span 
            className="text-[10px] text-gray-600 tracking-[0.3em] uppercase mr-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            // ADJACENT DOMAINS (CO-DESIGN & ARCHITECTURE)
          </span>
          {[
            "Edge AI Accelerators", "Python Machine Learning", "Neural Network Mapping", 
            "OpenCV Computer Vision", "Sensors & Telemetry Arrays", "Circuit Automation Models"
          ].map((domain) => (
            <span
              key={domain}
              className="text-[12px] px-3 py-1.5 rounded-full border border-white/5 text-gray-500 transition-colors duration-300 cursor-default"
              style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.01)" }}
            >
              {domain}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}