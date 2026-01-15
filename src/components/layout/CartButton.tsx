'use client';

import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';

/**
 * Neo-Brutalist Cart Button
 * Shows item count with pop animation
 */
export function CartButton() {
  const { toggleCart, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const itemCount = getItemCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger pop animation when count changes
  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <button
      onClick={toggleCart}
      className={cn(
        'relative',
        'w-10 h-10',
        'flex items-center justify-center',
        'border-[3px] border-border',
        'bg-card text-card-foreground',
        'transition-brutal',
        'hover:bg-muted',
        'active:translate-x-[2px] active:translate-y-[2px]'
      )}
      aria-label={`Shopping cart with ${mounted ? itemCount : 0} items`}
    >
      <ShoppingCart size={20} strokeWidth={2.5} />

      {/* Item count badge */}
      {mounted && itemCount > 0 && (
        <span
          className={cn(
            'absolute -top-2 -right-2',
            'min-w-[20px] h-5 px-1',
            'flex items-center justify-center',
            'bg-fire text-white',
            'font-mono text-xs font-bold',
            'border-2 border-border',
            animate && 'animate-pop'
          )}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
