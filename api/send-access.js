// Vercel serverless function / Node.js handler for sending free course access emails via Resend

export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const studentName = (name || '').trim() || 'Creator';
    const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
    const FROM_EMAIL = process.env.FROM_EMAIL || 'Avada Courses <onboarding@resend.dev>';
    const DRIVE_LINK = process.env.COURSE_ACCESS_LINK || 'https://files.leadsdocker.com';
    const WHATSAPP_NUMBER = '+91 91987 47810';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#18181b;border:1px solid #27272a;border-radius:24px;padding:36px;text-align:left;">
      <div style="display:inline-block;background:#000;border:1px solid #3f3f46;border-radius:10px;padding:6px 14px;font-weight:900;font-size:13px;color:#ffffff;letter-spacing:1px;margin-bottom:24px;">
        AVADA DESIGN & ARCHITECTURE
      </div>
      
      <h1 style="color:#ffffff;margin:0 0 16px;font-size:26px;font-weight:900;line-height:1.2;">
        Your Free Course Access is Ready! 🚀
      </h1>
      
      <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 20px;">
        Hi <strong>${studentName}</strong>, thank you for enrolling in the <strong>Avada Global Architecture & Interior Design Collection</strong>. You now have complete lifetime access to all 12 courses, asset libraries, and software workflows.
      </p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${DRIVE_LINK}" target="_blank" style="display:inline-block;background:#10b981;color:#000000;text-decoration:none;padding:16px 36px;border-radius:14px;font-weight:900;font-size:16px;box-shadow:0 10px 25px -5px rgba(16,185,129,0.4);">
          Open Your Course Materials
        </a>
      </div>

      <div style="background:#09090b;border:1px solid #27272a;border-radius:16px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 8px;color:#71717a;font-size:12px;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">What's Included in your access</p>
        <ul style="margin:0;padding-left:18px;color:#d4d4d8;font-size:13px;line-height:1.8;">
          <li>All 12 Core Video Courses (AutoCAD, Revit, SketchUp, 3ds Max, V-Ray, AI Pipelines & more)</li>
          <li>High-Resolution Architectural Assets & 3D Model Libraries</li>
          <li>Direct Instructor Support & Freelance Client Workflow Templates</li>
        </ul>
      </div>

      <div style="border-top:1px solid #27272a;padding-top:20px;margin-top:24px;">
        <p style="margin:0 0 6px;color:#a1a1aa;font-size:13px;">Need assistance getting started?</p>
        <p style="margin:0;font-size:13px;">
          Reach out on WhatsApp: <a href="https://wa.me/919198747810" style="color:#10b981;text-decoration:none;font-weight:700;">${WHATSAPP_NUMBER}</a>
        </p>
      </div>
    </div>

    <p style="text-align:center;color:#52525b;font-size:12px;margin-top:24px;">
      © 2026 AVADA Design & Architecture. All rights reserved.
    </p>
  </div>
</body>
</html>
    `;

    if (!RESEND_API_KEY) {
      console.warn('[Resend API] No RESEND_API_KEY configured. Mocking successful delivery for development.');
      return res.status(200).json({
        success: true,
        simulated: true,
        message: 'Resend API key not configured yet. Lead recorded successfully (simulated email delivery).',
        recipient: email,
        studentName,
        courseLink: DRIVE_LINK
      });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: `Your Free Course Access Link 🚀 — Avada Architecture & Design`,
        html,
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      console.error('[Resend Error]', data);
      return res.status(resendRes.status).json({
        error: data.message || 'Failed to send email via Resend',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      emailId: data.id,
      recipient: email
    });
  } catch (err) {
    console.error('[Send Access Error]', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
