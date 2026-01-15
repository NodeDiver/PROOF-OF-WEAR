'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SizeSelector } from '@/components/ui/SizeSelector';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  rotation?: 'left' | 'right' | 'none';
  className?: string;
}

/**
 * Neo-Brutalist Product Card
 * With corner accents, sticker badge, and optional rotation
 */
export function ProductCard({
  product,
  rotation = 'none',
  className,
}: ProductCardProps) {
  const t = useTranslations('products');
  const tSizes = useTranslations('sizes');
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[1] || null // Default to M
  );

  const rotationClass = {
    left: '-rotate-brutal-1',
    right: 'rotate-brutal-1',
    none: '',
  }[rotation];

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      // Could show error, but for now select first size
      setSelectedSize(product.sizes[0]);
      return;
    }
    addItem(product.id, 1, selectedSize || undefined);
    openCart();
  };

  return (
    <div
      className={cn(
        'group',
        'bg-card',
        'border-[3px] border-border',
        'shadow-[4px_4px_0px_0px_var(--shadow-color)]',
        'transition-brutal',
        'hover:shadow-[8px_8px_0px_0px_var(--shadow-color)]',
        'hover:-translate-x-[2px] hover:-translate-y-[2px]',
        rotationClass,
        className
      )}
    >
      {/* Image container with corner accents */}
      <div className="relative aspect-square bg-muted border-b-[3px] border-border overflow-hidden">
        {/* Sticker badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="sticker">
            {product.category === 'apparel' ? '👕 APPAREL' : '📦 ACCESSORIES'}
          </Badge>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-r-[3px] border-b-[3px] border-accent" />
        <div className="absolute top-0 right-0 w-8 h-8 border-l-[3px] border-b-[3px] border-accent" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-r-[3px] border-t-[3px] border-accent" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l-[3px] border-t-[3px] border-accent" />

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl uppercase mb-2">
          {t(`${product.id.replace('tshirt-standard', 'tshirt').replace('stickers-propaganda', 'stickers')}.name`)}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {t(`${product.id.replace('tshirt-standard', 'tshirt').replace('stickers-propaganda', 'stickers')}.tagline`)}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-2xl font-bold text-accent">
            {formatPrice(product.priceInSats)}
          </span>
          <Link href={`/product/${product.slug}`}>
            <Button variant="ghost" size="sm" className="group/btn">
              <span>{t('viewProduct')}</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </Button>
          </Link>
        </div>

        {/* Size selector (for apparel) */}
        {product.sizes && (
          <div className="mb-4">
            <label className="font-display text-sm uppercase mb-2 block">
              {tSizes('label')}
            </label>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </div>
        )}

        {/* Add to Cart */}
        <Button
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          className="w-full"
        >
          ⚡ {t('addToCart')}
        </Button>
      </div>
    </div>
  );
}
