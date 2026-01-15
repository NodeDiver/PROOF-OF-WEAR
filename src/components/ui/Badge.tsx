'use client';

import { cn } from '@/lib/utils';
import type { BadgeProps } from '@/types';

/**
 * Neo-Brutalist Badge Component
 *
 * Features:
 * - Monospace font
 * - Uppercase text
 * - Thin border (2px)
 */
export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-accent text-accent-foreground border-border',
    fire: 'bg-fire text-white border-fire-dark',
    outline: 'bg-transparent text-foreground border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center',
        'px-2 py-1',
        'font-mono text-xs uppercase tracking-wider',
        'border-2',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
