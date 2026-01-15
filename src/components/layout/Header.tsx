'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { CartButton } from './CartButton';

/**
 * Neo-Brutalist Header
 * Sticky, with logo and action buttons
 */
export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'h-16 md:h-20',
        'bg-background',
        'border-b-[3px] border-border'
      )}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="transition-brutal hover:opacity-80"
            aria-label="Go to homepage"
          >
            <Logo width={160} height={40} className="md:w-[200px] md:h-[50px]" />
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
