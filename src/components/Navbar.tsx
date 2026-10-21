import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle, ChevronRight, ArrowLeft, ArrowUpRight, UserRound } from 'lucide-react';
import Logo from './Logo';
import SmartImage from './SmartImage';
import { useStore } from '@/store/StoreContext';
import { whatsappLink } from '@/lib/config';
import { products } from '@/data/products';
import { formatINR } from '@/lib/utils';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Earbuds', to: '/shop/earbuds' },
  { label: 'Headphones', to: '/shop/headphones' },
  { label: 'Watches', to: '/shop/watches' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const popular = ['Earbuds', 'Headphones', 'Smart watch', 'ANC'];

export default function Navbar() {
  const { itemCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, searchOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.category.includes(q)).slice(0, 6)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    closeSearch();
  };
  const closeSearch = () => { setSearchOpen(false); setQuery(''); };

  return (
    <>
      {/* Desktop-only info strip */}
      <div className="hidden bg-zinc-950 py-2 text-center text-xs text-zinc-300 lg:block">
        6 months warranty · 7-day replacement · Free shipping across India
      </div>

      <header className={`sticky top-0 z-50 safe-top transition-shadow duration-300 ${scrolled ? 'glass shadow-soft' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Row 1 */}
          <div className="flex h-14 items-center justify-between gap-4 lg:h-[68px]">
            <Link to="/" className="shrink-0" aria-label="GK Gadgets Lux home"><Logo /></Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900">
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition hover:bg-zinc-100"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link to="/wishlist" className="relative hidden h-10 w-10 place-items-center rounded-full text-zinc-700 transition hover:bg-zinc-100 lg:grid" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition hover:bg-zinc-100" aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && <span aria-hidden="true" className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{itemCount}</span>}
              </Link>
              <Link
                to="/profile"
                className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition hover:bg-zinc-100 lg:flex lg:w-auto lg:gap-2 lg:px-3"
                aria-label="Sign in"
              >
                <UserRound className="h-5 w-5" />
                <span className="hidden text-sm font-medium lg:inline">Sign in</span>
              </Link>
              <button onClick={() => setDrawerOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 text-zinc-800 lg:hidden" aria-label="Open menu">
                <Menu className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search sheet: full screen on phones, centered card on desktop */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-white lg:bg-zinc-950/20 lg:backdrop-blur-sm"
            onClick={closeSearch}
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="mx-auto flex h-full max-w-2xl flex-col bg-white lg:mt-20 lg:h-auto lg:max-h-[70vh] lg:rounded-3xl lg:shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={submit} className="flex items-center gap-2 px-3 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] lg:pt-3">
                <button type="button" onClick={closeSearch} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100" aria-label="Close search">
                  <ArrowLeft className="h-5 w-5 lg:hidden" /><X className="hidden h-5 w-5 lg:block" />
                </button>
                <div className="flex h-11 flex-1 items-center gap-2.5 rounded-full bg-zinc-100 px-4 transition focus-within:ring-2 focus-within:ring-zinc-300 focus-within:ring-offset-1">
                  <Search className="h-4 w-4 text-zinc-500" />
                  <input
                    ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products" enterKeyHint="search"
                    className="min-w-0 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus-visible:!outline-none"
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery('')} className="grid h-5 w-5 place-items-center rounded-full bg-zinc-300 text-white" aria-label="Clear">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </form>

              <div className="no-scrollbar flex-1 overflow-y-auto px-3 pb-6">
                {!q && (
                  <div className="px-1 pt-2">
                    <p className="text-sm font-semibold text-zinc-900">Popular searches</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {popular.map((t) => (
                        <button key={t} onClick={() => setQuery(t)} className="rounded-full border border-zinc-200 px-3.5 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50">{t}</button>
                      ))}
                    </div>
                  </div>
                )}
                {q && results.length === 0 && (
                  <p className="px-2 py-10 text-center text-sm text-zinc-500">No results for "{query}". Try "earbuds" or "watch".</p>
                )}
                {results.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} onClick={closeSearch} className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-zinc-50 active:bg-zinc-100">
                    <SmartImage src={p.images[0]} alt={p.name} className="h-14 w-14 shrink-0 rounded-xl bg-zinc-100" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-zinc-900">{p.name}</p>
                      <p className="truncate text-xs text-zinc-500">{p.shortDescription}</p>
                    </div>
                    <span className="shrink-0 font-heading text-sm font-bold text-zinc-900">{formatINR(p.price)}</span>
                  </Link>
                ))}
                {q && results.length > 0 && (
                  <button onClick={submit} className="mt-2 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                    See all results for "{query}" <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[84%] max-w-sm flex-col rounded-l-[28px] bg-white lg:hidden"
            >
              <div className="flex items-center justify-between p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))]">
                <Logo />
                <button onClick={() => setDrawerOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 text-zinc-700" aria-label="Close menu"><X className="h-5 w-5" /></button>
              </div>
              <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4">
                {[...navLinks, { label: 'Track order', to: '/track' }, { label: 'FAQ', to: '/faq' }].map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setDrawerOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-zinc-800 active:bg-zinc-100">
                    {l.label}<ChevronRight className="h-4 w-4 text-zinc-300" />
                  </Link>
                ))}
              </nav>
              <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
                <a href={whatsappLink('Hi GK Gadgets Lux! I have a question.')} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 text-sm font-semibold text-white">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
