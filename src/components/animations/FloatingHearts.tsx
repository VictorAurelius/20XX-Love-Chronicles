'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const heartEmojis = ['💕', '💖', '💗', '💝', '💞', '💓', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🤎'];

    const generatedHearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 15,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -50, 0, 50, 0],
            x: [0, 30, -20, 20, 0],
            rotate: [0, 15, -15, 10, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
