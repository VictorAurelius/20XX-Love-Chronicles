'use client';

import { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface MusicContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement | null> | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
}

const MusicContext = createContext<MusicContextType>({
  audioRef: null,
  isPlaying: false,
  setIsPlaying: () => {},
  pauseMusic: () => {},
  resumeMusic: () => {},
});

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
