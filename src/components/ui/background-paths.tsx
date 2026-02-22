"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  // Reduced from 46 to 18 paths for performance
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 12 * position} -${189 + i * 15}C-${
      380 - i * 12 * position
    } -${189 + i * 15} -${312 - i * 12 * position} ${216 - i * 15} ${
      152 - i * 12 * position
    } ${343 - i * 15}C${616 - i * 12 * position} ${470 - i * 15} ${
      684 - i * 12 * position
    } ${875 - i * 15} ${684 - i * 12 * position} ${875 - i * 15}`,
    width: 0.6 + i * 0.08,
    opacity: 0.3 + i * 0.04,
    duration: `${14 + i * 2}s`,
    delay: `${i * 0.5}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ height: "300vh" }}>
      <svg
        className="w-full h-full text-primary/50"
        viewBox="0 0 696 916"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            className="animate-path-flow"
            style={{
              animationDuration: path.duration,
              animationDelay: path.delay,
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
