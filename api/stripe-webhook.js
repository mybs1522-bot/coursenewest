const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Avada Design <onboarding@resend.dev>';
const DRIVE_LINK = 'https://drive.google.com/drive/folders/1CCyv9u82HiYI8jnyULISfBoGMcbcqd9U?usp=drive_link';
const WHATSAPP_NUMBER = '+91 91987 47810';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    let email = '';
    let name = '';
    let orderId = '';

    if (event && event.type === 'checkout.session.completed') {
      const s = event.data && event.data.object;
      email = (s && s.customer_details && s.customer_details.email) || (s && s.customer_email) || '';
      name = (s && s.customer_details && s.customer_details.name) || '';
      orderId = (s && s.id) || '';
    } else if (event && event.type === 'payment_intent.succeeded') {
      const p = event.data && event.data.object;
      email = (p && p.receipt_email) || (p && p.metadata && p.metadata.email) || '';
      name = (p && p.metadata && p.metadata.name) || '';
      orderId = (p && p.id) || '';
    }

    if (!email) {
      return res.status(200).json({ received: true, note: 'No email found' });
    }

    const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#09090b;color:#fff;padding:36px;border-radius:24px;">
      <div style="display:inline-block;background:#000;border:1px solid #3f3f46;border-radius:12px;padding:8px 16px;font-weight:900;font-size:14px;color:#fff;margin-bottom:20px;">AVADA DESIGN</div>
      <h1 style="color:#fff;margin:0 0 12px;font-size:24px;font-weight:900;">Your Order is Confirmed! 🚁</h1>
      <p style="color:#a1a1aa;font-size:15px;line-height:1.6;">Hi ${name || 'there'}, thank you for enrolling in the <strong>Avada Architecture & Interior Design 12-Course Bundle</strong>. Your instant access is ready below:</p>
      <a href="${DRIVE_LINK}" style="display:inline-block;background:#00D66F;color:#000;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:900;font-size:16px;margin:15px 0 25px;">👀 Open Google Drive Course Folder</a>
      <div style="background:#1818b;border:1px solid #27272a;border-radius:12px;padding:16px;text-align:left;">
        <p style="margin:0;color:#71717a;font-size:12px;">Order ID: ${orderId}</p>
        <p style="margin:4px 0 0;color:#71717a;font-size:12px;">WhatsApp Support: ${WHATSAPP_NUMBER}</p>
      </div>
    </div>
    <p style="text-align:center;color:#52525b;font-size:12px;margin-top:24px;">© 2026 Avada Design & Architecture. All rights reserved.</p>
  </div>
</body>
</html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to Avada Design! Your Course Access Link 🚁',
        html,
      }),
    });

    const data = await resendRes.json();
    return res.status(200).json({ received: true, emailSent: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
