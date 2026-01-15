'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Neo-Brutalist Language Toggle
 * Simple EN/ES toggle
 */
export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Remove current locale prefix if present
    const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'h-10 px-3',
        'flex items-center justify-center',
        'border-[3px] border-border',
        'bg-card text-card-foreground',
        'font-mono text-sm font-bold uppercase',
        'transition-brutal',
        'hover:bg-muted',
        'active:translate-x-[2px] active:translate-y-[2px]'
      )}
      aria-label={`Switch to ${locale === 'en' ? 'Español' : 'English'}`}
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
