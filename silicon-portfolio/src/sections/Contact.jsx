// sections/Contact.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "../components/animations/Reveal";
import SectionTitle from "../components/ui/SectionTitle";

/* ── Animated clock-signal SVG trace ── */
function ClockTrace() {
  return (
    <svg
      viewBox="0 0 900 60"
      preserveAspectRatio="none"
      className="w-full h-12"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00c8ff" stopOpacity="0" />
          <stop offset="20%" stopColor="#00c8ff" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Static dim trace rail */}
      <path d="M0,40 H900" stroke="#1e293b" strokeWidth="1" fill="none" />
      {/* Clock waveform — square wave pattern */}
      <motion.path
        d="M0,40 H40 V12 H120 V40 H200 V12 H280 V40 H360 V12 H440 V40 H520 V12 H600 V40 H680 V12 H760 V40 H840 V12 H900"
        stroke="url(#traceGrad)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Animated pulse dot riding the trace */}
      <motion.circle
        r="3"
        fill="#00c8ff"
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M0,40 H40 V12 H120 V40 H200 V12 H280 V40 H360 V12 H440 V40 H520 V12 H600 V40 H680 V12 H760 V40 H840 V12 H900"
        />
      </motion.circle>
    </svg>
  );
}

/* ── Individual channel row with built-in clipboard injection routines ── */
function ChannelRow({ channel, index }) {
  const [copied, setCopied] = useState(false);

  const handleAction = (e) => {
    if (channel.icon === "email") {
      e.preventDefault();
      navigator.clipboard.writeText(channel.val);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const icons = {
    email: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.12, duration: 0.4 }}
    >
      <a
        href={channel.route}
        target={channel.icon !== "email" ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={handleAction}
        className="group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border transition-all duration-250 relative overflow-hidden"
        style={{
          background: "rgba(7,11,25,0.6)",
          borderColor: "rgba(255,255,255,0.04)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${channel.color}08 0%, ${channel.color}03 100%)` }}
        />
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[9px] tabular-nums shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", color: `${channel.color}60` }}>
            [{String(index).padStart(2, "0")}]
          </span>
          <span className="shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ color: channel.color }}>
            {icons[channel.icon]}
          </span>
          <div className="min-w-0 text-left">
            <div className="font-mono text-[9px] tracking-widest uppercase mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: `${channel.color}70` }}>
              {channel.label}
            </div>
            <div className="font-mono text-xs font-semibold truncate group-hover:underline underline-offset-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: channel.color }}>
              {channel.val}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {copied ? (
            <span className="font-mono text-[8px] px-2 py-0.5 rounded border border-green-500/30 text-green-400 bg-green-500/10 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              COPIED_OK
            </span>
          ) : (
            <span className="hidden sm:block font-mono text-[8px] px-2 py-0.5 rounded border tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace", borderColor: `${channel.color}25`, color: `${channel.color}50`, background: `${channel.color}08` }}>
              {channel.proto}
            </span>
          )}
          <motion.span
            className="text-gray-600 group-hover:text-white transition-colors duration-200"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.3 }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.5}>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
}

/* ── Handshake status strip ── */
function HandshakeStrip() {
  const steps = [
    { label: "SYN", desc: "Send request", done: true },
    { label: "SYN-ACK", desc: "Received", done: true },
    { label: "ACK", desc: "Link established", done: false },
  ];

  return (
    <div className="flex items-center gap-2 font-mono text-[9px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 ${s.done ? "text-emerald-400/70" : "text-cyan-400/50"}`}>
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${s.done ? "bg-emerald-400" : "bg-cyan-400"}`}
              animate={!s.done ? { opacity: [0.3, 1, 0.3] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="tracking-widest">{s.label}</span>
          </div>
          {i < steps.length - 1 && <span className="text-gray-700">──</span>}
        </div>
      ))}
    </div>
  );
}

/* ── Main export ── */
export default function Contact() {
  const connectionChannels = [
    {
      label: "Primary Comms (Click to Copy)",
      val: "anandhperumal27@gmail.com",
      route: "mailto:anandhperumal27@gmail.com",
      color: "#00c8ff",
      icon: "email",
      proto: "SMTP / TLS",
    },
    {
      label: "Professional Network",
      val: "linkedin.com/in/anandha-krishnan-vlsi",
      route: "https://www.linkedin.com/in/anandha-krishnan-vlsi",
      color: "#3b82f6",
      icon: "linkedin",
      proto: "HTTPS / REST",
    },
    {
      label: "Source Repository",
      val: "github.com/anandmsak",
      route: "https://github.com/anandmsak",
      color: "#a78bfa",
      icon: "github",
      proto: "GIT / SSH",
    },
  ];

  return (
    <section
      id="contact"
      className="py-28 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center text-center"
    >
      <SectionTitle
        label="CONTACT"
        title="Establish Connection Link"
        subtitle="Open to VLSI design verification engineering roles, pre-silicon validation internships, and architectural research collaborations."
      />

      <Reveal direction="fade" className="w-full flex justify-center mt-4">
        <div
          className="w-full max-w-3xl rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #070b19 0%, #02040a 100%)",
            border: "1px solid rgba(0,200,255,0.08)",
            boxShadow: "0 0 60px rgba(0,200,255,0.05), 0 24px 48px rgba(0,0,0,0.6)",
          }}
        >
          {/* Corner accent marks */}
          {[
            "top-0 left-0 border-t border-l rounded-tl-2xl",
            "top-0 right-0 border-t border-r rounded-tr-2xl",
            "bottom-0 left-0 border-b border-l rounded-bl-2xl",
            "bottom-0 right-0 border-b border-r rounded-br-2xl",
          ].map((cls, i) => (
            <span key={i} className={`absolute w-4 h-4 ${cls}`} style={{ borderColor: "rgba(0,200,255,0.25)" }} />
          ))}

          {/* Clock trace header */}
          <div className="px-6 pt-5 pb-0">
            <div className="flex items-center justify-between mb-2 font-mono text-[9px] text-gray-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span>CLK_SIGNAL // 100MHz</span>
              <span style={{ color: "rgba(0,200,255,0.4)" }}>LINK_ACTIVE</span>
            </div>
            <ClockTrace />
          </div>

          {/* Identity header */}
          <div className="px-6 pt-4 pb-5 border-b text-left" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[9px] tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,200,255,0.5)" }}>
                  MODULE: engineer_contact_v1
                </div>
                <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Anandha Krishnan P
                </h3>
                <p className="font-mono text-xs mt-0.5 font-bold text-cyan-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Design Verification Engineer — SV · UVM · SVA
                </p>
              </div>
              
              {/* Refactored High-Impact Target Internship Availability Badge */}
              <div
                className="shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg border font-mono text-[8px] tracking-widest text-center font-bold"
                style={{
                  borderColor: "rgba(16,185,129,0.3)",
                  background: "rgba(16,185,129,0.06)",
                  color: "#10b981",
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#10b981]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                DV_INTERNSHIP_AVAILABLE
              </div>
            </div>
          </div>

          {/* Channel list */}
          <div className="px-6 py-5 space-y-2.5">
            {connectionChannels.map((ch, i) => (
              <ChannelRow key={i} channel={ch} index={i + 1} />
            ))}
          </div>

          {/* Footer handshake strip */}
          <div className="px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <HandshakeStrip />
            <span className="font-mono text-[8px] tracking-widest font-bold text-green-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              RTL_TESTBENCH :: SIM_READY_PASS
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}