export default function PCBBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.04 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pcb-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pcb-grid)" />

      {/* Horizontal traces */}
      {[120, 240, 380, 500, 650, 780].map((y, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={y} x2="100%" y2={y}
          stroke="#00f5ff" strokeWidth="0.8"
          strokeDasharray="40 20 10 20"
          style={{
            animation: `traceAnim ${4 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Vertical traces */}
      {[150, 320, 500, 680, 860].map((x, i) => (
        <line
          key={`v${i}`}
          x1={x} y1="0" x2={x} y2="100%"
          stroke="#f59e0b" strokeWidth="0.6"
          strokeDasharray="30 30"
          style={{
            animation: `traceAnim ${5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Via dots */}
      {[[150,120],[320,240],[500,380],[680,500],[860,650],[150,500],[500,120]].map(([x,y],i) => (
        <circle key={`via${i}`} cx={x} cy={y} r="3" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.6" />
      ))}
    </svg>
  );
}