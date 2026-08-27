'use client';

import React, { useState } from 'react';
import { 
  bhashyaComparisonsData, 
  BhashyaComparison 
} from '../data/vedicData';
import { 
  Layers, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Atom, 
  Cpu, 
  Scale,
  CheckCircle2
} from 'lucide-react';

export default function BhashyaTulnaSection() {
  const [selectedBhashya, setSelectedBhashya] = useState<BhashyaComparison>(bhashyaComparisonsData[0]);
  const [activeScholarTab, setActiveScholarTab] = useState<number>(0);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-[#d4a359]/20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
          <Layers className="w-4 h-4" />
          <span>Section IV • Multi-Commentary Hermeneutic Engine</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
          भाष्य तुलना: <span className="vedic-gold-gradient">आचार्य भाष्य एवं आधुनिक विज्ञान समीक्षा</span>
        </h2>
        <p className="text-sm text-[#d4a359]/80 mt-1 max-w-3xl font-sans">
          आदि शंकराचार्य, रामानुजाचार्य, मध्वाचार्य, स्वामी दयानंद सरस्वती एवं आधुनिक सैद्धांतिक भौतिकी के दृष्टिकोणों की आमने-सामने तुलना।
        </p>
      </div>

      {/* Shloka Selector Buttons */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <span className="text-xs text-[#d4a359]/70 font-mono">श्लोक चुनें (Select Shloka):</span>
        {bhashyaComparisonsData.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedBhashya(item);
              setActiveScholarTab(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-devanagari transition-all border ${
              selectedBhashya.id === item.id
                ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border-[#d4a359] shadow-lg font-bold'
                : 'bg-[#180c07] text-[#d4a359] border-[#d4a359]/30 hover:border-[#d4a359]'
            }`}
          >
            {item.source}
          </button>
        ))}
      </div>

      {/* Central Verse Banner */}
      <div className="parchment-glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#d4a359]/40 mb-8 relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#7c1a1a] text-[#fce0a2] border border-[#d4a359]/30">
            {selectedBhashya.shlokaNumber}
          </span>
          <span className="text-xs font-devanagari text-[#f59e0b] font-semibold">
            विषय: {selectedBhashya.topic}
          </span>
        </div>

        <div className="shloka-box rounded-2xl p-6 my-4">
          <p className="text-lg sm:text-2xl font-devanagari text-[#fce0a2] leading-relaxed font-bold text-center">
            {selectedBhashya.sanskritVerse}
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#d4a359]/80 italic mt-3 pt-3 border-t border-[#d4a359]/20 text-center">
            {selectedBhashya.iastVerse}
          </p>
        </div>
      </div>

      {/* Side-by-Side Commentary Comparison Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-devanagari text-[#fce0a2] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#f59e0b]" />
            <span>पाँच प्रमुख भाष्य दृष्टिकोण (5-Fold Hermeneutic Synthesis):</span>
          </h3>
          <span className="text-xs text-[#d4a359]/70 font-mono hidden sm:inline">
            Comparative Dialectic (वाद-संवाद)
          </span>
        </div>

        {/* Desktop Tabs */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 border-b border-[#d4a359]/20 no-scrollbar">
          {selectedBhashya.commentaries.map((com, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScholarTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-devanagari whitespace-nowrap transition-all border ${
                activeScholarTab === idx
                  ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border-[#d4a359] shadow-md font-bold'
                  : 'bg-[#140a06] text-[#d4a359]/80 border-[#d4a359]/20 hover:text-white'
              }`}
            >
              {com.hindiScholar}
            </button>
          ))}
        </div>

        {/* Selected Commentary Focused Display Card */}
        {selectedBhashya.commentaries[activeScholarTab] && (
          <div className="parchment-glass-card rounded-2xl p-6 sm:p-8 border border-[#d4a359]/40 mt-4 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4a359]/20">
              <div>
                <h4 className="text-xl font-bold font-devanagari text-white">
                  {selectedBhashya.commentaries[activeScholarTab].scholar}
                </h4>
                <div className="text-xs text-[#f59e0b] font-devanagari mt-0.5">
                  सम्प्रदाय: {selectedBhashya.commentaries[activeScholarTab].school} ({selectedBhashya.commentaries[activeScholarTab].era})
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1c0e08] text-[#38bdf8] border border-[#38bdf8]/30">
                Perspective Mode #{activeScholarTab + 1}
              </span>
            </div>

            {/* Core Shastric Perspective */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-wider block">
                📖 भाष्य दृष्टिकोण (Philosophical Interpretation):
              </span>
              <p className="text-sm sm:text-base text-[#fef8ec] font-devanagari leading-relaxed bg-[#0e0704]/70 p-4 rounded-xl border border-[#d4a359]/20">
                {selectedBhashya.commentaries[activeScholarTab].perspective}
              </p>
            </div>

            {/* Scientific Synthesis Alignment */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider block">
                🔬 आधुनिक वैज्ञानिक समन्वय (Modern Theoretical Physics Synthesis):
              </span>
              <p className="text-xs sm:text-sm text-[#fce0a2]/95 font-sans leading-relaxed bg-[#1c0e08]/90 p-4 rounded-xl border border-[#38bdf8]/30">
                {selectedBhashya.commentaries[activeScholarTab].scientificSynthesis}
              </p>
            </div>
          </div>
        )}

        {/* All Commentaries Matrix Overview Table */}
        <div className="mt-8 pt-6 border-t border-[#d4a359]/20">
          <h4 className="text-sm font-bold font-devanagari text-[#f59e0b] mb-4">
            सामूहिक भाष्य तुलना मैट्रिक्स (Comprehensive Comparative Table):
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-[#d4a359]/30">
            <table className="w-full text-left text-xs border-collapse bg-[#0e0704]">
              <thead>
                <tr className="bg-[#1c0e08] text-[#fce0a2] border-b border-[#d4a359]/30 font-devanagari">
                  <th className="p-3.5 font-bold">विद्वान / आचार्य</th>
                  <th className="p-3.5 font-bold">दार्शनिक सम्प्रदाय</th>
                  <th className="p-3.5 font-bold">मूल भाष्य सार</th>
                  <th className="p-3.5 font-bold">भौतिकी / वैज्ञानिक समकक्ष</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4a359]/15 font-sans text-[#fef8ec]/90">
                {selectedBhashya.commentaries.map((c, i) => (
                  <tr key={i} className="hover:bg-[#180c07]/80 transition-colors">
                    <td className="p-3.5 font-bold font-devanagari text-white whitespace-nowrap">
                      {c.hindiScholar}
                    </td>
                    <td className="p-3.5 font-devanagari text-[#f59e0b]">
                      {c.school}
                    </td>
                    <td className="p-3.5 font-devanagari max-w-xs leading-relaxed">
                      {c.perspective}
                    </td>
                    <td className="p-3.5 text-[#38bdf8] max-w-xs leading-relaxed">
                      {c.scientificSynthesis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </section>
  );
}
