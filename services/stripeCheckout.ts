import { trackInitiateCheckout } from './metaPixel';

export const STRIPE_CHECKOUT_URL = (
  import.meta.env.VITE_STRIPE_PAYMENT_LINK ||
  import.meta.env.VITE_STRIPE_CHECKOUT_URL ||
  'https://buy.stripe.com/'
).trim();

export const redirectToStripeCheckout = () => {
  trackInitiateCheckout();
  window.location.href = STRIPE_CHECKOUT_URL;
};
