import { Link } from 'react-router-dom';

export const ECOSYSTEM_BANNER_IMAGE = '/images/banner-devices.png';

export default function EcosystemBanner() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="overflow-hidden rounded-[28px] bg-surface">
        <div className="grid items-center md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="p-6 pb-2 md:p-12">
            <p className="text-xs font-medium text-zinc-500">Seamless experience</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-extrabold leading-[1.1] text-zinc-900 md:text-4xl">
              Designed to work beautifully together.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
              GK earbuds and smart watches pair in seconds with your Android phone, iPhone, tablet and laptop.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 font-heading text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.97]"
            >
              Explore more
            </Link>
          </div>
          <div className="px-4 pb-5 pt-2 md:p-8">
            <img
              src={ECOSYSTEM_BANNER_IMAGE}
              alt="Earbuds, laptop, tablet and phone together"
              loading="lazy"
              className="mx-auto aspect-[16/10] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
