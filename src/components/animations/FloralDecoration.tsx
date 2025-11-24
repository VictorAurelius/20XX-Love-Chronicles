'use client';

import { motion } from 'framer-motion';

export default function FloralDecoration() {
  return (
    <>
      {/* Left side decoration */}
      <div className="fixed left-0 top-0 h-full w-24 pointer-events-none z-20 hidden lg:block">
        <div className="relative h-full">
          {/* Top cluster */}
          <motion.div
            className="absolute top-10 left-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-5xl opacity-80">🌸</div>
            </motion.div>
            <motion.div
              className="text-3xl opacity-70 -mt-4 ml-8"
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌺
            </motion.div>
            <motion.div
              className="text-2xl opacity-60 -mt-2 ml-4"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌿
            </motion.div>
          </motion.div>

          {/* Middle scattered flowers */}
          <motion.div
            className="absolute top-1/4 left-4 text-4xl opacity-70"
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🌷
          </motion.div>

          <motion.div
            className="absolute top-1/3 left-1 text-3xl opacity-60"
            animate={{
              rotate: [0, -8, 8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🌹
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-6 text-3xl opacity-70"
            animate={{
              y: [0, -8, 0],
              x: [0, 3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            🌼
          </motion.div>

          {/* Bottom cluster */}
          <motion.div
            className="absolute bottom-20 left-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-5xl opacity-75">🌺</div>
            </motion.div>
            <motion.div
              className="text-4xl opacity-70 -mt-4 ml-10"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌸
            </motion.div>
            <motion.div
              className="text-2xl opacity-60 -mt-3 ml-5"
              animate={{
                x: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🍃
            </motion.div>
          </motion.div>

          {/* Vine decoration */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-green-300/20 to-transparent" />
        </div>
      </div>

      {/* Right side decoration */}
      <div className="fixed right-0 top-0 h-full w-24 pointer-events-none z-20 hidden lg:block">
        <div className="relative h-full">
          {/* Top cluster */}
          <motion.div
            className="absolute top-10 right-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-5xl opacity-80">🌹</div>
            </motion.div>
            <motion.div
              className="text-3xl opacity-70 -mt-4 mr-8"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌷
            </motion.div>
            <motion.div
              className="text-2xl opacity-60 -mt-2 mr-4"
              animate={{
                x: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌾
            </motion.div>
          </motion.div>

          {/* Middle scattered flowers */}
          <motion.div
            className="absolute top-1/4 right-4 text-4xl opacity-70"
            animate={{
              rotate: [0, -10, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🌻
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-1 text-3xl opacity-60"
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🌼
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-6 text-3xl opacity-70"
            animate={{
              y: [0, -8, 0],
              x: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            🌺
          </motion.div>

          {/* Bottom cluster */}
          <motion.div
            className="absolute bottom-20 right-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-5xl opacity-75">🌸</div>
            </motion.div>
            <motion.div
              className="text-4xl opacity-70 -mt-4 mr-10"
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌹
            </motion.div>
            <motion.div
              className="text-2xl opacity-60 -mt-3 mr-5"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌿
            </motion.div>
          </motion.div>

          {/* Vine decoration */}
          <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-green-300/20 to-transparent" />
        </div>
      </div>
    </>
  );
}
