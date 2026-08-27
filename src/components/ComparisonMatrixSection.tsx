'use client';

import React, { useState, useMemo } from 'react';
import { 
  pioneersMatrixData, 
  PioneerProfile 
} from '../data/vedicData';
import { 
  Sparkles, 
  Quote, 
  BookOpen, 
  ExternalLink, 
  Search, 
  Tag, 
  Layers, 
  Atom, 
  Building2,
  ChevronRight
} from 'lucide-react';

interface ComparisonMatrixSectionProps {
  searchQuery: string;
}

export default function ComparisonMatrixSection({ searchQuery }: ComparisonMatrixSectionProps) {
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

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="mb-8 pb-6 border-b border-[#d4a359]/20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Section III • Global Pioneer & Institution Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
          शोध तुलना मैट्रिक्स: <span className="vedic-gold-gradient">वैश्विक वैज्ञानिक एवं वैदिक दर्शन</span>
        </h2>
        <p className="text-sm text-[#d4a359]/80 mt-1 max-w-3xl font-sans">
          निकोला टेस्ला, नासा (रिक ब्रिग्स), इरविन श्रॉडिंगर, वर्नर हाइजेनबर्ग, ओपेनहाइमर, कार्ल सागन, CERN, रामानुजन एवं जे.सी. बोस के मन्त्र, रिसर्च पेपर्स व ऐतिहासिक उद्धरण।
        </p>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4">
          <span className="text-xs text-[#d4a359]/60 font-mono mr-1">Tags:</span>
          {allTags.slice(0, 8).map((t) => (
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

      {/* Pioneer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPioneers.map((pioneer) => (
          <div
            key={pioneer.id}
            className="parchment-glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
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
                  {pioneer.era.split('(')[0]}
                </span>
              </div>

              {/* Institution & Field */}
              <div className="flex items-center gap-1.5 text-xs text-[#d4a359]/80 font-sans mb-3">
                <Building2 className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                <span className="truncate">{pioneer.institution}</span>
              </div>

              {/* Vedic Concept vs Core Discovery Pill */}
              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-xl bg-[#0e0704]/80 border border-[#d4a359]/20 text-xs">
                  <span className="text-[10px] font-mono text-[#f59e0b] block uppercase tracking-wider">
                    🕉️ वैदिक दार्शनिक तत्त्व (Vedic Concept):
                  </span>
                  <span className="font-devanagari text-white font-semibold">
                    {pioneer.vedicConcept}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0704]/80 border border-[#38bdf8]/20 text-xs">
                  <span className="text-[10px] font-mono text-[#38bdf8] block uppercase tracking-wider">
                    🔬 आधुनिक शोध योगदान (Core Discovery):
                  </span>
                  <span className="font-sans text-white font-medium">
                    {pioneer.coreDiscovery}
                  </span>
                </div>
              </div>

              {/* Direct Historical Quote Excerpt */}
              <div className="p-3 rounded-xl bg-[#1c0e08]/90 border-l-2 border-[#f59e0b] text-xs font-serif italic text-[#fef8ec]/90 leading-relaxed mb-4">
                <Quote className="w-3.5 h-3.5 text-[#f59e0b] inline mr-1" />
                <span>"{pioneer.directQuote.slice(0, 140)}..."</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-[#d4a359]/20 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#f59e0b] font-devanagari flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>विस्तृत शोध व मन्त्र साक्ष्य</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>

              <span className="text-[10px] text-[#d4a359]/60 font-mono">
                {pioneer.tags[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Pioneer Dossier Modal */}
      {selectedPioneer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#120905] border-2 border-[#d4a359] shadow-2xl space-y-6">
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

            {/* Vedic Reference Mantra Box */}
            <div className="shloka-box rounded-2xl p-5">
              <div className="text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-1">
                प्रामाणिक मन्त्र सन्दर्भ ({selectedPioneer.vedicReferenceMantra.source}):
              </div>
              <p className="text-base sm:text-lg font-devanagari text-[#fce0a2] font-semibold leading-relaxed">
                {selectedPioneer.vedicReferenceMantra.text}
              </p>
              <p className="text-xs font-sans text-[#fef8ec]/85 mt-2 pt-2 border-t border-[#d4a359]/20">
                <strong>Translation: </strong> {selectedPioneer.vedicReferenceMantra.translation}
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
                  📚 प्राथमिक शोधपत्र / पुस्तक उद्धरण:
                </h5>
                <p className="text-[#fef8ec]/80 font-mono leading-relaxed">
                  {selectedPioneer.paperOrBookCitation}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#d4a359]/20">
              <div className="flex gap-1.5 flex-wrap">
                {selectedPioneer.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-[#d4a359]/70 bg-[#0e0704] px-2 py-0.5 rounded border border-[#d4a359]/20">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedPioneer(null)}
                className="px-6 py-2 rounded-xl bg-[#7c1a1a] text-white font-devanagari border border-[#d4a359]"
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
