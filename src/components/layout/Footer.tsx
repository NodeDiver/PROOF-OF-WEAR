'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { LogoSquare } from '@/components/icons';
import { Badge } from '@/components/ui';

/**
 * Neo-Brutalist Footer
 * With animated marquee and branding
 */
export function Footer() {
  const t = useTranslations('footer');
  const marquee = useTranslations('marquee');

  const marqueeItems = [
    marquee('text1'),
    marquee('text2'),
    marquee('text3'),
    marquee('text4'),
    marquee('text5'),
  ];

  return (
    <footer className="mt-auto">
      {/* Marquee */}
      <div className="marquee-container">
        <div className="flex">
          {/* First set */}
          <div className="animate-marquee flex items-center gap-8 pr-8">
            {marqueeItems.map((text, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl text-accent-foreground whitespace-nowrap"
              >
                {text} ⚡
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="animate-marquee flex items-center gap-8 pr-8" aria-hidden>
            {marqueeItems.map((text, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl text-accent-foreground whitespace-nowrap"
              >
                {text} ⚡
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-background border-t-[3px] border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + Tagline */}
            <div className="flex items-center gap-4">
              <LogoSquare size={48} />
              <div>
                <p className="font-display text-lg uppercase">{t('tagline')}</p>
                <p className="text-muted-foreground text-sm">{t('builtFor')}</p>
              </div>
            </div>

            {/* Badge */}
            <Badge variant="outline" className="text-base px-4 py-2">
              ₿ {'>'} 🖨️
            </Badge>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-muted text-center">
            <p className="text-muted-foreground text-sm font-mono">
              {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
