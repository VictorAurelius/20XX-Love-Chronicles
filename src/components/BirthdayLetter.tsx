'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const letterContent = {
    greeting: "Gửi em yêu của anh,",
    body: [
      "Hôm nay là ngày đặc biệt nhất trong năm - sinh nhật của em. Anh muốn gửi đến em những lời chúc ý nghĩa nhất từ trái tim mình.",
      "Một năm nữa đã trôi qua, và em lại thêm một tuổi mới. Anh hy vọng tuổi mới sẽ mang đến cho em nhiều niềm vui, thành công và hạnh phúc. Em xứng đáng có được tất cả những điều tốt đẹp nhất trên đời.",
      "Cảm ơn em đã luôn ở bên anh, đã yêu thương và chăm sóc anh. Em là ánh sáng trong cuộc đời anh, là động lực để anh trở thành phiên bản tốt nhất của chính mình.",
      "Anh hứa sẽ luôn ở bên em, yêu thương em, và làm em hạnh phúc mỗi ngày. Dù cuộc sống có khó khăn thế nào, anh và em sẽ cùng nhau vượt qua.",
      "Chúc em sinh nhật thật vui vẻ và ý nghĩa. Anh yêu em rất nhiều! 💖"
    ],
    signature: "Người yêu em nhất,\nAnh của em ❤️"
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      {/* Envelope */}
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isOpen && (
          <motion.div
            className="relative cursor-pointer group"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Envelope body */}
            <div className="relative bg-gradient-to-br from-romantic-peach to-romantic-pink p-12 rounded-2xl shadow-romantic-lg overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-4xl">💕</div>
                <div className="absolute top-4 right-4 text-4xl">💕</div>
                <div className="absolute bottom-4 left-4 text-4xl">💖</div>
                <div className="absolute bottom-4 right-4 text-4xl">💖</div>
              </div>

              <div className="relative text-center">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-7xl">💌</span>
                </motion.div>
                <h3 className="text-3xl font-heading font-bold text-white mt-6 mb-3">
                  Thư Chúc Mừng Sinh Nhật
                </h3>
                <p className="text-white/90 text-lg font-accent">
                  Nhấn để mở thư từ người yêu của em 💖
                </p>
                <motion.div
                  className="mt-6 inline-flex items-center gap-2 text-white/80"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span>Mở thư</span>
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Wax seal */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-romantic-deepRose rounded-full shadow-lg flex items-center justify-center text-2xl border-4 border-white">
                ❤️
              </div>
            </div>
          </motion.div>
        )}

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Letter paper */}
              <div className="bg-gradient-to-br from-romantic-cream to-white p-8 md:p-12 rounded-2xl shadow-romantic-lg border-4 border-romantic-gold/30 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-romantic-rose/30 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-romantic-rose/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-romantic-rose/30 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-romantic-rose/30 rounded-br-2xl"></div>

                {/* Floating hearts background */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      💕
                    </motion.div>
                  ))}
                </div>

                {/* Letter content */}
                <div className="relative z-10">
                  {/* Header decoration */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-3xl">🌹</span>
                      <h2 className="text-4xl font-heading font-bold text-gradient-romantic">
                        Happy Birthday
                      </h2>
                      <span className="text-3xl">🌹</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-romantic-rose">
                      <span className="text-2xl">✨</span>
                      <span className="text-2xl">💖</span>
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>

                  {/* Greeting */}
                  <motion.p
                    className="text-xl font-accent text-romantic-deepRose mb-6 italic"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {letterContent.greeting}
                  </motion.p>

                  {/* Body paragraphs */}
                  {letterContent.body.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}

                  {/* Signature */}
                  <motion.div
                    className="mt-10 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <p className="text-xl font-accent text-romantic-deepRose italic whitespace-pre-line">
                      {letterContent.signature}
                    </p>
                  </motion.div>

                  {/* Close button */}
                  <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-3 bg-gradient-to-r from-romantic-rose to-romantic-deepRose text-white rounded-full font-medium shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-105"
                    >
                      Đóng Thư 💌
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
