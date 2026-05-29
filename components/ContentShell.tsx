"use client";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";

export function ContentShell({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.82, 1], ["0%", "-7%"]);

  return (
    <motion.div
      style={{
        position: "relative",
        zIndex: 1,
        y: prefersReduced ? 0 : y,
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      }}
    >
      {children}
    </motion.div>
  );
}
