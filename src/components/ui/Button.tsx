'use client';

import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

/**
 * Neo-Brutalist Button Component
 *
 * Features:
 * - Hard shadow (4px offset)
 * - Thick border (3px)
 * - Press effect on click
 * - No border-radius
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = cn(
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-display uppercase tracking-wide',
    'border-[3px] border-border',
    'transition-brutal',
    // Shadow and press effect
    'shadow-[4px_4px_0px_0px_var(--shadow-color)]',
    'hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]',
    'hover:translate-x-[2px] hover:translate-y-[2px]',
    'active:shadow-none',
    'active:translate-x-[4px] active:translate-y-[4px]',
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]',
    'disabled:hover:translate-x-0 disabled:hover:translate-y-0'
  );

  const variants = {
    primary: 'bg-accent text-accent-foreground hover:bg-accent-dark',
    secondary: 'bg-card text-card-foreground hover:bg-muted',
    fire: 'bg-fire text-white hover:bg-fire-dark',
    ghost: 'bg-transparent border-transparent shadow-none hover:bg-muted hover:shadow-none',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
