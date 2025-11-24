'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const text = typeof children === 'string' ? children : '';
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function TextFadeIn({ children, className = '', delay = 0 }: TextRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function TextSlideIn({ children, className = '', delay = 0, direction = 'left' }: TextRevealProps & { direction?: 'left' | 'right' | 'up' | 'down' }) {
  const variants = {
    left: { x: -50 },
    right: { x: 50 },
    up: { y: -50 },
    down: { y: 50 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...variants[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
