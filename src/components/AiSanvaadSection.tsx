'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Key, 
  Brain, 
  HelpCircle, 
  Layers, 
  Atom,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  source?: string;
}

interface AiSanvaadSectionProps {
  apiKey: string;
}

export default function AiSanvaadSection({ apiKey }: AiSanvaadSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-initial',
      role: 'model',
      content: `### ॐ नमो ब्रह्मणे! सनातन ज्ञान-कोष एवं वैश्विक विज्ञान एआई संवाद में आपका स्वागत है।

मैं वेदों, उपनिषदों, षड्दर्शनों, प्राचीन भारतीय संहिताओं तथा आधुनिक क्वांटम भौतिकी, खगोलशास्त्र एवं कम्प्यूटेशनल भाषाविज्ञान का अंतःविषयक **AI वैदिक रिसर्च स्कॉलर** हूँ।

आप मुझसे किसी भी विषय पर प्रामाणिक संस्कृत मन्त्रों, अन्वय, वैज्ञानिक सहसंबंध व शोधपत्रों के सन्दर्भ में संवाद कर सकते हैं। नीचे दिए गए सुझाए गए प्रश्नों को भी चुन सकते हैं:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'vedic-scholar-core'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    {
      title: 'नासदीय सूक्त व बिग बैंग',
      prompt: 'ऋग्वेद के नासदीय सूक्त (१०.१२९) की तुलना आधुनिक कॉस्मोलॉजिकल सिंगुलैरिटी और क्वांटम वैक्यूम फ्लक्चुएशन से समझाइए।'
    },
    {
      title: 'निकोला टेस्ला व आकाश-प्राण',
      prompt: 'निकोला टेस्ला और स्वामी विवेकानंद के ऐतिहासिक संवाद तथा आकाश-प्राण सिद्धांत का आधुनिक ऊर्जा समीकरणों पर क्या प्रभाव पड़ा?'
    },
    {
      title: 'श्रॉडिंगर व अद्वैत वेदान्त',
      prompt: 'इरविन श्रॉडिंगर ने वेदान्त के "तत्त्वमसि" सिद्धांत का उपयोग क्वांटम मापन समस्या (Measurement Problem) में कैसे किया?'
    },
    {
      title: 'पाणिनि व्याकरण व नासा एआई',
      prompt: 'नासा वैज्ञानिक रिक ब्रिग्स के १९८५ शोधपत्र के अनुसार पाणिनीय अष्टाध्यायी एआई नॉलेज रिप्रजेंटेशन के लिए सबसे उपयुक्त क्यों है?'
    },
    {
      title: 'रामानुजन व ब्लैक होल एंट्रॉपी',
      prompt: 'श्रीनिवास रामानुजन के मॉक थीटा फंक्शन (Mock Theta Functions) आधुनिक ब्लैक होल भौतिकी और स्ट्रिंग थ्योरी में कैसे प्रयुक्त होते हैं?'
    },
    {
      title: 'कणाद का परमाणुवाद',
      prompt: 'महर्षि कणाद के वैशेषिक सूत्र ४.१.१ में वर्णित परमाणु, द्व्यणुक और त्र्यणुक की तुलना आधुनिक आणविक संयोजन से कीजिए।'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          customApiKey: apiKey,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (data.reply) {
        const botMessage: Message = {
          id: `model-${Date.now()}`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source || 'gemini'
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Response error');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const fallbackMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `**त्रुटि सूचना:** अनुरोध संसाधित करने में समस्या आई (${errorMessage})। कृपया पुनः प्रयास करें।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => {
    if (confirm('क्या आप संवाद इतिहास को हटाना चाहते हैं?')) {
      setMessages([messages[0]]);
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#d4a359]/20">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f59e0b] font-cinzel font-semibold mb-1">
            <Bot className="w-4 h-4" />
            <span>Section VII • Gemini AI Powered Research Scholar</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-devanagari text-white">
            AI संवाद: <span className="vedic-gold-gradient">वैदिक-वैज्ञानिक AI शोध सहायक</span>
          </h2>
          <p className="text-sm text-[#d4a359]/80 mt-1 max-w-2xl font-sans">
            Google Gemini API से संचालित द्विभाषी एआई स्कॉलर। श्लोक विश्लेषण, भौतिकी तुलना व शोध संदर्भों पर असीमित शोध विमर्श करें।
          </p>
        </div>

        {/* API Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-full text-xs font-mono border flex items-center gap-1.5 ${
            apiKey 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' 
              : 'bg-[#180c07] text-[#f59e0b] border-[#d4a359]/40'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{apiKey ? 'Live Gemini Engine Connected' : 'Vedic Scholar Engine Active'}</span>
          </div>

          <button
            onClick={clearHistory}
            title="वार्तालाप साफ़ करें"
            className="p-2 rounded-xl bg-[#180c07] border border-[#d4a359]/30 text-[#d4a359] hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips Strip */}
      <div className="mb-6">
        <div className="text-xs font-bold text-[#d4a359]/80 font-mono mb-2">
          💡 त्वरित शोध प्रश्न (Suggested Research Prompts):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.prompt)}
              className="p-2.5 rounded-xl bg-[#140a06] border border-[#d4a359]/20 hover:border-[#f59e0b] hover:bg-[#1c0e08] text-left transition-all group"
            >
              <div className="text-xs font-bold font-devanagari text-[#fce0a2] group-hover:text-[#f59e0b]">
                • {p.title}
              </div>
              <div className="text-[11px] text-[#d4a359]/70 font-sans truncate mt-0.5">
                {p.prompt}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Display Box */}
      <div className="parchment-glass-card rounded-3xl border-2 border-[#d4a359]/40 flex flex-col h-[600px] overflow-hidden shadow-2xl">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c1a1a] to-[#a33b12] border border-[#d4a359] flex items-center justify-center text-[#fce0a2] font-bold text-sm shrink-0 shadow-lg mt-1">
                    ॐ
                  </div>
                )}

                <div
                  className={`relative max-w-3xl rounded-2xl p-5 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border border-[#d4a359]/60 shadow-lg rounded-tr-none'
                      : 'bg-[#120804]/95 text-[#fef8ec] border border-[#d4a359]/30 rounded-tl-none shadow-xl'
                  }`}
                >
                  {/* Message Content */}
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm font-sans space-y-3 font-normal leading-relaxed">
                    {msg.content.split('\n').map((line, lIdx) => {
                      if (line.startsWith('### ')) {
                        return <h3 key={lIdx} className="text-base sm:text-lg font-bold font-devanagari text-[#f59e0b] mt-2 mb-1">{line.replace('### ', '')}</h3>;
                      }
                      if (line.startsWith('#### ')) {
                        return <h4 key={lIdx} className="text-sm font-bold font-devanagari text-[#fce0a2] mt-2">{line.replace('#### ', '')}</h4>;
                      }
                      if (line.startsWith('> ')) {
                        return (
                          <div key={lIdx} className="shloka-box rounded-xl p-3 my-2 font-devanagari text-[#fce0a2] text-sm">
                            {line.replace('> ', '')}
                          </div>
                        );
                      }
                      if (line.startsWith('- ')) {
                        return <li key={lIdx} className="text-[#fef8ec]/90 ml-4">{line.replace('- ', '')}</li>;
                      }
                      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                        return <div key={lIdx} className="text-[#fef8ec]/90 ml-2 font-medium">{line}</div>;
                      }
                      if (!line.trim()) return <div key={lIdx} className="h-1" />;
                      return <p key={lIdx} className="text-[#fef8ec]/90 leading-relaxed font-devanagari">{line}</p>;
                    })}
                  </div>

                  {/* Message Footer */}
                  <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-[#d4a359]/20 text-[10px] text-[#d4a359]/60 font-mono">
                    <span>{msg.timestamp} {msg.source ? `• [${msg.source}]` : ''}</span>
                    
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 text-[#d4a359] hover:text-white"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'कॉपी किया' : 'उत्तर कॉपी करें'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-[#26130b] border border-[#d4a359]/40 flex items-center justify-center text-[#f59e0b] font-bold text-xs shrink-0 mt-1">
                    👤
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-xl bg-[#7c1a1a] border border-[#d4a359] flex items-center justify-center text-[#fce0a2] font-bold text-sm shrink-0 animate-pulse">
                ॐ
              </div>
              <div className="p-4 rounded-2xl bg-[#120804] border border-[#d4a359]/30 text-xs text-[#d4a359] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#f59e0b] animate-spin" />
                <span className="font-devanagari font-medium">
                  वैदिक संहिताओं एवं आधुनिक शोधपत्रों का विश्लेषण जारी है...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Footer */}
        <div className="p-4 bg-[#0a0503] border-t border-[#d4a359]/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="वैदिक विज्ञान, मन्त्र, कणाद, टेस्ला, नासा या श्रॉडिंगर सम्बन्धी प्रश्न पूछें..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-[#140a06] border border-[#d4a359]/40 rounded-xl text-white placeholder-[#d4a359]/50 focus:outline-none focus:border-[#f59e0b]"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#7c1a1a] to-[#a33b12] text-white border border-[#d4a359] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-devanagari font-bold text-xs sm:text-sm shadow-lg"
            >
              <span>पूछें</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}
