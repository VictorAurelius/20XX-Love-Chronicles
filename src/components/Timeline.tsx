'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/date-utils';
import { getDataPath } from '@/lib/asset-utils';
import timelineData from '@/data/timeline-data.json';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  feeling?: string;
  folder: string;
  mediaCount: {
    images: number;
    videos: number;
    total: number;
  };
  hasCover: boolean;
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -50 : 50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const coverImage = event.hasCover
    ? getDataPath(`timeline/${event.folder}/cover.jpg`)
    : getDataPath('placeholder-event.jpg');

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex items-center gap-8 mb-8 md:mb-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
    >
      {/* Timeline dot and line */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-romantic-1 shadow-romantic z-10"
          animate={inView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Card content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div
          className="romantic-card p-6 hover-lift hover-shine"
          whileHover={{ scale: 1.02 }}
        >
          {/* Cover image */}
          <div className="relative w-full h-72 md:h-80 rounded-xl overflow-hidden mb-4 bg-romantic-softGray">
            <Image
              src={coverImage}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading={index < 2 ? "eager" : "lazy"}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Media count badge */}
            <div className="absolute top-4 right-4 flex gap-2">
              {event.mediaCount.images > 0 && (
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                  📸 {event.mediaCount.images}
                </span>
              )}
              {event.mediaCount.videos > 0 && (
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                  🎥 {event.mediaCount.videos}
                </span>
              )}
            </div>
          </div>

          {/* Date */}
          <p className="text-romantic-rose font-medium mb-2">
            {formatDate(event.date, 'dd MMMM yyyy')}
          </p>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-6">
            {event.title}
          </h3>

          {/* View details button */}
          <Link
            href={`/event/${event.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-romantic-1 text-romantic-deepRose font-medium hover:shadow-romantic-lg transition-all duration-300 hover:scale-105"
          >
            Xem Chi Tiết
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Feeling/Reflection section - opposite side */}
      {event.feeling && (
        <motion.div
          className={`hidden md:block md:w-5/12 ${isLeft ? 'md:text-left' : 'md:text-right'}`}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="romantic-card p-8 hover-lift hover-shine relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-romantic-lavender/10 via-transparent to-romantic-pink/10" />

            {/* Content area */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Small decorative icon at top */}
              <div className="mb-6">
                <motion.span
                  className="text-3xl opacity-60"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  💭
                </motion.span>
              </div>

              {/* Main feeling text - takes up most space */}
              <div className="flex-1 flex items-center">
                <blockquote className={`relative ${isLeft ? 'text-left' : 'text-right'}`}>
                  {/* Subtle decorative quote mark */}
                  <span className="absolute -top-4 -left-2 text-6xl text-romantic-rose/20 font-serif leading-none">
                    "
                  </span>

                  <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-heading font-normal relative z-10 px-4">
                    {event.feeling}
                  </p>
                </blockquote>
              </div>

              {/* Small decorative element at bottom */}
              <div className={`mt-6 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <div className="flex items-center gap-1 opacity-40">
                  <span className="text-sm">💕</span>
                  <div className="w-16 h-px bg-gradient-to-r from-romantic-pink to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Timeline() {
  const events = timelineData.timeline as TimelineEvent[];

  return (
    <section className="relative py-20">
      {/* Vertical line - desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-romantic-pink via-romantic-lavender to-romantic-peach opacity-30" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient-romantic mb-4">
            Hành Trình Của Bọn Mình
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mỗi khoảnh khắc bên em đều là kỷ niệm đáng trân trọng 💕
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>{events.length} Kỷ Niệm</span>
            <span>•</span>
            <span>{events.reduce((sum, e) => sum + e.mediaCount.images, 0)} Ảnh</span>
            <span>•</span>
            <span>{events.reduce((sum, e) => sum + e.mediaCount.videos, 0)} Video</span>
          </div>
        </motion.div>

        {/* Timeline events */}
        <div className="relative">
          {events.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* End of timeline decoration */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-romantic-1 text-white text-3xl shadow-romantic">
            💕
          </div>
          <p className="mt-4 text-romantic-rose font-accent text-2xl">
            Câu chuyện tình yêu vẫn tiếp diễn...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
