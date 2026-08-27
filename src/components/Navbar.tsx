'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  BookOpen, 
  Atom, 
  Sparkles, 
  Layers, 
  FileText, 
  ClipboardList, 
  Bot, 
  Volume2, 
  Search, 
  Settings, 
  Menu, 
  X,
  Key,
  Sun,
  Moon,
  Gauge,
  Languages,
  Check
} from 'lucide-react';
import { useVedicAudio } from './AudioContext';

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
  const { isPlaying, isPaused, playMantra, pause, resume, speed, setSpeed } = useVedicAudio();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [themeMode, setThemeMode] = useState<'dark' | 'parchment'>('dark');
  const [selectedLang, setSelectedLang] = useState<'hi' | 'sa' | 'en'>('hi');
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleHeaderAudio = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      // Play Introductory Rigvedic Invocation
      playMantra(
        'ऋग्वेद मंगलाचरण एवं गायत्री मन्त्र',
        'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
        'ॐ भूः भुवः स्वः तत् सवितुः वरेण्यम् भर्गः देवस्य धीमहि धियः यः नः प्रचोदयात्',
        'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को अपने अन्तःकरण में धारण करें, जो हमारी बुद्धि को सन्मार्ग में प्रेरित करे।'
      );
    }
  };

  useEffect(() => {
    setTempKey(apiKey);
  }, [apiKey]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen]);

  const navItems: { id: NavTab; label: string; hindiLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'gyan-kosh', label: 'Knowledge Base', hindiLabel: 'ज्ञान कोष', icon: BookOpen },
    { id: 'vigyan-research', label: 'Science & Research', hindiLabel: 'विज्ञान व शोध', icon: Atom },
    { id: 'pioneers-matrix', label: 'Pioneers Matrix (12+)', hindiLabel: 'शोध तुलना मैट्रिक्स', icon: Sparkles },
    { id: 'bhashya-tulna', label: 'Bhashya Hermeneutics', hindiLabel: 'भाष्य तुलना', icon: Layers },
    { id: 'manuscript-decoder', label: 'Manuscript Decoder', hindiLabel: 'पांडुलिपि डिकोडर', icon: FileText },
    { id: 'audit-ledger', label: 'Research Ledger', hindiLabel: 'दैनिक ऑडिट बहीखाता', icon: ClipboardList },
    { id: 'ai-sanvaad', label: 'AI Vedic Scholar', hindiLabel: 'AI संवाद', icon: Bot },
  ];

  const handleSaveSettings = () => {
    setApiKey(tempKey);
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      setIsSettingsOpen(false);
    }, 700);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080402]/95 border-b border-[#d4a359]/20 shadow-2xl transition-all duration-300">
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
                  v2.8
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
                placeholder="खोजें (e.g. नासदीय, Tesla, Einstein, Schrödinger)..."
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

          {/* Quick Actions (Audio Speech, Settings Modal Toggle, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Real Mantra Speech Synthesizer Toggle */}
            <button
              onClick={toggleHeaderAudio}
              title={isPlaying ? "वाचन रोकें (Pause Speech)" : "मंगलाचरण मन्त्र वाचन सुनें (Listen to Vedic Recitation)"}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-devanagari transition-all border ${
                isPlaying
                  ? 'bg-[#7c1a1a] text-[#fef8ec] border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-[#180c07] text-[#d4a359] border-[#d4a359]/30 hover:border-[#d4a359]'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#f59e0b]' : 'text-[#d4a359]/70'}`} />
              <span className="hidden sm:inline font-medium">
                {isPlaying ? 'मन्त्र वाचन चालू (0.85x)' : 'मंगलाचरण सुनें'}
              </span>
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="सेटिंग्स व AI कुंजी (Settings & Configuration)"
              className="p-2 rounded-full border border-[#d4a359]/30 bg-[#180c07] text-[#d4a359] hover:text-[#fef8ec] hover:border-[#f59e0b] transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#180c07] border border-[#d4a359]/30 text-[#d4a359] hover:text-white cursor-pointer"
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
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
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-devanagari transition-all cursor-pointer ${
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

      {/* FULLY SCREEN-CENTERED SETTINGS MODAL DIALOG WITH HIGHEST Z-INDEX VIA PORTAL */}
      {mounted && isSettingsOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div 
            role="dialog"
            aria-modal="true"
            className="z-[10000] relative w-full max-w-lg rounded-2xl border border-amber-800/30 bg-[#120d08] text-amber-100 p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-auto max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header: Title and Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#7c1a1a] text-[#f59e0b] border border-amber-500/30 shadow-md">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-devanagari text-[#fce0a2]">
                    ⚙️ सिस्टम व AI सेटिंग्स
                  </h3>
                  <p className="text-xs text-amber-300/70 font-sans">
                    System Preferences, Speech Engine & Gemini AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                title="Cancel / Close"
                className="p-2 rounded-xl bg-[#0e0704] border border-amber-500/30 text-amber-200 hover:text-white hover:border-[#f59e0b] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* 1. Theme Selector */}
              <div>
                <label className="block text-xs font-mono text-[#f59e0b] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Moon className="w-4 h-4" />
                  <span>१. दृश्य थीम (Visual Theme):</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-devanagari font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-[#7c1a1a] text-[#fce0a2] border-[#f59e0b] shadow-md'
                        : 'bg-[#0e0704] text-amber-200/70 border-amber-500/20 hover:border-amber-500/50'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>कॉस्मिक डार्क (Dark)</span>
                  </button>

                  <button
                    onClick={() => setThemeMode('parchment')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-devanagari font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      themeMode === 'parchment'
                        ? 'bg-[#7c1a1a] text-[#fce0a2] border-[#f59e0b] shadow-md'
                        : 'bg-[#0e0704] text-amber-200/70 border-amber-500/20 hover:border-amber-500/50'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>पार्चमेंट गोल्ड (Light)</span>
                  </button>
                </div>
              </div>

              {/* 2. Audio Speed Selector */}
              <div>
                <label className="block text-xs font-mono text-[#f59e0b] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  <span>२. मन्त्र वाचन गति (Audio Speed):</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '0.75x', val: 0.75 },
                    { label: '0.85x', val: 0.85, sub: 'शांत' },
                    { label: '1.0x', val: 1.0 },
                    { label: '1.25x', val: 1.25 }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setSpeed(item.val)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all border text-center cursor-pointer ${
                        speed === item.val
                          ? 'bg-[#7c1a1a] text-white font-bold border-[#f59e0b] shadow-sm'
                          : 'bg-[#0e0704] text-amber-200/70 border-amber-500/20 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">{item.label}</div>
                      {item.sub && <div className="text-[10px] text-[#fce0a2]">{item.sub}</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Language Preference */}
              <div>
                <label className="block text-xs font-mono text-[#f59e0b] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Languages className="w-4 h-4" />
                  <span>३. प्राथमिक भाषा (Language Preference):</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hi', label: 'हिन्दी' },
                    { id: 'sa', label: 'संस्कृतम्' },
                    { id: 'en', label: 'English (IAST)' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLang(lang.id as 'hi' | 'sa' | 'en')}
                      className={`py-2 rounded-xl text-xs font-devanagari transition-all border text-center cursor-pointer ${
                        selectedLang === lang.id
                          ? 'bg-[#7c1a1a] text-white font-bold border-[#f59e0b]'
                          : 'bg-[#0e0704] text-amber-200/70 border-amber-500/20 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Form / Custom Gemini API Key Controls */}
              <div>
                <label className="block text-xs font-mono text-[#f59e0b] mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-4 h-4" />
                  <span>४. Google Gemini API Key (Optional):</span>
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0e0704] border border-amber-500/40 rounded-xl text-white placeholder-amber-500/40 focus:outline-none focus:border-[#f59e0b]"
                />
                <p className="text-[11px] text-amber-300/70 mt-1">
                  यदि आप अपनी कुंजी डालते हैं, तो AI संवाद सीधे Google Gemini मॉडल से चलेगा।
                </p>
              </div>

            </div>

            {/* Modal Footer with Clean 'Save changes' and 'Cancel' Buttons */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-amber-500/20">
              <button
                onClick={() => {
                  setTempKey('');
                  setApiKey('');
                }}
                className="text-xs text-amber-300/70 hover:text-rose-300 font-devanagari cursor-pointer"
              >
                कुंजी हटाएं
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 text-xs text-amber-200 hover:text-white font-devanagari rounded-xl bg-[#0e0704] border border-amber-500/30 hover:border-amber-500/70 cursor-pointer"
                >
                  Cancel (रद्द करें)
                </button>

                <button
                  onClick={handleSaveSettings}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold font-devanagari bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white rounded-xl border border-amber-400 hover:brightness-110 shadow-lg cursor-pointer"
                >
                  {isSavedAlert ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                  <span>{isSavedAlert ? 'सेव हो गया!' : 'Save changes (सुरक्षित करें)'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </header>
  );
}
