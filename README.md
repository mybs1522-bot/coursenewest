<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1J2SNpY2Gy-pRp21kAQdGe6Gy5gD0XYhP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Stripe live checkout (embedded on-site)

Use this when you want users to pay directly inside the modal (no redirect to Stripe Checkout page).

1. Create local env from `.env.example` and set:
   - `VITE_STRIPE_PUBLISHABLE_KEY` = your `pk_live_...`
   - `VITE_STRIPE_BACKEND_URL` = your deployed function URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
2. In Supabase project secrets, set:
   - `STRIPE_SECRET_KEY` = your `sk_live_...`
   - `CHECKOUT_ORIGIN` = your site origin (for CORS), e.g. `https://yourdomain.com`
3. Deploy function:
   - `supabase functions deploy stripe-create-payment-intent --no-verify-jwt`
4. Restart frontend and test a real card payment.

The function is in `supabase/functions/stripe-create-payment-intent/index.ts` and always charges a fixed `$49 USD` amount server-side.
