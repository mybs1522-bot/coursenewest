import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, User, Sparkles, CheckCircle2, ArrowRight, Loader2, ShieldCheck, BookOpen } from 'lucide-react';
import { trackLead, trackCompleteRegistration } from '../services/metaPixel';
import { supabase } from '../services/supabase';

interface FreeAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeAccessModal: React.FC<FreeAccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const isNameValid = name.trim().length >= 1;
    const isEmailValid = validateEmail(email.trim());

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);

    if (!isNameValid || !isEmailValid) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. Send access email via backend endpoint with automatic retry
      let response: Response | null = null;
      let data: any = null;
      let lastErr: any = null;

      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          response = await fetch('/api/send-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim().toLowerCase(),
            }),
          });
          data = await response.json();
          if (response.ok) break;
        } catch (fetchErr) {
          lastErr = fetchErr;
          if (attempt === 2) break;
          await new Promise((r) => setTimeout(r, 600));
        }
      }

      if (!response || !response.ok) {
        throw new Error((data && data.error) || (lastErr && lastErr.message) || 'Failed to submit form. Please try again.');
      }

      // 2. Track Meta pixel events
      trackLead({ content_name: 'Free Course Access', value: 0, currency: 'USD' });
      trackCompleteRegistration({ status: true });

      // 3. Optionally record lead in Supabase (fail-safe)
      try {
        await supabase.from('leads').insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            created_at: new Date().toISOString(),
            source: 'free_access_modal',
          },
        ]);
      } catch (err) {
        // Silently continue if Supabase table is not configured
        console.warn('Supabase lead logging notice:', err);
      }

      // 4. Navigate to Thank You page
      sessionStorage.setItem('enrolled_student', JSON.stringify({ name: name.trim(), email: email.trim() }));
      onClose();
      navigate(`/thank-you?name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}`);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800/80 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          <Sparkles size={13} />
          <span>100% Free Lifetime Access</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white mb-2">
          Get Instant Access to All 12 Courses
        </h2>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Enter your details below. We'll send your direct course links and library access immediately to your inbox.
        </p>

        {/* Value Highlights */}
        <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-zinc-300">
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>12 Core Video Courses</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>Software Links & Assets</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>3 Real Portfolio Projects</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>Zero Payment Required</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Your Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError(false);
                }}
                className={`w-full bg-zinc-900/90 text-white placeholder-zinc-500 text-sm rounded-xl pl-10 pr-4 py-3 border transition-colors outline-none ${
                  nameError ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-emerald-500'
                }`}
                disabled={isLoading}
              />
            </div>
            {nameError && (
              <p className="text-red-400 text-xs mt-1">Please enter your full name.</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Email Address (Where should we send your access?)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
                className={`w-full bg-zinc-900/90 text-white placeholder-zinc-500 text-sm rounded-xl pl-10 pr-4 py-3 border transition-colors outline-none ${
                  emailError ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-emerald-500'
                }`}
                disabled={isLoading}
              />
            </div>
            {emailError && (
              <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-zinc-950 font-black text-base rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending Your Course Access...</span>
              </>
            ) : (
              <>
                <span>Get Free Instant Access</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>No credit card needed • 100% Free • We respect your privacy</span>
        </div>
      </div>
    </div>
  );
};
