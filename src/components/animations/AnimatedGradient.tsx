'use client';

import { motion } from 'framer-motion';

export default function AnimatedGradient() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* First gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #FFB6C1 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #E6E6FA 0%, transparent 50%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Third gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #FFDAB9 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
