'use client';

import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  className?: string;
}

/**
 * Neo-Brutalist Size Selector
 *
 * Features:
 * - Flex wrap grid
 * - Selected state with accent color + shadow
 * - Hover state with muted background
 */
export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelectSize(size)}
            className={cn(
              'min-w-[48px] h-10',
              'px-3',
              'flex items-center justify-center',
              'font-mono text-sm font-bold uppercase',
              'border-[3px] border-border',
              'transition-brutal',
              isSelected
                ? [
                    'bg-accent text-accent-foreground',
                    'shadow-[4px_4px_0px_0px_var(--shadow-color)]',
                  ]
                : [
                    'bg-card text-card-foreground',
                    'hover:bg-muted',
                  ]
            )}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
