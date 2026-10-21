import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nextOfferEnd } from '@/lib/config';

export const MUSIC_BANNER_IMAGE = '/images/banner-music.png';

function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, nextOfferEnd() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, nextOfferEnd() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(left / 1000);
  return [
    { v: Math.floor(s / 86400), l: 'Day' },
    { v: Math.floor((s % 86400) / 3600), l: 'Hrs' },
    { v: Math.floor((s % 3600) / 60), l: 'Min' },
    { v: s % 60, l: 'Sec' },
  ];
}

export default function MusicBanner() {
  const time = useCountdown();
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="overflow-hidden rounded-[28px] bg-[#F3F5FA]">
        <div className="grid items-center md:grid-cols-2">
          {/* image first on phones so it reads as a banner */}
          <div className="order-1 px-6 pt-6 md:order-2 md:p-8">
            <img
              src={MUSIC_BANNER_IMAGE}
              alt="Silver over-ear headphones"
              loading="lazy"
              className="mx-auto aspect-[5/4] w-full max-w-md object-contain drop-shadow-[0_24px_24px_rgba(24,24,27,0.14)] md:aspect-square"
            />
          </div>

          <div className="order-2 p-6 pt-2 md:order-1 md:p-12">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[9px] font-extrabold text-white">GK</span>
              <span className="text-xs font-semibold text-zinc-600">GK Gadgets Lux</span>
            </div>
            <h2 className="mt-3 font-heading text-[1.75rem] font-extrabold leading-[1.1] text-zinc-900 md:text-4xl">
              Enhance your music experience
            </h2>

            <div className="mt-5 flex gap-2.5" role="timer" aria-label="Offer ends in">
              {time.map((t) => (
                <div key={t.l} className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white shadow-sm">
                  <div className="text-center leading-none">
                    <p className="font-heading text-[15px] font-bold tabular-nums text-zinc-900">{String(t.v).padStart(2, '0')}</p>
                    <p className="mt-1 text-[9px] text-zinc-500">{t.l}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/shop/headphones"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 font-heading text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.97]"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
