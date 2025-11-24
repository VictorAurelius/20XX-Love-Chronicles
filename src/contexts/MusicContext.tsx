'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface Track {
  id: string;
  title: string;
  path: string;
}

interface MusicContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  volume: number;
  setVolume: (volume: number) => void;
  playlist: Track[];
  setPlaylist: (tracks: Track[]) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  // Initialize audio element once
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.loop = true; // Loop current track
    }
  }, [volume]);

  // Update audio when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.path;
      audioRef.current.load();

      // Try to auto-play
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log('Auto-play prevented:', error.message);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Fallback: Try to play on user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && currentTrack && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        }).catch(() => {});
      }
    };

    if (currentTrack && !isPlaying) {
      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [currentTrack, isPlaying]);

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error('Error resuming music:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        isPlaying,
        setIsPlaying,
        pauseMusic,
        resumeMusic,
        currentTrack,
        setCurrentTrack,
        volume,
        setVolume,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
}
