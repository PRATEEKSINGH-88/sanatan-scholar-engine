'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  initialAuditLedgerData, 
  AuditLedgerItem 
} from '../data/vedicData';
import { 
  ClipboardList, 
  PlusCircle, 
  Download, 
  Search, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  Printer, 
  Trash2,
  Share2
} from 'lucide-react';

export default function AuditLedgerSection() {
  const [ledgerItems, setLedgerItems] = useState<AuditLedgerItem[]>(initialAuditLedgerData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterConfidence, setFilterConfidence] = useState<string>('all');
  const [ledgerSearch, setLedgerSearch] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState<Partial<AuditLedgerItem>>({
    title: '',
    vedicSource: '',
    modernField: '',
    evidenceConfidence: 'Direct Match',
    scholarName: '',
    summary: '',
    citation: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sanatan_audit_ledger_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLedgerItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  const saveItems = (items: AuditLedgerItem[]) => {
    setLedgerItems(items);
    try {
      localStorage.setItem('sanatan_audit_ledger_v1', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.vedicSource) {
      alert('कृपया शीर्षक एवं वैदिक स्रोत अनिवार्य रूप से भरें।');
      return;
    }

    const newItem: AuditLedgerItem = {
      id: `audit-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: formData.title || '',
      vedicSource: formData.vedicSource || '',
      modernField: formData.modernField || 'General Science',
      evidenceConfidence: (formData.evidenceConfidence as 'Direct Match' | 'Analogous' | 'Exploratory') || 'Direct Match',
      scholarName: formData.scholarName || 'Independent Scholar',
      summary: formData.summary || '',
      citation: formData.citation || 'Private Research Log',
      tags: formData.tags && formData.tags.length > 0 ? formData.tags : ['Vedic-Science']
    };

    const updated = [newItem, ...ledgerItems];
    saveItems(updated);
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      vedicSource: '',
      modernField: '',
      evidenceConfidence: 'Direct Match',
      scholarName: '',
      summary: '',
      citation: '',
      tags: []
    });
    setTagInput('');
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप इस ऑडिट रिकॉर्ड को हटाना चाहते हैं?')) {
      const updated = ledgerItems.filter((i) => i.id !== id);
      saveItems(updated);
    }
  };

  const filteredItems = useMemo(() => {
    return ledgerItems.filter((item) => {
      const matchesConfidence = filterConfidence === 'all' || item.evidenceConfidence === filterConfidence;
      const q = ledgerSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.vedicSource.toLowerCase().includes(q) ||
        item.modernField.toLowerCase().includes(q) ||
        item.scholarName.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      return matchesConfidence && matchesSearch;
    });
  }, [ledgerItems, filterConfidence, ledgerSearch]);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ledgerItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sanatan_research_ledger_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportMarkdown = () => {
    let md = `# सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च ऑडिट बहीखाता\nGenerated on: ${new Date().toLocaleDateString()}\n\n---\n\n`;
    ledgerItems.forEach((item, index) => {
      md += `### ${index + 1}. ${item.title}\n`;
      md += `- **दिनांक (Date):** ${item.date}\n`;
      md += `- **वैदिक स्रोत (Vedic Source):** ${item.vedicSource}\n`;
      md += `- **आधुनिक क्षेत्र (Modern Field):** ${item.modernField}\n`;
      md += `- **साक्ष्य साख (Confidence):** ${item.evidenceConfidence}\n`;
      md += `- **शोधकर्ता (Scholar):** ${item.scholarName}\n`;
      md += `- **सार (Summary):** ${item.summary}\n`;
      md += `- **उद्धरण (Citation):** ${item.citation}\n`;
      md += `- **टैग्स (Tags):** ${item.tags.join(', ')}\n\n---\n\n`;
    });

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(md);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sanatan_research_audit_dossier.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#d4a359]/20">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
            <ClipboardList className="w-4 h-4" />
            <span>Section VI • Daily Research Audit & Evidence Ledger</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
            दैनिक ऑडिट बहीखाता: <span className="vedic-gold-gradient">अनुसंधान अभिलेख व साक्ष्य रेटिंग</span>
          </h2>
          <p className="text-sm text-[#d4a359]/80 mt-1 max-w-2xl font-sans">
            वैदिक मन्त्रों व आधुनिक भौतिकी/गणित/धातुविज्ञान शोधपत्रों के सत्यापन का खुला बहीखाता। नए शोध प्रविष्ट करें अथवा रिपोर्ट एक्सपोर्ट करें।
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-devanagari font-bold bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border border-[#d4a359] shadow-lg hover:brightness-110"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया शोध प्रविष्ट करें</span>
          </button>

          <button
            onClick={handleExportJSON}
            title="JSON डेटा डाउनलोड करें"
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono bg-[#180c07] text-[#d4a359] border border-[#d4a359]/30 hover:border-[#d4a359] hover:text-white"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleExportMarkdown}
            title="Markdown डोजियर डाउनलोड करें"
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono bg-[#180c07] text-[#d4a359] border border-[#d4a359]/30 hover:border-[#d4a359] hover:text-white"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Markdown</span>
          </button>

          <button
            onClick={handlePrint}
            title="प्रिंट / PDF सेव करें"
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono bg-[#180c07] text-[#d4a359] border border-[#d4a359]/30 hover:border-[#d4a359] hover:text-white"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#d4a359]/60" />
          <input
            type="text"
            placeholder="बहीखाते में खोजें (Title, Source, Scholar)..."
            value={ledgerSearch}
            onChange={(e) => setLedgerSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#080402] border border-[#d4a359]/30 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[#d4a359]/70 font-mono">साक्ष्य साख (Rating):</span>
          <select
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#080402] border border-[#d4a359]/40 rounded-xl text-[#fce0a2] focus:outline-none focus:border-[#f59e0b]"
          >
            <option value="all">सभी रेटिंग (All Ratings)</option>
            <option value="Direct Match">Direct Match (प्रत्यक्ष प्रमाण ★★★)</option>
            <option value="Analogous">Analogous (सादृश्य प्रमाण ★★☆)</option>
            <option value="Exploratory">Exploratory (अन्वेषणात्मक ★☆☆)</option>
          </select>
        </div>
      </div>

      {/* Ledger Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="parchment-glass-card rounded-2xl p-5 sm:p-6 border border-[#d4a359]/30 relative transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono text-[#d4a359]/70">
                    🗓️ {item.date}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-semibold ${
                    item.evidenceConfidence === 'Direct Match'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : item.evidenceConfidence === 'Analogous'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                      : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50'
                  }`}>
                    {item.evidenceConfidence === 'Direct Match' && '★★★ Direct Match'}
                    {item.evidenceConfidence === 'Analogous' && '★★☆ Analogous'}
                    {item.evidenceConfidence === 'Exploratory' && '★☆☆ Exploratory'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#1c0e08] text-[#38bdf8] border border-[#38bdf8]/30 font-mono">
                    {item.modernField}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-devanagari text-white">
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                title="हटाएं"
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 border border-transparent hover:border-rose-800 transition-all self-end sm:self-auto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Shastric & Modern Correlation Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-[#0e0704]/80 border border-[#d4a359]/20 text-xs mb-3">
              <div>
                <span className="text-[#f59e0b] font-devanagari font-semibold block">
                  📜 वैदिक स्रोत / सूत्र:
                </span>
                <span className="text-[#fef8ec]/90 font-mono">
                  {item.vedicSource}
                </span>
              </div>
              <div>
                <span className="text-[#38bdf8] font-mono font-semibold block">
                  👨‍🏫 शोधकर्ता / दल (Scholar/Institution):
                </span>
                <span className="text-[#fef8ec]/90 font-sans">
                  {item.scholarName}
                </span>
              </div>
            </div>

            {/* Research Summary */}
            <p className="text-xs sm:text-sm text-[#fce0a2]/90 leading-relaxed font-sans mb-3 text-justify">
              {item.summary}
            </p>

            {/* Citation & Tags Footer */}
            <div className="pt-3 border-t border-[#d4a359]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="text-[11px] text-[#d4a359]/80 font-mono">
                <strong>अभिलेख उद्धरण: </strong>{item.citation}
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-[#f59e0b] bg-[#1c0e08] px-2 py-0.5 rounded border border-[#d4a359]/20">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Research Log Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#120905] border-2 border-[#d4a359] shadow-2xl space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1c0e08] text-[#d4a359] hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-devanagari text-white pb-2 border-b border-[#d4a359]/30">
              नया शोध ऑडिट प्रविष्ट करें (Add Research Record)
            </h3>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#fce0a2] font-devanagari mb-1">
                  शोध शीर्षक (Research Title) *:
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="उदा. कणाद परमाणुवाद एवं क्वार्क मॉडल तुलना"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#fce0a2] font-devanagari mb-1">
                    वैदिक स्रोत / ग्रन्थ (Vedic Source) *:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vedicSource}
                    onChange={(e) => setFormData({ ...formData, vedicSource: e.target.value })}
                    placeholder="उदा. वैशेषिक सूत्र ४.१.१"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block text-[#fce0a2] font-devanagari mb-1">
                    आधुनिक वैज्ञानिक क्षेत्र (Modern Field):
                  </label>
                  <input
                    type="text"
                    value={formData.modernField}
                    onChange={(e) => setFormData({ ...formData, modernField: e.target.value })}
                    placeholder="उदा. Particle Physics / Quantum Mechanics"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#fce0a2] font-devanagari mb-1">
                    साक्ष्य साख रेटिंग (Confidence Level):
                  </label>
                  <select
                    value={formData.evidenceConfidence}
                    onChange={(e) => setFormData({ ...formData, evidenceConfidence: e.target.value as 'Direct Match' | 'Analogous' | 'Exploratory' })}
                    className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                  >
                    <option value="Direct Match">Direct Match (प्रत्यक्ष प्रमाण ★★★)</option>
                    <option value="Analogous">Analogous (सादृश्य प्रमाण ★★☆)</option>
                    <option value="Exploratory">Exploratory (अन्वेषणात्मक ★☆☆)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#fce0a2] font-devanagari mb-1">
                    शोधकर्ता / संस्थान (Scholar / Institution):
                  </label>
                  <input
                    type="text"
                    value={formData.scholarName}
                    onChange={(e) => setFormData({ ...formData, scholarName: e.target.value })}
                    placeholder="उदा. Dr. S. Radhakrishnan, Oxford Research"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#fce0a2] font-devanagari mb-1">
                  शोध सार एवं व्याख्या (Detailed Findings & Synthesis):
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="शोध के मुख्य निष्कर्ष एवं वैज्ञानिक तुलना दर्ज करें..."
                  className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="block text-[#fce0a2] font-devanagari mb-1">
                  शोधपत्र / जर्नल उद्धरण (Citation):
                </label>
                <input
                  type="text"
                  value={formData.citation}
                  onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  placeholder="उदा. Journal of Indian Philosophy, Vol 42, DOI: 10.1007/..."
                  className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="block text-[#fce0a2] font-devanagari mb-1">
                  टैग्स (Tags - अल्पविराम से अलग करें):
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    });
                  }}
                  placeholder="Physics, Atom, Vaisheshika, Kanad"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#d4a359]/40 rounded-xl text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d4a359]/20">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#d4a359] hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-devanagari font-bold text-xs bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border border-[#d4a359] hover:brightness-110 shadow-lg"
                >
                  सुरक्षित करें (Save to Ledger)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
