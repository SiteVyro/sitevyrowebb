"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 46 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.6 + i * 0.04,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-primary/50"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.3 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.8 }}
            animate={{
              pathLength: 1,
              opacity: [0.5, 0.9, 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPathsParallax({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div style={{ y: y1 }} className="fixed inset-0 pointer-events-none z-0">
        <FloatingPaths position={1} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="fixed inset-0 pointer-events-none z-0">
        <FloatingPaths position={-1} />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { FloatingPaths };
