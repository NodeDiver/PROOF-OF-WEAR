'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-hero font-display text-accent mb-4">
          {t('title')}
        </h1>
        <h2 className="font-display text-3xl uppercase mb-4">
          {t('subtitle')}
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home size={20} />
            {t('backHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
