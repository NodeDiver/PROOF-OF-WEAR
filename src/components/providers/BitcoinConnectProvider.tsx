'use client';

import { useEffect } from 'react';

/**
 * Initialize Bitcoin Connect for Lightning wallet integration
 * Must be mounted once at the app level
 * Uses dynamic import to avoid SSR issues with HTMLElement
 */
export function BitcoinConnectProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('@getalby/bitcoin-connect-react').then(({ init }) => {
      init({
        appName: 'PROOF OF WEAR',
        filters: ['nwc'],
        showBalance: true,
      });
    });
  }, []);

  return <>{children}</>;
}
