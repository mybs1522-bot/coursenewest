import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Sparkles, Download, ShieldCheck, Zap, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans overflow-x-hidden selection:bg-zinc-200">
      <main className="py-6 sm:py-10">
        {/* ═══ 1. HERO ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 text-center">
          {/* Masterclass Pill (Single Line, No Essential) */}
          <div className="inline-flex items-center px-4 py-1.5 bg-white border border-zinc-200 text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 rounded-full shadow-xs whitespace-nowrap">
            <span>Architecture & Interior Design Masterclass</span>
          </div>

          {/* Attention-Grabbing Attitude Box */}
          <div className="w-full max-w-4xl mx-auto mb-6 relative overflow-hidden rounded-3xl bg-white text-zinc-950 p-6 sm:p-8 md:p-10 border border-zinc-200 text-center shadow-xs">
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-4 rounded-full">
                <span>Master Complete 3D Workflows & Client Acquisition</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.15] text-black mb-4 max-w-3xl">
                You don't need a university degree to build a high-income <span className="underline decoration-zinc-400 underline-offset-4">Interior Design career.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed">
                Learn complete 2D/3D design, photorealistic rendering & AI pipelines in 15 days. <strong className="text-black font-semibold">Start taking high-paying clients</strong> with 3 real paid portfolio projects included.
              </p>
            </div>
          </div>

          {/* Video Container */}
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-900 relative bg-black mb-8">
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
                <h2 className="inline-block bg-black/85 backdrop-blur-md border border-zinc-700 text-white text-[9px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-md tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Learn To Design Complete Homes, Commercial Spaces & Villas
                </h2>
              </div>
            </div>
          </div>

          {/* Offer & CTA Box */}
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-3 bg-zinc-950 border border-zinc-800 text-white px-5 py-2 rounded-full shadow-md mb-2">
              <span className="text-[11px] sm:text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">OFFER CLOSES IN</span>
              <div className="flex items-center gap-1 font-mono text-white font-bold text-xs sm:text-sm">
                <span>{formatTime(timeLeft.h)}h</span>
                <span className="text-zinc-500">:</span>
                <span>{formatTime(timeLeft.m)}m</span>
                <span className="text-zinc-500">:</span>
                <span>{formatTime(timeLeft.s)}s</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-1">
              <span className="text-zinc-400 line-through text-base sm:text-lg font-medium">$199</span>
              <span className="text-3xl sm:text-4xl font-black text-black tracking-tight">$49 USD</span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-4.5 bg-black hover:bg-zinc-800 text-white rounded-2xl font-black text-base md:text-lg border-2 border-[#00D66F] shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download size={19} className="shrink-0 text-[#00D66F]" />
              <span>Get All 12 Courses</span>
              <ArrowRight size={19} className="text-[#00D66F]" />
            </button>

            <p className="text-xs text-zinc-500 font-medium mt-1">
              Instant Download • 24/7 Mentor Support • 7-Day 100% Money-Back Guarantee
            </p>

            {/* Bonus Banner */}
            <div className="w-full max-w-2xl mx-auto mt-4 bg-zinc-900 border border-zinc-800 text-white py-3 px-5 rounded-2xl text-center shadow-sm">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-200">
                3 Paid Freelance Client Projects For Every Student Included ($300 USD Value)
              </span>
            </div>
          </div>
        </section>

        {/* ═══ 2. GRAPHIC BANNER ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
          <div className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-zinc-200 bg-white" onClick={openCheckout}>
            <img
              src="/banner-hero.jpg"
              alt="Learn to Design Homes, Offices & Villas — Build Skills, Design Spaces, Start Earning"
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
        </section>

        {/* ═══ 3. ALL 12 SOFTWARE CAROUSEL ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12 overflow-hidden text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-zinc-800 font-bold text-xs mb-2">
              Official Certificate Included
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight">
              All 12 Industry-Standard Software
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
              From drafting & 3D modeling to photorealistic rendering and AI acceleration.
            </p>
          </div>

          <div className="flex flex-col gap-3 relative w-full overflow-hidden pb-4">
            {/* Row 1: 1 to 6 */}
            <div className="flex gap-3 animate-scroll-right hover:pause w-max">
              {[...COURSES_LANDING.slice(0, 6), ...COURSES_LANDING.slice(0, 6)].map((course, idx) => (
                <div
                  key={`full-row1-${course.id}-${idx}`}
                  className="w-[125px] sm:w-[140px] md:w-[150px] shrink-0 bg-white rounded-xl border border-zinc-200 shadow-xs overflow-hidden group cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={openCheckout}
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-white/95 rounded-full flex items-center justify-center font-bold text-zinc-900 text-[9px] border border-zinc-200 shadow-xs">
                      {(idx % 6) + 1}
                    </div>
                    <div className="absolute top-1.5 right-1.5 bg-white/95 text-zinc-900 text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-zinc-200 shadow-xs">
                      {course.software}
                    </div>
                  </div>
                  <div className="p-2.5 text-left">
                    <h3 className="font-display font-bold text-zinc-900 text-xs mb-1 line-clamp-1 leading-tight">
                      {course.title}
                    </h3>
                    <div className="bg-zinc-100 text-zinc-800 text-[8px] font-semibold px-1 py-0.5 rounded text-center border border-zinc-200">
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
                  className="w-[125px] sm:w-[140px] md:w-[150px] shrink-0 bg-white rounded-xl border border-zinc-200 shadow-xs overflow-hidden group cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={openCheckout}
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-white/95 rounded-full flex items-center justify-center font-bold text-zinc-900 text-[9px] border border-zinc-200 shadow-xs">
                      {(idx % 6) + 7}
                    </div>
                    <div className="absolute top-1.5 right-1.5 bg-white/95 text-zinc-900 text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-zinc-200 shadow-xs">
                      {course.software}
                    </div>
                  </div>
                  <div className="p-2.5 text-left">
                    <h3 className="font-display font-bold text-zinc-900 text-xs mb-1 line-clamp-1 leading-tight">
                      {course.title}
                    </h3>
                    <div className="bg-zinc-100 text-zinc-800 text-[8px] font-semibold px-1 py-0.5 rounded text-center border border-zinc-200">
                      ✓ Included
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. WHY 50,000+ STUDENTS CHOOSE AVADA ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight">
              Why 50,000+ Students Choose Avada
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
              The 3 foundational pillars engineered for rapid career growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <img
                src="/student1.jpg"
                alt="Students Learning 1"
                loading="lazy"
                className="rounded-2xl shadow-sm w-full sm:w-1/2 object-cover border border-zinc-200"
              />
              <img
                src="/student2.jpg"
                alt="Students Learning 2"
                loading="lazy"
                className="rounded-2xl shadow-sm w-full sm:w-1/2 object-cover border border-zinc-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs text-left relative overflow-hidden group hover:border-zinc-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-display font-bold text-black text-lg mb-2">
                3 Paid Freelance Projects Included ($300 Value)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                We go far beyond passive video theory. Every graduate receives <strong>3 real paid client projects</strong> to immediately start recovering investment and building client proof.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs text-left relative overflow-hidden group hover:border-zinc-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-display font-bold text-black text-lg mb-2">
                Global Network & Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Direct access to top practicing architects, visualization specialists, and studio founders worldwide for portfolio critiques and international client referrals.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xs text-left relative overflow-hidden group hover:border-zinc-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-display font-bold text-black text-lg mb-2">
                Software Access & 24/7 Setup Assistance
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Avoid paying thousands in licenses. We provide verified download guidance for free/student versions of AutoCAD, SketchUp, V-Ray, Lumion & AI + direct 24/7 installation support.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 5. REAL STUDENT CASE STUDIES & RENDER GALLERY ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight mb-1">
              Student Work & Render Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal">
              Photorealistic architectural & interior renders created within 15–30 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {TRANSFORMATION_STORIES.map((s, t) => (
              <div key={t} className="bg-white p-5 rounded-2xl border border-zinc-200 text-left shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100">
                  <div>
                    <h4 className="font-bold text-black text-sm sm:text-base">{s.name}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{s.role}</p>
                  </div>
                  <span className="text-xs font-mono bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded border border-zinc-200">Verified Member</span>
                </div>
                <p className="text-xs text-zinc-600 mb-2.5">
                  <strong className="text-zinc-900">Before:</strong> {s.before}
                </p>
                <p className="text-xs text-zinc-900 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                  <strong className="text-black">After 15 Days:</strong> {s.after}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 relative w-full overflow-hidden">
            <div className="flex gap-3 animate-scroll-left hover:pause w-max">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((s, t) => (
                <div key={`full-ren1-${t}`} className="w-[200px] sm:w-[260px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-zinc-200 bg-zinc-100 shrink-0">
                  <img src={s} alt="Student Render" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 animate-scroll-right hover:pause w-max">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((s, t) => (
                <div key={`full-ren2-${t}`} className="w-[200px] sm:w-[260px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-zinc-200 bg-zinc-100 shrink-0">
                  <img src={s} alt="Student Render" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6. THE AI REALITY CHECK ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="bg-black text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl border border-zinc-800">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2 tracking-tight">
              Don't Fear AI. Partner With It.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed font-normal">
              Leading global studios use AI to generate 50 architectural concepts in 10 minutes, then render final client deliverables in Lumion & V-Ray.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FEAR_STATS.map((s, t) => (
                <div key={t} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-center">
                  <span className="text-xl sm:text-2xl font-black text-white block mb-1">{s.stat}</span>
                  <p className="text-[11px] text-zinc-400 font-normal leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. MESSAGE FROM OUR TEAM ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-display font-black text-black mb-3">
              A Direct Message From Our Faculty
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5 font-normal">
              Mastering complex 3D software independently often leads to burnout and slow progress. Our curriculum is paired with <strong>dedicated 24/7 team support</strong> — from resolving software installation hurdles to fine-tuning lighting and textures at any hour.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-black" /> 12 Complete Courses
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-black" /> Software Download Links
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-black" /> 24/7 Dedicated Support
              </span>
            </div>
          </div>
        </section>

        {/* ═══ 8. THE FRUSTRATING PATH vs. OUR SYSTEM ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight mb-1">
              Traditional Learning vs. The Avada Accelerated System
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 text-left">
              <h3 className="font-bold text-zinc-900 text-base mb-4 flex items-center gap-2">
                <X size={18} className="text-zinc-400" /> The Frustrating Path
              </h3>
              <ul className="text-xs sm:text-sm text-zinc-600 space-y-3">
                {PROBLEM_POINTS.map((s, t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-zinc-400 shrink-0 font-mono">—</span>
                    <span>{s.text}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 shrink-0 font-mono">—</span>
                  <span>Piecing together disconnected YouTube tutorials with no clear structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 shrink-0 font-mono">—</span>
                  <span>Paying expensive monthly software licenses before earning any client income</span>
                </li>
              </ul>
            </div>

            <div className="bg-black text-white border border-zinc-800 rounded-3xl p-6 text-left shadow-lg">
              <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" /> The Avada Accelerated System
              </h3>
              <ul className="text-xs sm:text-sm text-zinc-300 space-y-3 font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
                  <span>Structured workflow: AutoCAD → Revit → SketchUp → V-Ray → AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
                  <span>3 real paid freelance projects provided upon completion ($300 value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
                  <span>Verified free/student software edition links — zero expensive overhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
                  <span>24/7 technical team assistance whenever you encounter software roadblocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
                  <span>A high-end, client-ready architectural portfolio built in 15 days</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ 9. WHAT'S INCLUDED ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight mb-1">
              Everything Included With Your Membership
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal">
              A comprehensive architecture & 3D visualization training bundle.
            </p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs max-w-3xl mx-auto">
            {VALUE_STACK_ITEMS.map((s, t) => (
              <div key={t} className="flex justify-between items-center px-5 py-3.5 border-b border-zinc-100 text-xs sm:text-sm">
                <span className="text-zinc-800 font-medium flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-zinc-900 shrink-0" />
                  {s.name}
                </span>
                <span className="font-semibold text-zinc-500 text-right">{s.value}</span>
              </div>
            ))}
            <div className="bg-zinc-50 px-5 py-4 flex justify-between items-center text-xs sm:text-sm font-bold text-black border-t border-zinc-200">
              <span>All 12 Software (Student Edition Links Included)</span>
              <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">INCLUDED</span>
            </div>
            <div className="p-5 text-center bg-white border-t border-zinc-200">
              <button
                onClick={openCheckout}
                className="w-full py-4 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white rounded-2xl font-black text-base uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#00D66F]"
              >
                <span>Unlock All 12 Courses & Software Links ($49)</span>
                <ArrowRight size={18} className="text-[#00D66F]" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══ 10. STUDENT REVIEWS ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14 text-center">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight mb-1">
              Member Reviews & Feedback
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal">
              50,000+ active learners worldwide • 4.9/5 average satisfaction rating
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'none' }}>
            {[...TESTIMONIALS_LANDING, ...TESTIMONIALS_LANDING].map((s, t) => (
              <div key={t} className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-zinc-200 p-5 rounded-2xl text-left shadow-xs">
                <div className="flex gap-1 mb-2.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} className="fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <p className="text-zinc-700 text-xs leading-relaxed mb-4 font-normal">
                  "{s.content}"
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-xs">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">{s.name}</p>
                    <p className="text-[10px] text-zinc-500">{s.role} • {s.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ═══ MEET YOUR DESIGN MENTORS ═══ */}
          <div className="mt-16 pt-12 border-t border-zinc-200/80">
            <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center px-4 text-center">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
                <Users size={20} />
              </div>
              <h2 className="mb-2 font-display font-black text-3xl sm:text-4xl text-black tracking-tight">
                Meet Your Design Mentors
              </h2>
              <p className="max-w-2xl text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
                Industry practitioners with extensive experience across architecture, interior design, and photorealistic 3D visualization.
              </p>
            </div>

            {/* Mentors Marquee */}
            <div className="relative w-full overflow-hidden">
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-r from-[#fafafa] to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-l from-[#fafafa] to-transparent" />
              
              <div className="flex gap-5 animate-scroll-left hover:pause w-max py-2">
                {[...DESIGN_MENTORS, ...DESIGN_MENTORS].map((mentor, idx) => (
                  <div key={`${mentor.name}-${idx}`} className="group flex w-52 sm:w-56 shrink-0 flex-col">
                    <div className="relative overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-xs transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1" style={{ height: '300px' }}>
                      <img
                        alt={mentor.name}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                        src={mentor.image}
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 w-full rounded-b-2xl bg-white/95 backdrop-blur-sm p-3 border-t border-zinc-200 text-left">
                        <h3 className="font-bold text-zinc-900 text-sm leading-tight">{mentor.name}</h3>
                        <p className="text-zinc-500 text-xs font-medium mt-0.5">{mentor.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Mentor Quote */}
            <div className="mx-auto mt-12 max-w-2xl px-4 text-center">
              <p className="mb-6 font-medium text-base sm:text-lg text-zinc-800 leading-relaxed italic font-serif">
                "Our aim is not merely software instruction, but guiding you through the end-to-end commercial workflow — from initial concept sketch to high-ticket architectural render."
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-12 w-12 sm:h-13 sm:w-13 overflow-hidden rounded-full border border-zinc-300 shadow-sm">
                  <img
                    alt="Sofia Reyes"
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-black text-sm sm:text-base">Sofia Reyes</p>
                  <p className="text-zinc-500 text-xs font-normal">Interior Design Director · Avada Faculty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. FAQ ACCORDION ═══ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal">
              Key details regarding curriculum, software access, and support.
            </p>
          </div>
          <div className="space-y-3 mb-10 text-left max-w-3xl mx-auto">
            {FAQ_ITEMS_LANDING.map((s, t) => (
              <details
                key={t}
                className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden p-4 shadow-xs"
                open={openFaqIndex === t}
              >
                <summary
                  className="text-xs sm:text-sm font-bold text-zinc-900 cursor-pointer list-none flex justify-between items-center"
                  onClick={(c) => {
                    c.preventDefault();
                    setOpenFaqIndex(openFaqIndex === t ? null : t);
                  }}
                >
                  <span className="pr-4">{s.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-zinc-400 transition-transform shrink-0 ${openFaqIndex === t ? 'rotate-180' : ''}`}
                  />
                </summary>
                <p className="text-xs text-zinc-600 mt-2.5 leading-relaxed font-normal">
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
            subtext="Get instant lifetime access to all 12 courses, free software installation links, and 24/7 dedicated mentor guidance."
          />
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black py-12 px-6 text-center border-t border-zinc-800 text-zinc-400">
        <p className="text-xs uppercase tracking-[0.25em] mb-4 text-zinc-500 font-medium">Avada Design & Architecture • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Support Contact</span>
        </div>
      </footer>

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] bg-black/95 backdrop-blur-xl border-t border-zinc-800 p-2.5 shadow-2xl transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-2">
          <div className="flex flex-col text-left text-white leading-tight">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Offer Ends In {formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white">
              All 12 Courses & Software Links ($49 USD)
            </span>
          </div>
          <button
            onClick={openCheckout}
            className="bg-black hover:bg-zinc-900 text-white border-2 border-[#00D66F] px-5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Get Access</span>
            <ArrowRight size={15} className="text-[#00D66F]" />
          </button>
        </div>
      </div>

      <SocialProofToast />
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
};

export default LandingPage;

