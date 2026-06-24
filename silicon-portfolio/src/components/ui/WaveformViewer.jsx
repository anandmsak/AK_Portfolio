// components/ui/WaveformViewer.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WaveformViewer() {
  const [cycle, setCycle] = useState(40);
  const [hexData, setHexData] = useState("3A");

  // Dynamic simulation timing loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => (prev >= 999 ? 10 : prev + 1));
      
      // Randomize hex transaction data to represent active bus traffic
      if (Math.random() > 0.7) {
        const hexValues = ["3A", "FF", "0E", "B2", "A1", "C4", "00"];
        setHexData(hexValues[Math.floor(Math.random() * hexValues.length)]);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="p-4 rounded-xl border border-white/5 bg-[#050a18]/80 backdrop-blur-md text-[11px] font-mono shadow-xl relative select-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Waveform Console Top Status Bar */}
      <div className="flex items-center justify-between text-[9px] text-gray-600 border-b border-white/5 pb-2 mb-3">
        <span>LOGIC_ANALYZER // SIM_TRACE</span>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500">CYCLE:</span>
          <span className="text-cyan-400 font-bold tabular-nums">{String(cycle).padStart(5, "0")}</span>
        </div>
      </div>

      {/* WAVEFORM TRACKS SECTION */}
      <div className="space-y-2.5 relative overflow-hidden h-28">
        
        {/* Track 1: CLK Signal Trace */}
        <div className="flex items-center">
          <span className="w-14 text-gray-500 uppercase text-[9px]">clk</span>
          <div className="flex-1 overflow-hidden relative h-3">
            <motion.div 
              animate={{ x: [0, -32] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap font-sans text-cyan-400/40 text-base leading-none select-none tracking-[-0.05em] absolute left-0"
            >
              _|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|
            </motion.div>
          </div>
        </div>

        {/* Track 2: RESET Signal (Stabilized HIGH state) */}
        <div className="flex items-center">
          <span className="w-14 text-gray-500 uppercase text-[9px]">reset_n</span>
          <div className="flex-1 h-px bg-green-500/40 relative">
            <div className="absolute inset-x-0 -top-px h-0.5 bg-green-400 shadow-[0_0_6px_#10b981]" />
          </div>
        </div>

        {/* Track 3: Data Bus (Dynamic Hex transition box) */}
        <div className="flex items-center">
          <span className="w-14 text-gray-500 uppercase text-[9px]">wdata[7:0]</span>
          <div className="flex-1 flex items-center gap-1.5 h-4 px-2 rounded bg-black/40 border border-white/5 text-[10px]">
            <span className="text-gray-600">HEX:</span>
            <span className="text-amber-400 font-bold tracking-wider tabular-nums">{hexData}</span>
          </div>
        </div>

        {/* Track 4: SystemVerilog Assertions checking line */}
        <div className="flex items-center border-t border-white/5 pt-2 mt-1">
          <span className="w-14 text-gray-500 uppercase text-[9px]">sva_chk</span>
          <div className="flex-1 flex items-center justify-between text-[10px]">
            <span className="text-green-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#10b981]" />
              ASSERT_PASS
            </span>
            <span className="text-gray-600 text-[8px] uppercase tracking-wider">
              NO_VIOLATIONS
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Diagnostic Banner */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-600">
        <span>SAMPLING_RATE: 100MHz</span>
        <span className="text-green-400/80">FUNCTIONAL_CHECK_OK</span>
      </div>
    </div>
  );
}