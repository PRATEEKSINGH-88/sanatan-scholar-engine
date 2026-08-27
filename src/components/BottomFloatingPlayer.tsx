'use client';

import React from 'react';
import { useVedicAudio } from './AudioContext';
import { Play, Pause, Square, Volume2, X, Gauge } from 'lucide-react';

export default function BottomFloatingPlayer() {
  const { 
    isPlaying, 
    isPaused, 
    isVisible,
    title, 
    sanskrit, 
    speed, 
    pause, 
    resume, 
    stop, 
    closePlayer,
    setSpeed 
  } = useVedicAudio();

  // If dismissed or no active recitation loaded, hide completely from DOM
  if (!isVisible && !title && !isPlaying && !isPaused) {
    return null;
  }

  const speedOptions = [
    { label: '0.75x', val: 0.75 },
    { label: '0.85x (डिफ़ॉल्ट)', val: 0.85 },
    { label: '1.0x', val: 1.0 },
    { label: '1.25x', val: 1.25 },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#180c07]/95 via-[#221008]/95 to-[#180c07]/95 backdrop-blur-xl border-2 border-[#d4a359] shadow-[0_10px_40px_rgba(0,0,0,0.85)] flex flex-col gap-3">
        
        {/* Top Row: Title, Equalizer & 'X' Close Button */}
        <div className="flex items-center justify-between gap-3 border-b border-[#d4a359]/20 pb-2.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 rounded-xl bg-[#7c1a1a] text-[#fce0a2] border border-[#d4a359]/50 shadow-md shrink-0">
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-[#f59e0b]' : 'text-[#d4a359]'}`} />
            </div>
            
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-devanagari text-[#fce0a2] truncate">
                  {title || 'वैदिक मन्त्र वाचन'}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7c1a1a]/80 text-[10px] font-mono text-emerald-300 border border-emerald-500/40 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    वाचन जारी
                  </span>
                )}
                {isPaused && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-[10px] font-mono text-amber-300 border border-amber-500/40 shrink-0">
                    विराम (Paused)
                  </span>
                )}
              </div>

              {sanskrit && (
                <p className="text-[11px] font-devanagari text-[#fef8ec]/75 truncate max-w-md">
                  {sanskrit}
                </p>
              )}
            </div>
          </div>

          {/* 'X' Close Button: Completely dismisses player and stops audio */}
          <button
            onClick={closePlayer}
            title="प्लेयर बन्द करें (Dismiss Player & Stop Speech)"
            className="p-1.5 rounded-lg bg-[#0e0704] text-[#d4a359] hover:text-white hover:bg-rose-950 border border-[#d4a359]/30 hover:border-rose-500 transition-all shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Row: Controls & Speed Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Audio Controls (Play/Pause, Stop) */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <button
                onClick={pause}
                title="वाचन रोकें (Pause)"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600/90 text-white font-devanagari font-bold border border-amber-400 shadow-md hover:brightness-110 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>रोकें (Pause)</span>
              </button>
            ) : (
              <button
                onClick={resume}
                title="वाचन पुनः चालू करें (Play / Resume)"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white font-devanagari font-bold border border-[#d4a359] shadow-md hover:brightness-110 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>सुनें (Play)</span>
              </button>
            )}

            <button
              onClick={stop}
              title="वाचन समाप्त करें (Stop)"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0e0704] text-[#d4a359] border border-[#d4a359]/30 hover:border-[#d4a359] hover:text-white font-devanagari cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>समाप्त (Stop)</span>
            </button>
          </div>

          {/* Speed Control Pill Selector */}
          <div className="flex items-center gap-1.5 bg-[#0e0704]/90 px-2 py-1 rounded-xl border border-[#d4a359]/30">
            <Gauge className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="text-[10px] font-mono text-[#d4a359]/80 mr-1 hidden sm:inline">गति:</span>
            {speedOptions.map((opt) => (
              <button
                key={opt.val}
                onClick={() => setSpeed(opt.val)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  speed === opt.val
                    ? 'bg-[#7c1a1a] text-white font-bold border border-[#d4a359]'
                    : 'text-[#d4a359]/70 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
