import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

/**
 * Payment Success Page
 * Displayed after a successful Lightning payment
 */
export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />

          <h1 className="font-display text-3xl uppercase mb-4">
            Payment Successful!
          </h1>

          <p className="text-muted-foreground mb-8">
            Your Lightning payment has been confirmed.
            You&apos;ll receive a confirmation email shortly.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full">
                <Home size={20} />
                Back to Home
              </Button>
            </Link>

            <Link href="/#products">
              <Button variant="secondary" size="lg" className="w-full">
                <ShoppingBag size={20} />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
