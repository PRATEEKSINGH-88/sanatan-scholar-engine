'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Atom, BookOpen, Brain } from 'lucide-react';
import { NavTab } from './Navbar';

interface HeroBannerProps {
  setActiveTab: (tab: NavTab) => void;
}

export default function HeroBanner({ setActiveTab }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden border-b border-[#d4a359]/20 bg-gradient-to-b from-[#160b06] via-[#0e0704] to-[#080402] py-12 md:py-20">
      
      {/* Background Sacred Geometry Yantra Vector */}
      <div className="absolute -right-24 -top-24 w-96 h-96 md:w-[600px] md:h-[600px] pointer-events-none opacity-10 animate-yantra-pulse">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4a359]" fill="none" stroke="currentColor" strokeWidth="0.75">
          <circle cx="100" cy="100" r="95" />
          <circle cx="100" cy="100" r="85" strokeDasharray="3 3" />
          <polygon points="100,10 180,150 20,150" />
          <polygon points="100,190 20,50 180,50" />
          <polygon points="100,25 165,140 35,140" />
          <polygon points="100,175 35,60 165,60" />
          <circle cx="100" cy="100" r="45" />
          <circle cx="100" cy="100" r="20" />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Saffron & Gold Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vedic-saffron-badge text-xs md:text-sm font-devanagari mb-6 shadow-[0_0_20px_rgba(212,163,89,0.2)]">
            <Sparkles className="w-4 h-4 text-[#f59e0b] animate-spin" style={{ animationDuration: '6s' }} />
            <span>सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च इंजन</span>
            <span className="text-[#f59e0b]">•</span>
            <span className="font-sans text-xs">Vedic Hermeneutics & Theoretical Physics Nexus</span>
          </div>

          {/* Main Title with Radiant Vedic Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-devanagari leading-tight sm:leading-tight lg:leading-tight mb-4">
            <span className="text-white">प्राचीन सनातन ज्ञान एवं</span>{' '}
            <span className="vedic-gold-gradient block sm:inline">आधुनिक विज्ञान का महासेतु</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#fef3c7]/80 font-sans max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            वेदों के नासदीय सूक्त से लेकर क्वांटम सिंगुलैरिटी तक, कणाद के परमाणुवाद से लेकर नैनोट्यूब्स तक, 
            एवं पिंगल के बाइनरी कोड से लेकर एआई भाषाविज्ञान तक—एक आधिकारिक, अंतःविषयक शोध व तुलनात्मक मैट्रिक्स।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('ai-sanvaad')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-devanagari font-bold text-sm sm:text-base bg-gradient-to-r from-[#7c1a1a] via-[#a33b12] to-[#ea580c] text-white border border-[#d4a359] shadow-[0_0_25px_rgba(163,59,18,0.5)] hover:scale-105 transition-all"
            >
              <Brain className="w-5 h-5 text-[#fce0a2]" />
              <span>AI वैदिक स्कॉलर से संवाद करें</span>
              <ArrowRight className="w-4 h-4 text-[#fce0a2]" />
            </button>

            <button
              onClick={() => setActiveTab('pioneers-matrix')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-devanagari font-semibold text-sm sm:text-base bg-[#180c07]/80 text-[#fce0a2] border border-[#d4a359]/40 hover:bg-[#26130b] hover:border-[#d4a359] transition-all"
            >
              <Atom className="w-5 h-5 text-[#f59e0b]" />
              <span>शोध तुलना मैट्रिक्स (Tesla, Schrödinger...)</span>
            </button>

            <button
              onClick={() => setActiveTab('manuscript-decoder')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-devanagari text-sm bg-[#120905] text-[#d4a359] border border-[#d4a359]/20 hover:border-[#d4a359]/60 hover:text-white transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#f59e0b]" />
              <span>पांडुलिपि डिकोडर</span>
            </button>
          </div>

          {/* Quick Statistics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#d4a359]/20 text-left">
            <div className="p-3.5 rounded-xl bg-[#180c07]/60 border border-[#d4a359]/20">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#f59e0b]">४ वेद व १०८ उपनिषद्</div>
              <div className="text-xs text-[#d4a359]/70 font-devanagari">मूल संस्कृत, अन्वय व भाष्य</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#180c07]/60 border border-[#d4a359]/20">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#f59e0b]">९+ वैज्ञानिक महारथी</div>
              <div className="text-xs text-[#d4a359]/70 font-devanagari">Tesla, NASA, Schrödinger, CERN</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#180c07]/60 border border-[#d4a359]/20">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#f59e0b]">३०+ शताब्दियों का अंतर</div>
              <div className="text-xs text-[#d4a359]/70 font-devanagari">प्राचीन शोध बनाम पश्चिमी खोज</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#180c07]/60 border border-[#d4a359]/20">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#f59e0b]">१००% शोध सन्दर्भ</div>
              <div className="text-xs text-[#d4a359]/70 font-devanagari">Nature, AI Mag & BORI पेपर्स</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
