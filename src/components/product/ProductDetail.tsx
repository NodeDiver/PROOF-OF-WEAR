'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SizeSelector } from '@/components/ui/SizeSelector';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { useCartStore } from '@/lib/store';

interface ProductDetailProps {
  product: Product;
}

/**
 * Neo-Brutalist Product Detail Component
 * Two column layout with image gallery and info
 */
export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations('products');
  const tSizes = useTranslations('sizes');
  const tCommon = useTranslations('common');
  const { addItem, openCart } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[1] || null
  );
  const [quantity, setQuantity] = useState(1);

  const productKey = product.id.replace('tshirt-standard', 'tshirt').replace('stickers-propaganda', 'stickers');

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setSelectedSize(product.sizes[0]);
      return;
    }
    addItem(product.id, quantity, selectedSize || undefined);
    openCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/"
        className={cn(
          'inline-flex items-center gap-2 mb-8',
          'font-display uppercase text-sm',
          'transition-brutal hover:text-accent'
        )}
      >
        <ArrowLeft size={16} strokeWidth={3} />
        {tCommon('backToHome')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div
            className={cn(
              'relative aspect-square',
              'bg-card',
              'border-[3px] border-border',
              'shadow-[4px_4px_0px_0px_var(--shadow-color)]'
            )}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-r-[3px] border-b-[3px] border-accent z-10" />
            <div className="absolute top-0 right-0 w-12 h-12 border-l-[3px] border-b-[3px] border-accent z-10" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-r-[3px] border-t-[3px] border-accent z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-l-[3px] border-t-[3px] border-accent z-10" />

            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'w-20 h-20',
                    'bg-card',
                    'border-[3px]',
                    selectedImage === index
                      ? 'border-accent shadow-[4px_4px_0px_0px_var(--accent)]'
                      : 'border-border',
                    'transition-brutal'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Category badge */}
          <Badge className="mb-4">
            {product.category === 'apparel' ? '👕 APPAREL' : '📦 ACCESSORIES'}
          </Badge>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl uppercase mb-2">
            {t(`${productKey}.name`)}
          </h1>

          {/* Tagline */}
          <p className="text-xl text-accent font-display uppercase mb-4">
            {t(`${productKey}.tagline`)}
          </p>

          {/* Price */}
          <div className="font-mono text-3xl font-bold text-accent mb-6">
            {formatPrice(product.priceInSats)}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-8">
            {t(`${productKey}.description`)}
          </p>

          <div className="border-t-[3px] border-border pt-6 space-y-6">
            {/* Size selector */}
            {product.sizes && (
              <div>
                <label className="font-display text-lg uppercase mb-3 block">
                  {tSizes('label')}
                </label>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="font-display text-lg uppercase mb-3 block">
                Quantity
              </label>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            {/* Add to Cart */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="w-full"
            >
              ⚡ {t('addToCart')}
            </Button>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <Check size={16} className="text-green-600" />
                  <span className="text-green-600 font-mono">
                    {tCommon('inStock')}
                  </span>
                </>
              ) : (
                <span className="text-fire font-mono">{tCommon('outOfStock')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
