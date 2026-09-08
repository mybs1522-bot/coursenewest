import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Check, Loader2, Mail, ShieldCheck, AlertCircle, RefreshCcw, ArrowRight, Sparkles, Timer } from 'lucide-react';
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

// Real Supabase project config
const DEFAULT_SUPABASE_URL = 'https://aexrgtpxyzfxjecozstf.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFleHJndHB4eXpmeGplY296c3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTY0MjcsImV4cCI6MjA4Nzg3MjQyN30._ZSmh9iTP3etyGj5XrkEGJtRp9kR8z6jAmLOMesIvkg';

const BACKEND_URL = (import.meta.env.VITE_STRIPE_BACKEND_URL || `${DEFAULT_SUPABASE_URL}/functions/v1/stripe-create-payment-intent`).trim();
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
const PAYPAL_CLIENT_ID = 'AVC9JqvTUJ8ETT_-mn-mU2TEcduyzHywIfVXs36DwJGQquy0PZkNFPTqVXBg9ScOhgbTe_QHQ461J8ts';

type ViewState = 'FORM' | 'PROCESSING' | 'SUCCESS' | 'CONNECTION_ERROR';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('FORM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const stripeRef = useRef<any>(null);
  const elementsRef = useRef<any>(null);
  const paymentElementRef = useRef<any>(null);
  const stripeInitialized = useRef(false);
  const paypalInitialized = useRef(false);

  useEffect(() => {
    if (isOpen) {
      resetModal();
    } else {
      cleanupElements();
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

  useEffect(() => {
    if (!isOpen || viewState !== 'FORM') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, viewState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const cleanupElements = () => {
    if (paymentElementRef.current) {
      try {
        paymentElementRef.current.unmount();
        paymentElementRef.current.destroy();
      } catch (e) {
        // ignore
      }
      paymentElementRef.current = null;
    }
    const mountPoint = document.getElementById('stripe-element-mount');
    if (mountPoint) mountPoint.innerHTML = '';
  };

  const resetModal = () => {
    setViewState('FORM');
    setName('');
    setEmail('');
    setNameError(false);
    setEmailError(false);
    setErrorMessage(null);
    setTimeLeft(15 * 60);
    cleanupElements();
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
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          height: 45,
          tagline: false,
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: 'Global Design Career Bundle - 12 Premium Courses',
              amount: {
                currency_code: 'USD',
                value: '49.00',
              },
            }],
          });
        },
        onApprove: async (_data: any, actions: any) => {
          setViewState('PROCESSING');
          try {
            await actions.order.capture();
            trackPurchase({ value: 49, currency: 'USD', content_name: 'Avada 12-Course Architecture & Design Bundle' }, { name: name || email.split('@')[0], email });
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
        onCancel: () => {
          setErrorMessage('Payment cancelled. Try again when ready.');
        },
      }).render('#paypal-button-container');
    } catch (err) {
      console.error('PayPal init error:', err);
    }
  };

  const initializeStripeUI = async (retry = 0) => {
    try {
      if (!EFFECTIVE_STRIPE_KEY) {
        throw new Error('Stripe publishable key is missing.');
      }

      await ensureStripeLoaded();

      if (!window.Stripe) {
        throw new Error('Stripe SDK did not load. Please check your connection and retry.');
      }

      const mountPoint = document.getElementById('stripe-element-mount');
      if (!mountPoint) {
        if (retry < 3) {
          setTimeout(() => initializeStripeUI(retry + 1), 250);
          return;
        }
        throw new Error('Payment mount container not found.');
      }

      mountPoint.innerHTML = '';

      stripeRef.current = window.Stripe(EFFECTIVE_STRIPE_KEY);
      elementsRef.current = stripeRef.current.elements({
        mode: 'payment',
        amount: 4900,
        currency: 'usd',
        appearance: {
          theme: 'flat',
          variables: {
            colorPrimary: '#00D66F',
            colorBackground: '#f8fafc',
            colorText: '#0f172a',
            colorDanger: '#ef4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '12px',
          },
          rules: {
            '.Input': { border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '12px 14px' },
            '.Input:focus': { border: '1.5px solid #00D66F', backgroundColor: '#ffffff', boxShadow: '0 0 0 2px rgba(0, 214, 111, 0.2)' },
            '.Tab': { border: '1px solid #e2e8f0', borderRadius: '10px' },
            '.Tab--selected': { borderColor: '#00D66F', backgroundColor: '#ecfdf5' },
          },
        },
      });

      paymentElementRef.current = elementsRef.current.create('payment', {
        layout: 'tabs',
        fields: {
          billingDetails: {
            name: 'never',
            email: 'never',
            address: 'never',
          },
        },
      });

      paymentElementRef.current.mount('#stripe-element-mount');
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
    if (window.Stripe) {
      return;
    }

    const existingScript = document.querySelector('script[data-stripe-js="true"]') as HTMLScriptElement | null;

    if (existingScript) {
      await new Promise<void>((resolve, reject) => {
        if (window.Stripe) {
          resolve();
          return;
        }

        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Unable to load Stripe SDK.')), { once: true });
      });
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.defer = true;
      script.dataset.stripeJs = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Unable to load Stripe SDK.'));
      document.head.appendChild(script);
    });
  };

  const handleCardPay = async () => {
    if (!name.trim()) {
      setNameError(true);
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      setErrorMessage('Enter a valid email to receive instant access.');
      return;
    }

    if (!stripeRef.current || !elementsRef.current) {
      setErrorMessage('Payment gateway is still loading. Please wait 2-3 seconds.');
      return;
    }

    setViewState('PROCESSING');
    setErrorMessage(null);

    // Track Lead & AddPaymentInfo
    trackLead({ value: 49, currency: 'USD', content_name: 'Stripe Card Checkout' }, { name, email });
    trackAddPaymentInfo({ value: 49, currency: 'USD' }, { name, email });

    try {
      const { error: submitError } = await elementsRef.current.submit();
      if (submitError) {
        setErrorMessage(submitError.message || 'Please check your payment details.');
        setViewState('FORM');
        return;
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (SUPABASE_ANON_KEY) {
        headers.apikey = SUPABASE_ANON_KEY;
        headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
      }

      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items: [{ id: 'global-design-bundle' }],
          email,
          name,
          amount: 49,
          currency: 'USD',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Card server is currently busy. Please pay securely with PayPal for instant 1-click access.');
      }

      const { clientSecret } = await res.json();

      const result = await stripeRef.current.confirmPayment({
        elements: elementsRef.current,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name: name,
              email: email,
              address: {
                country: 'US', // Defaulting to US if hidden, Stripe requires a country for some methods
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed. Please try another card.');
        setViewState('FORM');
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        trackPurchase({ value: 49, currency: 'USD', content_name: 'Avada 12-Course Architecture & Design Bundle' }, { name, email });
        navigate('/thank-you');
        onClose();
      } else {
        setErrorMessage('Payment not completed. Please try again.');
        setViewState('FORM');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
      setViewState('FORM');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-[940px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[650px] animate-[fadeIn_0.3s_ease-out]">
        <div className="hidden md:flex w-[40%] bg-gray-50 text-gray-900 p-10 flex-col justify-between relative overflow-hidden border-r border-gray-100">
          <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-blue-50/60 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
              <ShieldCheck size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest">Secure Global Checkout</span>
            </div>
            <h2 className="text-3xl font-display font-black leading-none mb-3 tracking-tight">Global Design <br />Career Bundle</h2>
            <div className="text-sm font-medium text-gray-500 mb-8">Instant Access • Lifetime Ownership</div>

            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-6xl font-black text-gray-900 tracking-tighter">$49</span>
              <span className="text-xl text-gray-600 line-through font-medium">$199</span>
            </div>

            <div className="space-y-4">
              {[
                'Instant access right after payment',
                'Lifetime updates included',
                'Project files + templates included',
                '7-Day Refund Policy',
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 text-sm font-bold ${item.includes('Refund') ? 'text-gray-900 bg-gray-100/50 p-1.5 -ml-1.5 rounded-lg' : 'text-gray-600'}`}>
                  <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-primary shadow-sm"><Check size={12} strokeWidth={4} /></div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-[11px] font-bold text-gray-900">Trusted by 23,000+ learners worldwide</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Designers • Architects • Freelancers</div>
          </div>
        </div>

        <div className="flex-1 bg-white flex flex-col relative h-full">
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 z-20 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Secure Checkout</h3>
                <p className="text-[11px] text-gray-500">One-time payment • Instant access</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
          </div>

          <div className="flex-1 px-4 py-4 overflow-y-auto">
            {viewState === 'CONNECTION_ERROR' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500"><AlertCircle size={24} /></div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Checkout Unavailable</h4>
                  <p className="text-sm text-gray-500 mt-1">Please retry in a moment.</p>
                </div>
                <button onClick={resetModal} className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm flex items-center gap-2">
                  <RefreshCcw size={14} /> Retry
                </button>
              </div>
            )}

            {(viewState === 'FORM' || viewState === 'PROCESSING') && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Complete Bundle</p>
                      <p className="font-bold text-white text-sm">12 Premium Courses</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Lifetime access • <span className="text-white font-black">7-Day Refund</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white">$49</p>
                      <p className="text-xs text-gray-500 line-through">$199</p>
                    </div>
                  </div>
                  {timeLeft > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-center gap-2 text-amber-400">
                      <Timer size={14} />
                      <span className="text-xs font-bold">Offer expires in {formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-4 w-4 ${nameError ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setNameError(false); setErrorMessage(null); }}
                        placeholder="John Doe"
                        className={`block w-full pl-9 pr-3 py-3 bg-gray-50 border text-sm font-medium rounded-xl transition-all focus:outline-none focus:bg-white ${nameError ? 'border-red-300 bg-red-50/50' : 'border-gray-200 focus:border-emerald-500'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-4 w-4 ${emailError ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(false); setErrorMessage(null); }}
                        placeholder="you@example.com"
                        className={`block w-full pl-9 pr-3 py-3 bg-gray-50 border text-sm font-medium rounded-xl transition-all focus:outline-none focus:bg-white ${emailError ? 'border-red-300 bg-red-50/50' : 'border-gray-200 focus:border-emerald-500'}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lock size={10} className="text-gray-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Card details</span>
                  </div>
                  <div id="stripe-element-mount" className="bg-gray-50 rounded-xl border border-gray-200 p-1"></div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100">
                    <AlertCircle size={14} className="shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <button
                  onClick={handleCardPay}
                  disabled={viewState === 'PROCESSING'}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl font-black text-base shadow-lg shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {viewState === 'PROCESSING' ? <Loader2 className="animate-spin" size={20} /> : <><span>Get Access Now</span> <ArrowRight size={18} /></>}
                </button>

                <div className="pt-3 border-t border-dashed border-gray-200">
                  <p className="text-[10px] text-center text-gray-400 font-medium mb-3">Or pay with PayPal</p>
                  <div id="paypal-button-container" className="min-h-[45px]"></div>
                </div>
              </div>
            )}

            {viewState === 'SUCCESS' && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <Check size={40} className="text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Payment Successful!</h3>
                  <p className="text-gray-500 text-sm">Check your email for instant access.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-base hover:bg-black transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {(viewState === 'FORM' || viewState === 'PROCESSING') && (
            <div className="p-4 border-t border-gray-100 bg-white shrink-0 z-20">
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-bold">
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> Secure</span>
                <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Encrypted</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-tighter">7-Day Refund</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};