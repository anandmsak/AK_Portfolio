import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import profileImg from "../assets/images/profile.jpg";

const focusAreas = [
  {
    icon: "◈",
    title: "Design Verification",
    desc: "Building SystemVerilog-based verification environments using testbenches, assertions, constrained random testing, and coverage analysis.",
    color: "#00c8ff",
  },
  {
    icon: "◉",
    title: "RTL Validation",
    desc: "Analyzing digital architectures through simulation, waveform debugging, protocol checking, and functional correctness analysis.",
    color: "#f59e0b",
  },
  {
    icon: "◆",
    title: "FPGA & Hardware Debug",
    desc: "Validating hardware implementations through FPGA prototyping, timing analysis, and real-world testing workflows.",
    color: "#7c3aed",
  },
];

const researchTags = [
  "SystemVerilog Verification",
  "UVM Methodology",
  "Assertion Based Verification",
  "Functional Coverage",
  "RTL Debugging",
  "AMBA Protocol Verification",
  "CDC Analysis",
  "Low Power Verification",
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "6rem 0", maxWidth: "1280px", margin: "0 auto", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
    >
      <SectionTitle
        label="Identity"
        title="Verification Identity"
        subtitle="ECE undergraduate focused on Design Verification engineering, developing simulation-driven approaches to validate RTL architectures and improve silicon reliability."
      />

      <div className="grid lg:grid-cols-12 gap-10 items-start">

        {/* ── LEFT: Professional ID Card (4 cols) ── */}
        <div className="lg:col-span-4">
          <Reveal direction="left">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 30px 80px rgba(0,200,255,0.1)" }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 60px rgba(0,200,255,0.05), 0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Image Container Window */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: "320px",
                  background: "linear-gradient(175deg, #0c1a35 0%, #050816 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 blur-3xl"
                  style={{ background: "radial-gradient(ellipse, rgba(0,200,255,0.12) 0%, transparent 70%)" }}
                />

                {/* Verification Status Token: Green = Pass Semantic mapping */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md z-20"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
                  <span className="text-[10px] font-mono text-green-400 tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    PASS_STATUS
                  </span>
                </div>

                <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-cyan-400/40" />
                <div className="absolute bottom-0 right-4 w-5 h-5 border-r border-b border-amber-400/30" />

                <div className="absolute inset-x-0 bottom-0 flex justify-center items-end z-10">
                  <div
                    style={{
                      width: "200px",
                      height: "260px",
                      borderRadius: "16px 16px 0 0",
                      overflow: "hidden",
                      border: "1px solid rgba(0,200,255,0.18)",
                      borderBottom: "none",
                      boxShadow: "0 -12px 50px rgba(0,200,255,0.12), 0 -4px 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    <img
                      src={profileImg}
                      alt="Anandha Krishnan P"
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-12"
                      style={{ background: "linear-gradient(to top, rgba(5,8,22,0.5), transparent)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Data Content Rows */}
              <div className="px-6 py-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-white font-bold text-[15px] tracking-wide mb-0.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Anandha Krishnan P
                    </h3>
                    <p className="font-mono text-[10px] text-cyan-400 tracking-[0.15em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      SV · UVM · SVA · COVERAGE
                    </p>
                  </div>
                  <div
                    className="w-9 h-6 rounded flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(245,158,11,0.3)" }}
                  >
                    <div
                      className="w-5 h-3.5 rounded-sm"
                      style={{
                        border: "1px solid rgba(245,158,11,0.5)",
                        background: "rgba(245,158,11,0.05)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-0 mb-5">
                  {[
                    { label: "Target Role", value: "Design Verification Engineer", highlight: true },
                    { label: "Institution", value: "Mahendra Engineering College" },
                    { label: "Degree",      value: "B.E. Electronics & Communication" },
                    { label: "Batch",       value: "2024 – 2028" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center py-2.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em] uppercase flex-shrink-0 mr-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {row.label}
                      </span>
                      <span 
                        className="text-[11px] text-right leading-tight"
                        style={{ 
                          fontFamily: row.highlight ? "'JetBrains Mono', monospace" : "inherit",
                          color: row.highlight ? "#00c8ff" : "#d1d5db",
                          fontWeight: row.highlight ? 600 : 400
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/anandha-krishnan-vlsi", color: "#00c8ff" },
                    { label: "GitHub",   href: "https://github.com/anandmsak",                       color: "#f59e0b" },
                    { label: "Email",    href: "mailto:anandhperumal27@gmail.com",                   color: "#94a3b8" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-center py-2 rounded-lg text-[11px] font-mono transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: link.color,
                        border: `1px solid ${link.color}22`,
                        background: `${link.color}05`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${link.color}12`;
                        e.currentTarget.style.borderColor = `${link.color}44`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${link.color}05`;
                        e.currentTarget.style.borderColor = `${link.color}22`;
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* ── RIGHT: Bio Paragraphs + Refactored Cards ── */}
        <div className="lg:col-span-8 flex flex-col gap-7">

          {/* Core Biography Elements */}
          <Reveal>
            <div
              className="space-y-4 text-gray-400 leading-[1.6]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "15.5px" }}
            >
              <p>
                I am an Electronics and Communication Engineering student specializing in{" "}
                <span className="text-cyan-400 font-medium">Design Verification Engineering</span>, 
                RTL Validation, testbench architecture, and automated validation setups. My core focus lies in ensuring functional correctness and silicon accuracy before tapeout.
              </p>
              <p>
                From structural validation blocks to complex processor components and hardware accelerator pipelines, I design structured simulation checking setups. I am building deep, actionable mastery across{" "}
                <span className="text-cyan-400 font-medium">SystemVerilog HVL</span>, UVM architectures, assertion generation, and comprehensive structural coverage optimization models.
              </p>
              <p>
                My goal is to become a{" "}
                <span className="text-amber-400 font-semibold">
                  VLSI Design Verification Engineer
                </span>{" "}
                specializing in pre-silicon validation, verification methodologies, and scalable verification environments for advanced semiconductor systems.
              </p>
            </div>
          </Reveal>

          {/* Refactored Verification Focus Matrices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: `0 12px 40px ${area.color}15` }}
                  className="rounded-xl p-5 h-full transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${area.color}1a`,
                  }}
                >
                  <span
                    className="text-2xl block mb-3"
                    style={{ color: area.color }}
                  >
                    {area.icon}
                  </span>
                  <h4
                    className="text-[12px] font-bold uppercase mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: area.color }}
                  >
                    {area.title}
                  </h4>
                  <p className="text-gray-500 text-[12px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {area.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Modified Verification Keywords Container */}
          <Reveal delay={0.2}>
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(0,200,255,0.02)",
                border: "1px solid rgba(0,200,255,0.09)",
              }}
            >
              <p className="text-[9px] text-gray-600 tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                // TARGET VERIFICATION DOMAINS
              </p>
              <div className="flex flex-wrap gap-2">
                {researchTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1.5 rounded-full text-cyan-400 font-mono cursor-default transition-all duration-300 hover:bg-cyan-400/10"
                    style={{ fontFamily: "'JetBrains Mono', monospace", border: "1px solid rgba(0,200,255,0.14)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Telemetry Debug Log Row Footer */}
          <Reveal delay={0.3}>
            <div
              className="flex justify-between items-center pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">
                  SIMULATION_LINK
                </span>
                <a
                  href="mailto:anandhperumal27@gmail.com"
                  className="text-[12px] text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  anandhperumal27@gmail.com
                </a>
              </div>
              <div className="text-[10px] text-green-400 bg-green-400/5 px-2 py-0.5 rounded border border-green-500/20">
                ASSERTION: PASS
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}