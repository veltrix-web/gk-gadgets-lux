import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/data/products';
import { COUPONS } from '@/lib/config';

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
  discount: number;
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number; color?: string }
  | { type: 'REMOVE'; productId: number; color: string }
  | { type: 'UPDATE_QTY'; productId: number; color: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'APPLY_COUPON'; code: string }
  | { type: 'REMOVE_COUPON' }
  | { type: 'HYDRATE'; state: CartState };

function calcDiscount(items: CartItem[], coupon: string | null): number {
  if (!coupon) return 0;
  const pct = COUPONS[coupon];
  if (!pct) return 0;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return Math.round((subtotal * pct) / 100);
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'ADD': {
      const color = action.color ?? action.product.colors[0];
      const existing = state.items.find(
        (i) => i.productId === action.product.id && i.color === color
      );
      const qty = action.quantity ?? 1;
      const items = existing
        ? state.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + qty } : i
          )
        : [
            ...state.items,
            {
              productId: action.product.id,
              slug: action.product.slug,
              name: action.product.name,
              price: action.product.price,
              image: action.product.images[0],
              quantity: qty,
              color,
            },
          ];
      return { ...state, items, discount: calcDiscount(items, state.coupon) };
    }
    case 'REMOVE': {
      const items = state.items.filter(
        (i) => !(i.productId === action.productId && i.color === action.color)
      );
      return { ...state, items, discount: calcDiscount(items, state.coupon) };
    }
    case 'UPDATE_QTY': {
      const items = state.items
        .map((i) =>
          i.productId === action.productId && i.color === action.color
            ? { ...i, quantity: Math.max(0, action.quantity) }
            : i
        )
        .filter((i) => i.quantity > 0);
      return { ...state, items, discount: calcDiscount(items, state.coupon) };
    }
    case 'CLEAR':
      return { items: [], coupon: null, discount: 0 };
    case 'APPLY_COUPON': {
      const code = action.code.toUpperCase();
      if (!COUPONS[code]) return state;
      return { ...state, coupon: code, discount: calcDiscount(state.items, code) };
    }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null, discount: 0 };
    default:
      return state;
  }
}

type WishlistAction =
  | { type: 'ADD'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'TOGGLE'; id: number }
  | { type: 'HYDRATE'; ids: number[] };

function wishlistReducer(state: number[], action: WishlistAction): number[] {
  switch (action.type) {
    case 'ADD':
      return state.includes(action.id!) ? state : [...state, action.id!];
    case 'REMOVE':
      return state.filter((id) => id !== action.id);
    case 'TOGGLE':
      return state.includes(action.id!)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id!];
    case 'HYDRATE':
      return action.ids ?? [];
    default:
      return state;
  }
}

interface StoreContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  coupon: string | null;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: number, color: string) => void;
  updateQuantity: (productId: number, color: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  inWishlist: (id: number) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'gkl_cart';
const WISH_KEY = 'gkl_wishlist';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, { items: [], coupon: null, discount: 0 });
  const [wishlist, wDispatch] = useReducer(wishlistReducer, []);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) {
        const parsed = JSON.parse(c) as CartState;
        dispatch({ type: 'HYDRATE', state: { ...parsed, discount: calcDiscount(parsed.items, parsed.coupon) } });
      }
      if (w) wDispatch({ type: 'HYDRATE', ids: JSON.parse(w) as number[] });
    } catch {
      /* ignore corrupt storage */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreContextValue>(() => {
    const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items: cart.items,
      itemCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      discount: cart.discount,
      total: subtotal - cart.discount,
      coupon: cart.coupon,
      addToCart: (product, quantity, color) =>
        dispatch({ type: 'ADD', product, quantity, color }),
      removeFromCart: (productId, color) => dispatch({ type: 'REMOVE', productId, color }),
      updateQuantity: (productId, color, quantity) =>
        dispatch({ type: 'UPDATE_QTY', productId, color, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      applyCoupon: (code) => {
        const upper = code.toUpperCase();
        if (!COUPONS[upper]) return false;
        dispatch({ type: 'APPLY_COUPON', code: upper });
        return true;
      },
      removeCoupon: () => dispatch({ type: 'REMOVE_COUPON' }),
      wishlist,
      toggleWishlist: (id) => wDispatch({ type: 'TOGGLE', id }),
      inWishlist: (id) => wishlist.includes(id),
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
