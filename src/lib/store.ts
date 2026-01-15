'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState } from '@/types';
import { getProductById } from './products';
import { getCartItemKey } from './utils';

/**
 * Cart store with persistence
 * Uses localStorage to persist cart items between sessions
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (productId: string, quantity = 1, size?: string) => {
        set((state) => {
          const key = getCartItemKey(productId, size);
          const existingItem = state.items.find(
            (item) => getCartItemKey(item.productId, item.size) === key
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                getCartItemKey(item.productId, item.size) === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { productId, quantity, size }],
          };
        });
      },

      removeItem: (productId: string, size?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              getCartItemKey(item.productId, item.size) !==
              getCartItemKey(productId, size)
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number, size?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            getCartItemKey(item.productId, item.size) ===
            getCartItemKey(productId, size)
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const product = getProductById(item.productId);
          return total + (product?.priceInSats ?? 0) * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'pow-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
