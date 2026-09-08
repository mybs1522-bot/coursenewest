import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles, Download, ShieldCheck, Zap, Users } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PaymentModal } from '../components/PaymentModal';
import {
  Logo, CallToActionWidget, SocialProofToast,
  PROBLEM_POINTS, TRANSFORMATION_STORIES, FEAR_STATS,
  VALUE_STACK_ITEMS, TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING,
  COURSES_LANDING, PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2,
  DESIGN_MENTORS
} from './LandingHelpers';
import { trackViewContent, trackInitiateCheckout } from '../services/metaPixel';

const LandingPage: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const D = (3 * 3600 + 36 * 60 + 20) * 1000, r = D - (Date.now() % D);
    return { h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) };
  });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackViewContent();
  }, []);

  useEffect(() => {
    const calc = () => {
      const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D);
      setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) });
    };
    const t = setInterval(calc, 1000);
    calc();
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const openCheckout = () => {
    trackInitiateCheckout();
    setShowPaymentModal(true);
  };
  const formatTime = (v: number) => v.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-100 grid-bg">
      {/* ═══ TOP NAVBAR ═══ */}
      <header className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <button 
              onClick={openCheckout} 
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Get All Courses</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="py-4 sm:py-8">
        {/* ═══ 1. HERO — The Attitude Hook ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 text-center">
          {/* Must Read Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-yellow-400 border border-yellow-500 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-4 rounded-full shadow-sm">
            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-black">MUST READ</span>
            <span>Interior Design Shortcut ⚡</span>
          </div>

          {/* Attention-Grabbing Attitude Box */}
          <div className="w-full max-w-4xl mx-auto mb-6 relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-50 via-yellow-50/50 to-red-50/40 text-slate-900 p-4 sm:p-6 md:p-8 border-2 border-red-200 text-center shadow-sm">
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 border border-yellow-500 text-red-950 text-[10px] md:text-xs font-black uppercase tracking-wider mb-3 rounded-full shadow-xs">
                <span>Start charging $500–$2,000 for designing and rendering</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight text-slate-950 mb-3 max-w-3xl">
                You don't need a <span className="bg-yellow-300 text-slate-950 px-2 py-0.5 rounded-md border border-yellow-400 shadow-xs inline-block font-black">degree in Design</span> to Start <span className="bg-red-600 text-white px-2 py-0.5 rounded-md shadow-xs inline-block font-black">Interior Design Career.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Learn Interior & Exterior Designing in 15 days. <strong className="text-slate-900">Start Earning Fast</strong> with 3 Paid Freelance Projects included.
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
            No university degree needed. No expensive software to buy. Everything you need is included.
          </p>

          {/* Video Container */}
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-900 relative bg-slate-950 mb-8">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                title="Avada Course Overview"
                src="https://iframe.mediadelivery.net/embed/494628/1f7b76dd-7d47-4f39-87af-bff5a6b02d08?autoplay=true&loop=true&muted=true&responsive=true"
                loading="eager"
                style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                allowFullScreen={true}
              />
              <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[96%] text-center pointer-events-none">
                <h2 className="inline-block bg-yellow-400/95 backdrop-blur-sm border border-slate-900 text-slate-950 text-[9px] sm:text-xs font-semibold px-3 py-1 rounded-xl shadow-sm tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  🏡 Learn To Design Complete Homes, Offices and Villas
                </h2>
              </div>
            </div>
          </div>

          {/* Offer & CTA Box */}
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 text-white px-5 py-2 rounded-full shadow-md mb-1">
              <span className="text-[11px] sm:text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">OFFER ENDS IN</span>
              <div className="flex items-center gap-1 font-mono text-yellow-400 font-bold text-xs sm:text-sm">
                <span>{formatTime(timeLeft.h)}h</span>
                <span>:</span>
                <span>{formatTime(timeLeft.m)}m</span>
                <span>:</span>
                <span>{formatTime(timeLeft.s)}s</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 line-through text-base sm:text-lg font-bold">$199</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">$49 USD</span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white rounded-2xl font-black text-base md:text-lg border-2 border-slate-900 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all inline-flex items-center justify-center gap-3"
            >
              <Download size={20} className="shrink-0" />
              <span>Get All Courses</span>
              <ArrowRight size={20} />
            </button>

            <p className="text-xs text-slate-500 font-bold">
              ✨ Instant Download • 24/7 Support • 7-Day Money-Back Guarantee
            </p>

            {/* Bonus Banner */}
            <div className="w-full max-w-3xl mx-auto mt-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-2xl text-center shadow-md border border-emerald-400/30">
              <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight">
                🔥 3 Freelance Paid Projects For Every Student worth $300 USD Included
              </span>
            </div>
          </div>
        </section>

        {/* ═══ 2. GRAPHIC BANNERS ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-8 space-y-6">
          <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-slate-200" onClick={openCheckout}>
            <img
              src="/banner-hero.jpg"
              alt="Learn to Design Homes, Offices & Villas — Build Skills, Design Spaces, Start Earning From First Month"
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
          <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-slate-200" onClick={openCheckout}>
            <img
              src="/banner-global-clients.jpg"
              alt="Best Part? Design for Clients From US, UK, Europe — We Teach You How To Get Those Clients and Make Good Income"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </section>

        {/* ═══ 3. ALL 12 SOFTWARE CAROUSEL ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-10 overflow-hidden text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-slate-900 font-black text-xs mb-2">
              🎓 Includes Official Certificate Equivalent to Diploma
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              All 12 Software Used in this Industry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Learn What You Need and Share With Your Friends ❤️
            </p>
          </div>

          <div className="flex flex-col gap-3 relative w-full overflow-hidden pb-4">
            {/* Row 1: 1 to 6 */}
            <div className="flex gap-3 animate-scroll-right hover:pause w-max">
              {[...COURSES_LANDING.slice(0, 6), ...COURSES_LANDING.slice(0, 6)].map((course, idx) => (
                <div
                  key={`full-row1-${course.id}-${idx}`}
                  className="w-[120px] sm:w-[135px] md:w-[145px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden group cursor-pointer"
                  onClick={openCheckout}
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 left-1 w-5 h-5 bg-white/95 rounded-full flex items-center justify-center font-bold text-gray-900 text-[9px] border border-gray-200">
                      {(idx % 6) + 1}
                    </div>
                    <div className="absolute top-1 right-1 bg-white/95 text-gray-900 text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-full border border-gray-200">
                      {course.software}
                    </div>
                  </div>
                  <div className="p-2 text-left">
                    <h3 className="font-display font-bold text-gray-900 text-xs mb-0.5 line-clamp-1 leading-tight">
                      {course.title}
                    </h3>
                    <div className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1 py-0.5 rounded text-center border border-emerald-100">
                      ✓ Included
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: 7 to 12 */}
            <div className="flex gap-3 animate-scroll-right hover:pause w-max" style={{ animationDelay: '-22.5s' }}>
              {[...COURSES_LANDING.slice(6, 12), ...COURSES_LANDING.slice(6, 12)].map((course, idx) => (
                <div
                  key={`full-row2-${course.id}-${idx}`}
                  className="w-[120px] sm:w-[135px] md:w-[145px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden group cursor-pointer"
                  onClick={openCheckout}
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 left-1 w-5 h-5 bg-white/95 rounded-full flex items-center justify-center font-bold text-gray-900 text-[9px] border border-gray-200">
                      {(idx % 6) + 7}
                    </div>
                    <div className="absolute top-1 right-1 bg-white/95 text-gray-900 text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-full border border-gray-200">
                      {course.software}
                    </div>
                  </div>
                  <div className="p-2 text-left">
                    <h3 className="font-display font-bold text-gray-900 text-xs mb-0.5 line-clamp-1 leading-tight">
                      {course.title}
                    </h3>
                    <div className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1 py-0.5 rounded text-center border border-emerald-100">
                      ✓ Included
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY 50,000+ STUDENTS CHOOSE AVADA ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              Why 50,000+ Students Choose Avada
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              The 3 game-changing pillars built into your enrollment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
              <img
                src="/student1.jpg"
                alt="Students Learning 1"
                loading="lazy"
                className="rounded-2xl shadow-md w-full sm:w-1/2 object-cover border border-slate-200"
              />
              <img
                src="/student2.jpg"
                alt="Students Learning 2"
                loading="lazy"
                className="rounded-2xl shadow-md w-full sm:w-1/2 object-cover border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl mb-4">
                💰
              </div>
              <h3 className="font-display font-black text-slate-950 text-lg mb-2">
                3 Paid Freelance Projects Included ($300 Value)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                We don't just teach theory. Every student receives <strong>3 real paid freelance design projects</strong> upon completion so you start earning income and building real client confidence immediately.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-500 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-2xl mb-4">
                🤝
              </div>
              <h3 className="font-display font-black text-slate-950 text-lg mb-2">
                Active Community & Connections
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Connect with top architects, interior designers, and studio owners worldwide. Share work, get client referrals, and never feel alone.
              </p>
            </div>

            <div className="bg-white border-2 border-amber-500 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl mb-4">
                💻
              </div>
              <h3 className="font-display font-black text-slate-950 text-lg mb-2">
                Free Software Links & 24/7 Setup Help
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Don't spend thousands buying software. We provide direct download links for student/free software versions (AutoCAD, SketchUp, V-Ray, Lumion & AI) + 24/7 team installation support.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 5. REAL STUDENT CASE STUDIES & RENDER GALLERY ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
              Real Student Case Studies & Render Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              See what our students create in just 15 to 30 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {TRANSFORMATION_STORIES.map((s, t) => (
              <div key={t} className="bg-white p-5 rounded-2xl border border-slate-200 text-left shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{s.name}</h4>
                    <p className="text-xs text-blue-600 font-medium">{s.role}</p>
                  </div>
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  <strong>Before:</strong> {s.before}
                </p>
                <p className="text-xs text-slate-900 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <strong>After 15 Days:</strong> {s.after}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 relative w-full overflow-hidden">
            <div className="flex gap-3 animate-scroll-left hover:pause w-max">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((s, t) => (
                <div key={`full-ren1-${t}`} className="w-[200px] sm:w-[260px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 shrink-0">
                  <img src={s} alt="Student Render" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 animate-scroll-right hover:pause w-max">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((s, t) => (
                <div key={`full-ren2-${t}`} className="w-[200px] sm:w-[260px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100 shrink-0">
                  <img src={s} alt="Student Render" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. THE AI REALITY CHECK — "DON'T FEAR AI. PARTNER WITH IT." ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
              Don't Fear AI. Partner With It.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
              Top global studios use AI to generate 50 concepts in 10 minutes, then render them in Lumion & V-Ray.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FEAR_STATS.map((s, t) => (
                <div key={t} className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl text-center">
                  <span className="text-2xl block mb-1">{s.icon}</span>
                  <span className="text-xl sm:text-2xl font-black text-yellow-400 block">{s.stat}</span>
                  <p className="text-[11px] text-zinc-400 font-medium leading-snug mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. MESSAGE FROM OUR TEAM ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-display font-black text-slate-950 mb-3">
              A Message From Our Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
              Learning complex 3D software alone is overwhelming. That's why our program includes <strong>24/7 team support</strong>. From software download links to fixing rendering lighting at 2 AM, our team is always ready to guide you step-by-step!
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-orange-500" /> 12 Courses Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-orange-500" /> Direct Free Software Links
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-orange-500" /> 24/7 Hand-Holding Support
              </span>
            </div>
          </div>
        </section>

        {/* ═══ 8. THE FRUSTRATING PATH vs. OUR SYSTEM ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
              The Frustrating Path vs. Our Hand-Holding System
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-left">
              <h3 className="font-bold text-red-600 text-base mb-3 flex items-center gap-2">
                <X size={20} /> The Frustrating Path
              </h3>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2.5">
                {PROBLEM_POINTS.map((s, t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="shrink-0">{s.emoji}</span>
                    <span>{s.text}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <X size={14} className="text-red-500 shrink-0 mt-1" />
                  <span>Searching random YouTube tutorials that leave you confused and frustrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={14} className="text-red-500 shrink-0 mt-1" />
                  <span>Paying expensive monthly subscriptions for software you barely know how to use</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={14} className="text-red-500 shrink-0 mt-1" />
                  <span>Graduating from college but lacking a truly stunning portfolio to get hired</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-left">
              <h3 className="font-bold text-emerald-700 text-base mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} /> Our Hand-Holding System
              </h3>
              <ul className="text-xs sm:text-sm text-slate-800 space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Clear step-by-step pipeline: AutoCAD → Revit → SketchUp → V-Ray → AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>3 real paid freelance projects included ($300 USD value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free software student download links provided — zero expensive licenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>24/7 technical team support whenever you get stuck or software crashes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>A stunning, professional portfolio built safely in just 15 days</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ 9. WHAT'S INCLUDED (THE VALUE STACK) ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
              Everything Included With Your Access Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              A complete learning ecosystem for a single low price.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs max-w-3xl mx-auto">
            {VALUE_STACK_ITEMS.map((s, t) => (
              <div key={t} className="flex justify-between items-center px-5 py-3.5 border-b border-slate-100 text-xs sm:text-sm">
                <span className="text-slate-800 font-medium flex items-center gap-2">
                  <CheckCircle size={14} className="text-orange-500 shrink-0" />
                  {s.name}
                </span>
                <span className="font-bold text-slate-500 text-right">{s.value}</span>
              </div>
            ))}
            <div className="bg-emerald-50 px-5 py-4 flex justify-between items-center text-xs sm:text-sm font-bold text-emerald-900 border-t border-emerald-100">
              <span>All Software (Free/Student Edition Links)</span>
              <span className="text-emerald-600 font-black">INCLUDED</span>
            </div>
            <div className="p-5 text-center bg-slate-50 border-t border-slate-100">
              <button
                onClick={openCheckout}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-black text-base uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Unlock All 12 Courses & Software Links ($49)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 10. STUDENT REVIEWS ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12 text-center">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
              Student Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              50,000+ learners • 4.9★ average rating
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'none' }}>
            {[...TESTIMONIALS_LANDING, ...TESTIMONIALS_LANDING].map((s, t) => (
              <div key={t} className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-slate-200 p-5 rounded-2xl text-left shadow-xs">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs leading-relaxed mb-4 italic">
                  "{s.content}"
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.name}</p>
                    <p className="text-[10px] text-slate-500">{s.role} • {s.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ═══ MEET YOUR DESIGN MENTORS ═══ */}
          <div className="mt-16 pt-12 border-t border-slate-200/80">
            <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center px-4 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md">
                <Users size={24} />
              </div>
              <h2 className="mb-3 font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                Meet Your Design Mentors
              </h2>
              <p className="max-w-2xl text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                Industry professionals with years of real-world experience in architecture, interior design, and 3D visualization — guiding you every step of the way.
              </p>
            </div>

            {/* Mentors Marquee */}
            <div className="relative w-full overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent" />
              
              <div className="flex gap-5 animate-scroll-left hover:pause w-max py-2">
                {[...DESIGN_MENTORS, ...DESIGN_MENTORS].map((mentor, idx) => (
                  <div key={`${mentor.name}-${idx}`} className="group flex w-52 sm:w-56 shrink-0 flex-col">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1" style={{ height: '300px' }}>
                      <img
                        alt={mentor.name}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                        src={mentor.image}
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 w-full rounded-b-2xl bg-white/95 backdrop-blur-sm p-3 border-t border-slate-100 text-left">
                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{mentor.name}</h3>
                        <p className="text-orange-600 text-xs font-semibold mt-0.5">{mentor.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Mentor Quote */}
            <div className="mx-auto mt-12 max-w-2xl px-4 text-center">
              <p className="mb-6 font-medium text-base sm:text-lg text-slate-900 leading-relaxed italic font-serif">
                "The mentorship at Avada Design is unmatched. Our instructors don't just teach software — they guide you through the entire professional workflow, from concept to stunning final render."
              </p>
              <div className="flex flex-col items-center gap-2.5">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full border-2 border-orange-500 shadow-md">
                  <img
                    alt="Sofia Reyes"
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">Sofia Reyes</p>
                  <p className="text-slate-500 text-xs font-medium">Interior Design Expert · Avada Design Faculty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. FAQ ACCORDION ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Everything you need to know before joining.
            </p>
          </div>
          <div className="space-y-3 mb-10 text-left max-w-3xl mx-auto">
            {FAQ_ITEMS_LANDING.map((s, t) => (
              <details
                key={t}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden p-4 shadow-xs"
                open={openFaqIndex === t}
              >
                <summary
                  className="text-xs sm:text-sm font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center"
                  onClick={(c) => {
                    c.preventDefault();
                    setOpenFaqIndex(openFaqIndex === t ? null : t);
                  }}
                >
                  <span className="pr-4">{s.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform shrink-0 ${openFaqIndex === t ? 'rotate-180' : ''}`}
                  />
                </summary>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                  {s.answer}
                </p>
              </details>
            ))}
          </div>

          {/* ═══ 12. FINAL CALL TO ACTION ═══ */}
          <CallToActionWidget
            timeLeft={timeLeft}
            onClick={openCheckout}
            headline="Start Learning Architecture & 3D Design Today"
            subtext="Get instant access to all 12 courses, free software links, and 24/7 team guidance."
          />
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-950 py-12 px-6 text-center border-t border-slate-800 text-white/70">
        <p className="text-xs uppercase tracking-[0.2em] mb-4">Avada Design & Architecture • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support Contact</span>
        </div>
      </footer>

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 shadow-[0_-4px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={openCheckout}
            className="w-full relative group overflow-hidden text-white rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all py-2.5 flex items-center px-4"
            style={{ background: 'linear-gradient(90deg,#dc2626,#ea580c,#dc2626)', boxShadow: '0 0 20px rgba(220,38,38,0.35)' }}
          >
            <div className="relative z-10 w-full flex items-center justify-between">
              <div className="flex flex-col items-start leading-tight gap-0.5">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-yellow-200 animate-pulse bg-black/20 px-2 py-0.5 rounded-md inline-block">
                  ⚠️ Students Offer Ends In {formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}
                </span>
                <span className="text-sm md:text-base font-black uppercase tracking-[0.05em] text-white">
                  Download All 12 Courses ($49 USD)
                </span>
              </div>
              <ArrowRight size={22} className="text-white group-hover:translate-x-1 transition-transform drop-shadow-md" />
            </div>
          </button>
        </div>
      </div>

      <WhatsAppButton />
      <SocialProofToast />
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
};

export default LandingPage;

