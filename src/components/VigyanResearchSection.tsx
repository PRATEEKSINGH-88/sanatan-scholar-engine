'use client';

import React, { useState } from 'react';
import { 
  scienceModulesData, 
  ScienceModule 
} from '../data/vedicData';
import { 
  Atom, 
  Orbit, 
  Flame, 
  Binary, 
  Brain, 
  Cpu, 
  Clock, 
  FileCheck, 
  ChevronRight, 
  BookOpen, 
  ExternalLink,
  Award
} from 'lucide-react';

interface VigyanResearchSectionProps {
  searchQuery: string;
}

export default function VigyanResearchSection({ searchQuery }: VigyanResearchSectionProps) {
  const [selectedModule, setSelectedModule] = useState<ScienceModule>(scienceModulesData[0]);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Atom,
    Orbit,
    Flame,
    Binary,
    Brain,
    Cpu
  };

  const filteredModules = scienceModulesData.filter((mod) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      mod.title.toLowerCase().includes(q) ||
      mod.hindiTitle.includes(q) ||
      mod.summary.toLowerCase().includes(q) ||
      mod.ancientPioneer.toLowerCase().includes(q) ||
      mod.modernCounterpart.toLowerCase().includes(q) ||
      mod.detailedAnalysis.toLowerCase().includes(q)
    );
  });

  const ActiveIcon = iconMap[selectedModule.iconName] || Atom;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="mb-8 pb-6 border-b border-[#d4a359]/20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
          <Atom className="w-4 h-4" />
          <span>Section II • Modern Science & Vedic Intersections</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
          विज्ञान व शोध: <span className="vedic-gold-gradient">क्वांटम भौतिकी से एआई भाषाविज्ञान तक</span>
        </h2>
        <p className="text-sm text-[#d4a359]/80 mt-1 max-w-3xl font-sans">
          ६ प्रमुख वैज्ञानिक क्षेत्र जहाँ सनातन दार्शनिक व तकनीकी सिद्धांतों ने आधुनिक भौतिकी, खगोलशास्त्र, धातुविज्ञान एवं कम्प्यूटर विज्ञान की नींव रखी।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4a359]/70 mb-2 font-mono">
            अनुसंधान क्षेत्र चुनें (Select Module):
          </div>

          <div className="space-y-2">
            {filteredModules.map((mod) => {
              const Icon = iconMap[mod.iconName] || Atom;
              const isSelected = selectedModule.id === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-[#fef8ec] border-[#d4a359] shadow-[0_4px_20px_rgba(124,26,26,0.6)] scale-[1.02]'
                      : 'bg-[#140a06] text-[#d4a359] border-[#d4a359]/20 hover:border-[#d4a359]/50 hover:bg-[#1c0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#080402]/40 text-[#f59e0b]' : 'bg-[#1c0e08] text-[#d4a359]/70'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-devanagari">
                        {mod.hindiTitle}
                      </h4>
                      <p className="text-[11px] opacity-80 font-cinzel">
                        {mod.title}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#f59e0b]' : 'text-[#d4a359]/40'}`} />
                </button>
              );
            })}
          </div>

          {/* Historical Priority Callout Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c0e08] to-[#0e0704] border border-[#d4a359]/30 mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#f59e0b] mb-2 font-devanagari">
              <Award className="w-4 h-4" />
              <span>शोध प्राथमिकता सिद्धांत (Historical Priority)</span>
            </div>
            <p className="text-xs text-[#fce0a2]/80 leading-relaxed font-sans">
              सनातन वैज्ञानिक पद्धतियों का उद्देश्य प्रकृति के गूढ़ नियमों का ब्रह्मांडीय चेतना के साथ समरसता स्थापित करना था। आधुनिक पाश्चात्य विज्ञान द्वारा इन सत्यों की पुनः खोज इस विरासत की प्रामाणिकता सिद्ध करती है।
            </p>
          </div>
        </div>

        {/* Detailed Module Display Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="parchment-glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#d4a359]/40 relative">
            
            {/* Top Badge & Pioneer Alignment */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#d4a359]/20">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#7c1a1a] text-[#f59e0b] border border-[#d4a359]/50 shadow-lg">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-devanagari text-[#fef8ec]">
                    {selectedModule.hindiTitle}
                  </h3>
                  <div className="text-xs text-[#d4a359] font-cinzel tracking-wide">
                    {selectedModule.title}
                  </div>
                </div>
              </div>

              {/* Timeline Delta Badge */}
              <div className="px-3.5 py-1.5 rounded-full bg-[#7c1a1a]/60 text-[#fce0a2] border border-[#d4a359]/40 text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{selectedModule.timelineComparison.deltaCenturies}</span>
              </div>
            </div>

            {/* Pioneer Grid Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#0e0704]/90 border border-[#d4a359]/20">
                <div className="text-[11px] font-mono text-[#f59e0b] uppercase tracking-wider mb-1">
                  🏛️ प्राचीन सनातन मूल (Ancient Indian Pioneer)
                </div>
                <div className="text-base font-bold font-devanagari text-white">
                  {selectedModule.ancientPioneer}
                </div>
                <div className="text-xs text-[#d4a359]/80 font-sans mt-0.5">
                  ग्रन्थ: {selectedModule.ancientRoot}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0e0704]/90 border border-[#d4a359]/20">
                <div className="text-[11px] font-mono text-[#38bdf8] uppercase tracking-wider mb-1">
                  🔬 आधुनिक समकक्ष (Modern Counterpart)
                </div>
                <div className="text-base font-bold font-sans text-white">
                  {selectedModule.modernCounterpart}
                </div>
                <div className="text-xs text-[#38bdf8]/80 font-mono mt-0.5">
                  Scientific Discovery Validation
                </div>
              </div>
            </div>

            {/* Detailed Scientific Analysis */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold font-devanagari text-[#f59e0b] flex items-center gap-2">
                <span>गहन विश्लेषण एवं तुलनात्मक समीक्षा (Detailed Scientific Synthesis):</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#fef8ec]/90 leading-relaxed font-sans text-justify">
                {selectedModule.detailedAnalysis}
              </p>
            </div>

            {/* Shloka / Vedic Proof Box */}
            <div className="shloka-box rounded-2xl p-5 mb-6">
              <div className="text-[11px] font-mono text-[#f59e0b] uppercase tracking-widest mb-1.5">
                प्रामाणिक वैदिक मन्त्र साक्ष्य ({selectedModule.vedicEvidence.source}):
              </div>
              <p className="text-base sm:text-lg font-devanagari text-[#fce0a2] font-semibold leading-relaxed">
                {selectedModule.vedicEvidence.mantra}
              </p>
              <p className="text-xs font-devanagari text-[#fef8ec]/80 mt-2 pt-2 border-t border-[#d4a359]/20">
                {selectedModule.vedicEvidence.meaning}
              </p>
            </div>

            {/* Timeline Comparator */}
            <div className="p-4 rounded-xl bg-[#1c0e08]/90 border border-[#d4a359]/30 mb-6">
              <div className="text-xs font-bold text-[#f59e0b] font-devanagari mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>कालखंड तुलना (Chronological Discovery Timeline):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#0e0704] border border-[#d4a359]/20">
                  <span className="text-[#d4a359] block font-devanagari">वैदिक व शास्त्रीय काल:</span>
                  <span className="font-mono font-bold text-white text-sm">{selectedModule.timelineComparison.vedicDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0704] border border-[#d4a359]/20">
                  <span className="text-[#38bdf8] block font-devanagari">आधुनिक पश्चिमी अभिप्रमाणन:</span>
                  <span className="font-mono font-bold text-white text-sm">{selectedModule.timelineComparison.modernDate}</span>
                </div>
              </div>
            </div>

            {/* Modern Peer-Reviewed Research Papers */}
            <div>
              <div className="text-xs font-bold text-[#f59e0b] font-devanagari mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>अन्तरराष्ट्रीय शोधपत्र एवं अभिलेख (Peer-Reviewed Papers & DOIs):</span>
              </div>

              <div className="space-y-2">
                {selectedModule.modernPapers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0e0704]/80 border border-[#d4a359]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#fef8ec] font-sans">
                        {paper.title}
                      </div>
                      <div className="text-[11px] text-[#d4a359]/70 font-mono mt-0.5">
                        {paper.authors} • <em className="text-[#fce0a2]">{paper.journal}</em> ({paper.year})
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] text-[#38bdf8] font-mono hover:underline cursor-pointer">
                      <span>DOI: {paper.doi}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
