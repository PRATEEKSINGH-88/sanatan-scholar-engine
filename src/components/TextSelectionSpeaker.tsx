'use client';

import React, { useState, useEffect } from 'react';
import { useVedicAudio } from './AudioContext';
import { Volume2, Sparkles } from 'lucide-react';

export default function TextSelectionSpeaker() {
  const { playSelectedText } = useVedicAudio();
  const [selectionText, setSelectionText] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        setSelectionText('');
        return;
      }

      const text = selection.toString().trim();
      if (text.length > 2) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Position the tooltip slightly above or below the selection
        setPosition({
          x: Math.min(window.innerWidth - 180, Math.max(10, rect.left + window.scrollX + rect.width / 2 - 80)),
          y: Math.max(10, rect.top + window.scrollY - 45)
        });
        setSelectionText(text);
      } else {
        setPosition(null);
        setSelectionText('');
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        setSelectionText('');
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  if (!position || !selectionText) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className="animate-in fade-in zoom-in-95 duration-200"
    >
      <button
        onMouseDown={(e) => {
          e.preventDefault(); // Prevent clearing selection
          playSelectedText(selectionText);
          setPosition(null);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white text-xs font-devanagari font-bold border-2 border-[#d4a359] shadow-[0_4px_20px_rgba(212,163,89,0.5)] hover:scale-105 transition-transform"
      >
        <Volume2 className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
        <span>🔊 चयनित पाठ सुनें</span>
      </button>
    </div>
  );
}
