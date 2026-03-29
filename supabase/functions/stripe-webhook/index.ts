// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_R1jB8rP4_HDCbfxGVfXpUiaYECp3dELhC';
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
const FROM_EMAIL = 'AVADA Courses <noreply@avada.in>';
const DRIVE_LINK = 'https://drive.google.com/drive/folders/1CCyv9u82HiYI8jnyULISfBoGMcbcqd9U?usp=drive_link';
const WHATSAPP_NUMBER = '+91 91987 47810';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

async function sendAccessEmail(email: string, paymentId: string, name?: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to AVADA Courses! 🎉 Your Order is Confirmed',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#059669,#10b981);border-radius:16px;padding:40px;text-align:center;margin-bottom:24px;">
      <h1 style="color:white;margin:0;font-size:28px;font-weight:800;">Welcome to AVADA Courses!</h1>
    </div>
    
    <div style="background:white;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">Hi ${name || 'there'},</p>
      
      <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.7;">
        Thank you for choosing AVADA. Your journey to mastering design through our curated courses collection starts now!
      </p>
      
      <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">
        Your order for the <strong style="color:#111827;">Global Design Course Collection</strong> has been confirmed. You can download all your books and resources via the Google Drive link below:
      </p>
      
      <a href="${DRIVE_LINK}" style="display:block;background:linear-gradient(135deg,#059669,#10b981);color:white;text-decoration:none;padding:18px 32px;border-radius:12px;font-weight:700;text-align:center;font-size:16px;margin-bottom:24px;">
        Access Your Course Collection
      </a>
      
      <div style="background:#f3f4f6;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="margin:0;color:#6b7280;font-size:14px;">Order Reference</p>
        <p style="margin:4px 0 0;color:#111827;font-weight:600;font-size:14px;word-break:break-all;">${paymentId}</p>
      </div>
      
      <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
        <p style="margin:0 0 8px;color:#111827;font-size:15px;font-weight:600;">Need help or have questions?</p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:14px;line-height:1.6;">
          Feel free to reach out to us anytime via WhatsApp for instant support:
        </p>
        <a href="https://wa.me/919198747810" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">
          💬 ${WHATSAPP_NUMBER} (WhatsApp)
        </a>
      </div>
    </div>
    
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
      © 2024 AVADA Courses. All rights reserved.
    </p>
  </div>
</body>
</html>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    // For production, verify webhook signature
    // const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    
    const event = JSON.parse(body);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Try multiple sources for the email
      let email = paymentIntent.receipt_email || paymentIntent.metadata?.email;
      const name = paymentIntent.metadata?.name;
      
      if (!email && paymentIntent.charges?.data?.[0]?.billing_details?.email) {
        email = paymentIntent.charges.data[0].billing_details.email;
      }
      
      if (email) {
        await sendAccessEmail(email, paymentIntent.id, name);
        console.log(`Access email sent to ${email} (Name: ${name || 'N/A'}) for payment ${paymentIntent.id}`);
      } else {
        console.warn('No email found in payment intent or charges:', paymentIntent.id);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
