import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", glowColor = null }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: glowColor
          ? `0 20px 50px ${glowColor}12`
          : "0 20px 50px rgba(0,0,0,0.4), 0 0 1px rgba(0,245,255,0.1)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "16px",
        padding: "1.25rem",
      }}
    >
      {children}
    </motion.div>
  );
}