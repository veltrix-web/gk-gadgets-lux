import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Home, LayoutGrid, Heart, ShoppingBag, ArrowUp, UserRound } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { whatsappLink } from '@/lib/config';

const tabs = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: LayoutGrid, label: 'Shop', to: '/shop' },
  { icon: Heart, label: 'Saved', to: '/wishlist' },
  { icon: ShoppingBag, label: 'Cart', to: '/cart' },
  { icon: UserRound, label: 'Account', to: '/profile' },
];

export default function FloatingButtons() {
  const { itemCount, wishlist } = useStore();
  const [showTop, setShowTop] = useState(false);
  const { pathname } = useLocation();
  const isProductPage = pathname.startsWith('/product/');

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility buttons sit above the dock on phones */}
      <div className={`fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] right-4 z-40 flex flex-col items-end gap-2.5 lg:bottom-6 lg:right-6 ${isProductPage ? 'max-lg:hidden' : ''}`}>
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-800 shadow-dock ring-1 ring-zinc-200"
              aria-label="Back to top"
            >
              <ArrowUp className="h-[18px] w-[18px]" />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href={whatsappLink('Hi GK Gadgets Lux! I have a question about a product.')}
          target="_blank" rel="noopener noreferrer"
          className="grid h-12 w-12 place-items-center rounded-full bg-zinc-900 text-white shadow-dock transition active:scale-95 lg:h-14 lg:w-14"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
      </div>

      {/* Floating dock: inset from left, right and bottom, rounded, active tab highlighted */}
      {!isProductPage && (
        <nav aria-label="Primary" className="safe-bottom-dock fixed inset-x-4 z-50 lg:hidden">
          <div className="glass mx-auto flex max-w-md items-center gap-1 rounded-full border border-zinc-200/70 p-1.5 shadow-dock">
            {tabs.map((t) => {
              const active = t.to === '/' ? pathname === '/' : pathname.startsWith(t.to);
              const badge = t.label === 'Cart' ? itemCount : t.label === 'Saved' ? wishlist.length : 0;
              return (
                <Link
                  key={t.to} to={t.to} aria-current={active ? 'page' : undefined}
                  className={`relative flex h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full transition-colors ${active ? 'text-white' : 'text-zinc-500'}`}
                >
                  {active && (
                    <motion.span layoutId="dockActive" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-full bg-zinc-900" />
                  )}
                  <span className="relative">
                    <t.icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                    {badge > 0 && (
                      <span className={`absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white ring-2 ${active ? 'bg-accent ring-zinc-900' : 'bg-accent ring-white'}`}>
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className="relative text-[10px] font-medium leading-none">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
