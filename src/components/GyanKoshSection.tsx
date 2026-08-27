'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  scripturesData, 
  ScriptureItem 
} from '../data/vedicData';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  Sparkles, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useVedicAudio } from './AudioContext';

interface GyanKoshSectionProps {
  searchQuery: string;
}

export default function GyanKoshSection({ searchQuery }: GyanKoshSectionProps) {
  const { playMantra, isPlaying, title } = useVedicAudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScripture, setSelectedScripture] = useState<ScriptureItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: 'all', label: 'समस्त ग्रन्थ (All Scriptures)' },
    { id: 'veda', label: 'वेद (Vedas)' },
    { id: 'upanishad', label: 'उपनिषद् (Upanishads)' },
    { id: 'darshana', label: 'दर्शन शास्त्र (Darshanas)' },
    { id: 'shastra', label: 'विज्ञान शास्त्र (Scientific Shastras)' },
  ];

  const filteredScriptures = useMemo(() => {
    return scripturesData.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.sanskritTitle.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.scientificCorrelation.toLowerCase().includes(q) ||
        item.keyShloka.sanskrit.includes(q) ||
        item.keyShloka.hindiMeaning.includes(q) ||
        item.keyShloka.englishMeaning.toLowerCase().includes(q) ||
        item.modernFields.some(f => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (item: ScriptureItem) => {
    const textToCopy = `${item.sanskritTitle}\n\n[मूल श्लोक]\n${item.keyShloka.sanskrit}\n\n[IAST]: ${item.keyShloka.iast}\n\n[अन्वय]: ${item.keyShloka.anvaya}\n\n[हिन्दी अर्थ]: ${item.keyShloka.hindiMeaning}\n\n[वैज्ञानिक व्याख्या]: ${item.keyShloka.scientificCommentary}\n\n— सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च इंजन`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePlayCard = (item: ScriptureItem) => {
    playMantra(
      item.sanskritTitle,
      item.keyShloka.sanskrit,
      item.keyShloka.anvaya,
      item.keyShloka.hindiMeaning
    );
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#d4a359]/20">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Section I • Sacred Canon & Shastric Corpus</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
            ज्ञान कोष: <span className="vedic-gold-gradient">वैदिक ग्रन्थ एवं वैज्ञानिक दर्शन</span>
          </h2>
          <p className="text-sm text-[#d4a359]/80 mt-1 max-w-2xl font-sans">
            वेदों, उपनिषदों, षड्दर्शनों एवं प्राचीन वैज्ञानिक संहिताओं के मूल संस्कृत श्लोक, अन्वय, वैज्ञानिक सहसंबंध व 0.85x शांत वाचन।
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-devanagari font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-[#fef8ec] border border-[#d4a359] shadow-[0_0_12px_rgba(212,163,89,0.3)]'
                  : 'bg-[#180c07] text-[#d4a359]/80 border border-[#d4a359]/20 hover:border-[#d4a359]/60 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Scripture Cards */}
      {filteredScriptures.length === 0 ? (
        <div className="text-center py-16 parchment-glass-card rounded-2xl p-8 border border-[#d4a359]/30">
          <BookOpen className="w-12 h-12 text-[#d4a359]/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-devanagari text-[#fce0a2]">कोई ग्रन्थ नहीं मिला</h3>
          <p className="text-xs text-[#d4a359]/70 mt-1">
            कृपया अन्य कीवर्ड खोजें (जैसे: नासदीय, कणाद, सूर्यसिद्धान्त, माण्डूक्य, पिंगल, सुश्रुत)।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredScriptures.map((item) => {
            const isCopied = copiedId === item.id;
            const isCardActive = isPlaying && title === item.sanskritTitle;

            return (
              <div
                key={item.id}
                className={`parchment-glass-card rounded-2xl p-6 flex flex-col justify-between relative group transition-all duration-300 ${
                  isCardActive ? 'border-2 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.25)]' : ''
                }`}
              >
                {/* Top Badge & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-devanagari bg-[#7c1a1a]/70 text-[#fce0a2] border border-[#d4a359]/30 uppercase tracking-wider font-semibold">
                      {item.category === 'veda' && 'वेद (Veda)'}
                      {item.category === 'upanishad' && 'उपनिषद् (Upanishad)'}
                      {item.category === 'darshana' && 'दर्शन (Darshana)'}
                      {item.category === 'shastra' && 'शास्त्र (Science Shastra)'}
                    </span>

                    <span className="text-xs font-mono text-[#d4a359]/70">
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h3 className="text-xl font-bold font-devanagari text-[#fef8ec] group-hover:text-[#f59e0b] transition-colors">
                    {item.sanskritTitle}
                  </h3>
                  <div className="text-xs text-[#d4a359]/80 font-cinzel mb-4">
                    {item.title} • {item.author}
                  </div>

                  {/* Shloka Box */}
                  <div className="shloka-box rounded-xl p-4 my-3">
                    <p className="text-base sm:text-lg font-devanagari text-[#fce0a2] leading-relaxed whitespace-pre-line font-medium drop-shadow">
                      {item.keyShloka.sanskrit}
                    </p>
                    <p className="text-xs font-serif text-[#d4a359]/70 italic mt-2 border-t border-[#d4a359]/20 pt-2 font-mono">
                      {item.keyShloka.iast}
                    </p>
                  </div>

                  {/* Anvaya (Word-by-word break) */}
                  <div className="p-3 rounded-lg bg-[#0e0704]/80 border border-[#d4a359]/15 my-2">
                    <span className="text-[11px] font-bold text-[#f59e0b] block mb-1 font-devanagari">
                      पदच्छेद व अन्वय (Padachheda & Word Breakdown):
                    </span>
                    <p className="text-xs font-devanagari text-[#fef8ec]/80 leading-relaxed">
                      {item.keyShloka.anvaya}
                    </p>
                  </div>

                  {/* Hindi & English Meaning */}
                  <div className="space-y-2 text-xs my-3">
                    <div className="text-[#fef8ec]/90 leading-relaxed font-devanagari">
                      <strong className="text-[#f59e0b]">हिन्दी अर्थ: </strong>
                      {item.keyShloka.hindiMeaning}
                    </div>
                    <div className="text-[#fef8ec]/80 leading-relaxed font-sans">
                      <strong className="text-[#d4a359]">English: </strong>
                      {item.keyShloka.englishMeaning}
                    </div>
                  </div>

                  {/* Scientific Commentary Callout */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#7c1a1a]/30 to-[#180c07] border border-[#d4a359]/30 mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#f59e0b] mb-1 font-devanagari">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>वैज्ञानिक शोध सहसंबंध (Scientific Commentary):</span>
                    </div>
                    <p className="text-xs text-[#fce0a2]/90 leading-relaxed font-sans">
                      {item.keyShloka.scientificCommentary}
                    </p>
                  </div>

                  {/* Modern Fields Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.modernFields.map((field, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#1c0e08] border border-[#d4a359]/20 text-[10px] text-[#fce0a2] font-mono"
                      >
                        #{field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[#d4a359]/20 text-xs">
                  <div className="text-[11px] text-[#d4a359]/60 font-mono truncate max-w-[160px]" title={item.manuscriptLocation}>
                    📍 {item.manuscriptLocation.split(',')[0]}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Clear Card-Level Listen Button */}
                    <button
                      onClick={() => handlePlayCard(item)}
                      title="पूरा मन्त्र, पदच्छेद व अर्थ सुनें (0.85x Speech)"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-devanagari font-bold text-xs transition-all border ${
                        isCardActive
                          ? 'bg-[#f59e0b] text-[#080402] border-[#fce0a2] shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse'
                          : 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border-[#d4a359] hover:brightness-110'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isCardActive ? 'वाचन चालू...' : '🔊 मन्त्र सुनें'}</span>
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(item)}
                      title="श्लोक व शोध विवरण कॉपी करें"
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs transition-all ${
                        isCopied
                          ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500'
                          : 'bg-[#180c07] text-[#d4a359] border-[#d4a359]/30 hover:border-[#d4a359]'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="font-devanagari">{isCopied ? 'कॉपी' : 'कॉपी'}</span>
                    </button>

                    {/* Deep Modal Detail Button */}
                    <button
                      onClick={() => setSelectedScripture(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#180c07] text-[#d4a359] border border-[#d4a359]/40 hover:text-white font-devanagari"
                    >
                      विस्तार
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Deep Scripture Modal Rendered via Portal at Body Level */}
      {mounted && selectedScripture && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedScripture(null)}
        >
          <div 
            className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#120905] border-2 border-[#d4a359] shadow-[0_0_50px_rgba(0,0,0,0.9)] z-[10000] space-y-5 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedScripture(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1c0e08] text-[#d4a359] hover:text-white border border-[#d4a359]/30"
            >
              ✕
            </button>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-devanagari bg-[#7c1a1a] text-[#fce0a2] border border-[#d4a359]/40">
                {selectedScripture.chaptersOrVersesCount} • {selectedScripture.period}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-devanagari text-white mt-2">
                {selectedScripture.sanskritTitle}
              </h3>
              <p className="text-sm text-[#d4a359] font-cinzel">
                {selectedScripture.title} (Author: {selectedScripture.author})
              </p>
            </div>

            <div className="shloka-box rounded-2xl p-6">
              <p className="text-lg sm:text-2xl font-devanagari text-[#fce0a2] leading-relaxed font-semibold">
                {selectedScripture.keyShloka.sanskrit}
              </p>
              <p className="text-sm font-mono text-[#d4a359]/80 italic mt-3 pt-3 border-t border-[#d4a359]/30">
                {selectedScripture.keyShloka.iast}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20">
                <h4 className="font-bold text-[#f59e0b] font-devanagari mb-1">
                  अन्वय व पद-विभाग:
                </h4>
                <p className="text-xs text-[#fef8ec]/90 font-devanagari leading-relaxed">
                  {selectedScripture.keyShloka.anvaya}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20">
                <h4 className="font-bold text-[#f59e0b] font-devanagari mb-1">
                  विस्तृत हिन्दी व्याख्या:
                </h4>
                <p className="text-xs sm:text-sm text-[#fef8ec]/90 font-devanagari leading-relaxed">
                  {selectedScripture.keyShloka.hindiMeaning}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20">
                <h4 className="font-bold text-[#f59e0b] font-devanagari mb-1">
                  वैज्ञानिक व आधुनिक समीक्षा (Theoretical Physics Correlation):
                </h4>
                <p className="text-xs sm:text-sm text-[#fce0a2]/95 font-sans leading-relaxed">
                  {selectedScripture.keyShloka.scientificCommentary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20 text-xs text-[#d4a359]/90 space-y-1 font-mono">
                <div className="font-bold text-[#f59e0b]">📜 पाण्डुलिपि संरक्षण स्थल (Archive Reference):</div>
                <div>{selectedScripture.manuscriptLocation}</div>
                <div className="pt-2 text-[11px] text-[#d4a359]/70">
                  सन्दर्भ ग्रन्थ सूची: {selectedScripture.references.join(' | ')}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handlePlayCard(selectedScripture)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white font-devanagari font-bold border border-[#d4a359] shadow-lg"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 यह मन्त्र सुनें</span>
              </button>

              <button
                onClick={() => setSelectedScripture(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1c0e08] text-[#d4a359] font-devanagari border border-[#d4a359]/40 hover:text-white"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
