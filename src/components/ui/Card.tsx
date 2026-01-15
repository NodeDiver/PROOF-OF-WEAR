'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  hover?: boolean;
  accent?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Neo-Brutalist Card Component
 *
 * Features:
 * - Hard shadow (4px offset, 8px on hover)
 * - Thick border (3px)
 * - Optional hover lift effect
 * - No border-radius
 */
export function Card({ hover = false, accent = false, children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground',
        'border-[3px] border-border',
        accent
          ? 'shadow-[4px_4px_0px_0px_var(--accent)]'
          : 'shadow-[4px_4px_0px_0px_var(--shadow-color)]',
        hover && [
          'transition-brutal cursor-pointer',
          accent
            ? 'hover:shadow-[8px_8px_0px_0px_var(--accent)]'
            : 'hover:shadow-[8px_8px_0px_0px_var(--shadow-color)]',
          'hover:-translate-x-[2px] hover:-translate-y-[2px]',
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b-[3px] border-border', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t-[3px] border-border', className)}>
      {children}
    </div>
  );
}
