import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 * Standard utility for conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format satoshis with Bitcoin symbol
 */
export function formatSats(sats: number): string {
  return `₿ ${sats.toLocaleString()} sats`;
}

/**
 * Format price for display
 */
export function formatPrice(sats: number): string {
  if (sats === 1) return '₿ 1 sat';
  return `₿ ${sats} sats`;
}

/**
 * Generate unique cart item key
 */
export function getCartItemKey(productId: string, size?: string): string {
  return size ? `${productId}-${size}` : productId;
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
