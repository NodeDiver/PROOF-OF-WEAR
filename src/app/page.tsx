'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function HomePage() {
  const t = useTranslations('hero');
  const tProducts = useTranslations('products');
  const products = getFeaturedProducts();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Sticker badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="sticker mb-8 text-lg px-4 py-2">
              ₿ {t('badge')}
            </Badge>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-hero font-display uppercase mb-6"
          >
            <span className="block">{t('title').split(' ')[0]}</span>
            <span className="block text-accent">{t('title').split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToProducts}
              className="text-xl"
            >
              <Zap size={24} strokeWidth={2.5} />
              {t('cta')}
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <button
              onClick={scrollToProducts}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="Scroll to products"
            >
              <span className="font-mono text-xs uppercase">{t('scroll')}</span>
              <ChevronDown size={24} className="animate-bounce-gentle" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-section font-display uppercase mb-4">
              {tProducts('title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {tProducts('subtitle')}
            </p>
          </motion.div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  index === 1 && 'md:mt-12' // Offset for scattered effect
                )}
              >
                <ProductCard
                  product={product}
                  rotation={index === 0 ? 'left' : 'right'}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
