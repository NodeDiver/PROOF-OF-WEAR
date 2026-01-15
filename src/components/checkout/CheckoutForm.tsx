'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Zap, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import type { CustomerInfo } from '@/types';

/**
 * Neo-Brutalist Checkout Form
 * Two-column layout with form and order summary
 */
export function CheckoutForm() {
  const t = useTranslations('checkout');
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [formData, setFormData] = useState<CustomerInfo>({
    email: '',
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create order via API
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: formData,
          totalSats: total,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      // Generate Lightning invoice
      const invoiceResponse = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amountSats: total,
        }),
      });

      if (!invoiceResponse.ok) {
        throw new Error('Failed to generate invoice');
      }

      const invoice = await invoiceResponse.json();

      // For demo: show alert with invoice info
      // In production: redirect to payment page or show QR modal
      alert(`Lightning Invoice Generated!\n\nBolt11: ${invoice.bolt11?.substring(0, 50)}...\n\nAmount: ${total} sats`);

      // Clear cart after successful order
      clearCart();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl uppercase mb-4">{t('title')}</h1>
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl uppercase mb-8 text-center">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Shipping Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-2xl uppercase mb-6">
              {t('shippingInfo')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label={t('fullName')}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <Input
                label={t('address')}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('city')}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label={t('postalCode')}
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label={t('country')}
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <div className="pt-4 border-t-[3px] border-border">
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-accent" />
                  {t('paymentNote')}
                </p>

                {error && (
                  <p className="text-fire text-sm mb-4 font-mono">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t('processing')}
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      {t('payButton')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-2xl uppercase mb-6">
              {t('orderSummary')}
            </h2>

            <div className="space-y-4">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div
                    key={`${item.productId}-${item.size || 'default'}`}
                    className={cn(
                      'flex gap-4 p-4',
                      'bg-muted',
                      'border-[2px] border-border'
                    )}
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-card border-[2px] border-border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-display uppercase">{product.name}</p>
                      {item.size && (
                        <p className="text-muted-foreground text-sm">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="font-mono font-bold text-accent">
                      {formatPrice(product.priceInSats * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t-[3px] border-border flex items-center justify-between">
              <span className="font-display text-xl uppercase">Total</span>
              <span className="font-mono text-2xl font-bold text-accent">
                {formatPrice(total)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
