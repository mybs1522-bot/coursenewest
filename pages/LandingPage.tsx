import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  Logo, CallToActionWidget, SocialProofToast,
  PROBLEM_POINTS, TRANSFORMATION_STORIES, FEAR_STATS,
  VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING, INCOME_TIERS,
  COURSES_LANDING, PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2
} from './LandingHelpers';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(() => { const D = (3 * 3600 + 36 * 60 + 20) * 1000, r = D - (Date.now() % D); return { h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) }; });
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const calc = () => { const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D); setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) }); };
    const t = setInterval(calc, 1000); calc(); return () => clearInterval(t);
  }, []);
  useEffect(() => { const h = () => setShowStickyBar(window.scrollY > 600); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);

  const openCheckout = () => navigate('/checkout');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden selection:bg-blue-100 grid-bg">
      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-2xl border-b border-slate-100/60 px-5 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button onClick={openCheckout} className="hidden md:block text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all premium-stroke" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 0 15px rgba(249,115,22,0.4)' }}>Get Instant Global Access</button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO — The Hook */}
        <section className="relative pt-0 pb-16 md:pb-24 overflow-hidden bg-white grid-bg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/8 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-400/6 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-cyan-400/5 blur-[120px] rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto px-5 relative z-10">
            <div className="flex flex-col items-center text-center pt-8 md:pt-16">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                <CheckCircle size={14} className="text-orange-600" />
                <span className="text-xs font-bold text-orange-700">Your Complete Journey to Professional 3D Excellence</span>
              </div>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-slate-600">50,000+ Students Supported 24/7 by Our Team</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[52px] font-display font-bold leading-[1.15] mb-6 text-slate-900 tracking-tight">
                Architects & Interior Designers <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">are losing jobs according to Claude.</span>
              </h1>
              <div className="w-full max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img src="https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc1952c81bca02a7c8cc05ef7801e67ca60831c55-4096x4096.png&w=3840&q=75" alt="Claude AI Impact on Architecture" className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500" />
              </div>
              <p className="text-lg md:text-xl text-slate-700 font-bold mb-6 leading-relaxed max-w-4xl mx-auto">
                <span className="text-orange-600">But you don't need to worry.</span> If you know how to use AI for your leverage, you become irreplaceable. We will patiently hold your hand and upgrade your skills in Interior & Exterior Designing, Planning, and Rendering.
              </p>
              
              {/* New Story Section */}
              <div className="w-full max-w-3xl mx-auto mb-10 text-left bg-gradient-to-br from-white to-slate-50 p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <p className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed mb-6 relative z-10 italic">
                  "In our business of Architecture and Design, <span className="font-bold text-slate-900 border-b-2 border-orange-200">Planning, Design and Rendering</span> matter the most."
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mb-6 relative z-10"></div>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium relative z-10">
                  And now, the question is no longer <em className="text-slate-800">how</em> to do it. The real question is... <br/>
                  <span className="inline-block mt-3 text-2xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-sm">How to do it FASTER?</span>
                </p>
                <div className="flex items-start gap-4 p-5 bg-orange-50/80 border border-orange-200/50 rounded-2xl relative z-10 shadow-inner">
                  <span className="text-3xl mt-1">🚀</span>
                  <p className="text-slate-800 font-semibold leading-relaxed text-lg">
                    That's exactly why we present you this comprehensive course. A complete blueprint designed to make you <strong className="text-orange-600 bg-orange-100/50 px-2 py-0.5 rounded-md">job or business ready in just one month.</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                <button onClick={openCheckout} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all flex items-center gap-3 group whitespace-nowrap premium-stroke">
                  Get All Courses & 24/7 Team Support <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-10 font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 inline-block">24/7 support from team, installation help to course doubts • Free Software Links Included • <span className="text-slate-900 font-black">7-Day Refund Policy</span></p>
              
              {/* Hero Video */}
              <div className="w-full max-w-4xl mb-6 overflow-hidden rounded-2xl shadow-2xl" style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe title="Course overview video" src="https://iframe.mediadelivery.net/embed/489113/e68f78b5-c535-4e8f-aaee-8a44b514a9ec?autoplay=true&loop=true&muted=true&preload=true&responsive=true" loading="eager" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' }} allow="accelerometer; gyroscope; autoplay; encrypted-in-picture;" allowFullScreen={true} />
              </div>

              {/* Course Thumbnails */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-4xl mb-8">
                {COURSES_LANDING.map((c) => (
                  <div key={c.id} className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group cursor-pointer hover:border-blue-500/50 transition-all hover:scale-105">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{c.software}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 1.25. PRICING EXPLANATION — The Value Proposition */}
        <section className="py-10 bg-orange-50/50 border-b border-orange-100">
          <div className="max-w-4xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-10 rounded-[32px] border border-orange-200 shadow-2xl shadow-orange-500/5 relative overflow-hidden reveal">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={12} /> Special Student Initiative
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 leading-tight">Designed for Students. <br/>Priced for Your Growth.</h3>
                <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg">
                  We've kept the price low to help you grow in this industry without breaking the bank. 
                  <span className="block mt-2 text-slate-900 font-bold italic">Your future shouldn't cost a fortune. That's our promise.</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white px-10 py-8 rounded-[24px] shadow-2xl shadow-orange-500/30 transform hover:scale-105 transition-all cursor-pointer group premium-stroke relative z-10 w-full md:w-auto" onClick={openCheckout}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90 mb-2">Offer This Week Only</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl text-orange-200/70 line-through font-bold">$199</span>
                  <span className="text-5xl font-black tracking-tighter">$49</span>
                </div>
                <div className="h-0.5 w-12 bg-white/30 rounded-full mb-3"></div>
                <p className="text-xs font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">Join for 66% Off</p>
                <ArrowRight className="mt-4 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </div>
          </div>
        </section>


        {/* 6. INCOME TIERS — The ROI */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Invest in Yourself Today. <br className="hidden md:block" /><span className="text-emerald-600">Start making money in the industry.</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INCOME_TIERS.map((tier, i) => (
                <div key={i} className="reveal bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-400/40 transition-all shadow-soft flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4"><span className="text-sm font-bold text-slate-900 leading-tight w-2/3">{tier.label}</span><span className="text-3xl">{tier.icon}</span></div>
                  <div className="flex items-center justify-between">
                    <div><p className="text-[10px] font-mono text-slate-500 uppercase">Before</p><p className="text-slate-400 text-sm line-through">{tier.before}</p></div>
                    <ArrowRight size={16} className="text-blue-400" />
                    <div className="text-right"><p className="text-[10px] font-mono text-blue-500 uppercase">After</p><p className="text-emerald-600 text-sm font-bold">{tier.after}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1.5. THE AI REALITY CHECK */}
        <section className="py-16 md:py-20 bg-slate-900 border-y border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          
          <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full reveal">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-red-500 tracking-wider uppercase">Urgent Industry Shift</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6 reveal">
              AI Is Changing Everything. <br className="hidden md:block" /><span className="text-orange-500">Don't Get Left Behind.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-12 leading-relaxed max-w-3xl mx-auto reveal">
              It's true: slow, traditional drafting jobs are disappearing as AI takes over. We know it feels scary. <br className="hidden md:block" />
              But here is the good news—<strong className="text-white border-b-2 border-orange-500">AI needs a creative director</strong>. We will patiently hold your hand and teach you how to partner with these tools, turning fear into your biggest advantage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 text-left max-w-3xl mx-auto">
              <div className="bg-slate-800/50 border border-red-900/50 p-6 md:p-8 rounded-2xl backdrop-blur-sm reveal hover:border-red-500/30 transition-colors">
                <div className="text-red-400 mb-4 bg-red-400/10 w-12 h-12 rounded-xl flex items-center justify-center"><X size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-3">The Old Approach is Dying</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">Spending 40 hours drawing 2D lines and hunting for material textures manually is no longer viable. Clients expect photorealistic 3D visuals instantly.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/20 border border-orange-500/30 p-6 md:p-8 rounded-2xl backdrop-blur-sm reveal shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-400/50 transition-colors">
                <div className="text-orange-400 mb-4 bg-orange-400/10 w-12 h-12 rounded-xl flex items-center justify-center"><Sparkles size={24} /></div>
                <h3 className="text-xl font-bold text-white mb-3">Your Irreplaceable Future</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">We will safely guide you to combine the precision of SketchUp with the speed of AI. You'll generate ideas in seconds and deliver polished renders in hours, completely stress-free.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. STUDENT WORK CAROUSEL — Visual Proof */}
        <section className="py-16 md:py-24 bg-slate-50 overflow-hidden border-b border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5 mb-12 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">See What Our <span className="text-orange-600">Students Have Achieved</span></h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto italic font-serif">"With 24/7 team support, these students transformed their portfolios and confidence."</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex gap-3 md:gap-8 animate-scroll-left hover:pause">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-slate-100">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-8 animate-scroll-right hover:pause">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-slate-100">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 2. PROOF STATS */}
        <section className="py-10 bg-slate-50 border-y border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEAR_STATS.map((s, i) => (
              <div key={i} className="text-center reveal">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <span className="text-3xl md:text-4xl font-display font-black text-blue-500">{s.stat}</span>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. MANIFESTO — The Story & The Gap */}
        <section className="py-16 md:py-28 grid-bg bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-orange-500 text-xs font-mono uppercase tracking-widest mb-4">A Supportive Message from Our Team</p>
              <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 mb-8 leading-snug">"We believe in practical, hands-on learning with experts who are always ready to help you."</h2>
            </div>
            <div className="reveal space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>Learning complex software can feel overwhelming <strong className="text-slate-900">when you're doing it alone.</strong></p>
              <p>That's why our program is built differently. You aren't just getting tutorial videos; you're joining a community where our team reviews your work, answers your technical questions, and cheers you on as you improve.</p>
              <p>Whether you are a student, a freelancer, or a studio owner, <strong className="text-orange-600">we are here to support your transition</strong> into modern, high-quality 3D rendering. No more struggling with endless YouTube tutorials that leave you confused.</p>
              <p>You don't need to spend lakhs of rupees on expensive, outdated courses to build a portfolio you can be incredibly proud of.</p>
              
              <div className="my-10 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-soft">
                <p className="font-bold text-slate-900 text-xl mb-4">Here is How We Support You:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-orange-500 shrink-0" /><span className="text-slate-800">12 Comprehensive Courses structured compassionately for beginners.</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-orange-500 shrink-0" /><span className="text-slate-800">Direct links to free/student versions so you save your money.</span></li>
                  <li className="flex items-center gap-3"><CheckCircle size={18} className="text-orange-500 shrink-0" /><span className="text-slate-800">24/7 support from team, installation help to course doubts—whenever you're stuck, we're here.</span></li>
                </ul>
                <div className="mt-6 pt-6 border-t border-orange-100 flex items-center justify-between">
                  <span className="text-slate-600 text-sm italic font-bold">A complete learning ecosystem for just $49 USD.</span>
                  <button onClick={openCheckout} className="text-orange-600 font-bold text-sm hover:text-orange-800 flex items-center gap-1 group">Join Our Community <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
                </div>
              </div>

              <p className="text-slate-900 font-semibold text-lg md:text-xl border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r-xl">Investing in your education is the best step you can take for your creative journey. Our team is excited to welcome you and help you build something amazing.</p>
            </div>
          </div>
        </section>


        {/* 5. OLD vs NEW — The Contrast */}
        <section className="py-16 md:py-24 bg-white grid-bg">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">The Lonely, Frustrating Path <br className="hidden md:block" />vs. <span className="text-emerald-600">Our Hand-Holding Blueprint</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal grid-bg border border-red-200 rounded-2xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><X size={20} className="text-red-500" /></div><h3 className="text-xl font-bold text-red-500">The Old Struggle</h3></div>
                <ul className="space-y-4">
                  {PROBLEM_POINTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm"><span className="mt-1 shrink-0 text-base">{item.emoji}</span>{item.text}</li>
                  ))}
                  {['Searching random YouTube tutorials that leave you confused and frustrated', 'Paying expensive monthly subscriptions for software you barely know how to use', 'Graduating from college but lacking a truly stunning portfolio to get hired'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm"><X size={14} className="text-red-500 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="reveal bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><CheckCircle size={20} className="text-emerald-600" /></div><h3 className="text-xl font-bold text-slate-900">Our Supportive System</h3></div>
                <ul className="space-y-4">
                  {['A friendly, step-by-step pipeline: AutoCAD → SketchUp → V-Ray → Lumion → AI', 'AI handles the heavy lifting. You focus on creativity. 10x your output stress-free.', 'A stunning, professional portfolio built safely in just 15 days—even from zero', 'All necessary software links provided—say goodbye to expensive licenses', '24/7 support from team, installation help to course doubts'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle size={14} className="text-blue-500 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. WHAT YOU GET — The Offer */}
        <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 grid-bg">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-10">
              <p className="text-orange-500 text-xs font-mono uppercase tracking-widest mb-3">Included with enrollment</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Everything You Need to Succeed, <span className="text-orange-600">Provided Today</span></h2>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">A supportive bundle filled with all the software guides, 24/7 team support, and tools you need.</p>
            </div>
            <div className="reveal max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-soft">
              {VALUE_STACK_ITEMS.map((item, i) => (
                <div key={i} className={`flex justify-between items-center px-6 py-4 ${i !== VALUE_STACK_ITEMS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center gap-3"><CheckCircle size={16} className="text-blue-500 shrink-0" /><span className="text-sm text-slate-800 font-medium">{item.name}</span></div>
                  <span className="text-sm font-bold text-slate-500">{item.value}</span>
                </div>
              ))}
              
              <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /><span className="text-sm text-emerald-900 font-bold">All Software (Free/Student Edition Links)</span></div>
                <span className="text-sm font-black text-emerald-600">INCLUDED</span>
              </div>

              <div className="bg-blue-50/50 border-t border-blue-200 px-6 py-6 flex flex-col items-center gap-6 justify-center">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                  <span className="text-slate-900 font-bold text-center">Lifetime Access + Free Updates</span>
                </div>
                <button onClick={openCheckout} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group premium-stroke">
                  Access Everything Instantly <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS — Social Proof */}
        <section className="py-16 md:py-24 bg-white overflow-hidden grid-bg">
          <div className="max-w-5xl mx-auto px-5 mb-12">
            <div className="text-center mb-12">
              <p className="text-blue-500 text-xs font-mono uppercase tracking-widest mb-4">Student Reviews</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Students & <span className="text-blue-500">Professionals</span></h2>
              <p className="text-slate-600 text-lg">50,000+ learners • 4.9★ average rating</p>
            </div>

            {/* Featured Transformations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {TRANSFORMATION_STORIES.map((story, i) => (
                <div key={i} className="reveal bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8 shadow-soft relative overflow-hidden transition-all hover:border-blue-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <span className="text-4xl mb-4 block">{story.emoji}</span>
                  <div className="flex items-center gap-2 mb-6"><span className="font-bold text-slate-900 text-lg">{story.name}</span><span className="text-sm font-medium text-blue-600">• {story.role}</span></div>
                  <div className="mb-4"><p className="text-[10px] font-mono uppercase text-slate-400 mb-1 tracking-wider">Before</p><p className="text-slate-600 text-sm leading-relaxed">{story.before}</p></div>
                  <div><p className="text-[10px] font-mono uppercase text-blue-500 mb-1 tracking-wider">After</p><p className="text-slate-900 text-base font-bold leading-relaxed">{story.after}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...TESTIMONIALS_LANDING, ...TESTIMONIALS_LANDING].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-white border border-slate-200 p-8 rounded-3xl hover:border-blue-200 transition-all shadow-soft">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-blue-500 text-blue-500" />)}</div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">{t.name[0]}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-emerald-600" /></p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.role} • {t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-5 mt-16 md:mt-24 text-center reveal">
            <img src="/renders/mentors.png" alt="Industry Experts" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </section>

        {/* 9. FAQ + FINAL CTA */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 grid-bg">
          <div className="max-w-3xl mx-auto px-5 mb-16">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-4">Common Questions</h2>
              <p className="text-slate-600 text-base">All your questions, answered.</p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS_LANDING.map((faq, i) => (
                <details key={i} className="reveal group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-soft" open={openFaqIndex === i}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none" onClick={(e) => { e.preventDefault(); setOpenFaqIndex(openFaqIndex === i ? null : i); }}>
                    <span className="text-sm md:text-base font-semibold text-slate-900 pr-6">{faq.question}</span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </summary>
                  <div className="px-5 pb-5"><p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>

          <CallToActionWidget 
            timeLeft={timeLeft} 
            onClick={openCheckout} 
            headline="Let us hold your hand towards a brighter future." 
            subtext="AI is moving fast, but you don't have to face it alone. 50,000+ students chose our supportive community. We are ready when you are." 
          />
        </section>
      </main>

      <footer className="bg-slate-900 py-12 px-6 text-center border-t border-slate-800 text-white/70">
        <p className="text-xs uppercase tracking-[0.2em] mb-4">Avada Design & Architecture • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400"><span>Privacy</span><span>Terms</span><span>Support</span></div>
      </footer>

      <div className={`fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 shadow-[0_-4px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto">
          <button onClick={openCheckout} className="w-full relative group overflow-hidden text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all py-2.5 flex items-center px-4" style={{ background: 'linear-gradient(90deg,#f97316,#ea580c,#f97316)', boxShadow: '0 0 20px rgba(249,115,22,0.4)' }}>
            <div className="relative z-10 w-full flex items-center justify-between">
              <div className="flex flex-col items-start leading-tight gap-1">
                <span className="text-[11px] md:text-sm font-black uppercase tracking-widest text-yellow-200 animate-pulse bg-black/20 px-2 py-0.5 rounded-md inline-block">⚠️ Offer Ends Soon</span>
                <span className="text-[15px] md:text-lg font-black uppercase tracking-[0.05em] text-white">Download All Courses</span>
              </div>
              <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform drop-shadow-md" />
            </div>
          </button>
        </div>
      </div>

      <WhatsAppButton />
      <SocialProofToast />
    </div>
  );
};

export default LandingPage;
