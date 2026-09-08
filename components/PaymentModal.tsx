import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Check, Loader2, ShieldCheck, AlertCircle, ArrowRight, Mail, Sparkles, CreditCard } from 'lucide-react';
import { trackLead, trackAddPaymentInfo, trackPurchase } from '../services/metaPixel';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Stripe?: (key: string) => any;
    paypal?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const DEFAULT_STRIPE_PUBLISHABLE_KEY = 'pk_live_51PRJCsGGsoQTkhyv6OrT4zvnaaB5Y0MSSkTXi0ytj33oygsfW3dcu6aOFa9q3dr2mXYTCJErnFQJcOcyuDAsQd4B00lIAdclbB';
const EFFECTIVE_STRIPE_KEY = (STRIPE_PUBLISHABLE_KEY || DEFAULT_STRIPE_PUBLISHABLE_KEY).trim();
const BACKEND_URL = (import.meta.env.VITE_STRIPE_BACKEND_URL || 'https://dhufnozehayzjlsmnvdl.supabase.co/functions/v1/stripe-create-payment-intent').trim();
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const PAYPAL_CLIENT_ID = 'AVC9JqvTUJ8ETT_-mn-mU2TEcduyzHywIfVXs36DwJGQquy0PZkNFPTqVXBg9ScOhgbTe_QHQ461J8ts';

type ViewState = 'FORM' | 'PROCESSING' | 'SUCCESS' | 'CONNECTION_ERROR';

const AVATAR_RENDERS = [
  '/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg',
  '/renders/RENDER-4.jpg', '/renders/RENDER-5.jpg', '/renders/RENDER-6.jpg',
  '/renders/RENDER-7.jpg'
];

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('FORM');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stripeRef = useRef<any>(null);
  const elementsRef = useRef<any>(null);
  const stripeInitialized = useRef(false);
  const paypalInitialized = useRef(false);

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && viewState === 'FORM' && !stripeInitialized.current) {
      initializeStripeUI();
    }
  }, [isOpen, viewState]);

  useEffect(() => {
    if (isOpen && viewState === 'FORM' && !paypalInitialized.current) {
      initializePayPal();
    }
  }, [isOpen, viewState]);

  const resetModal = () => {
    setViewState('FORM');
    setEmail('');
    setEmailError(false);
    setErrorMessage(null);
    stripeRef.current = null;
    elementsRef.current = null;
    stripeInitialized.current = false;
    paypalInitialized.current = false;
  };

  const ensurePayPalLoaded = async (): Promise<void> => {
    if (window.paypal) return;
    const existingScript = document.querySelector('script[data-paypal-js="true"]') as HTMLScriptElement | null;
    if (existingScript) {
      await new Promise<void>((resolve, reject) => {
        if (window.paypal) { resolve(); return; }
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('PayPal SDK failed to load')), { once: true });
      });
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.dataset.paypalJs = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('PayPal SDK failed to load'));
      document.head.appendChild(script);
    });
  };

  const initializePayPal = async () => {
    try {
      await ensurePayPalLoaded();
      if (!window.paypal) return;
      const container = document.getElementById('paypal-button-container');
      if (!container || paypalInitialized.current) return;
      paypalInitialized.current = true;
      container.innerHTML = '';

      window.paypal.Buttons({
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'pill',
          label: 'paypal',
          height: 42,
          tagline: false,
        },
        createOrder: (_data: any, actions: any) => {
          const amount = selectedPlan === 'yearly' ? '180.00' : '20.00';
          return actions.order.create({
            purchase_units: [{
              description: selectedPlan === 'yearly' ? 'Avada Design - Yearly Membership' : 'Avada Design - Monthly Membership',
              amount: {
                currency_code: 'USD',
                value: amount,
              },
            }],
          });
        },
        onApprove: async (_data: any, actions: any) => {
          setViewState('PROCESSING');
          try {
            await actions.order.capture();
            const val = selectedPlan === 'yearly' ? 180 : 20;
            trackPurchase({ value: val, currency: 'USD', content_name: 'Avada Design Library' }, { email });
            navigate('/thank-you');
            onClose();
          } catch (err) {
            setErrorMessage('PayPal payment failed. Please try again.');
            setViewState('FORM');
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setErrorMessage('PayPal encountered an error. Please try card payment.');
        },
      }).render('#paypal-button-container');
    } catch (err) {
      console.warn('PayPal init skipped:', err);
    }
  };

  const initializeStripeUI = async (retry = 0) => {
    try {
      if (!EFFECTIVE_STRIPE_KEY) throw new Error('Stripe Publishable Key not found.');
      await ensureStripeLoaded();
      if (!window.Stripe) throw new Error('Stripe SDK did not load. Please check your connection and retry.');

      stripeRef.current = window.Stripe(EFFECTIVE_STRIPE_KEY);
      elementsRef.current = stripeRef.current.elements({
        mode: 'payment',
        amount: selectedPlan === 'yearly' ? 18000 : 2000,
        currency: 'usd',
        appearance: {
          theme: 'flat',
          variables: {
            colorPrimary: '#00D66F',
            colorBackground: '#ffffff',
            colorText: '#0f172a',
            colorDanger: '#ef4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
          },
          rules: {
            '.Input': { border: '1.5px solid #e2e8f0', boxShadow: 'none', padding: '12px 14px', borderRadius: '12px', backgroundColor: '#f8fafc' },
            '.Input:focus': { border: '1.5px solid #00D66F', backgroundColor: '#ffffff', boxShadow: '0 0 0 3px rgba(0, 214, 111, 0.15)' },
            '.Tab': { border: '1.5px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc' },
            '.Tab--selected': { borderColor: '#00D66F', backgroundColor: '#ecfdf5' },
          },
        },
      });

      const paymentElement = elementsRef.current.create('payment', { layout: 'tabs' });
      const mountPoint = document.getElementById('stripe-element-mount');
      if (!mountPoint) throw new Error('Mount point not found');
      paymentElement.mount('#stripe-element-mount');
      stripeInitialized.current = true;
    } catch (err: any) {
      if (retry < 2) {
        setTimeout(() => initializeStripeUI(retry + 1), 350);
        return;
      }
      setErrorMessage(err?.message || 'Failed to initialize card checkout.');
      setViewState('CONNECTION_ERROR');
    }
  };

  const ensureStripeLoaded = async (): Promise<void> => {
    if (window.Stripe) return;
    const existingScript = document.querySelector('script[data-stripe-js="true"]') as HTMLScriptElement | null;
    if (existingScript) {
      await new Promise<void>((resolve, reject) => {
        if (window.Stripe) { resolve(); return; }
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Unable to load Stripe SDK.')), { once: true });
      });
      return;
    }
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.dataset.stripeJs = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load Stripe SDK.'));
      document.head.appendChild(script);
    });
  };

  const handleCardPay = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      setErrorMessage('Enter a valid email to receive instant access.');
      return;
    }
    setViewState('PROCESSING');
    setErrorMessage(null);

    const price = selectedPlan === 'yearly' ? 180 : 20;
    trackLead({ value: price, currency: 'USD', content_name: 'Stripe Card Checkout' }, { email });
    trackAddPaymentInfo({ value: price, currency: 'USD' }, { email });

    try {
      const { error: submitError } = await elementsRef.current.submit();
      if (submitError) {
        setErrorMessage(submitError.message || 'Please check your payment details.');
        setViewState('FORM');
        return;
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (SUPABASE_ANON_KEY) {
        headers.apikey = SUPABASE_ANON_KEY;
        headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
      }

      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items: [{ id: selectedPlan === 'yearly' ? 'yearly-bundle' : 'monthly-bundle' }],
          email,
          name: email.split('@')[0],
          amount: price,
          currency: 'USD',
        }),
      });

      if (!res.ok) throw new Error('Server error');
      const { clientSecret } = await res.json();
      const result = await stripeRef.current.confirmPayment({
        elements: elementsRef.current,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name: email.split('@')[0],
              email: email,
              address: { country: 'US' },
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed.');
        setViewState('FORM');
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        trackPurchase({ value: price, currency: 'USD', content_name: 'Avada Design & Architecture Library' }, { email });
        navigate('/thank-you');
        onClose();
      } else {
        setErrorMessage('Payment not completed.');
        setViewState('FORM');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
      setViewState('FORM');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-[520px] bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_70px_rgba(0,0,0,0.3),0_0_50px_rgba(0,214,111,0.25)] border-[2.5px] border-[#00D66F] overflow-hidden z-10 text-slate-900 animate-[fadeIn_0.25s_ease-out] my-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          <X size={18} />
        </button>

        <div className="p-5 sm:p-7 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          {/* Top Avatars Row */}
          <div className="flex items-center justify-center -space-x-2 mb-3 pt-1">
            {AVATAR_RENDERS.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Render Preview"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm bg-slate-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&auto=format&fit=crop&q=80';
                }}
              />
            ))}
          </div>

          {/* Green Dot Badge */}
          <div className="flex justify-center mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Complete SketchUp & 3D Library • +100 Added Every Week
            </span>
          </div>

          {/* Header Title & Subtitle */}
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-950 leading-tight">
              Unlock Sketchup Models Library
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-medium">
              {selectedPlan === 'monthly' ? (
                <>7 days free, then <span className="font-bold text-slate-800">$20/month</span>. Cancel anytime in 1 click.</>
              ) : (
                <>Instant full library access for <span className="font-bold text-slate-800">$180/year</span> (Save $60). Cancel anytime.</>
              )}
            </p>
          </div>

          {/* Plan Selector (Monthly vs Yearly) */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* Monthly Card */}
            <button
              type="button"
              onClick={() => setSelectedPlan('monthly')}
              className={`relative text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedPlan === 'monthly'
                  ? 'border-[#00D66F] bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Monthly</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'monthly' ? 'border-[#00D66F] bg-[#00D66F]' : 'border-slate-300'
                }`}>
                  {selectedPlan === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900">$20</span>
                <span className="text-[11px] font-semibold text-slate-500">/month</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Billed monthly</p>
            </button>

            {/* Yearly Card */}
            <button
              type="button"
              onClick={() => setSelectedPlan('yearly')}
              className={`relative text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedPlan === 'yearly'
                  ? 'border-[#00D66F] bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="absolute -top-2.5 right-3 bg-[#00D66F] text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                25% OFF
              </span>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">Yearly</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'yearly' ? 'border-[#00D66F] bg-[#00D66F]' : 'border-slate-300'
                }`}>
                  {selectedPlan === 'yearly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900">$180</span>
                <span className="text-[11px] font-semibold text-slate-500">/year</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">$15/mo • Save $60</p>
            </button>
          </div>

          {/* Payment & Access Bar */}
          <div className="flex items-center justify-between px-1 mb-3">
            <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500">
              Payment & Access Email
            </span>
            <div className="flex items-center gap-1.5 opacity-80">
              {/* Payment Brand Badges */}
              <span className="text-[10px] font-extrabold bg-slate-100 text-blue-800 px-1.5 py-0.5 rounded border border-slate-200">VISA</span>
              <span className="text-[10px] font-extrabold bg-slate-100 text-red-600 px-1.5 py-0.5 rounded border border-slate-200">MC</span>
              <span className="text-[10px] font-extrabold bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded border border-slate-200">AMEX</span>
              <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">DISC</span>
            </div>
          </div>

          {/* Express Checkout (PayPal / Link) */}
          <div className="mb-4">
            <div id="paypal-button-container" className="min-h-[42px]"></div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
              OR PAY WITH CARD
            </span>
          </div>

          {/* Form Body */}
          {viewState === 'CONNECTION_ERROR' ? (
            <div className="text-center py-6 space-y-3 bg-red-50/50 rounded-2xl p-4 border border-red-100">
              <AlertCircle size={28} className="text-red-500 mx-auto" />
              <p className="text-xs text-red-600 font-medium">Unable to connect to payment server.</p>
              <button
                onClick={() => { setViewState('FORM'); stripeInitialized.current = false; initializeStripeUI(); }}
                className="text-xs font-bold text-emerald-600 underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Enter your email for access <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(false); setErrorMessage(null); }}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border text-sm font-medium rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:bg-white ${
                      emailError ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-[#00D66F] focus:ring-2 focus:ring-[#00D66F]/20'
                    }`}
                  />
                </div>
              </div>

              {/* Card Inputs */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Card information
                </label>
                <div id="stripe-element-mount" className="bg-slate-50 rounded-xl border border-slate-200 p-2"></div>
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-100">
                  <AlertCircle size={15} className="shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Primary Green CTA Button */}
              <button
                type="button"
                onClick={handleCardPay}
                disabled={viewState === 'PROCESSING'}
                className="w-full py-3.5 px-5 bg-[#00D66F] hover:bg-[#00c063] active:scale-[0.99] text-slate-950 font-black text-[15px] sm:text-base rounded-xl shadow-[0_10px_25px_rgba(0,214,111,0.35)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {viewState === 'PROCESSING' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-slate-950" size={20} />
                    <span>Processing Securely...</span>
                  </div>
                ) : (
                  <>
                    <Lock size={16} className="text-slate-950" />
                    <span>{selectedPlan === 'monthly' ? 'Start 7-Day Free Trial' : 'Unlock Instant Access'}</span>
                    <ArrowRight size={18} className="text-slate-950" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer Security Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-slate-600">
                <ShieldCheck size={14} className="text-[#00D66F]" /> 256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span className="text-slate-600">Powered by Stripe</span>
              <span>•</span>
              <span className="text-slate-600">Cancel Anytime</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Immediate access link will be delivered straight to your email.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};