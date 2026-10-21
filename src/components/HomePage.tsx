import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, RefreshCw, Truck, Wallet, MessageCircle, Video, Wrench, Tag, CheckCircle2 } from 'lucide-react';
import { whatsappLink, FAQS, SAMPLE_STATS, SAMPLE_REVIEWS } from '@/lib/config';
import { products, CATEGORY_LABELS, type Category } from '@/data/products';
import Hero from './Hero';
import MusicBanner from './MusicBanner';
import EcosystemBanner from './EcosystemBanner';
import ProductCard from './ProductCard';
import SmartImage from './SmartImage';
import StarRating from './StarRating';

const IMG = {
  earbuds: 'https://images.pexels.com/photos/3921864/pexels-photo-3921864.jpeg?auto=compress&cs=tinysrgb&h=900&w=900',
  headphones: 'https://images.pexels.com/photos/9058883/pexels-photo-9058883.jpeg?auto=compress&cs=tinysrgb&h=700&w=700',
  watches: 'https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&h=700&w=700',
  demo: 'https://images.pexels.com/photos/374859/pexels-photo-374859.jpeg?auto=compress&cs=tinysrgb&h=500&w=900',
};

const trust = [
  { icon: ShieldCheck, label: '6 months warranty' },
  { icon: RefreshCw, label: '7-day replacement' },
  { icon: Truck, label: 'Free shipping' },
  { icon: Wallet, label: 'COD available' },
];

const why = [
  { icon: Wrench, title: 'Tested before shipping', text: 'Every unit is unboxed and checked by our Delhi team.' },
  { icon: Tag, title: 'Honest pricing', text: 'No inflated MRP games. A fair price for what you get.' },
  { icon: Video, title: 'See it before you buy', text: 'Free WhatsApp video demo of the real product.' },
  { icon: MessageCircle, title: 'Real people, fast replies', text: 'Support that answers in minutes, before and after your order.' },
];

const count = (c: Category) => products.filter((p) => p.category === c).length;

export default function HomePage() {
  const bestSellers = products.filter((p) => p.tags.includes('bestseller')).slice(0, 4);
  const newArrivals = products.filter((p) => p.tags.includes('new')).slice(0, 4);
  const under1000 = products.filter((p) => p.price < 1000).length;

  return (
    <div className="space-y-10 pb-6 md:space-y-16">
      <Hero />

      {/* Trust: one horizontal row, no scrollbar */}
      <section className="-mt-4 md:-mt-8">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 md:justify-center">
          {trust.map((t) => (
            <div key={t.label} className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-2 text-xs font-medium text-zinc-700">
              <t.icon className="h-4 w-4 text-zinc-900" /> {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* BENTO CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-28 px-4">
        <Heading title="Shop by category" />
        <div className="mt-4 grid grid-cols-2 auto-rows-[9.5rem] gap-2.5 sm:auto-rows-[12rem] md:gap-3 lg:grid-cols-4 lg:auto-rows-[13.5rem]">
          <Tile to="/shop/earbuds" image={IMG.earbuds} title={CATEGORY_LABELS.earbuds} meta={`${count('earbuds')} products`} blurb="True wireless, all-day battery" className="row-span-2 lg:col-span-2" large />
          <Tile to="/shop/headphones" image={IMG.headphones} title={CATEGORY_LABELS.headphones} meta={`${count('headphones')} products`} />
          <Tile to="/shop/watches" image={IMG.watches} title={CATEGORY_LABELS.watches} meta={`${count('watches')} products`} />

          <Link to="/shop?sort=new" className="group flex flex-col justify-between rounded-3xl bg-surface p-4 transition active:scale-[0.98]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-zinc-900 shadow-sm"><ArrowUpRight className="h-4 w-4" /></span>
            <div>
              <p className="font-heading text-base font-bold text-zinc-900">New arrivals</p>
              <p className="mt-0.5 text-xs text-zinc-500">{products.filter((p) => p.tags.includes('new')).length} just landed</p>
            </div>
          </Link>
          <Link to="/shop?max=1000" className="group flex flex-col justify-between rounded-3xl bg-zinc-900 p-4 transition active:scale-[0.98]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"><ArrowUpRight className="h-4 w-4" /></span>
            <div>
              <p className="font-heading text-base font-bold text-white">Under ₹1,000</p>
              <p className="mt-0.5 text-xs text-zinc-400">{under1000} picks</p>
            </div>
          </Link>

          <a
            href={whatsappLink('Hi! I would like to book a free live video demo. Please tell me which products I can see on video.')}
            target="_blank" rel="noopener noreferrer"
            className="relative col-span-2 flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-[#176b45] p-5 text-white transition active:scale-[0.99] lg:col-span-4"
          >
            <div className="relative z-10">
              <p className="font-heading text-base font-bold sm:text-lg">See it live before you buy</p>
              <p className="mt-1 max-w-xs text-xs text-white/85">Free WhatsApp video demo of the real product. No obligation.</p>
            </div>
            <span className="relative z-10 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-bold text-zinc-900">
              <MessageCircle className="h-4 w-4" /> Book demo
            </span>
          </a>
        </div>
      </section>

      {/* BANNER 3 (top of page) */}
      <MusicBanner />

      <ProductSection title="Best sellers" items={bestSellers} />

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4">
        <Heading title="Why people choose us" />
        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {why.map((v) => (
            <div key={v.title} className="rounded-3xl bg-surface p-4 md:p-5">
              <v.icon className="h-5 w-5 text-zinc-900" />
              <h3 className="mt-3 font-heading text-sm font-bold text-zinc-900">{v.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-4 divide-x divide-zinc-200 rounded-3xl border border-zinc-200 py-4 text-center md:mt-3">
          <Stat value={SAMPLE_STATS.ordersDelivered} label="Orders" />
          <Stat value={SAMPLE_STATS.avgRating} label="Rating" />
          <Stat value={SAMPLE_STATS.pinCodesServed} label="Pin codes" />
          <Stat value={`${SAMPLE_STATS.warrantyMonths} mo`} label="Warranty" />
        </div>
      </section>

      <ProductSection title="New arrivals" items={newArrivals} />

      {/* BANNER 2 (lower on page) */}
      <EcosystemBanner />

      {/* Reviews: swipe on phone, grid on desktop */}
      <section>
        <div className="mx-auto max-w-7xl px-4"><Heading title="What customers say" aside={`${SAMPLE_STATS.avgRating} average`} /></div>
        <div className="no-scrollbar mx-auto mt-4 flex max-w-7xl snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:grid md:grid-cols-3 md:overflow-visible">
          {SAMPLE_REVIEWS.slice(0, 6).map((r) => (
            <div key={r.name} className="flex w-[82%] shrink-0 snap-start flex-col rounded-3xl border border-zinc-200 p-5 sm:w-[60%] md:w-auto">
              <StarRating rating={r.rating} size={13} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-700">{r.text}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 font-heading text-xs font-bold text-white">{r.name.charAt(0)}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">{r.name}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-zinc-500"><CheckCircle2 className="h-3 w-3 shrink-0" /> Verified · {r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
          <div className="md:py-4">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">Frequently asked questions</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-600">
              Helpful details about delivery, warranty, replacements and product demos.
            </p>
            <a
              href={whatsappLink('Hi GK Gadgets Lux! I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              <MessageCircle className="h-4 w-4" /> Ask us on WhatsApp
            </a>
          </div>
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-heading text-sm font-semibold leading-relaxed text-zinc-900 sm:text-base">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-zinc-200 text-lg leading-none text-zinc-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl pr-10 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-7 overflow-hidden rounded-3xl bg-zinc-900 px-5 py-7 text-white sm:grid-cols-[1.1fr_0.9fr] sm:items-end sm:px-9 sm:py-9">
          <div>
            <h2 className="max-w-md font-heading text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">Meet your next favorite gadget.</h2>
            <a
              href={whatsappLink('Hi! I would like to join the GK Gadgets Lux WhatsApp broadcast for deals and updates.')}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center gap-3 rounded-full bg-white py-1 pl-4 pr-1 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4 text-[#176b45]" />
              Get updates on WhatsApp
              <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <div className="sm:ml-auto sm:max-w-xs">
            <h3 className="font-heading text-sm font-semibold text-zinc-100">New drops and restocks</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Get first access to new arrivals and deals, right in your WhatsApp. No spam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Heading({ title, aside, to }: { title: string; aside?: string; to?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-heading text-xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">{title}</h2>
      {to && (
        <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-zinc-700 hover:text-zinc-900">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      {aside && <span className="text-sm text-zinc-500">{aside}</span>}
    </div>
  );
}

function ProductSection({ title, items }: { title: string; items: typeof products }) {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <Heading title={title} to="/shop" />
      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-base font-extrabold text-zinc-900 md:text-xl">{value}</p>
      <p className="mt-0.5 text-[11px] text-zinc-500">{label}</p>
    </div>
  );
}

function Tile({ to, image, title, meta, blurb, className = '', large = false }: {
  to: string; image: string; title: string; meta: string; blurb?: string; className?: string; large?: boolean;
}) {
  return (
    <Link to={to} className={`group relative block overflow-hidden rounded-3xl bg-zinc-200 transition active:scale-[0.98] ${className}`}>
      <SmartImage src={image} alt={title} className="absolute inset-0 h-full w-full transition-transform duration-700 lg:group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className={`font-heading font-bold text-white ${large ? 'text-xl md:text-2xl' : 'text-base'}`}>{title}</h3>
          <p className="mt-0.5 truncate text-xs text-white/75">{blurb ? `${meta} · ${blurb}` : meta}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-zinc-900"><ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}
