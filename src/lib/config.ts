export const BRAND = {
  name: 'GK Gadgets Lux',
  tagline: 'Premium Technology. Honest Pricing. Trusted Experience.',
  location: 'Delhi, India',
  email: 'support@gkgadgets.in',
  instagram: 'https://instagram.com/gkgadgets',
  currency: 'INR',
} as const;

export const WHATSAPP_NUMBER = '919310515177';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const COUPONS: Record<string, number> = {
  GK10: 10,
  WELCOME5: 5,
};

export const FAQS = [
  {
    q: 'Do you check every product before shipping?',
    a: 'Yes. Every earbud, headphone and watch is unboxed, tested and repacked by our Delhi team before it ships to you. Nothing leaves our store without a full quality check.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'All products come with a 6-month warranty against manufacturing defects. If something stops working on its own within that period, we repair or replace it for free.',
  },
  {
    q: 'How does the 7-day replacement work?',
    a: 'If your product arrives damaged or has a manufacturing fault, contact us on WhatsApp within 7 days with a photo. We arrange a pickup and send a replacement at no cost to you.',
  },
  {
    q: 'Is Cash on Delivery available?',
    a: 'Yes, COD is available across India for orders below ₹5,000. You pay only when the product reaches your door.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Metro cities receive orders in 2-4 business days. The rest of India takes 4-7 business days. You get a tracking link as soon as your order ships.',
  },
  {
    q: 'How do I book a free live video demo?',
    a: 'Tap any "Book Video Demo" button or message us on WhatsApp. Tell us which product you are interested in and we set up a live video call so you can see the real product before you buy.',
  },
];

export const SAMPLE_STATS = {
  ordersDelivered: '12,000+',
  avgRating: '4.9',
  pinCodesServed: '19,000+',
  warrantyMonths: '6',
};

export const SAMPLE_REVIEWS = [
  {
    name: 'Rahul Verma',
    location: 'New Delhi',
    rating: 5,
    text: 'The Pro 2 earbuds sound better than my old branded pair that cost 4x more. Booking a video demo first made me trust the store. Delivery was fast and COD worked perfectly.',
    product: 'Pro 2 Wireless Earbuds',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'I was unsure about buying online, but the WhatsApp video demo showed me the real watch. The Series 11 is gorgeous and the battery lasts a full week. Very happy.',
    product: 'Series 11 Style Smartwatch',
  },
  {
    name: 'Arjun Mehta',
    location: 'Bengaluru',
    rating: 5,
    text: 'Max Over-Ear headphones are worth every rupee. Noise cancellation is real, bass is clean. Replacement was instant when my first unit had a small issue.',
    product: 'Max Over-Ear ANC Headphones',
  },
  {
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    rating: 4,
    text: 'Bought the Lite Earbuds for daily use. Great value for ₹799. Sound is clear and the case is compact. Packaging was premium too.',
    product: 'Lite Earbuds',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'Honest pricing and honest people. I asked about a cheaper watch and they told me which one fits my need instead of upselling. That trust matters.',
    product: 'Fit Active Watch',
  },
];

// Countdown on the "Enhance your music experience" banner.
// Rolls over automatically every OFFER_CYCLE_DAYS so it never shows a dead timer.
export const OFFER_CYCLE_DAYS = 15;
export function nextOfferEnd(now: number = Date.now()): number {
  const cycle = OFFER_CYCLE_DAYS * 24 * 60 * 60 * 1000;
  const epoch = Date.UTC(2026, 0, 1);
  return epoch + (Math.floor((now - epoch) / cycle) + 1) * cycle;
}
