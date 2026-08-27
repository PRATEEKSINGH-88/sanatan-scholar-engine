'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Atom, 
  Sparkles, 
  Layers, 
  FileText, 
  ClipboardList, 
  Bot, 
  Volume2, 
  VolumeX, 
  Search, 
  Settings, 
  Menu, 
  X,
  Key
} from 'lucide-react';
import { omDrone } from './AudioSynthesizer';

export type NavTab = 
  | 'gyan-kosh' 
  | 'vigyan-research' 
  | 'pioneers-matrix' 
  | 'bhashya-tulna' 
  | 'manuscript-decoder' 
  | 'audit-ledger' 
  | 'ai-sanvaad';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  apiKey,
  setApiKey
}: NavbarProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const toggleAudio = () => {
    const running = omDrone.toggle();
    setIsAudioPlaying(running);
  };

  useEffect(() => {
    setTempKey(apiKey);
  }, [apiKey]);

  const navItems: { id: NavTab; label: string; hindiLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'gyan-kosh', label: 'Knowledge Base', hindiLabel: 'ज्ञान कोष', icon: BookOpen },
    { id: 'vigyan-research', label: 'Science & Research', hindiLabel: 'विज्ञान व शोध', icon: Atom },
    { id: 'pioneers-matrix', label: 'Pioneers Matrix', hindiLabel: 'शोध तुलना मैट्रिक्स', icon: Sparkles },
    { id: 'bhashya-tulna', label: 'Bhashya Hermeneutics', hindiLabel: 'भाष्य तुलना', icon: Layers },
    { id: 'manuscript-decoder', label: 'Manuscript Decoder', hindiLabel: 'पांडुलिपि डिकोडर', icon: FileText },
    { id: 'audit-ledger', label: 'Research Ledger', hindiLabel: 'दैनिक ऑडिट बहीखाता', icon: ClipboardList },
    { id: 'ai-sanvaad', label: 'AI Vedic Scholar', hindiLabel: 'AI संवाद', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080402]/90 border-b border-[#d4a359]/20 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Emblem */}
          <div 
            onClick={() => setActiveTab('gyan-kosh')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#7c1a1a] to-[#a33b12] border-2 border-[#d4a359] shadow-[0_0_15px_rgba(212,163,89,0.3)] group-hover:scale-105 transition-transform">
              <span className="text-2xl font-devanagari font-bold text-[#fef8ec] drop-shadow">ॐ</span>
              <div className="absolute inset-0 rounded-full border border-[#fce0a2]/30 animate-ping opacity-25"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-devanagari font-bold text-lg text-[#fce0a2] tracking-wide group-hover:text-[#f59e0b] transition-colors">
                  सनातन ज्ञान-कोष
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#7c1a1a]/80 text-[#fef3c7] font-mono border border-[#d4a359]/30">
                  v2.6
                </span>
              </div>
              <span className="text-xs text-[#d4a359]/80 font-cinzel tracking-wider uppercase">
                Global Science Research Engine
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#d4a359]/60" />
              <input
                type="text"
                placeholder="खोजें (e.g. नासदीय, Tesla, Schrödinger, कणाद)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm bg-[#180c07] border border-[#d4a359]/30 rounded-full text-[#fef8ec] placeholder-[#d4a359]/50 focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs text-[#d4a359]/70 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions (Audio Drone, Settings, Mobile Menu Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ambient Om Sound Synthesizer */}
            <button
              onClick={toggleAudio}
              title={isAudioPlaying ? "ॐ नाद बंद करें (Mute 136.1Hz Om Drone)" : "ॐ नाद प्रारंभ करें (Play 136.1Hz Cosmic Om Drone)"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all border ${
                isAudioPlaying
                  ? 'bg-[#7c1a1a] text-[#fef8ec] border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-[#180c07] text-[#d4a359] border-[#d4a359]/30 hover:border-[#d4a359]'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#f59e0b]" />
                  <span className="hidden sm:inline font-medium">ॐ नाद चालू</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 bg-[#f59e0b] rounded-full wave-bar-1"></span>
                    <span className="w-1 bg-[#f59e0b] rounded-full wave-bar-2"></span>
                    <span className="w-1 bg-[#f59e0b] rounded-full wave-bar-3"></span>
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#d4a359]/70" />
                  <span className="hidden sm:inline">ॐ नाद (136.1Hz)</span>
                </>
              )}
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="सेटिंग्स व AI कुंजी (API Configuration)"
              className="p-2 rounded-full bg-[#180c07] border border-[#d4a359]/30 text-[#d4a359] hover:text-[#fef8ec] hover:border-[#f59e0b] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#180c07] border border-[#d4a359]/30 text-[#d4a359] hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-[#d4a359]/15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-[#fef8ec] border border-[#d4a359]/60 shadow-[0_4px_14px_rgba(124,26,26,0.5)] scale-[1.02]'
                    : 'text-[#d4a359]/80 hover:text-[#fef8ec] hover:bg-[#1c0e08]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#f59e0b]' : 'text-[#d4a359]/70'}`} />
                <span className="font-devanagari">{item.hindiLabel}</span>
                {item.id === 'ai-sanvaad' && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-[#f59e0b] text-[#080402] font-bold rounded-full animate-bounce">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0704] border-b border-[#d4a359]/30 px-4 pt-2 pb-4 space-y-2">
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#d4a359]/60" />
            <input
              type="text"
              placeholder="खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-[#180c07] border border-[#d4a359]/30 rounded-lg text-[#fef8ec]"
            />
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-devanagari transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border border-[#d4a359]'
                      : 'text-[#d4a359]/80 hover:bg-[#1c0e08]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#f59e0b]" />
                    <span>{item.hindiLabel} ({item.label})</span>
                  </div>
                  {item.id === 'ai-sanvaad' && (
                    <span className="px-2 py-0.5 text-[10px] bg-[#f59e0b] text-[#080402] font-bold rounded-full">
                      Gemini
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-[#1c0e08] to-[#0e0704] border border-[#d4a359]/40 shadow-2xl">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-[#d4a359] hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#7c1a1a]/50 text-[#f59e0b]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-devanagari text-[#fce0a2]">
                  शोध इंजन सेटिंग्स (Settings)
                </h3>
                <p className="text-xs text-[#d4a359]/70 font-sans">
                  Configure Custom Gemini API Key & Audio Parameters
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-[#fce0a2] mb-1 font-devanagari">
                  Google Gemini API Key (वैकल्पिक / Optional):
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 text-xs bg-[#080402] border border-[#d4a359]/40 rounded-lg text-white focus:outline-none focus:border-[#f59e0b]"
                />
                <p className="text-[11px] text-[#d4a359]/60 mt-1">
                  यदि आप अपनी Gemini API Key डालते हैं, तो AI संवाद सीधे Google Gemini मॉडल से लाइव उत्तर देगा। अन्यथा यह आंतरिक वैदिक स्कॉलर इंजन का उपयोग करेगा।
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#26130b]/60 border border-[#d4a359]/20 text-xs text-[#fce0a2]/90 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#f59e0b]">
                  <span>⚡ वैदिक नाद पैरामीटर्स:</span>
                </div>
                <div>• मूल आवृत्ति: 136.1 Hz (Cosmic OM)</div>
                <div>• समकालिक हार्मोनिक्स: 272.2 Hz, 408.3 Hz & 432 Hz</div>
                <div>• ऑडियो इंजन: Web Audio API Oscillator Matrix</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-xs text-[#d4a359] hover:text-white"
              >
                रद्द करें
              </button>
              <button
                onClick={() => {
                  setApiKey(tempKey);
                  setIsSettingsOpen(false);
                }}
                className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-[#fef8ec] rounded-lg border border-[#d4a359] hover:brightness-110 shadow-lg"
              >
                सुरक्षित करें (Save)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
