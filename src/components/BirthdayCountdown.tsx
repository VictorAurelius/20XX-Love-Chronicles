'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDaysUntil, isToday } from '@/lib/date-utils';

interface BirthdayCountdownProps {
  birthdayDate: string; // Format: MM-DD
  personName: string;
  isBoy?: boolean;
}

export default function BirthdayCountdown({
  birthdayDate,
  personName,
  isBoy = true,
}: BirthdayCountdownProps) {
  const [daysUntil, setDaysUntil] = useState<number>(0);
  const [isBirthday, setIsBirthday] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const days = getDaysUntil(birthdayDate);
      setDaysUntil(days);
      setIsBirthday(isToday(birthdayDate));
    };

    updateCountdown();
    // Update every hour
    const interval = setInterval(updateCountdown, 3600000);

    return () => clearInterval(interval);
  }, [birthdayDate]);

  if (!mounted) return null;

  if (isBirthday) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-romantic-pink via-romantic-lavender to-romantic-peach p-8 shadow-romantic-lg border-4 border-white/30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FFB6C1', '#E6E6FA', '#FFD700', '#FF69B4'][
                  Math.floor(Math.random() * 4)
                ],
              }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Birthday Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 15 + 10}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 1,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <div className="relative text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-6xl drop-shadow-lg">🎂</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-white mt-4 mb-2 drop-shadow-lg"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chúc Mừng Sinh Nhật! 🎉
          </motion.h2>

          <p className="text-xl text-white/90 font-medium drop-shadow">
            Sinh nhật {personName} hôm nay! 💕
          </p>

          <motion.p
            className="text-lg text-white/80 mt-4 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isBoy
              ? 'Chúc anh yêu tuổi mới nhiều niềm vui, hạnh phúc và thành công! 🎁'
              : 'Chúc em yêu tuổi mới luôn xinh đẹp, tươi trẻ và hạnh phúc! 🎁'}
          </motion.p>

          {/* Birthday Balloons */}
          <div className="flex justify-center gap-4 mt-6">
            {['🎈', '🎊', '🎉'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-white via-romantic-warmWhite to-romantic-softGray p-6 shadow-romantic border border-romantic-pink/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle background sparkles for countdown */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romantic-pink"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
              fontSize: '20px',
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="text-center relative">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-romantic-1 mb-4 shadow-romantic"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-3xl">{isBoy ? '🎂' : '🎂'}</span>
        </motion.div>

        <h3 className="text-xl font-heading font-bold text-gradient-romantic mb-2">
          Countdown Sinh Nhật {personName}
        </h3>

        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.div
            className="bg-gradient-to-br from-romantic-deepRose to-romantic-rose text-white rounded-xl px-6 py-3 shadow-romantic-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-4xl font-bold">{daysUntil}</div>
          </motion.div>
          <div className="text-left">
            <div className="text-2xl font-semibold text-gray-800">
              {daysUntil === 1 ? 'ngày' : 'ngày'}
            </div>
            <div className="text-sm text-gray-600">còn lại</div>
          </div>
        </div>

        <motion.p
          className="text-gray-600 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {daysUntil === 0
            ? 'Sinh nhật là ngày mai! 🎉'
            : daysUntil < 7
            ? 'Sắp đến sinh nhật rồi! 🎈'
            : daysUntil < 30
            ? 'Còn chưa đầy một tháng nữa! 🎁'
            : 'Hãy chuẩn bị quà thật đặc biệt! 💝'}
        </motion.p>

        {/* Progress indicator for upcoming birthday */}
        {daysUntil < 30 && (
          <motion.div
            className="mt-4 flex justify-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.min(5, Math.ceil((30 - daysUntil) / 6))
                    ? 'bg-romantic-deepRose'
                    : 'bg-gray-300'
                }`}
                animate={{
                  scale: i < Math.min(5, Math.ceil((30 - daysUntil) / 6)) ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
