'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Masonry from 'react-masonry-css';
import { formatDate } from '@/lib/date-utils';
import { getDataPath } from '@/lib/asset-utils';
import timelineData from '@/data/timeline-data.json';
import { useMusic } from '@/contexts/MusicContext';
import BirthdayCountdown from '@/components/BirthdayCountdown';
import BirthdayLetter from '@/components/BirthdayLetter';
import coupleInfo from '@/data/couple-info.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  folder: string;
  mediaCount: {
    images: number;
    videos: number;
    total: number;
  };
  mediaFiles: {
    images: string[];
    videos: string[];
  };
  hasCover: boolean;
}

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const { pauseMusic } = useMusic();
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Get all events for navigation
  const allEvents = timelineData.timeline as Event[];
  const currentIndex = allEvents.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  useEffect(() => {
    // Generate image URLs from actual file list
    const imageUrls = event.mediaFiles.images.map(
      (filename) => getDataPath(`timeline/${event.folder}/${filename}`)
    );
    setImages(imageUrls);

    // Generate video URLs from actual file list
    const videoUrls = event.mediaFiles.videos.map(
      (filename) => getDataPath(`timeline/${event.folder}/${filename}`)
    );
    setVideos(videoUrls);

    // Set default tab based on available media
    if (imageUrls.length > 0) {
      setActiveTab('photos');
    } else if (videoUrls.length > 0) {
      setActiveTab('videos');
    }
  }, [event]);

  const isDailyMemories = event.id === 'daily-memories';
  const isBirthdayEvent =
    event.id === 'boyfriend-birthday' || event.id === 'girlfriend-birthday';
  const isBoyBirthday = event.id === 'boyfriend-birthday';

  // Handle video play - pause music
  const handleVideoPlay = useCallback(() => {
    pauseMusic();
  }, [pauseMusic]);

  // Pause all videos except the one at given index
  const pauseAllVideosExcept = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== activeIndex && !video.paused) {
        video.pause();
      }
    });
  }, []);

  // Handle swiper slide change - pause previous video and auto-play new video
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    pauseAllVideosExcept(newIndex);

    // Auto-play the new video
    const newVideo = videoRefs.current.get(newIndex);
    if (newVideo) {
      newVideo.play().catch((error) => {
        console.log('Auto-play video failed:', error.message);
      });
    }
  }, [pauseAllVideosExcept]);

  // Note: Music will continue playing when leaving page (no need to resume)

  return (
    <div className="min-h-screen bg-romantic-warmWhite">
      {/* Hero section with event info */}
      <motion.div
        className={`relative py-20 ${
          isBirthdayEvent
            ? 'bg-gradient-to-br from-romantic-pink via-romantic-lavender to-romantic-peach'
            : 'bg-gradient-romantic-3'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Birthday Special Effects */}
        {isBirthdayEvent && (
          <>
            {/* Floating Balloons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`balloon-${i}`}
                  className="absolute text-6xl"
                  style={{
                    left: `${10 + i * 12}%`,
                    bottom: '-10%',
                  }}
                  animate={{
                    y: [0, -1000],
                    x: [0, Math.sin(i) * 50],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: 'easeInOut',
                  }}
                >
                  {['🎈', '🎉', '🎊', '🎁'][i % 4]}
                </motion.div>
              ))}
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute text-yellow-400"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Birthday Cake Corner */}
            <motion.div
              className="absolute top-8 right-8 text-7xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎂
            </motion.div>

            {/* Gift Box Corner */}
            <motion.div
              className="absolute bottom-8 left-8 text-6xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎁
            </motion.div>
          </>
        )}

        <div className="container-custom">
          {/* Back button */}
          <Link
            href="/#timeline"
            className="inline-flex items-center gap-2 text-romantic-deepRose hover:text-romantic-rose transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Quay Lại Hành Trình
          </Link>

          {/* Event info */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-romantic-rose font-medium mb-4">
              {formatDate(event.date, 'EEEE, dd MMMM yyyy')}
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-romantic mb-6">
              {event.title}
            </h1>
            <p className="text-lg text-gray-700 mb-8">{event.description}</p>

            {/* Media count */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              {event.mediaCount.images > 0 && (
                <span className="flex items-center gap-2">
                  <span className="text-2xl">📸</span>
                  {event.mediaCount.images} Ảnh
                </span>
              )}
              {event.mediaCount.videos > 0 && (
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🎥</span>
                  {event.mediaCount.videos} Video
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Birthday Countdown - Only show on birthday events */}
      {isBirthdayEvent && (
        <section className="py-12 bg-romantic-warmWhite">
          <div className="container-custom max-w-2xl">
            <BirthdayCountdown
              birthdayDate={
                isBoyBirthday
                  ? coupleInfo.couple.boy.birthday.slice(5) // Get MM-DD
                  : coupleInfo.couple.girl.birthday.slice(5)
              }
              personName={
                isBoyBirthday
                  ? coupleInfo.couple.boy.name
                  : coupleInfo.couple.girl.name
              }
              isBoy={isBoyBirthday}
            />
          </div>
        </section>
      )}

      {/* Birthday Letter - Only show on girlfriend birthday */}
      {event.id === 'girlfriend-birthday' && (
        <section className="py-16 bg-gradient-to-br from-romantic-lavender/20 to-romantic-pink/10">
          <div className="container-custom">
            <BirthdayLetter />
          </div>
        </section>
      )}

      {/* Media Gallery with Tabs */}
      {(images.length > 0 || videos.length > 0) && (
        <section className="py-16">
          <div className="container-custom">
            {/* Tab selector */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-full p-1 shadow-romantic">
                {images.length > 0 && (
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'photos'
                        ? 'bg-gradient-romantic-1 text-romantic-deepRose shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📸 Ảnh ({images.length})
                  </button>
                )}
                {videos.length > 0 && (
                  <button
                    onClick={() => setActiveTab('videos')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'videos'
                        ? 'bg-gradient-romantic-1 text-romantic-deepRose shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🎥 Video ({videos.length})
                  </button>
                )}
              </div>
            </div>

            {/* Photo Gallery - Masonry Style */}
            {activeTab === 'photos' && images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Masonry
                  breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                    500: 2
                  }}
                  className="flex -ml-4 w-auto"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {images.map((src, index) => (
                    <motion.div
                      key={index}
                      className="mb-4 cursor-pointer group"
                      onClick={() => setSelectedImage(src)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <div className="relative rounded-lg overflow-hidden shadow-romantic hover:shadow-romantic-lg transition-all duration-300 group-hover:scale-[1.02]">
                        <Image
                          src={src}
                          alt={`${event.title} - Photo ${index + 1}`}
                          width={400}
                          height={600}
                          className="w-full h-auto object-cover"
                          sizes="(max-width: 500px) 50vw, (max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        />
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </motion.div>
            )}

            {/* Video Gallery */}
            {activeTab === 'videos' && videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  onSlideChange={handleSlideChange}
                  className="vertical-video-swiper"
                >
                  {videos.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center">
                        <div className="relative w-full max-w-md aspect-[9/16] rounded-xl overflow-hidden shadow-romantic-lg bg-black">
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current.set(index, el);
                            }}
                            controls
                            className="w-full h-full object-contain"
                            preload="metadata"
                            playsInline
                            onPlay={handleVideoPlay}
                          >
                            <source src={src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Navigation to other events */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {prevEvent ? (
              <Link
                href={`/event/${prevEvent.id}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-105 group"
              >
                <svg
                  className="w-6 h-6 text-romantic-rose group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Trước</p>
                  <p className="font-semibold text-gray-800">{prevEvent.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextEvent ? (
              <Link
                href={`/event/${nextEvent.id}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-romantic hover:shadow-romantic-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tiếp</p>
                  <p className="font-semibold text-gray-800">{nextEvent.title}</p>
                </div>
                <svg
                  className="w-6 h-6 text-romantic-rose group-hover:translate-x-1 transition-transform"
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
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Lightbox for full-size image */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
