import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Heart, Minus, Plus, Star, Truck } from 'lucide-react';
import { products } from '@/data/products';
import { whatsappLink } from '@/lib/config';
import { discountPercent, formatINR } from '@/lib/utils';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import ProductCard from '@/components/ProductCard';
import SmartImage from '@/components/SmartImage';

const swatchColors: Record<string, string> = {
  black: '#18181b',
  blue: '#3b82f6',
  gold: '#c9a45c',
  navy: '#263b5b',
  olive: '#78835a',
  pink: '#e9a2b0',
  silver: '#c0c0c0',
  white: '#ffffff',
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, inWishlist, items, toggleWishlist, updateQuantity } = useStore();
  const { notify } = useToast();
  const galleryRef = useRef<HTMLDivElement>(null);
  const product = products.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '');
  const wished = product ? inWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | GK Gadgets Lux`;
      setActiveImage(0);
      setSelectedColor(product.colors[0] ?? '');
      if (galleryRef.current) galleryRef.current.scrollLeft = 0;
      return;
    }

    document.title = 'Product not found | GK Gadgets Lux';
  }, [product]);

  if (!product) {
    return (
      <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-2xl font-bold text-zinc-900">Product not found</h1>
        <p className="mt-2 text-sm text-zinc-500">This product may have been moved or is no longer available.</p>
        <Link to="/" className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white">
          Back to shop
        </Link>
      </section>
    );
  }

  const off = discountPercent(product.price, product.compareAtPrice);
  const cartItem = items.find((item) => item.productId === product.id && item.color === selectedColor);
  const quantity = cartItem?.quantity ?? 0;
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const addProductToCart = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    addToCart(product, 1, selectedColor);
    if (quantity === 0) notify(`${product.name} added to cart`, 'success');
  };

  const changeQuantity = (nextQuantity: number) => {
    if (nextQuantity > product.stock) return;
    updateQuantity(product.id, selectedColor, nextQuantity);
  };

  const wishlistButton = (
    <button
      type="button"
      onClick={() => {
        toggleWishlist(product.id);
        notify(wished ? 'Removed from saved' : 'Saved', 'wishlist');
      }}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-zinc-800 shadow-sm backdrop-blur"
      aria-label={wished ? 'Remove from saved' : 'Save product'}
      aria-pressed={wished}
    >
      <Heart className={`h-5 w-5 ${wished ? 'fill-accent text-accent' : ''}`} />
    </button>
  );

  const cartControl = (
    <div className="flex h-12 flex-1 items-center justify-between rounded-full bg-zinc-900 px-1.5 text-white">
      <button
        type="button"
        onClick={() => changeQuantity(quantity - 1)}
        disabled={quantity === 0 || product.stock === 0}
        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={`Remove one ${product.name} from cart`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite" aria-label={`${quantity} in cart`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={addProductToCart}
        disabled={product.stock === 0 || quantity >= product.stock}
        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={`Add one ${product.name} to cart`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );

  const updateActiveImage = () => {
    if (!galleryRef.current) return;
    const width = galleryRef.current.clientWidth;
    if (width > 0) setActiveImage(Math.round(galleryRef.current.scrollLeft / width));
  };

  const selectImage = (index: number) => {
    setActiveImage(index);
    galleryRef.current?.scrollTo({
      left: galleryRef.current.clientWidth * index,
      behavior: 'smooth',
    });
  };

  const imageGallery = (
    <div className="relative">
      <div
        ref={galleryRef}
        onScroll={updateActiveImage}
        className="no-scrollbar flex aspect-square w-full snap-x snap-mandatory overflow-x-auto rounded-3xl bg-[#F5F5F7] lg:hidden"
        aria-label="Product images"
      >
        {product.images.map((image, index) => (
          <SmartImage
            key={`${product.id}-${image}`}
            src={image}
            alt={`${product.name}${index > 0 ? `, view ${index + 1}` : ''}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="h-full w-full shrink-0 snap-center"
          />
        ))}
      </div>

      <div className="hidden items-start gap-3 lg:flex">
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2">
          {product.images.map((image, index) => (
            <button
              key={`${product.id}-thumb-${image}`}
              type="button"
              onClick={() => selectImage(index)}
              className={`aspect-square overflow-hidden rounded-xl bg-[#F5F5F7] ${index === activeImage ? 'ring-2 ring-zinc-900 ring-offset-2' : ''}`}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeImage ? 'true' : undefined}
            >
              <SmartImage src={image} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
        <SmartImage
          key={`${product.id}-desktop-${product.images[activeImage]}`}
          src={product.images[activeImage]}
          alt={product.name}
          loading="eager"
          className="aspect-square min-w-0 flex-1 rounded-3xl bg-[#F5F5F7]"
        />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-zinc-800 shadow-sm backdrop-blur"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        {wishlistButton}
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 lg:hidden">
        {product.images.map((image, index) => (
          <button
            key={`${product.id}-dot-${image}`}
            type="button"
            onClick={() => selectImage(index)}
            className={`h-1.5 rounded-full transition-all ${index === activeImage ? 'w-5 bg-zinc-900' : 'w-1.5 bg-zinc-400/70'}`}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeImage ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );

  const actionButtons = (
    <div className="flex flex-col gap-2 sm:flex-row">
      {cartControl}
      <button
        type="button"
        disabled
        className="inline-flex h-12 flex-1 cursor-not-allowed items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 px-5 text-sm font-semibold text-zinc-500"
      >
        Buy now
      </button>
    </div>
  );

  return (
    <div className="pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:pt-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          {imageGallery}

          <section className="lg:pt-2">
            <div className="flex items-center gap-1.5 text-sm text-zinc-600">
              <Star className="h-4 w-4 fill-zinc-900 text-zinc-900" />
              <span className="font-semibold text-zinc-900">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>

            <h1 className="mt-2 font-heading text-2xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{product.shortDescription}</p>

            <div className="mt-5">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <p className="font-heading text-2xl font-extrabold text-zinc-950">{formatINR(product.price)}</p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-sm text-zinc-400 line-through">{formatINR(product.compareAtPrice)}</span>
                    {off > 0 && <span className="text-sm font-medium text-emerald-700">{off}% off</span>}
                  </>
                )}
              </div>
              <p className={`mt-2 text-sm ${product.stock === 0 ? 'text-zinc-500' : 'text-zinc-600'}`}>
                {product.stock === 0 ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock'}
              </p>
            </div>

            {product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-zinc-900">
                  Color <span className="font-normal text-zinc-500">· {selectedColor}</span>
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`grid h-8 w-8 place-items-center rounded-full ${selectedColor === color ? 'ring-2 ring-zinc-900 ring-offset-2' : 'ring-1 ring-zinc-300'}`}
                      aria-label={`Select ${color}`}
                      aria-pressed={selectedColor === color}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ backgroundColor: swatchColors[color.toLowerCase()] ?? '#a1a1aa' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 hidden lg:block">{actionButtons}</div>

            <div className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-3xl border border-zinc-200">
              <details className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-heading text-sm font-semibold text-zinc-900">About this product</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-100 text-lg leading-none text-zinc-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{product.longDescription}</p>
              </details>

              <details className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-heading text-sm font-semibold text-zinc-900">Features</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-100 text-lg leading-none text-zinc-600 transition group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-heading text-sm font-semibold text-zinc-900">Specifications</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-100 text-lg leading-none text-zinc-600 transition group-open:rotate-45">+</span>
                </summary>
                <dl className="mt-3 divide-y divide-zinc-100 text-sm">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                      <dt className="text-zinc-500">{label}</dt>
                      <dd className="text-right font-medium text-zinc-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <details className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-heading text-sm font-semibold text-zinc-900">Warranty and delivery</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-100 text-lg leading-none text-zinc-600 transition group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2.5 text-sm text-zinc-600">
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />{product.warranty} warranty against manufacturing defects</li>
                  <li className="flex items-start gap-2"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />Free shipping across India</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />7-day replacement for damaged or faulty items</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />Cash on delivery available on eligible orders</li>
                </ul>
              </details>
            </div>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-10 lg:mt-16">
            <h2 className="font-heading text-xl font-bold text-zinc-900 sm:text-2xl">You may also like</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-4">
              {relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )}
      </div>

      <div className="glass shadow-dock fixed inset-x-4 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-50 flex items-center gap-1.5 rounded-full border border-zinc-200/70 p-2 lg:hidden">
        <p className="min-w-[3.25rem] pl-1 font-heading text-sm font-extrabold text-zinc-950">{formatINR(product.price)}</p>
        <div className="flex min-w-0 flex-1 [&>div]:h-10 [&>div]:px-1 [&_button]:h-8 [&_button]:w-8">
          {cartControl}
        </div>
        <button
          type="button"
          disabled
          className="inline-flex h-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 px-3 text-xs font-semibold text-zinc-500"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
