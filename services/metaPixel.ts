// Meta Pixel & Conversions API (CAPI) Service

export const META_PIXEL_ID = '2262254584551462';
export const META_CAPI_ACCESS_TOKEN =
  'EAADE6Lnxf9MBSSjm6yLZCVdau5Kf2XjZCtvUjdp2AHDHT76Ix7vaassyCgdpmLfoZC19z5X7ZCOqNbcpEKrPIT793Q6ZBEvTX8UM1AWZCZAlPom3ayD966SZCjeWwLg84dleZALVDReqmqmNrOqvhT8sGOSQvqy1gX5CcIMsfgqn2VPyFs353gYZBxA7mSyZBbZAAkRI2AZDZD';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __meta_pixel_initialized?: boolean;
  }
}

// SHA-256 Hashing for CAPI User Data Normalization
const hashString = async (input?: string): Promise<string | undefined> => {
  if (!input) return undefined;
  const str = input.trim().toLowerCase();
  if (!str) return undefined;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return undefined;
  }
};

// Cookie helper
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : undefined;
};

// Unique Event ID generator for deduplication between Pixel and CAPI
export const generateEventId = (prefix = 'evt'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export interface UserData {
  email?: string;
  phone?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface CustomData {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
  value?: number;
  currency?: string;
  num_items?: number;
  status?: boolean | string;
  method?: string;
  [key: string]: any;
}

// Send event to Meta Conversions API (CAPI)
const sendToCAPI = async (
  eventName: string,
  eventId: string,
  customData?: CustomData,
  userData?: UserData
) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    let fn = userData?.firstName;
    let ln = userData?.lastName;
    if (!fn && userData?.name) {
      const parts = userData.name.trim().split(' ');
      fn = parts[0];
      if (parts.length > 1) {
        ln = parts.slice(1).join(' ');
      }
    }

    const hashedEm = await hashString(userData?.email);
    const hashedPh = await hashString(userData?.phone);
    const hashedFn = await hashString(fn);
    const hashedLn = await hashString(ln);

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: timestamp,
          event_id: eventId,
          event_source_url: typeof window !== 'undefined' ? window.location.href : '',
          action_source: 'website',
          user_data: {
            em: hashedEm ? [hashedEm] : undefined,
            ph: hashedPh ? [hashedPh] : undefined,
            fn: hashedFn ? [hashedFn] : undefined,
            ln: hashedLn ? [hashedLn] : undefined,
            fbp: fbp || undefined,
            fbc: fbc || undefined,
            client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          },
          custom_data: customData || {},
        },
      ],
    };

    const endpoint = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
      META_CAPI_ACCESS_TOKEN
    )}`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Non-blocking network errors
    });
  } catch {
    // Fail silently without breaking user experience
  }
};

// Core Event Dispatcher
export const trackMetaEvent = (
  eventName: string,
  customData?: CustomData,
  userData?: UserData,
  existingEventId?: string
): string => {
  const eventId = existingEventId || generateEventId(eventName.toLowerCase());

  // 1. Browser Pixel tracking (with eventID for deduplication)
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (customData) {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } else {
      window.fbq('track', eventName, {}, { eventID: eventId });
    }
  }

  // 2. Server CAPI tracking
  sendToCAPI(eventName, eventId, customData, userData);

  return eventId;
};

// Standard Events
export const trackPageView = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent('PageView', customData, userData);

export const trackViewContent = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'ViewContent',
    {
      content_name: 'Avada 12-Course Architecture & Design Bundle',
      content_category: 'Architecture & 3D Design Education',
      value: 49,
      currency: 'USD',
      ...customData,
    },
    userData
  );

export const trackInitiateCheckout = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'InitiateCheckout',
    {
      content_name: 'Avada 12-Course Architecture & Design Bundle',
      value: 49,
      currency: 'USD',
      num_items: 12,
      ...customData,
    },
    userData
  );

export const trackAddToCart = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'AddToCart',
    {
      content_name: 'Avada Architecture Course Bundle',
      value: 49,
      currency: 'USD',
      ...customData,
    },
    userData
  );

export const trackLead = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'Lead',
    {
      content_name: 'Avada Course Student Lead',
      value: 49,
      currency: 'USD',
      ...customData,
    },
    userData
  );

export const trackAddPaymentInfo = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'AddPaymentInfo',
    {
      content_name: 'Avada 12-Course Architecture & Design Bundle',
      value: 49,
      currency: 'USD',
      ...customData,
    },
    userData
  );

export const trackPurchase = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'Purchase',
    {
      content_name: 'Avada 12-Course Architecture & Design Bundle',
      value: 49,
      currency: 'USD',
      ...customData,
    },
    userData
  );

export const trackCompleteRegistration = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'CompleteRegistration',
    {
      content_name: 'Avada Student Access',
      status: true,
      ...customData,
    },
    userData
  );

export const trackContact = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent(
    'Contact',
    {
      method: 'WhatsApp',
      content_name: 'WhatsApp Support',
      ...customData,
    },
    userData
  );

export const trackSubmitApplication = (customData?: CustomData, userData?: UserData) =>
  trackMetaEvent('SubmitApplication', customData, userData);
