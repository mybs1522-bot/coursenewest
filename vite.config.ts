import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function sendAccessPlugin(env: Record<string, string>) {
  return {
    name: 'send-access-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/send-access' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk: any) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = bodyStr ? JSON.parse(bodyStr) : {};
              const { name, email } = body;
              if (!email || !email.includes('@')) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'A valid email is required.' }));
                return;
              }

              const studentName = (name || '').trim() || 'Creator';
              const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
              const FROM_EMAIL = env.FROM_EMAIL || process.env.FROM_EMAIL || 'Avada Courses <onboarding@resend.dev>';
              const DRIVE_LINK = env.COURSE_ACCESS_LINK || process.env.COURSE_ACCESS_LINK || 'https://files.leadsdocker.com';
              const WHATSAPP_NUMBER = '+91 91987 47810';

              if (!RESEND_API_KEY) {
                console.log('\n[Dev Server] Simulated Course Access Email Sent:');
                console.log(`- To: ${email} (${studentName})`);
                console.log(`- Course Link: ${DRIVE_LINK}`);
                console.log('- Note: Set RESEND_API_KEY in .env to deliver live emails via Resend.\n');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  simulated: true,
                  message: 'Simulated email sent in dev mode. Set RESEND_API_KEY in .env to send live emails.',
                  recipient: email,
                  studentName,
                  courseLink: DRIVE_LINK
                }));
                return;
              }

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
</html>`;

              const resendRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${RESEND_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: FROM_EMAIL,
                  to: email,
                  subject: 'Your Free Course Access Link 🚀 — Avada Architecture & Design',
                  html,
                }),
              });

              const data = await resendRes.json();
              res.statusCode = resendRes.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: resendRes.ok,
                emailId: data.id,
                details: data
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 4000,
        host: '0.0.0.0',
      },
      plugins: [react(), sendAccessPlugin(env)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
