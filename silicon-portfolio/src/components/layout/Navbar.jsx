import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Projects",     href: "#projects" },
  { name: "Research",     href: "#research" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-lg"
          : "bg-transparent"
      }`}
      style={{ top: "8px" }}
    >
      <div
        className="max-w-7xl mx-auto flex justify-between items-center"
        style={{ padding: "10px 10px 10px 24px" }}
      >
        {/* Brand — left */}
        <a href="#hero" className="flex items-center gap-2 shrink-0 group">
          <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow" />
          <span
            className="text-[13px] font-bold tracking-[0.18em] text-cyan-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ANANDHA KRISHNAN
          </span>
          <span
            className="text-[13px] font-bold tracking-[0.18em] text-white/40"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            // DV ENGINEERING LAB
          </span>
        </a>

        {/* Desktop nav — strictly right, control-panel style boxes */}
        <div className="hidden md:flex items-center" style={{ gap: "6px", paddingRight: "10px" }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="
                text-[11px] tracking-[0.12em] text-gray-400 uppercase
                px-3 py-[6px] border border-white/12 rounded-[4px]
                hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/5
                transition-all duration-200
              "
            >
              {link.name}
            </a>
          ))}

          {/* Core Action — structural validation link */}
          <a
            href="#projects"
            style={{ fontFamily: "'JetBrains Mono', monospace", marginLeft: "4px" }}
            className="
              text-[11px] tracking-[0.15em] font-semibold uppercase
              px-4 py-[6px] rounded-[4px]
              border border-cyan-400/70 text-cyan-400
              hover:bg-cyan-400/12 hover:border-cyan-400
              transition-all duration-200
            "
          >
            VIEW VERIFICATION WORK
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mx-4 mb-4 rounded-xl p-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="block py-3 text-sm text-gray-300 hover:text-cyan-400 tracking-wide border-b border-white/10 last:border-0 transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="block mt-3 py-2 text-center text-sm font-semibold text-cyan-400 border border-cyan-400/40 rounded-lg hover:bg-cyan-400/10 transition-all uppercase tracking-widest"
          >
            VIEW VERIFICATION WORK
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}