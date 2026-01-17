'use client';

import { ThemeProvider } from 'next-themes';
import { BitcoinConnectProvider } from './providers/BitcoinConnectProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side providers wrapper
 * - ThemeProvider for dark/light mode
 * - BitcoinConnectProvider for Lightning wallet integration
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange // Brutalist = instant, no transitions
    >
      <BitcoinConnectProvider>
        {children}
      </BitcoinConnectProvider>
    </ThemeProvider>
  );
}
