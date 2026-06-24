import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, direction = "up" }) {
  const directions = {
    up:    { initial: { opacity: 0, y: 40 },  animate: { opacity: 1, y: 0 } },
    down:  { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 },  animate: { opacity: 1, x: 0 } },
    fade:  { initial: { opacity: 0 },          animate: { opacity: 1 } },
  };

  const { initial, animate } = directions[direction] || directions.up;

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}