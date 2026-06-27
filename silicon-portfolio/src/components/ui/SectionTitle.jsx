import Reveal from "../animations/Reveal";

export default function SectionTitle({ label, title, subtitle }) {
  return (
    <Reveal>
      <div className="mb-14">
        {label && (
          <p className="font-mono text-[10px] text-cyan-400/60 tracking-[0.4em] uppercase mb-3">
            // {label}
          </p>
        )}

        <h2
          className="font-bold leading-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            letterSpacing: "-0.02em",
            color: "#f1f5f9",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="mt-4 text-gray-400 leading-relaxed"
            style={{ fontSize: "15px", maxWidth: "560px" }}
          >
            {subtitle}
          </p>
        )}

        {/* Decorative underline trio */}
        <div className="flex items-center gap-2 mt-6">
          <div className="h-px w-14 bg-cyan-400 rounded" />
          <div className="h-px w-5 bg-cyan-400/35 rounded" />
          <div className="h-px w-2 bg-cyan-400/15 rounded" />
        </div>
      </div>
    </Reveal>
  );
}