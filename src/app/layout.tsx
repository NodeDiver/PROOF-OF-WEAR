import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'PROOF OF WEAR | Bitcoin Merch',
  description: 'Not your keys, not your coins. But this merch? 100% yours. Stack sats, wear proof.',
  keywords: ['Bitcoin', 'merch', 'crypto', 'clothing', 'stickers', 'HODL', 'Lightning'],
  authors: [{ name: 'PROOF OF WEAR' }],
  openGraph: {
    title: 'PROOF OF WEAR | Bitcoin Merch',
    description: 'Not your keys, not your coins. But this merch? 100% yours.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {/* Noise overlay for brutalist texture */}
            <div className="noise-overlay" aria-hidden="true" />

            <Header />

            <main className="flex-1">{children}</main>

            <Footer />

            {/* Cart Drawer - slides in from right */}
            <CartDrawer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
