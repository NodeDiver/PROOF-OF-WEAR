'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

/**
 * Neo-Brutalist Quantity Selector
 *
 * Features:
 * - Inline horizontal layout
 * - Brutalist + / - buttons
 * - Monospace number display
 */
export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn('inline-flex items-center', className)}>
      {/* Decrease button */}
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          'w-10 h-10',
          'flex items-center justify-center',
          'bg-card text-card-foreground',
          'border-[3px] border-border',
          'transition-brutal',
          'hover:bg-muted',
          'active:translate-x-[2px] active:translate-y-[2px]',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={16} strokeWidth={3} />
      </button>

      {/* Quantity display */}
      <div
        className={cn(
          'w-14 h-10',
          'flex items-center justify-center',
          'bg-card text-card-foreground',
          'border-y-[3px] border-border',
          'font-mono text-lg font-bold'
        )}
      >
        {quantity}
      </div>

      {/* Increase button */}
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          'w-10 h-10',
          'flex items-center justify-center',
          'bg-card text-card-foreground',
          'border-[3px] border-border',
          'transition-brutal',
          'hover:bg-muted',
          'active:translate-x-[2px] active:translate-y-[2px]',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="Increase quantity"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
}
