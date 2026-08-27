'use client';

import React, { useState, useMemo } from 'react';
import { 
  pioneersMatrixData, 
  PioneerProfile 
} from '../data/vedicData';
import { 
  Sparkles, 
  Quote, 
  Building2,
  ChevronRight,
  Volume2,
  FileCheck,
  BookOpen
} from 'lucide-react';
import { useVedicAudio } from './AudioContext';

interface ComparisonMatrixSectionProps {
  searchQuery: string;
}

export default function ComparisonMatrixSection({ searchQuery }: ComparisonMatrixSectionProps) {
  const { playMantra, isPlaying, title } = useVedicAudio();
  const [selectedPioneer, setSelectedPioneer] = useState<PioneerProfile | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    pioneersMatrixData.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['all', ...Array.from(tags)];
  }, []);

  const filteredPioneers = useMemo(() => {
    return pioneersMatrixData.filter((p) => {
      const matchesTag = selectedTag === 'all' || p.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.hindiName.includes(q) ||
        p.field.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.vedicConcept.toLowerCase().includes(q) ||
        p.coreDiscovery.toLowerCase().includes(q) ||
        p.directQuote.toLowerCase().includes(q) ||
        p.historicalContext.toLowerCase().includes(q) ||
        p.vedicReferenceMantra.text.includes(q);

      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  const handlePlayPioneer = (p: PioneerProfile, e: React.MouseEvent) => {
    e.stopPropagation();
    playMantra(
      p.hindiName,
      p.vedicReferenceMantra.text,
      p.vedicReferenceMantra.padachheda,
      `${p.vedicReferenceMantra.translation} वैज्ञानिक समीक्षा: ${p.vedicReferenceMantra.scientificMeaning}`
    );
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="mb-8 pb-6 border-b border-[#d4a359]/20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Section III • Complete 12+ Pioneer & Institution Master Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
          शोध तुलना मैट्रिक्स: <span className="vedic-gold-gradient">१२+ वैश्विक वैज्ञानिक एवं वैदिक दर्शन</span>
        </h2>
        <p className="text-sm text-[#d4a359]/80 mt-1 max-w-3xl font-sans">
          निकोला टेस्ला, नासा (रिक ब्रिग्स), श्रॉडिंगर, हाइजेनबर्ग, ओपेनहाइमर, कार्ल सागन, CERN, रामानुजन, जे.सी. बोस, आइंस्टीन-बोस, डेविड बोम एवं नील्स बोर के मन्त्र, पदच्छेद, वैज्ञानिक भावार्थ व शोधपत्र।
        </p>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4">
          <span className="text-xs text-[#d4a359]/60 font-mono mr-1">Tags:</span>
          {allTags.slice(0, 10).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                selectedTag === t
                  ? 'bg-[#7c1a1a] text-[#fce0a2] border border-[#d4a359]'
                  : 'bg-[#180c07] text-[#d4a359]/70 border border-[#d4a359]/20 hover:border-[#d4a359]'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Pioneer Cards Grid (All 12+) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPioneers.map((pioneer) => {
          const isCardActive = isPlaying && title === pioneer.hindiName;

          return (
            <div
              key={pioneer.id}
              className={`parchment-glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 ${
                isCardActive ? 'border-2 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.25)]' : ''
              }`}
              onClick={() => setSelectedPioneer(pioneer)}
            >
              <div>
                {/* Card Header & Era */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold font-devanagari text-white group-hover:text-[#f59e0b] transition-colors">
                      {pioneer.hindiName}
                    </h3>
                    <div className="text-xs text-[#d4a359] font-cinzel">
                      {pioneer.name}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#7c1a1a]/40 text-[#fce0a2] border border-[#d4a359]/30">
                    {pioneer.era.split('(')[0].trim()}
                  </span>
                </div>

                {/* Institution & Field */}
                <div className="flex items-center gap-1.5 text-xs text-[#d4a359]/80 font-sans mb-3">
                  <Building2 className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                  <span className="truncate">{pioneer.institution}</span>
                </div>

                {/* Vedic Concept vs Core Discovery Pill */}
                <div className="space-y-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#0e0704]/80 border border-[#d4a359]/20 text-xs">
                    <span className="text-[10px] font-mono text-[#f59e0b] block uppercase tracking-wider">
                      🕉️ वैदिक दार्शनिक तत्त्व:
                    </span>
                    <span className="font-devanagari text-white font-semibold">
                      {pioneer.vedicConcept}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0e0704]/80 border border-[#38bdf8]/20 text-xs">
                    <span className="text-[10px] font-mono text-[#38bdf8] block uppercase tracking-wider">
                      🔬 आधुनिक शोध योगदान:
                    </span>
                    <span className="font-sans text-white font-medium">
                      {pioneer.coreDiscovery}
                    </span>
                  </div>
                </div>

                {/* Sanskrit Mantra & Padachheda Preview Box */}
                <div className="shloka-box rounded-xl p-3 my-3 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#f59e0b] uppercase tracking-wider">
                    📜 {pioneer.vedicReferenceMantra.source}
                  </div>
                  <p className="text-xs font-devanagari text-[#fce0a2] font-semibold leading-relaxed line-clamp-2">
                    {pioneer.vedicReferenceMantra.text}
                  </p>
                  <p className="text-[11px] font-devanagari text-[#fef8ec]/75 pt-1 border-t border-[#d4a359]/15">
                    <strong className="text-[#38bdf8]">पदच्छेद: </strong>
                    {pioneer.vedicReferenceMantra.padachheda}
                  </p>
                </div>

                {/* Published Paper Citation */}
                <div className="p-2.5 rounded-xl bg-[#140a06] border border-[#d4a359]/20 text-[11px] text-[#fef8ec]/80 font-mono mb-3">
                  <strong className="text-[#f59e0b]">📄 मूल पेपर/पुस्तक: </strong>
                  <span className="truncate block">{pioneer.paperOrBookCitation}</span>
                </div>
              </div>

              {/* Card Footer with prominent Listen Button */}
              <div className="pt-3 border-t border-[#d4a359]/20 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={(e) => handlePlayPioneer(pioneer, e)}
                  title="मन्त्र, पदच्छेद व अर्थ सुनें (0.85x Speech)"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-devanagari font-bold text-xs transition-all border ${
                    isCardActive
                      ? 'bg-[#f59e0b] text-[#080402] border-[#fce0a2] shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse'
                      : 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border-[#d4a359] hover:brightness-110'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isCardActive ? 'वाचन चालू...' : '🔊 मन्त्र सुनें'}</span>
                </button>

                <span className="text-[11px] text-[#f59e0b] font-devanagari flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>विस्तार</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Pioneer Dossier Modal (Fixed clipping with z-[60] and clean scroll) */}
      {selectedPioneer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#120905] border-2 border-[#d4a359] shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedPioneer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1c0e08] text-[#d4a359] hover:text-white border border-[#d4a359]/30"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#d4a359]/20">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#7c1a1a] text-[#fce0a2] border border-[#d4a359]/40">
                  {selectedPioneer.field}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-devanagari text-white mt-2">
                  {selectedPioneer.hindiName} ({selectedPioneer.name})
                </h3>
                <p className="text-xs sm:text-sm text-[#d4a359] font-sans">
                  {selectedPioneer.institution} • {selectedPioneer.era}
                </p>
              </div>
            </div>

            {/* Full Historical Quote */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#7c1a1a]/40 to-[#180c07] border-l-4 border-[#f59e0b] text-sm font-serif italic text-[#fef8ec] leading-relaxed shadow-lg">
              <Quote className="w-5 h-5 text-[#f59e0b] mb-2" />
              "{selectedPioneer.directQuote}"
            </div>

            {/* Historical Context Narrative */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-devanagari text-[#f59e0b]">
                ऐतिहासिक पृष्ठभूमि एवं संवाद (Historical Context & Dialogues):
              </h4>
              <p className="text-xs sm:text-sm text-[#fef8ec]/90 leading-relaxed font-sans text-justify">
                {selectedPioneer.historicalContext}
              </p>
            </div>

            {/* Vedic Reference Mantra Box with Padachheda & Meaning */}
            <div className="shloka-box rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-widest">
                  प्रामाणिक मन्त्र सन्दर्भ ({selectedPioneer.vedicReferenceMantra.source}):
                </span>
                <button
                  onClick={(e) => handlePlayPioneer(selectedPioneer, e)}
                  className="text-xs text-[#f59e0b] hover:text-white flex items-center gap-1 font-devanagari font-bold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 मन्त्र सुनें</span>
                </button>
              </div>

              <p className="text-base sm:text-lg font-devanagari text-[#fce0a2] font-semibold leading-relaxed">
                {selectedPioneer.vedicReferenceMantra.text}
              </p>

              <div className="p-3 rounded-xl bg-[#0e0704]/90 border border-[#d4a359]/20 text-xs font-devanagari text-[#fef8ec]">
                <strong className="text-[#f59e0b]">पदच्छेद व अन्वय: </strong>
                {selectedPioneer.vedicReferenceMantra.padachheda}
              </div>

              <p className="text-xs font-devanagari text-[#fef8ec]/90 pt-1">
                <strong className="text-[#d4a359]">अनुवाद: </strong>
                {selectedPioneer.vedicReferenceMantra.translation}
              </p>

              <p className="text-xs font-sans text-[#38bdf8] pt-1">
                <strong>Scientific Link: </strong>
                {selectedPioneer.vedicReferenceMantra.scientificMeaning}
              </p>
            </div>

            {/* Scientific Impact & Paper Citation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20 text-xs">
                <h5 className="font-bold text-[#38bdf8] font-mono mb-1 uppercase">
                  🔬 वैज्ञानिक प्रभाव (Scientific Impact):
                </h5>
                <p className="text-[#fef8ec]/90 leading-relaxed font-sans">
                  {selectedPioneer.scientificImpact}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c0e08] border border-[#d4a359]/20 text-xs">
                <h5 className="font-bold text-[#f59e0b] font-mono mb-1 uppercase">
                  📚 मूल प्रकाशित शोधपत्र / पुस्तक उद्धरण:
                </h5>
                <p className="text-[#fef8ec]/90 font-mono leading-relaxed">
                  {selectedPioneer.paperOrBookCitation}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#d4a359]/20">
              <button
                onClick={(e) => handlePlayPioneer(selectedPioneer, e)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white font-devanagari font-bold border border-[#d4a359] shadow-lg"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔊 यह मन्त्र सुनें</span>
              </button>

              <button
                onClick={() => setSelectedPioneer(null)}
                className="px-6 py-2 rounded-xl bg-[#1c0e08] text-[#d4a359] font-devanagari border border-[#d4a359]/40 hover:text-white"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
