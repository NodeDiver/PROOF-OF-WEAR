'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Neo-Brutalist Language Toggle
 * Simple EN/ES toggle using cookies
 */
export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Set cookie and reload to apply new locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=lax`;
    router.refresh();
    // Force reload to apply the new locale
    window.location.reload();
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
