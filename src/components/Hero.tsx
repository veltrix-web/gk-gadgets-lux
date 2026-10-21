import { motion } from 'framer-motion';
import { motionSafe } from '@/lib/motion';

export const HERO_IMAGE = '/images/hero-headphone.png';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-3 pt-2 sm:px-4 sm:pt-4">
      <div className="hero-card relative h-[470px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#e4e4e7] via-[#efeff1] to-[#f7f7f8] sm:h-[560px] md:h-[600px] lg:h-[580px] xl:h-[600px]">
        {/* soft light from top right */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/70 blur-3xl" />

        {/* Ghost word behind the product */}
        <div
          aria-hidden
          className="hero-ghost pointer-events-none absolute inset-x-0 top-[47%] -translate-y-1/2 select-none text-center font-heading font-extrabold tracking-tight text-white"
        >
          HEADPHONE
        </div>

        {/* Text block */}
        <div className="relative z-20 px-6 pt-8 sm:px-10 sm:pt-12 lg:px-16 lg:pt-20">
          <motion.p
            {...motionSafe({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.5 }}
            className="font-heading text-base font-medium text-zinc-800 sm:text-lg lg:text-xl"
          >
            GK Gadgets Lux
          </motion.p>
          <motion.h1
            {...motionSafe({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-1 font-heading text-[2.5rem] font-extrabold leading-none tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl"
          >
            Wireless
          </motion.h1>
        </div>

        {/* Product with soft floor shadows */}
        <div className="pointer-events-none absolute left-1/2 top-[29%] z-10 w-[62%] -translate-x-1/2 sm:top-[22%] sm:w-[52%] md:w-[44%] lg:top-[12%] lg:w-[38%]">
          <div className="float-slow">
            <img
              src={HERO_IMAGE}
              alt="Wireless over-ear headphones"
              loading="eager"
              className="relative aspect-square w-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.18)]"
            />
          </div>
          <div className="shadow-pulse mx-auto -mt-4 h-5 w-[70%] rounded-[50%] bg-zinc-900/30 blur-xl" />
        </div>

        {/* Bottom row: CTA left, description right */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 px-6 pb-7 sm:px-10 sm:pb-10 md:flex md:flex-row md:justify-between lg:px-16 lg:pb-14">
          <motion.a
            {...motionSafe({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#categories"
            className="order-2 inline-flex h-11 w-fit items-center justify-center justify-self-end whitespace-nowrap rounded-full bg-accent px-4 font-heading text-xs font-semibold text-white shadow-[0_10px_24px_rgba(229,56,59,0.35)] transition hover:bg-accent-dark active:scale-[0.97] md:order-1 md:h-12 md:px-7 md:text-sm"
          >
            Shop by category
          </motion.a>
          <div className="order-1 max-w-[16rem] text-left md:order-2 lg:text-right">
            <p className="font-heading text-xs font-bold text-zinc-900">Description</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600">
              Headphones, earbuds and smart watches at honest prices. 6-month warranty and free shipping across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
