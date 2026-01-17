'use client';

import { useEffect } from 'react';
import { init } from '@getalby/bitcoin-connect-react';

/**
 * Initialize Bitcoin Connect for Lightning wallet integration
 * Must be mounted once at the app level
 */
export function BitcoinConnectProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    init({
      appName: 'PROOF OF WEAR',
      filters: ['nwc'],
      showBalance: true,
    });
  }, []);

  return <>{children}</>;
}
