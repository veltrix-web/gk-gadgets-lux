import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, ShoppingCart, X, Info } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'wishlist';
}

interface ToastContextValue {
  notify: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
            >
              {t.type === 'success' && <Check className="h-4 w-4 text-emerald-400" />}
              {t.type === 'wishlist' && <Heart className="h-4 w-4 text-white" fill="currentColor" />}
              {t.type === 'info' && <Info className="h-4 w-4 text-white" />}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export { ShoppingCart };
export { X };
