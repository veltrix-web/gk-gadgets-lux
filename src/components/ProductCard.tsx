import { Link } from 'react-router-dom';
import { Heart, Plus, Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatINR, discountPercent } from '@/lib/utils';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import SmartImage from './SmartImage';

// One quiet badge per card, max. Priority: bestseller > new > nothing.
// Discount is shown next to the price, not on the image.
function badgeFor(product: Product): string | null {
  if (product.tags.includes('bestseller')) return 'Bestseller';
  if (product.tags.includes('new')) return 'New';
  return null;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const { notify } = useToast();
  const wished = inWishlist(product.id);
  const off = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const badge = badgeFor(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;
    addToCart(product);
    notify(`${product.name} added to cart`, 'success');
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    notify(wished ? 'Removed from saved' : 'Saved', 'wishlist');
  };

  return (
    <article className="group flex flex-col">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden rounded-2xl bg-surface">
        <div className="relative aspect-square">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out lg:group-hover:scale-105"
          />
          {product.images[1] && (
            <SmartImage
              src={product.images[1]}
              alt=""
              className="absolute inset-0 hidden h-full w-full opacity-0 transition-opacity duration-500 lg:block lg:group-hover:opacity-100"
            />
          )}
        </div>

        {badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold leading-none text-zinc-800 shadow-sm">
            {badge}
          </span>
        )}

        <button
          onClick={handleWish}
          aria-label={wished ? 'Remove from saved' : 'Save product'}
          aria-pressed={wished}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-zinc-700 shadow-sm transition active:scale-90"
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-accent text-accent' : ''}`} />
        </button>

        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <span className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white">Sold out</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-0.5 pt-3">
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <Star className="h-3 w-3 fill-zinc-900 text-zinc-900" />
          <span className="font-semibold text-zinc-800">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-1 font-heading text-[13px] font-bold text-zinc-900 sm:text-sm">{product.name}</h3>
        </Link>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 sm:text-xs">{product.shortDescription}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0">
            <p className="font-heading text-[15px] font-extrabold leading-none text-zinc-900 sm:text-base">{formatINR(product.price)}</p>
            {product.compareAtPrice && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] leading-none">
                <span className="text-zinc-400 line-through">{formatINR(product.compareAtPrice)}</span>
                {off > 0 && <span className="font-semibold text-emerald-700">{off}% off</span>}
              </p>
            )}
            {lowStock && <p className="mt-1.5 text-[11px] leading-none text-zinc-500">Only {product.stock} left</p>}
          </div>

          <button
            onClick={handleAdd}
            disabled={soldOut}
            aria-label={soldOut ? 'Sold out' : `Add ${product.name} to cart`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 active:scale-90 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            <Plus className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </article>
  );
}
