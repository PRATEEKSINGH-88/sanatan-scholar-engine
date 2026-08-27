'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
  title: string;
  sanskrit: string;
  padachheda: string;
  meaning: string;
  speed: number;
}

interface AudioContextType extends AudioState {
  playMantra: (title: string, sanskrit: string, padachheda?: string, meaning?: string) => void;
  playSelectedText: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [title, setTitle] = useState('');
  const [sanskrit, setSanskrit] = useState('');
  const [padachheda, setPadachheda] = useState('');
  const [meaning, setMeaning] = useState('');
  const [speed, setSpeedState] = useState(0.85); // Default 0.85x for serene, clear Sanskrit recitation

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
    // If currently playing, restart with new speed seamlessly
    if (isPlaying && sanskrit) {
      stop();
      setTimeout(() => {
        playMantraInternal(title, sanskrit, padachheda, meaning, newSpeed);
      }, 100);
    }
  }, [isPlaying, title, sanskrit, padachheda, meaning, stop]);

  const playMantraInternal = (
    itemTitle: string,
    sanskritText: string,
    padachhedaText: string = '',
    meaningText: string = '',
    currentSpeed: number = 0.85
  ) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    setTitle(itemTitle);
    setSanskrit(sanskritText);
    setPadachheda(padachhedaText);
    setMeaning(meaningText);

    // Build the complete recitation narrative
    let narration = `${itemTitle}। `;
    narration += `मूल मन्त्र: ${sanskritText}। `;
    if (padachhedaText) {
      narration += `पदच्छेद एवं अन्वय: ${padachhedaText}। `;
    }
    if (meaningText) {
      narration += `भावार्थ एवं वैज्ञानिक समीक्षा: ${meaningText}।`;
    }

    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = 'hi-IN';
    utterance.rate = currentSpeed; // Calm deliberate recitation
    utterance.pitch = 0.95;

    // Pick best Hindi/Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('Hindi') || v.name.includes('Indian'));
    if (hiVoice) {
      utterance.voice = hiVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const playMantra = (
    itemTitle: string,
    sanskritText: string,
    padachhedaText: string = '',
    meaningText: string = ''
  ) => {
    playMantraInternal(itemTitle, sanskritText, padachhedaText, meaningText, speed);
  };

  const playSelectedText = (text: string) => {
    if (!text.trim()) return;
    playMantraInternal('चयनित पाठ', text, '', '', speed);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isPaused,
        title,
        sanskrit,
        padachheda,
        meaning,
        speed,
        playMantra,
        playSelectedText,
        pause,
        resume,
        stop,
        setSpeed
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useVedicAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useVedicAudio must be used within an AudioProvider');
  }
  return context;
}
