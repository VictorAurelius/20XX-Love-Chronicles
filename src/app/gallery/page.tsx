'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import timelineData from '@/data/timeline-data.json';

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  folder: string;
  mediaFiles: {
    images: string[];
    videos: string[];
  };
}

interface GalleryImage {
  src: string;
  alt: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Prepare all images from all events
  const allImages: GalleryImage[] = useMemo(() => {
    const images: GalleryImage[] = [];

    (timelineData.timeline as Event[]).forEach((event) => {
      event.mediaFiles.images.forEach((filename, index) => {
        images.push({
          src: `/data/timeline/${event.folder}/${filename}`,
          alt: `${event.title} - Ảnh ${index + 1}`,
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
        });
      });
    });

    return images;
  }, []);

  // Filter images based on selected filter
  const filteredImages = useMemo(() => {
    if (selectedFilter === 'all') return allImages;
    return allImages.filter((img) => img.eventId === selectedFilter);
  }, [selectedFilter, allImages]);

  // Get filter options
  const filterOptions = useMemo(() => {
    const options = [
      { id: 'all', label: 'Tất Cả', count: allImages.length },
    ];

    (timelineData.timeline as Event[]).forEach((event) => {
      if (event.mediaFiles.images.length > 0) {
        options.push({
          id: event.id,
          label: event.title,
          count: event.mediaFiles.images.length,
        });
      }
    });

    return options;
  }, [allImages]);

  return (
    <div className="min-h-screen bg-romantic-warmWhite pb-20">
      {/* Hero Section */}
      <motion.div
        className="relative py-16 bg-gradient-romantic-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom">
          {/* Back button */}
          <Link
            href="/"
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
            Về Trang Chủ
          </Link>

          {/* Title */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-romantic mb-6">
              Thư Viện Ảnh 📸
            </h1>
            <p className="text-lg text-gray-700">
              Tất cả {allImages.length} kỷ niệm đẹp của chúng mình
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === option.id
                    ? 'bg-romantic-deepRose text-white shadow-romantic'
                    : 'bg-romantic-softGray text-gray-700 hover:bg-romantic-pink hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
                <span className="ml-2 opacity-75">({option.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Layout */}
      <section className="py-12">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.eventId}-${index}`}
                  className="relative mb-4 break-inside-avoid cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-romantic">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm">
                          {image.eventTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-2xl text-gray-500 mb-4">📷</p>
              <p className="text-gray-600">Không có ảnh nào trong bộ lọc này</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox for full-size image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage}
                alt="Full size"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors flex items-center justify-center text-2xl"
              >
                ✕
              </button>

              {/* Navigation hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                Nhấn để đóng
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
