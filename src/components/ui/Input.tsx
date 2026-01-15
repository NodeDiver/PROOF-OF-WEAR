'use client';

import { cn } from '@/lib/utils';
import type { InputProps } from '@/types';

/**
 * Neo-Brutalist Input Component
 *
 * Features:
 * - Thick border (3px)
 * - Focus state with accent shadow
 * - Error state with fire color
 * - No border-radius
 */
export function Input({
  label,
  error,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-display uppercase text-sm tracking-wide"
        >
          {label}
          {required && <span className="text-fire ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          'w-full px-4 py-3',
          'bg-card text-card-foreground',
          'border-[3px] border-border',
          'font-body',
          'placeholder:text-muted-foreground',
          'transition-brutal',
          // Focus state
          'focus:outline-none',
          'focus:border-accent',
          'focus:shadow-[4px_4px_0px_0px_var(--accent)]',
          // Error state
          error && [
            'border-fire',
            'shadow-[4px_4px_0px_0px_var(--fire)]',
          ],
          className
        )}
      />
      {error && (
        <span className="text-fire text-sm font-mono">{error}</span>
      )}
    </div>
  );
}
