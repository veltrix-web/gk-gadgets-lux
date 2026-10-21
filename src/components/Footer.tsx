import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Logo from './Logo';
import { BRAND, whatsappLink } from '@/lib/config';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/shop' },
      { label: 'Earbuds', to: '/shop/earbuds' },
      { label: 'Headphones', to: '/shop/headphones' },
      { label: 'Smart Watches', to: '/shop/watches' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Track Order', to: '/track' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Shipping', to: '/policies#shipping' },
      { label: 'Returns & Refund', to: '/policies#returns' },
      { label: 'Privacy', to: '/policies#privacy' },
      { label: 'Terms', to: '/policies#terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      {/* Trust bar */}
      <div className="border-b border-zinc-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, text: '6 Months Warranty' },
            { icon: RefreshCw, text: '7-Day Replacement' },
            { icon: Truck, text: 'Free Shipping Across India' },
          ].map((t) => (
            <div key={t.text} className="flex items-center justify-center gap-2.5 text-sm font-semibold text-zinc-700">
              <t.icon className="h-5 w-5 text-zinc-900" />
              {t.text}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              {BRAND.tagline} A Delhi-based store bringing you premium wireless earbuds, headphones and smart watches at honest prices.
            </p>
            <div className="mt-5 space-y-2.5 text-sm text-zinc-600">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-zinc-900" />
                {BRAND.location}
              </div>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 transition hover:text-zinc-900">
                <Mail className="h-4 w-4 text-zinc-900" />
                {BRAND.email}
              </a>
              <a
                href={whatsappLink('Hi GK Gadgets Lux! I have a question.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-zinc-900"
              >
                <MessageCircle className="h-4 w-4 text-zinc-700" />
                WhatsApp Support
              </a>
            </div>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200"
            >
              <Instagram className="h-4 w-4" /> @gkgadgets
            </a>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm font-bold text-zinc-900">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-zinc-500 transition hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment + copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['UPI', 'VISA', 'Mastercard', 'COD'].map((p) => (
              <span
                key={p}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-600"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
