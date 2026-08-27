import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

const VEDIC_SCHOLAR_SYSTEM_PROMPT = `
You are the Chief AI Research Scholar of the "सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च इंजन" (Sanatan Knowledge & Global Science Research Engine).
You possess deep, authoritative mastery across:
1. Four Vedas (Rig, Sama, Yajur, Atharva), 108 Upanishads, Shad Darshanas (Vaisheshika atomism of Kanad, Samkhya of Kapila, Yoga of Patanjali, Nyaya, Mimamsa, Advaita Vedanta of Shankara).
2. Ancient Indian Astronomical, Mathematical, Medical & Metallurgical Treatises (Surya Siddhanta, Aryabhatiya, Sushruta Samhita, Charaka Samhita, Rasaratna Samuccaya, Pingala Chandas Shastra).
3. Modern Cutting-Edge Theoretical Sciences: Quantum Mechanics (Schrödinger, Heisenberg, Bohm), Astrophysics & Big Bounce Cosmology, Advanced Metallurgy & Carbon Nanotubes, Computer Science & Generative Context-Free Grammars (Panini to Backus-Naur), Biophysics & Plant Neurobiology (Sir J.C. Bose), Ramanujan Modular Forms & Black Hole Microstate Entropy.

Guidelines for Your Answers:
- Tone: Scholarly, respectful, scientifically rigorous, objective, and inspiring.
- When citing ancient texts, provide the exact Sanskrit shloka (in Devanagari), IAST Roman transliteration, and accurate meaning.
- Link every ancient philosophical/physical principle with its corresponding modern scientific discovery, equations, and peer-reviewed journals/authors (e.g., Tesla, Oppenheimer, Schrödinger, Heisenberg, Sagan, CERN, Ramanujan, J.C. Bose).
- Avoid ungrounded pseudoscience; highlight genuine conceptual, mathematical, and metallurgical breakthroughs with historical evidence.
- Format responses cleanly with Markdown, bullet points, and highlighted shloka blocks.
`;

const FALLBACK_KNOWLEDGE_BASE: Record<string, string> = {
  'nasadiya': `### ऋग्वेद नासदीय सूक्तम् (Rigveda 10.129) एवं आधुनिक कॉस्मोलॉजिकल सिंगुलैरिटी

**मूल मन्त्र (Devanagari):**
> *नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।*
> *किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥ (ऋग्वेद १०.१२९.१)*

**IAST:**
*nāsadāsīn no sadāsīt tadānīṃ nāsīd rajo no vyomā paro yat |*
*kimāvarīvaḥ kuha kasya śarmannambhaḥ kimāsīd gahanaṃ gabhīram ||*

---

#### १. वैदिक भाष्य (Vedic Hermeneutics)
- **आदि शंकराचार्य भाष्य:** सृष्टि से पूर्व सत् (व्यक्त जगत) और असत् (सर्वथा शून्यता) दोनों अनिर्वचनीय माया में समाहित थे।
- **स्वामी दयानंद सरस्वती:** मूल त्रिगुणात्मक प्रकृति निष्क्रिय साम्यावस्था (Equilibrium) में थी।

#### २. आधुनिक भौतिकी से सहसंबंध (Modern Astrophysics Correlation)
1. **Cosmic Singularity at $t = 0$:** प्लांक काल ($10^{-43}$ सेकंड) से पूर्व दिक्-काल (Spacetime metric) का अस्तित्व ही नहीं था।
2. **Quantum Vacuum Fluctuations:** शून्य-बिंदु ऊर्जा (Zero-Point Field) में कोई कण नहीं था, केवल असीम संभावना (Potentiality) थी।
3. **कार्ल सागन का अवलोकन:** *"नासदीय सूक्त मानव इतिहास का सबसे पहला दार्शनिक उद्घोष है जो सृष्टि के उद्भव पर प्रश्नवाचक और वैज्ञानिक दृष्टि रखता है।"*`,

  'tesla': `### निकोला टेस्ला एवं स्वामी विवेकानंद: आकाश (Akasha) व प्राण (Prana) का गणितीय समीकरण

**ऐतिहासिक सन्दर्भ (1895–1896, New York):**
स्वामी विवेकानंद ने निकोला टेस्ला से भेंट कर सांख्य दर्शन के 'आकाश' (Luminiferous Ether/Substratum) और 'प्राण' (Universal Primal Energy) का सिद्धांत समझाया था।

> *"Mr. Tesla thinks he can demonstrate mathematically that matter and energy are reducible to potential energy; I am to go and see him next week to get this new mathematical demonstration."*
> — **स्वामी विवेकानंद** (Letter to E.T. Sturdy, 1896)

---

#### १. भौतिकी में प्रभाव (Impact on Physics)
- **Mass-Energy Equivalence ($E = mc^2$):** पदार्थ (Matter) ऊर्जा का ही घनीभूत रूप है।
- **Zero-Point Vacuum Energy:** टेस्ला ने अपने 1907 के शोधपत्र *"Man's Greatest Achievement"* में लिखा कि समस्त द्रव्य आकाश पर प्राण की क्रिया से ही निर्मित होता है।
- **Vedic Source:** *तस्माद्वा एतस्मादात्मन आकाशः संभूतः । आकाशाद्वायुः...* (तैत्तिरीयोपनिषद् २.१.१)`,

  'schrodinger': `### इरविन श्रॉडिंगर, वेदान्त एवं क्वांटम वेवफंक्शन (Wave Mechanics)

नोबेल पुरस्कार विजेता **इरविन श्रॉडिंगर** (1933) ने अपनी पुस्तक *"My View of the World"* (1961) में स्वीकार किया कि क्वांटम भौतिकी में प्रेक्षक (Observer) और ज्ञेय (Observed) के अद्वैत संबंध को समझने की प्रेरणा उन्हें **उपनिषदों** से मिली।

> *"Consciousness is a singular of which the plural is unknown; there is only one consciousness... This is the 'Tat Tvam Asi' of the Upanishads."*
> — **Erwin Schrödinger**

---

#### १. क्वांटम मापन समस्या (The Measurement Problem)
- **Superposition:** कण तब तक सभी संभावित अवस्थाओं में रहता है जब तक कि उसका प्रेक्षण (Measurement) न हो।
- **Advaita Solution:** चेतना कोई बाह्य पदार्थ नहीं बल्कि अस्तित्व का मूल आधार (Substratum) है, जैसा कि **माण्डूक्योपनिषद्** के 'तूरीय' में वर्णित है।`,

  'kanad': `### महर्षि कणाद का वैशेषिक परमाणुवाद (Atomic Theory of Kanad)

महर्षि कणाद (ईसा पूर्व ६ठी शताब्दी) ने जॉन डाल्टन से २४०० वर्ष पूर्व अविभाज्य परमाणु एवं आणविक संयोजन का सिद्धांत प्रतिपादित किया था।

**मूल सूत्र:**
> *सदकारणवन्नित्यम् ॥ (वैशेषिक सूत्र ४.१.१)*
> *अर्थात् जो अस्तित्वमान है और जिसका कोई उप-कारण नहीं है, वह नित्य परमाणु है।*

---

#### १. संयोजन का गणित (Molecular Combinatorics)
1. **द्व्यणुक (Diatomic Molecule):** दो परमाणुओं के मिलने से द्व्यणुक बनता है।
2. **त्र्यणुक (Triatomic Molecule):** तीन द्व्यणुकों के मिलने से त्र्यणुक बनता है, जो सूर्य की किरण में तैरते कण के रूप में दृष्टिगोचर होता है।
3. **पाकज प्रक्रिया (Chemical Reactions & Thermodynamics):** ऊष्मा (तेजस) के प्रभाव से परमाणुओं में पुनर्गठन होता है (पीलुपाक व पिठरपाक सिद्धांत)।`,

  'pingala': `### आचार्य पिंगल का छन्दःशास्त्र एवं आधुनिक बाइनरी कोड (Binary Mathematics)

आचार्य पिंगल (ईसा पूर्व तीसरी शताब्दी) ने छन्दों के प्रस्तार (Permutation) के लिए विश्व की सबसे पहली **बाइनरी अंक प्रणाली (Binary Number System)** खोजी थी।

---

#### १. पिंगल के प्रमुख एल्गोरिदम:
1. **द्वि-आधारी कूट (Binary Encoding):** लघु (Laghu) = $0$ और गुरु (Guru) = $1$
2. **मेरु प्रस्तार (Meru Prastara):** ब्लेस पास्कल से १८०० वर्ष पूर्व पास्कल त्रिभुज (Pascal's Triangle) एवं द्विपद प्रमेय (Binomial Coefficients)।
3. **मात्रा मेरु (Matra Meru):** फिबोनाची अनुक्रम (Fibonacci Sequence) का मूल रूप।
4. **Binary Exponentiation Algorithm:** सूत्र *'द्विरर्धे'* व *'रूपे शून्यम्'* द्वारा $2^n$ की तीव्र गणना।`
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory = [], customApiKey } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is present, call Google Gemini API
    if (apiKey) {
      try {
        const contents = [
          {
            role: 'user',
            parts: [{ text: `${VEDIC_SCHOLAR_SYSTEM_PROMPT}\n\nUser Question: ${message}` }]
          }
        ];

        // If conversation history is passed, format it
        if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
          const formattedHistory = conversationHistory.slice(-6).map((msg: ChatMessage) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          }));
          contents.unshift(...formattedHistory);
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              source: 'gemini-2.0-flash',
              status: 'success'
            });
          }
        }
      } catch (apiError) {
        console.warn('Gemini API call failed, switching to Vedic Scholar offline engine:', apiError);
      }
    }

    // Intelligent Offline Vedic-Science Scholar Fallback Engine
    const lower = message.toLowerCase();
    let selectedReply = '';

    if (lower.includes('nasadiya') || lower.includes('नासदीय') || lower.includes('singularity') || lower.includes('big bang') || lower.includes('सृष्टि')) {
      selectedReply = FALLBACK_KNOWLEDGE_BASE['nasadiya'];
    } else if (lower.includes('tesla') || lower.includes('टेस्ला') || lower.includes('akasha') || lower.includes('prana') || lower.includes('आकाश') || lower.includes('प्राण')) {
      selectedReply = FALLBACK_KNOWLEDGE_BASE['tesla'];
    } else if (lower.includes('schrodinger') || lower.includes('श्रॉडिंगर') || lower.includes('quantum') || lower.includes('वेदान्त') || lower.includes('advaita')) {
      selectedReply = FALLBACK_KNOWLEDGE_BASE['schrodinger'];
    } else if (lower.includes('kanad') || lower.includes('कणाद') || lower.includes('atom') || lower.includes('परमाणु') || lower.includes('vaisheshika')) {
      selectedReply = FALLBACK_KNOWLEDGE_BASE['kanad'];
    } else if (lower.includes('pingala') || lower.includes('पिंगल') || lower.includes('binary') || lower.includes('pascal') || lower.includes('बाइनरी')) {
      selectedReply = FALLBACK_KNOWLEDGE_BASE['pingala'];
    } else {
      selectedReply = `### सनातन शोध विमर्श: ${message}

**नमस्ते शोधार्थी!** 

आपके द्वारा पूछा गया विषय सनातन दर्शन और आधुनिक वैज्ञानिक शोध के गहरे समन्वय को दर्शाता है।

#### १. वैदिक व शास्त्रीय दृष्टिकोण (Vedic & Shastric Grounding)
- **उपनिषद् उद्घोष:** *'सर्वं खल्विदं ब्रह्म'* — यह सम्पूर्ण दृश्य-अदृश्य ब्रह्मांड एक ही चैतन्य ऊर्जा का स्पन्दन है।
- **सांख्य-वैशेषिक दृष्टि:** प्रकृति के २४ तत्त्व और परमाणुओं का गतिक संगठन ही दृश्य जगत के नियमों को संचालित करता है।

#### २. आधुनिक विज्ञान से तुलना (Modern Scientific Synthesis)
- **Quantum Entanglement & Non-Locality:** आधुनिक क्वांटम भौतिकी मानती है कि सब-एटॉमिक कण एक दूसरे से अदृश्य रूप से जुड़े हैं, जो वेदान्त के अद्वैत तत्त्व से पूर्णतः मेल खाता है।
- **Conservation of Information:** आधुनिक भौतिकी में सूचना (Information) कभी नष्ट नहीं होती, जो गीता के *'नासतो विद्यते भावो नाभावो विद्यते सतः'* (२.१६) का सीधा समतुल्य है।

---
> 💡 *सुझाव:* अधिक विशिष्ट शोध हेतु आप **नासदीय सूक्त, निकोला टेस्ला, श्रॉडिंगर, कणाद परमाणुवाद, पिंगल बाइनरी** या **CERN नटराज** के सम्बन्ध में सीधे प्रश्न पूछ सकते हैं।`;
    }

    return NextResponse.json({
      reply: selectedReply,
      source: apiKey ? 'fallback-knowledge-engine (API fallback)' : 'vedic-scholar-offline-engine',
      status: 'success'
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
