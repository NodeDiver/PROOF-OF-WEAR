'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

/**
 * Neo-Brutalist Theme Toggle
 * Instant switch (no transitions) - brutalist style
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          'w-10 h-10',
          'flex items-center justify-center',
          'border-[3px] border-border',
          'bg-card'
        )}
        aria-label="Toggle theme"
      >
        <Sun size={20} strokeWidth={2.5} />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'w-10 h-10',
        'flex items-center justify-center',
        'border-[3px] border-border',
        'bg-card text-card-foreground',
        'transition-brutal',
        'hover:bg-muted',
        'active:translate-x-[2px] active:translate-y-[2px]'
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={20} strokeWidth={2.5} />
      ) : (
        <Moon size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}
