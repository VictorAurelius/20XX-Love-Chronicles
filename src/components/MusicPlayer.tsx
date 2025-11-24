'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '@/contexts/MusicContext';

interface MusicPlayerProps {
  isBirthdayMode?: boolean;
}

interface Track {
  id: string;
  title: string;
  path: string;
}

export default function MusicPlayer({ isBirthdayMode = false }: MusicPlayerProps) {
  const { audioRef, isPlaying, setIsPlaying } = useMusic();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [playedTracks, setPlayedTracks] = useState<Set<string>>(new Set());

  // Load playlist based on mode
  useEffect(() => {
    const loadPlaylist = () => {
      const tracks: Track[] = [];

      if (isBirthdayMode) {
        // Birthday playlist
        tracks.push(
          {
            id: 'birthday-01',
            title: 'Happy Birthday (Piano)',
            path: '/data/music/birthday/01-happy-birthday-english-piano.mp3',
          },
          {
            id: 'birthday-02',
            title: 'Happy Birthday',
            path: '/data/music/birthday/02-happy-birthday-english.mp3',
          }
        );
      } else {
        // Normal playlist
        tracks.push(
          {
            id: 'normal-01',
            title: 'Lễ Đường',
            path: '/data/music/01-le-duong.mp3',
          },
          {
            id: 'normal-02',
            title: 'Từng Ngày Yêu Em',
            path: '/data/music/02-tung-ngay-yeu-em.mp3',
          }
        );
      }

      setPlaylist(tracks);

      // Select random first track
      if (tracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        setCurrentTrack(tracks[randomIndex]);
      }
    };

    loadPlaylist();
  }, [isBirthdayMode]);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && audioRef) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.loop = true; // Loop current track continuously

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [audioRef, volume]);

  // Update audio source when track changes and auto-play
  useEffect(() => {
    if (audioRef?.current && currentTrack) {
      audioRef.current.src = currentTrack.path;
      audioRef.current.load();

      // Try to auto-play
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Auto-play prevented by browser:', error.message);
            // Auto-play was prevented, user will need to click play button
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack, audioRef, setIsPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  // Fallback: Try to play on any user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef?.current && currentTrack && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Remove listeners after successful play
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        }).catch(() => {
          // Still blocked, keep listeners
        });
      }
    };

    if (currentTrack && !isPlaying) {
      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);
      document.addEventListener('keydown', handleInteraction);
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [audioRef, currentTrack, isPlaying, setIsPlaying]);

  const handlePlayPause = () => {
    if (!audioRef?.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const handleNext = () => {
    if (playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack?.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
  };

  const handlePrevious = () => {
    if (playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack?.id
    );
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentTrack(playlist[prevIndex]);
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-romantic-1 backdrop-blur-lg shadow-romantic-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Expanded playlist view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-romantic-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-h-64 overflow-y-auto p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                {isBirthdayMode ? '🎂 Nhạc Sinh Nhật' : '🎵 Danh Sách Phát'}
              </h3>
              <div className="space-y-2">
                {playlist.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentTrack.id === track.id
                        ? 'bg-romantic-pink text-white'
                        : 'hover:bg-romantic-softGray text-gray-700'
                    }`}
                  >
                    <p className="text-sm font-medium">{track.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main player controls */}
      <div className="container-custom py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-gray-600">
              {isBirthdayMode ? 'Chế độ sinh nhật 🎂' : 'Nhạc lãng mạn 💕'}
            </p>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
              aria-label="Bài trước"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-romantic-deepRose hover:bg-romantic-rose text-white shadow-romantic transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
              aria-label="Bài sau"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 18h2V6h-2zm-11 0l8.5-6L5 6z" />
              </svg>
            </button>

            {/* Shuffle */}
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 rounded-full transition-colors ${
                isShuffle ? 'bg-romantic-pink text-white' : 'hover:bg-white/50'
              }`}
              aria-label="Phát ngẫu nhiên"
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
                <path d="M18 8h3m-3 5h3M4 4h3l3 3m0 0l3 3m-3-3l-3 3m0 0L4 13m0 3h3l3 3m0 0l3-3" />
              </svg>
            </button>
          </div>

          {/* Volume control */}
          <div className="hidden md:flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-romantic-pink"
              aria-label="Âm lượng"
            />
          </div>

          {/* Expand/Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            <svg
              className={`w-5 h-5 text-gray-700 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
