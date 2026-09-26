import React, { useEffect, useState } from 'react';
import { CheckCircle2, Globe, ExternalLink, MessageCircle, ArrowRight, Sparkles, BookOpen, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { trackCompleteRegistration } from '../services/metaPixel';

const ThankYouPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const DRIVE_LINK = (
    import.meta.env.VITE_COURSE_ACCESS_LINK ||
    'https://files.leadsdocker.com'
  ).trim();

  const WHATSAPP_NUMBER = '+91 91987 47810';

  useEffect(() => {
    window.scrollTo(0, 0);
    trackCompleteRegistration({ status: true });

    // Retrieve name and email from URL or session storage
    const queryName = searchParams.get('name');
    const queryEmail = searchParams.get('email');

    if (queryName || queryEmail) {
      if (queryName) setStudentName(queryName);
      if (queryEmail) setStudentEmail(queryEmail);
    } else {
      const stored = sessionStorage.getItem('enrolled_student');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setStudentName(parsed.name);
          if (parsed.email) setStudentEmail(parsed.email);
        } catch (e) {
          // ignore
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-emerald-100">
      {/* Header/Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="font-display font-black text-xl tracking-tight">AVADA</span>
          </Link>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s+/g, '')}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <MessageCircle size={16} /> Support
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden text-center p-8 md:p-12">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">
              Welcome to the family{studentName ? `, ${studentName}` : ''}! 🎉
            </h1>
            <p className="text-gray-500 font-medium text-lg mb-8 leading-relaxed">
              Your free enrollment is confirmed. Your journey to mastering architecture and interior design starts right now!
            </p>

            {studentEmail && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-medium mb-8">
                <Mail size={16} />
                <span>Access link sent to: <strong>{studentEmail}</strong></span>
              </div>
            )}

            <div className="space-y-4">
              <a 
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Open Course Collection Directly</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </a>
              
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                100% Free Lifetime Access • Instant Download
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Globe size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Check Your Email</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We've delivered an email with your access links and resources. If you don't see it, check your spam or promotions tab.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Need help with your software setup or files? Reach out to us anytime via WhatsApp: <span className="font-bold text-gray-900">{WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/" className="text-gray-400 hover:text-gray-900 font-bold text-sm transition-colors flex items-center justify-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
