'use client';

import { useEffect } from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';

/**
 * Neo-Brutalist Cart Drawer
 * Slides in from the right with Framer Motion
 */
export function CartDrawer() {
  const t = useTranslations('cart');
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotal,
  } = useCartStore();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/50 z-50"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className={cn(
              'fixed top-0 right-0 h-full z-50',
              'w-full max-w-md',
              'bg-background',
              'border-l-[3px] border-border',
              'flex flex-col'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-[3px] border-border">
              <h2
                id="cart-title"
                className="font-display text-2xl uppercase flex items-center gap-2"
              >
                <ShoppingCart size={24} strokeWidth={2.5} />
                {t('title')}
              </h2>
              <button
                onClick={closeCart}
                className={cn(
                  'w-10 h-10',
                  'flex items-center justify-center',
                  'border-[3px] border-border',
                  'bg-card',
                  'transition-brutal',
                  'hover:bg-muted',
                  'active:translate-x-[2px] active:translate-y-[2px]'
                )}
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart
                    size={64}
                    strokeWidth={1.5}
                    className="text-muted-foreground mb-4"
                  />
                  <p className="font-display text-xl uppercase text-muted-foreground">
                    {t('empty')}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {t('emptySubtitle')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={`${item.productId}-${item.size || 'default'}`}
                        className={cn(
                          'flex gap-4 p-4',
                          'bg-card',
                          'border-[3px] border-border',
                          'shadow-[4px_4px_0px_0px_var(--shadow-color)]'
                        )}
                      >
                        {/* Image */}
                        <div className="w-20 h-20 flex-shrink-0 border-[2px] border-border bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg uppercase truncate">
                            {product.name}
                          </h3>
                          {item.size && (
                            <p className="text-muted-foreground text-sm font-mono">
                              Size: {item.size}
                            </p>
                          )}
                          <p className="font-mono text-accent font-bold mt-1">
                            {formatPrice(product.priceInSats)}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <QuantitySelector
                              quantity={item.quantity}
                              onIncrease={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                  item.size
                                )
                              }
                              onDecrease={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                  item.size
                                )
                              }
                            />
                            <button
                              onClick={() => removeItem(item.productId, item.size)}
                              className="text-fire hover:text-fire-dark transition-colors p-2"
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <Trash2 size={18} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t-[3px] border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-xl uppercase">{t('total')}</span>
                  <span className="font-mono text-2xl font-bold text-accent">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button variant="primary" size="lg" className="w-full">
                      ⚡ {t('checkout')}
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={closeCart}
                    className="w-full"
                  >
                    {t('continueShopping')}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
