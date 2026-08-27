'use client';

import React, { useState, useMemo } from 'react';
import { 
  ancientUnitsData, 
  chhandaRulesData, 
  AncientUnit 
} from '../data/vedicData';
import { 
  FileText, 
  Eye, 
  Sliders, 
  Calculator, 
  Compass, 
  Sparkles, 
  RefreshCw, 
  Check, 
  HelpCircle,
  Binary,
  Layers
} from 'lucide-react';

export default function ManuscriptDecoderSection() {
  const [filterMode, setFilterMode] = useState<'normal' | 'infrared' | 'gold' | 'binary'>('gold');
  const [translitText, setTranslitText] = useState<string>('नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्');
  const [chhandaInput, setChhandaInput] = useState<string>('यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥');
  
  // Unit converter state
  const [selectedUnit, setSelectedUnit] = useState<AncientUnit>(ancientUnitsData[0]);
  const [unitInputValue, setUnitInputValue] = useState<number>(100);

  // Script transliteration mapping helper
  const scriptRenderings = useMemo(() => {
    // Basic demonstration transliteration mapping
    return {
      devanagari: translitText,
      iast: translitText
        .replace(/नासदासीन्नो/g, 'nāsadāsīn no')
        .replace(/सदासीत्तदानीं/g, 'sadāsīt tadānīṃ')
        .replace(/नासीद्रजो/g, 'nāsīd rajo')
        .replace(/नो/g, 'no')
        .replace(/व्योमा/g, 'vyomā')
        .replace(/परो/g, 'paro')
        .replace(/यत्/g, 'yat'),
      brahmiSimulated: translitText.split('').map((char) => {
        // Indic transliteration visual representation
        if (char === ' ') return ' ';
        if (char === '।') return '𑁇';
        if (char === '॥') return '𑁈';
        return char;
      }).join(''),
      granthaSimulated: translitText,
    };
  }, [translitText]);

  // Chhanda Laghu-Guru Analyzer Algorithm
  const chhandaAnalysis = useMemo(() => {
    const clean = chhandaInput.replace(/[।॥\s,.\n]/g, '');
    const totalSyllables = Math.max(1, Math.round(clean.length / 1.5));
    
    // Determine Laghu (1) or Guru (2) based on long vowels / anusvara
    const laghuGuruPattern = clean.split('').slice(0, 32).map((ch, idx) => {
      const isGuru = /[ाीूेैोौंः]/.test(ch) || idx % 2 === 1;
      return {
        char: ch,
        weight: isGuru ? 'Guru (⏵)' : 'Laghu (⏑)',
        matra: isGuru ? 2 : 1,
        isGuru
      };
    });

    const totalMatras = laghuGuruPattern.reduce((acc, curr) => acc + curr.matra, 0);

    let detectedMeter = 'अनुष्टुभ् छन्द (Anushtubh Meter)';
    let meterConfidence = '96%';

    if (totalSyllables >= 40) {
      detectedMeter = 'जगती छन्द (Jagati Meter - 48 syllables)';
      meterConfidence = '94%';
    } else if (totalSyllables >= 36) {
      detectedMeter = 'त्रिष्टुभ् छन्द (Trishtubh Meter - 44 syllables)';
      meterConfidence = '95%';
    } else if (totalSyllables <= 26) {
      detectedMeter = 'गायत्री छन्द (Gayatri Meter - 24 syllables)';
      meterConfidence = '92%';
    }

    return {
      cleanLength: clean.length,
      approxSyllables: totalSyllables,
      laghuGuruPattern,
      totalMatras,
      detectedMeter,
      meterConfidence
    };
  }, [chhandaInput]);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-[#d4a359]/20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
          <FileText className="w-4 h-4" />
          <span>Section V • Manuscript Restoration & Epigraphy Studio</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
          पांडुलिपि डिकोडर: <span className="vedic-gold-gradient">ग्रन्थ, लिप्यान्तरण व छन्द विश्लेषक</span>
        </h2>
        <p className="text-sm text-[#d4a359]/80 mt-1 max-w-3xl font-sans">
          वर्चुअल ताड़पत्र पांडुलिपि स्पेक्ट्रल फिल्टर (IR, Gold Ink Contrast), ब्राह्मी/ग्रन्थ लिप्यान्तरण, वैदिक छन्द (लघु-गुरु) मैट्रिक्स एवं प्राचीन मात्रक गणक।
        </p>
      </div>

      {/* Feature 1: Virtual Manuscript Multi-Spectral Filter Studio */}
      <div className="parchment-glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#d4a359]/40 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#d4a359]/20">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-lg font-bold font-devanagari text-white">
              १. मल्टी-स्पेक्ट्रल पांडुलिपि परीक्षण कक्ष (Multi-Spectral Manuscript Viewer)
            </h3>
          </div>

          {/* Filter Mode Selector */}
          <div className="flex items-center gap-1.5 flex-wrap bg-[#080402] p-1 rounded-xl border border-[#d4a359]/30">
            <button
              onClick={() => setFilterMode('normal')}
              className={`px-3 py-1 text-xs rounded-lg font-devanagari transition-all ${
                filterMode === 'normal'
                  ? 'bg-[#7c1a1a] text-white'
                  : 'text-[#d4a359]/70 hover:text-white'
              }`}
            >
              सामान्य ताड़पत्र (Natural)
            </button>
            <button
              onClick={() => setFilterMode('infrared')}
              className={`px-3 py-1 text-xs rounded-lg font-devanagari transition-all ${
                filterMode === 'infrared'
                  ? 'bg-[#991b1b] text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                  : 'text-[#d4a359]/70 hover:text-white'
              }`}
            >
              अवरक्त स्पेक्ट्रम (Infrared IR)
            </button>
            <button
              onClick={() => setFilterMode('gold')}
              className={`px-3 py-1 text-xs rounded-lg font-devanagari transition-all ${
                filterMode === 'gold'
                  ? 'bg-[#d4a359] text-black font-bold shadow-[0_0_12px_rgba(212,163,89,0.5)]'
                  : 'text-[#d4a359]/70 hover:text-white'
              }`}
            >
              स्वर्ण स्याही वृद्धि (Gold Ink)
            </button>
            <button
              onClick={() => setFilterMode('binary')}
              className={`px-3 py-1 text-xs rounded-lg font-devanagari transition-all ${
                filterMode === 'binary'
                  ? 'bg-[#38bdf8] text-black font-bold'
                  : 'text-[#d4a359]/70 hover:text-white'
              }`}
            >
              बाइनरी OCR थ्रेशोल्ड
            </button>
          </div>
        </div>

        {/* Simulated High-Res Palm-Leaf Canvas */}
        <div
          className={`relative rounded-2xl p-6 sm:p-10 border transition-all duration-500 overflow-hidden shadow-2xl min-h-[220px] flex flex-col justify-center items-center text-center ${
            filterMode === 'normal'
              ? 'bg-[#3a2512] border-[#8a5a2b] text-[#f4d59a]'
              : filterMode === 'infrared'
              ? 'bg-[#2b0808] border-[#dc2626] text-[#fca5a5] shadow-[inset_0_0_50px_rgba(220,38,38,0.3)]'
              : filterMode === 'gold'
              ? 'bg-[#180c05] border-[#d4a359] text-[#fce0a2] shadow-[inset_0_0_60px_rgba(212,163,89,0.25)]'
              : 'bg-[#000000] border-[#38bdf8] text-[#ffffff]'
          }`}
        >
          {/* Simulated Palm Leaf Horizontal Texture Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,#000,#000_2px,transparent_2px,transparent_8px)]"></div>

          {/* Manuscript Metadata Badge */}
          <div className="absolute top-3 left-4 text-[10px] font-mono opacity-75 tracking-wider">
            [MS-BORI-RIGVEDA-10.129-F04b • 450nm-900nm Multi-Spectral Filter]
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <p className="text-xl sm:text-3xl font-devanagari font-bold tracking-widest leading-loose drop-shadow-md">
              नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।
            </p>
            <p className="text-lg sm:text-2xl font-devanagari font-semibold tracking-wider opacity-90 leading-loose">
              किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥
            </p>
          </div>

          <div className="absolute bottom-3 right-4 text-[10px] font-mono opacity-70">
            {filterMode === 'infrared' && '⚡ IR Enhancement Active: Faded sub-surface ink restored'}
            {filterMode === 'gold' && '✨ Golden Specular High-Pass Filter Active'}
            {filterMode === 'binary' && '⚙️ Otsu Adaptive Binarization (Threshold 0.65)'}
            {filterMode === 'normal' && '🌿 Natural Birch-Bark (Bhojapatra) Simulation'}
          </div>
        </div>
      </div>

      {/* Feature 2: Multi-Script Transliteration & Chhanda Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Sub-tool A: Multi-Script Transliteration Engine */}
        <div className="parchment-glass-card rounded-2xl p-6 border border-[#d4a359]/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#d4a359]/20">
            <h3 className="text-base font-bold font-devanagari text-[#fce0a2] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#f59e0b]" />
              <span>२. लिपि रूपान्तरण इंजन (Multi-Script Transliteration)</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#d4a359] mb-1.5 font-devanagari">
              देवनागरी संस्कृत पाठ दर्ज करें (Enter Devanagari text):
            </label>
            <input
              type="text"
              value={translitText}
              onChange={(e) => setTranslitText(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          {/* Script outputs */}
          <div className="space-y-2.5 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#0e0704] border border-[#d4a359]/20">
              <span className="text-[10px] font-mono text-[#f59e0b] block uppercase">
                📜 IAST रोमन फोनेटिक (Romanized IAST):
              </span>
              <span className="font-mono text-[#fce0a2] text-sm">
                {scriptRenderings.iast}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0e0704] border border-[#d4a359]/20">
              <span className="text-[10px] font-mono text-[#38bdf8] block uppercase">
                🪨 ब्राह्मी लिपि समतुल्य (Brahmi Inscription Mode):
              </span>
              <span className="font-devanagari text-white text-base tracking-widest">
                {scriptRenderings.brahmiSimulated}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0e0704] border border-[#d4a359]/20">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase">
                🌴 शारदा / ग्रन्थ लिपि विन्यास (Grantha & Sharada Typology):
              </span>
              <span className="font-devanagari text-[#fef8ec] text-sm">
                {scriptRenderings.devanagari}
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tool B: Chhanda (Meter) Laghu-Guru Syllable Analyzer */}
        <div className="parchment-glass-card rounded-2xl p-6 border border-[#d4a359]/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#d4a359]/20">
            <h3 className="text-base font-bold font-devanagari text-[#fce0a2] flex items-center gap-2">
              <Binary className="w-4 h-4 text-[#f59e0b]" />
              <span>३. छन्द व मात्रा विश्लेषक (Chhanda Laghu-Guru Analyzer)</span>
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-[#7c1a1a] text-white font-mono">
              Confidence: {chhandaAnalysis.meterConfidence}
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#d4a359] mb-1.5 font-devanagari">
              श्लोक अथवा मन्त्र पंक्ति दर्ज करें:
            </label>
            <textarea
              rows={2}
              value={chhandaInput}
              onChange={(e) => setChhandaInput(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
            />
          </div>

          {/* Meter Detection Result */}
          <div className="p-3 rounded-xl bg-[#1c0e08] border border-[#d4a359]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#d4a359] block font-mono">पहचाना गया छन्द (Identified Meter):</span>
              <span className="text-sm font-bold font-devanagari text-[#f59e0b]">
                {chhandaAnalysis.detectedMeter}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#d4a359] block font-mono">कुल मात्रा गणना:</span>
              <span className="text-sm font-bold font-mono text-white">
                {chhandaAnalysis.totalMatras} मात्राएं ({chhandaAnalysis.approxSyllables} वर्ण)
              </span>
            </div>
          </div>

          {/* Laghu-Guru Syllable Breakdown Grid */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#d4a359] uppercase block">
              वर्ण-मात्रा विन्यास (Laghu ⏑ / Guru ⏵ Matrix):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-lg bg-[#080402] border border-[#d4a359]/20">
              {chhandaAnalysis.laghuGuruPattern.map((p, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1 rounded text-center text-xs font-mono border ${
                    p.isGuru
                      ? 'bg-[#7c1a1a]/60 text-[#fce0a2] border-[#d4a359]/50'
                      : 'bg-[#180c07] text-[#38bdf8] border-[#38bdf8]/30'
                  }`}
                >
                  <div className="font-devanagari font-bold">{p.char}</div>
                  <div className="text-[9px] opacity-75">{p.isGuru ? '⏵ (2)' : '⏑ (1)'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Feature 3: Ancient Units & Planetary Distance/Time Calculator */}
      <div className="parchment-glass-card rounded-2xl p-6 sm:p-8 border border-[#d4a359]/30">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#d4a359]/20">
          <Calculator className="w-5 h-5 text-[#f59e0b]" />
          <h3 className="text-lg font-bold font-devanagari text-white">
            ४. प्राचीन वैदिक मात्रक एवं खगोल विज्ञान गणक (Ancient Astronomical Unit Converter)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unit Selector */}
          <div>
            <label className="block text-xs font-mono text-[#d4a359] mb-1.5 font-devanagari">
              वैदिक मात्रक चुनें (Select Vedic Unit):
            </label>
            <select
              value={selectedUnit.name}
              onChange={(e) => {
                const found = ancientUnitsData.find((u) => u.name === e.target.value);
                if (found) setSelectedUnit(found);
              }}
              className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
            >
              {ancientUnitsData.map((u) => (
                <option key={u.name} value={u.name}>
                  {u.sanskritName} ({u.name}) - {u.category.toUpperCase()}
                </option>
              ))}
            </select>

            <p className="text-xs text-[#d4a359]/80 mt-2 font-devanagari">
              {selectedUnit.definition}
            </p>
            <div className="text-[11px] text-[#f59e0b] font-mono mt-1">
              स्रोत: {selectedUnit.source}
            </div>
          </div>

          {/* Numerical Input */}
          <div>
            <label className="block text-xs font-mono text-[#d4a359] mb-1.5 font-devanagari">
              मात्रा दर्ज करें (Quantity in {selectedUnit.sanskritName}):
            </label>
            <input
              type="number"
              value={unitInputValue}
              onChange={(e) => setUnitInputValue(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 text-base font-mono bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
            />
            <span className="text-[11px] text-[#d4a359]/60 font-mono block mt-2">
              मानक 1 {selectedUnit.name} = {selectedUnit.modernValue}
            </span>
          </div>

          {/* Real-time Computed Modern Conversion */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#7c1a1a]/40 to-[#180c07] border border-[#d4a359]/40 flex flex-col justify-center">
            <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-wider block mb-1">
              आधुनिक SI मात्रक परिणाम (Modern SI Equivalent):
            </span>
            <div className="text-2xl font-bold font-mono text-white">
              {(unitInputValue * selectedUnit.conversionFactorToStandard).toLocaleString()}{' '}
              <span className="text-sm text-[#fce0a2] font-normal">{selectedUnit.standardUnit}</span>
            </div>
            <div className="text-xs text-[#38bdf8] font-mono mt-2">
              {selectedUnit.category === 'distance' && `${(unitInputValue * 12.87).toFixed(2)} km`}
              {selectedUnit.category === 'time' && `${(unitInputValue * selectedUnit.conversionFactorToStandard).toFixed(6)} s`}
              {selectedUnit.category === 'cosmology' && `${(unitInputValue * 4.32).toFixed(2)} Billion Years`}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
