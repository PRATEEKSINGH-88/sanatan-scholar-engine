'use client';

import React, { useState, useEffect } from 'react';
import Navbar, { NavTab } from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import GyanKoshSection from '@/components/GyanKoshSection';
import VigyanResearchSection from '@/components/VigyanResearchSection';
import ComparisonMatrixSection from '@/components/ComparisonMatrixSection';
import BhashyaTulnaSection from '@/components/BhashyaTulnaSection';
import ManuscriptDecoderSection from '@/components/ManuscriptDecoderSection';
import AuditLedgerSection from '@/components/AuditLedgerSection';
import AiSanvaadSection from '@/components/AiSanvaadSection';
import BottomFloatingPlayer from '@/components/BottomFloatingPlayer';
import TextSelectionSpeaker from '@/components/TextSelectionSpeaker';
import Footer from '@/components/Footer';
import { AudioProvider } from '@/components/AudioContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('gyan-kosh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  // Load custom API key from localStorage if saved earlier
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('sanatan_gemini_api_key');
      if (savedKey) setApiKey(savedKey);
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateApiKey = (key: string) => {
    setApiKey(key);
    try {
      if (key) {
        localStorage.setItem('sanatan_gemini_api_key', key);
      } else {
        localStorage.removeItem('sanatan_gemini_api_key');
      }
    } catch {
      // ignore
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-[#080402] text-[#f3ede2] selection:bg-[#7c1a1a] selection:text-[#fef8ec] relative">
        
        {/* Floating Text Selection Listener */}
        <TextSelectionSpeaker />

        {/* Sticky Header Navbar with Audio Voice Trigger */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          apiKey={apiKey}
          setApiKey={handleUpdateApiKey}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-24">
          {/* Hero Banner with Stats and Quick CTAs */}
          <HeroBanner setActiveTab={setActiveTab} />

          {/* Dynamic Section Rendering */}
          <div className="relative z-10 transition-opacity duration-300">
            {activeTab === 'gyan-kosh' && (
              <GyanKoshSection searchQuery={searchQuery} />
            )}

            {activeTab === 'vigyan-research' && (
              <VigyanResearchSection searchQuery={searchQuery} />
            )}

            {activeTab === 'pioneers-matrix' && (
              <ComparisonMatrixSection searchQuery={searchQuery} />
            )}

            {activeTab === 'bhashya-tulna' && (
              <BhashyaTulnaSection />
            )}

            {activeTab === 'manuscript-decoder' && (
              <ManuscriptDecoderSection />
            )}

            {activeTab === 'audit-ledger' && (
              <AuditLedgerSection />
            )}

            {activeTab === 'ai-sanvaad' && (
              <AiSanvaadSection apiKey={apiKey} />
            )}
          </div>
        </main>

        {/* Clean Bottom Floating Player (Fixed at bottom-4, centered) */}
        <BottomFloatingPlayer />

        {/* Footer with Manifesto and Links */}
        <Footer setActiveTab={setActiveTab} />

      </div>
    </AudioProvider>
  );
}
