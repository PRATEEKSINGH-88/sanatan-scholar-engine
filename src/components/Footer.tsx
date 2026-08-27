'use client';

import React from 'react';
import { NavTab } from './Navbar';
import { Sparkles, BookOpen, Atom, Heart, Code2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-[#d4a359]/30 bg-[#060301] py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Shloka Manifesto Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 p-6 rounded-3xl bg-gradient-to-r from-[#7c1a1a]/20 via-[#1c0e08] to-[#7c1a1a]/20 border border-[#d4a359]/30">
          <p className="text-lg sm:text-xl font-devanagari font-bold text-[#fce0a2] tracking-wide">
            "आ नो भद्राः क्रतवो यन्तु विश्वतः"
          </p>
          <p className="text-xs text-[#d4a359] font-mono mt-1">
            (ऋग्वेद १.८९.१ - Let noble thoughts and scientific insights come to us from all directions of the Universe)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#d4a359]/15">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#7c1a1a] flex items-center justify-center text-[#fef8ec] font-bold text-xs border border-[#d4a359]">
                ॐ
              </div>
              <span className="font-devanagari font-bold text-base text-white">
                सनातन ज्ञान-कोष
              </span>
            </div>
            <p className="text-[#d4a359]/80 font-sans leading-relaxed text-[11px]">
              प्राचीन वैदिक दर्शन, उपनिषदों, कणाद परमाणुवाद तथा आधुनिक क्वांटम भौतिकी, कॉस्मोलॉजी व कम्प्यूटेशनल भाषाविज्ञान का आधिकारिक अंतःविषयक शोध इंजन।
            </p>
          </div>

          {/* Col 2: Sections */}
          <div>
            <h4 className="font-bold text-[#f59e0b] font-devanagari mb-3 uppercase tracking-wider text-[11px]">
              प्रमुख सेक्शन्स (Core Modules)
            </h4>
            <ul className="space-y-1.5 font-devanagari text-[#fef8ec]/80">
              <li>
                <button onClick={() => setActiveTab('gyan-kosh')} className="hover:text-[#f59e0b] transition-colors">
                  • ज्ञान कोष (Vedas & Upanishads)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('vigyan-research')} className="hover:text-[#f59e0b] transition-colors">
                  • विज्ञान व शोध (Quantum & Metallurgy)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pioneers-matrix')} className="hover:text-[#f59e0b] transition-colors">
                  • शोध तुलना मैट्रिक्स (Tesla, Schrödinger...)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bhashya-tulna')} className="hover:text-[#f59e0b] transition-colors">
                  • भाष्य तुलना (Hermeneutics)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Tools */}
          <div>
            <h4 className="font-bold text-[#f59e0b] font-devanagari mb-3 uppercase tracking-wider text-[11px]">
              शोध उपकरण (Research Tools)
            </h4>
            <ul className="space-y-1.5 font-devanagari text-[#fef8ec]/80">
              <li>
                <button onClick={() => setActiveTab('manuscript-decoder')} className="hover:text-[#f59e0b] transition-colors">
                  • पांडुलिपि स्पेक्ट्रल डिकोडर
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('manuscript-decoder')} className="hover:text-[#f59e0b] transition-colors">
                  • छन्द व मात्रा विश्लेषक
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('audit-ledger')} className="hover:text-[#f59e0b] transition-colors">
                  • दैनिक ऑडिट बहीखाता
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-sanvaad')} className="hover:text-[#f59e0b] transition-colors">
                  • Gemini AI वैदिक संवाद
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Open Science & Repository */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#f59e0b] font-devanagari uppercase tracking-wider text-[11px]">
              ओपन साइंस एवं स्रोत (GitHub)
            </h4>
            <p className="text-[#d4a359]/80 text-[11px] leading-relaxed">
              यह रिपॉजिटरी ओपन-सोर्स वैदिक-वैज्ञानिक अनुसंधान को समर्पित है।
            </p>
            <a
              href="https://github.com/PRATEEKSINGH-88/sanatan-scholar-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#140a06] border border-[#d4a359]/40 text-[#fce0a2] hover:border-[#d4a359] hover:text-white transition-all text-xs font-mono"
            >
              <svg className="w-4 h-4 text-[#f59e0b] fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[#d4a359]/60 text-[11px]">
          <div>
            © 2026 सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च इंजन • Sanatan Scholar Engine. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span>Built with Next.js App Router, Tailwind CSS & Google Gemini AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
