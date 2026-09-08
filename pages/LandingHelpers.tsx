import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle, Users, X } from 'lucide-react';

export const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w400-rw`;

export const RAW_JOINERS = [
  { name: "Emma T.", city: "London", time: "2 min ago" },
  { name: "Noah R.", city: "Toronto", time: "5 min ago" },
  { name: "Luca M.", city: "Milan", time: "8 min ago" },
  { name: "Sofia P.", city: "Madrid", time: "12 min ago" },
  { name: "Mia L.", city: "Sydney", time: "15 min ago" },
  { name: "Ethan B.", city: "Austin", time: "18 min ago" },
  { name: "Ava K.", city: "Seoul", time: "22 min ago" },
  { name: "Oliver W.", city: "Berlin", time: "25 min ago" },
  { name: "Emily J.", city: "New York", time: "30 min ago" },
  { name: "Liam C.", city: "Dubai", time: "33 min ago" },
];

export const PROBLEM_POINTS = [
  { emoji: "⏰", text: "Spending countless frustrating hours on a single 3D view while clients constantly ask for more revisions?" },
  { emoji: "😰", text: "Feeling overwhelmed by complex software, fearing you'll never catch up to the top studios?" },
  { emoji: "🤖", text: "Watching AI generate beautiful designs in seconds and worrying your traditional skills will soon be irrelevant?" }
];

export const TRANSFORMATION_STORIES = [
  {
    name: "Ngozi A.",
    role: "Freelance Designer",
    before: "Struggling alone with YouTube tutorials. Designs looked fake, took days, and clients wouldn't pay well without arguments.",
    after: "Joined our community. With 24/7 team support, she mastered V-Ray + AI. She now charges premium rates and finishes in a fraction of the time.",
    emoji: "✨"
  },
  {
    name: "Emeka N.",
    role: "Architecture Student",
    before: "Terrified of AI taking his future job. Felt his university degree wasn't teaching practical, modern software skills.",
    after: "We held his hand through the workflow. He now uses AI to generate concepts and V-Ray for final polish. Just landed a massive internship.",
    emoji: "🎓"
  }
];

export const PAGE_PREVIEWS_ROW1 = [
  '/renders/RENDER-1.jpg', '/renders/RENDER-2.jpg', '/renders/RENDER-3.jpg',
  '/renders/RENDER-4.jpg', '/renders/RENDER-5.jpg', '/renders/RENDER-6.jpg',
  '/renders/RENDER-7.jpg', '/renders/RENDER-8.jpg', '/renders/RENDER-9.jpg',
  '/renders/RENDER-10.jpg', '/renders/RENDER-11.jpg', '/renders/RENDER-12.jpg',
  '/renders/RENDER-13.jpg',
];
export const PAGE_PREVIEWS_ROW2 = [
  '/renders/RENDER-14.jpg', '/renders/RENDER-15.jpg', '/renders/RENDER-16.jpg',
  '/renders/RENDER-17.jpg', '/renders/RENDER-18.jpg', '/renders/RENDER-19.jpg',
  '/renders/RENDER-20.jpg', '/renders/RENDER-21.jpg', '/renders/RENDER-22.jpg',
  '/renders/RENDER-23.jpg', '/renders/RENDER-24.jpg', '/renders/RENDER-25.jpg',
];

export const FEAR_STATS = [
  { stat: '82%', label: 'of traditional 3D visualization tasks are actively being replaced by AI rendering tools right now.', icon: '📉' },
  { stat: '10x', label: 'faster output when you learn to comfortably partner with AI instead of fearing it.', icon: '🚀' },
  { stat: '24/7', label: 'Support from our team. We hold your hand through every single software hurdle so you never feel alone.', icon: '🤝' },
  { stat: '15 Days', label: 'From feeling stuck and overwhelmed, to creating portfolio-ready designs with total confidence.', icon: '⏳' },
];

export const DESIGN_MENTORS = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop&crop=face",
    name: "James Carter",
    role: "Lead Architecture Instructor"
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=560&fit=crop&crop=face",
    name: "Sofia Reyes",
    role: "Interior Design Expert"
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&crop=face",
    name: "Marcus Webb",
    role: "3D Visualization Specialist"
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=560&fit=crop&crop=face",
    name: "Claire Dubois",
    role: "SketchUp & V-Ray Mentor"
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=560&fit=crop&crop=face",
    name: "Ethan Müller",
    role: "AutoCAD & BIM Lead"
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=560&fit=crop&crop=face",
    name: "Layla Hassan",
    role: "Lumion & AI Design Coach"
  }
];

/* ─── LOGO ─── */
export const Logo = () => (
  <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.location.href = '/'}>
    <div className="w-8 h-8 md:w-9 md:h-9 bg-black text-white flex items-center justify-center font-display font-black text-sm md:text-base rounded-xl tracking-tighter border border-zinc-800 shadow-sm">
      AV
    </div>
    <div className="flex flex-col text-left">
      <span className="font-display font-black text-base md:text-lg tracking-tight leading-none text-black">Avada Design</span>
      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 mt-0.5">Architecture Academy</span>
    </div>
  </div>
);

/* ─── FLIP CLOCK ─── */
const FlipDigit = ({ value }: { value: string }) => (
  <div className="flip-digit-wrapper"><div className="flip-digit"><span>{value}</span></div></div>
);

/* ─── CTA WIDGET ─── */
export const CallToActionWidget = ({ timeLeft, onClick, headline, subtext }: { timeLeft: { h: number; m: number; s: number }; onClick: () => void; headline?: string; subtext?: string }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  const h = f(timeLeft.h), m = f(timeLeft.m), s = f(timeLeft.s);
  return (
    <div className="relative py-10 md:py-16 px-5 md:px-8 overflow-hidden rounded-3xl bg-black text-white my-8 max-w-5xl mx-auto shadow-2xl border border-zinc-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-800/30 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <div className="inline-block bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
          Limited Enrollment Offer • $49 USD Lifetime
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-2 tracking-tight">
          {headline || "Start Learning Architecture & 3D Design Today"}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-lg mx-auto leading-relaxed font-normal">
          {subtext || "Get instant access to all 12 courses, software download links, and dedicated mentor guidance."}
        </p>
        
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-5 py-2 rounded-2xl">
            <span className="text-xs font-mono text-zinc-400 uppercase font-medium">Offer Closes In</span>
            <div className="flex items-center gap-1 font-mono text-white font-bold text-sm sm:text-base">
              <span>{h}h</span>
              <span className="text-zinc-500">:</span>
              <span>{m}m</span>
              <span className="text-zinc-500">:</span>
              <span>{s}s</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <button 
            onClick={onClick} 
            className="w-full py-4 sm:py-4.5 bg-black hover:bg-zinc-900 active:scale-[0.99] text-white rounded-2xl font-black text-base uppercase tracking-wider transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg border-2 border-[#00D66F]"
          >
            <span>Claim Instant Access ($49 USD)</span>
            <ArrowRight size={18} className="text-[#00D66F]" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] sm:text-xs text-zinc-400 font-medium tracking-wide">
          <span>7-Day Money-Back Guarantee</span>
          <span className="text-zinc-600">•</span>
          <span>Instant Download</span>
          <span className="text-zinc-600">•</span>
          <span>Official Certification</span>
        </div>
      </div>
    </div>
  );
};

/* ─── SOCIAL PROOF TOAST ─── */
export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const show = () => { setVisible(true); setTimeout(() => { setVisible(false); setTimeout(() => setIdx(p => (p + 1) % RAW_JOINERS.length), 500); }, 4000); };
    const t1 = setTimeout(show, 6000);
    const t2 = setInterval(show, 15000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  const j = RAW_JOINERS[idx];
  return (
    <div className={`fixed bottom-20 left-4 z-[70] transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3 max-w-xs">
        <div className="w-8 h-8 bg-zinc-100 border border-zinc-200 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={15} className="text-zinc-900" /></div>
        <div>
          <p className="text-sm font-bold text-zinc-900">{j.name} from {j.city}</p>
          <p className="text-xs text-zinc-500">just enrolled • {j.time}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── CONSTANTS ─── */
export const VALUE_STACK_ITEMS = [
  { name: '1. AutoCAD Precision Drafting Course', value: 'Included ($199 Value)' },
  { name: '2. BIM with Revit Architecture Course', value: 'Included ($199 Value)' },
  { name: '3. SketchUp Pro 3D Modeling Masterclass', value: 'Included ($199 Value)' },
  { name: '4. 3ds Max Advanced Luxury Interiors', value: 'Included ($199 Value)' },
  { name: '5. V-Ray Photo-Realism Masterclass', value: 'Included ($199 Value)' },
  { name: '6. Lumion Cinematic Walkthroughs', value: 'Included ($199 Value)' },
  { name: '7. D5 Real-Time Rendering Masterclass', value: 'Included ($199 Value)' },
  { name: '8. Enscape VR Architecture Course', value: 'Included ($199 Value)' },
  { name: '9. AI Architecture (Midjourney) Masterclass', value: 'Included ($199 Value)' },
  { name: '10. Generative Design (Stable Diffusion)', value: 'Included ($199 Value)' },
  { name: '11. Unreal Engine 5 Interactive Design', value: 'Included ($199 Value)' },
  { name: '12. Post Production & Photoshop Mastery', value: 'Included ($199 Value)' },
  { name: '10,000+ Premium Texture Library', value: 'Included' },
  { name: '2,000+ Drag-and-Drop 3D Models', value: 'Included' },
  { name: 'Software Installation Hub & Direct Free Links', value: 'Included' },
  { name: '24/7 Team Access & Screen Support', value: 'Included' },
  { name: '3 Real Paid Freelance Projects', value: 'Included ($300 Value)' },
  { name: 'Freelancing Pricing & Client Acquisition Playbook', value: 'Included' },
  { name: 'Official Diploma Certificate Equivalent', value: 'Included' },
];

export const TESTIMONIALS_LANDING = [
  { name: 'Ngozi A.', role: 'Freelance Designer', location: 'London, UK', content: 'I used to cry when V-Ray crashed. Literally. The support team is so incredibly kind and patient. Now I use AI so well that I feel completely secure in my career.' },
  { name: 'Ethan B.', role: 'Senior Architect', location: 'Austin, USA', content: 'I feared AI would replace my studio. But Avada held my hand through the transition. We now use it to generate gorgeous concepts for clients in minutes.' },
  { name: 'Sophia N.', role: '3D Visualizer', location: 'Toronto, CA', content: 'The step-by-step guidance is amazing for beginners. Whenever my scene looks dark or weird, I just ask the support team. They are absolute lifesavers.' },
  { name: 'Emeka N.', role: 'Architecture Student', location: 'Seoul, KR', content: 'I felt so behind in university because they still teach completely outdated methods. Within two weeks here, I gained the confidence to start taking well-paying projects.' },
  { name: 'Olivia M.', role: 'Interior Designer', location: 'Sydney, AU', content: 'To have someone to actually look at your screen and say "Oh, simply press this button" saves weeks of frustration. Best $49 I ever spent.' },
  { name: 'Liam O.', role: 'Landscape Architect', location: 'Madrid, ES', content: 'The continuous support makes learning stress-free. D5 Render combined with AI generation is just magical. It took away all my anxiety about falling behind.' },
  { name: 'Ava K.', role: 'Studio Owner', location: 'Berlin, DE', content: 'My studio workflow is now 10x faster. We pitch 10 options to clients in 1 hour.' },
  { name: 'Oliver W.', role: 'Freelance Visualizer', location: 'New York, USA', content: 'I almost quit 3D. This program made the learning process simple, practical, and profitable.' },
];

export const FAQ_ITEMS_LANDING = [
  { question: "I don't have a design degree. Can I really start an Interior Design career?", answer: "YES! 100%. Clients don't care about degrees — they care about stunning renders and fast delivery. We teach you the exact practical workflow (AutoCAD, SketchUp, V-Ray, Lumion & AI) so you can create client-ready portfolios and start taking paid jobs in just 15 to 30 days." },
  { question: "I'm terrified of AI taking my job. Will this help?", answer: "We completely understand that fear! AI is scary if you ignore it, but it's an incredible superpower when you master it. We will hold your hand and teach you exactly how to use AI as your personal assistant, making you brilliantly fast and completely irreplaceable." },
  { question: "I am a complete beginner and get overwhelmed easily. Is this for me?", answer: "Yes, this program was built exactly with you in mind. We know learning software can be intimidating. We start from the absolute basics ('how to click here') and our team is always a WhatsApp message away to hold your hand when you feel stuck." },
  { question: "Are you really going to help me, or is this just another course?", answer: "This is a true 24/7 support community. When your render looks weird or your software crashes, you don't have to figure it out alone. You reach out to us, and we patiently help you fix it. Your success is our personal mission." },
  { question: "Is it really just $49 USD? What's the catch?", answer: "No catch. We keep pricing low so more creators can upgrade fast without breaking the bank. It's a one-time payment of $49 USD for lifetime access to all 12 courses, free software links, and 24/7 team support." },
  { question: "Do I need to buy expensive software subscriptions?", answer: "Not at all. We will show you exactly how to easily access official free or student versions of all software. We want you earning safely, not spending thousands on expensive licenses." },
  { question: "What if I feel like it's not working for me?", answer: "We want this to be 100% risk-free. If you join and feel it's not a fit, email us within 7 days and we will refund your $49 immediately, no questions asked." },
  { question: "Can I access the training on my mobile and laptop?", answer: "Yes! All courses are hosted online and work perfectly on any device — laptop, desktop, tablet, or phone. You can learn comfortably at your own pace anywhere." },
];

export const INCOME_TIERS = [
  { label: 'Single Render Charge', before: 'Struggling to ask $20', after: 'Confidently quoting $120+', icon: '🖼️' },
  { label: 'Interior Design Project', before: 'Rejected for poor 3D quality', after: 'Winning $1,000+ contracts', icon: '🏠' },
  { label: 'Time to Finish a Room', before: '3 Frustrating, Sleepless Nights', after: '2 Easy Hours with our AI Workflow', icon: '⏱️' },
  { label: 'Your Career Confidence', before: 'Constantly Anxious & Overwhelmed', after: 'Relaxed, In-Demand Professional', icon: '🌟' },
];

export const COURSES_LANDING = [
  {
    id: '5', title: 'V-Ray Photorealism', software: 'V-Ray', students: '48k',
    description: 'Make your 3D models look like real photos with realistic sunlight and textures.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aHEt_z78tYD_0Cn66DiduAnhwn-o8El8=w400-rw',
    learningPoints: ['Set up realistic sunlight and night lighting', 'Make materials look like real wood and glass', 'Sell your design before it exists'],
    workflowImpact: 'Sell your design before it exists.'
  },
  {
    id: '1', title: 'AutoCAD Mastery', software: 'AutoCAD', students: '42.5k',
    description: 'Draw accurate 2D floor plans for houses and buildings 10x faster with shortcuts.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1fV5bz4JDugh8HxLMJ0fXu5K5sDj3qlSR=w400-rw',
    learningPoints: ['Draw floor plans and furniture layouts easily', 'Print your drawings to scale for construction', 'Use shortcuts to draw 10x faster'],
    workflowImpact: 'Create professional blueprints that contractors build from.'
  },
  {
    id: '2', title: 'BIM with Revit', software: 'Revit', students: '38k',
    description: 'Build smart 3D buildings on your computer with automated floor plans and schedules.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1N_BbG9kAEwIk541Id53_RV0CWjO1jzAt=w400-rw',
    learningPoints: ['Create 3D buildings with automatic floor plans', 'Calculate material quantities automatically', 'Collaborate on big projects easily'],
    workflowImpact: 'Save days of work with automated BIM schedules.'
  },
  {
    id: '3', title: 'SketchUp Pro', software: 'SketchUp', students: '55k',
    description: 'The easiest way to design 3D houses, kitchens, and bedrooms in minutes.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1wl6by5AO5MiPeoYsZ8F6Zi5AJahoeTQo=w400-rw',
    learningPoints: ['Pull simple shapes into 3D houses instantly', 'Add furniture, colors, and textures easily', 'Create 3D views to show your clients'],
    workflowImpact: 'Model dream spaces in just minutes.'
  },
  {
    id: '4', title: '3ds Max Advanced', software: '3ds Max', students: '22k',
    description: 'Design fancy furniture and luxury interiors that command top design fees.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1DgmIvkeC2dxGpRpzbIthHQsSdlCty2Xg=w400-rw',
    learningPoints: ['Model complex shapes like twisted towers', 'Create soft fabrics, pillows, and blankets', 'Design high-end luxury interior spaces'],
    workflowImpact: 'Charge more for premium, high-detail luxury designs.'
  },
  {
    id: '6', title: 'Lumion Cinematic', software: 'Lumion', students: '31k',
    description: 'Make cinematic movies of your architecture with walking people and waving trees.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt=w400-rw',
    learningPoints: ['Add grass, trees, and water instantly', 'Make people walk and cars drive in your scene', 'Create a video tour of the house'],
    workflowImpact: 'A 1-minute video sells a house better than 100 drawings.'
  },
  {
    id: '7', title: 'D5 Render Realtime', software: 'D5 Render', students: '19k',
    description: 'See photorealistic results in real-time as you move the camera and change materials.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1vbV4j6K9sgzbbZ7qlRdgqPTXWiHBPLsr=w400-rw',
    learningPoints: ['Real-time lighting preview while you work', 'Thousands of free drag-and-drop assets', 'Produce 4K renders in seconds'],
    workflowImpact: 'Make live design changes during client meetings.'
  },
  {
    id: '8', title: 'Enscape VR', software: 'Enscape', students: '25k',
    description: 'Walk inside your 3D design using VR goggles or send interactive walkthrough links.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1SmezP6LwT3yo9aE3oivpGkqS-xycSOyx=w400-rw',
    learningPoints: ['One-click instant walkthrough generation', 'Send web links for client exploration', 'VR integration to impress premium clients'],
    workflowImpact: 'Spot mistakes before construction starts.'
  },
  {
    id: '9', title: 'AI Architecture', software: 'Midjourney', students: '60k',
    description: 'Generate 100 jaw-dropping design ideas and client mood boards in 1 minute with AI.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s-HzZVKpc9F92mLW2gMOPk0kVrKAqUIS=w400-rw',
    learningPoints: ['Prompt engineering for architectural concepts', 'Instant client mood boards and style mixes', 'Never face creative block again'],
    workflowImpact: 'Generate 50 concepts before your first coffee.'
  },
  {
    id: '10', title: 'Generative Design', software: 'Stable Diffusion', students: '15k',
    description: 'Turn rough hand sketches into realistic building designs using AI in seconds.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1xSzSjuL4imlbXwEYMwKw_vhuueDcFtHm=w400-rw',
    learningPoints: ['Turn hand sketches into realistic renders', 'Change specific parts of an image with AI', 'Control geometry and materials with ControlNet'],
    workflowImpact: 'Show a realistic design during the first client pitch.'
  },
  {
    id: '11', title: 'Unreal Engine 5', software: 'Unreal Engine', students: '18k',
    description: 'Make your architectural design look like an interactive high-end AAA video game.',
    imageUrl: 'https://lh3.googleusercontent.com/d/14EfKoC7BfxXmYxd6t6qIE470yQaX0toW=w400-rw',
    learningPoints: ['Lumen dynamic global illumination', 'Nanite virtualized geometry', 'Interactive playable walkthrough package'],
    workflowImpact: 'Let clients walk inside their future home with a controller.'
  },
  {
    id: '12', title: 'Post Production', software: 'Photoshop', students: '72k',
    description: 'Add real skies, lighting glow, birds, and people to elevate renders to magazine quality.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1FkzIhdu7K5JeRFq7BM1wGV5MND_fLMKe=w400-rw',
    learningPoints: ['Color grading and depth of field tricks', 'Seamless entourage blending', 'Make average renders look award-winning'],
    workflowImpact: 'Turn standard 3D into high-end architectural photography.'
  }
];
