import { NWCClient } from '@getalby/sdk/nwc';

let nwcClient: NWCClient | null = null;

/**
 * Get or create NWC client singleton
 * Server-side only - do not import in client components
 */
export function getNWCClient(): NWCClient {
  if (!process.env.NWC_URL) {
    throw new Error('NWC_URL environment variable is required');
  }

  if (!nwcClient) {
    nwcClient = new NWCClient({
      nostrWalletConnectUrl: process.env.NWC_URL,
    });
  }

  return nwcClient;
}

/**
 * Create invoice via NWC
 * @param amountSats - Amount in satoshis
 * @param description - Invoice description
 * @returns bolt11 invoice and payment hash
 */
export async function createInvoice(amountSats: number, description: string) {
  const client = getNWCClient();

  const transaction = await client.makeInvoice({
    amount: amountSats * 1000, // Convert sats to millisats
    description,
    expiry: 600, // 10 minutes
  });

  return {
    bolt11: transaction.invoice,
    paymentHash: transaction.payment_hash,
  };
}

/**
 * Check invoice payment status via NWC
 * @param paymentHash - The payment hash to look up
 * @returns paid status and preimage if paid
 */
export async function checkInvoiceStatus(paymentHash: string) {
  const client = getNWCClient();

  const result = await client.lookupInvoice({
    payment_hash: paymentHash,
  });

  return {
    paid: !!result.preimage,
    preimage: result.preimage,
  };
}

/**
 * Get wallet balance in satoshis
 * @returns Balance in sats
 */
export async function getWalletBalance(): Promise<number> {
  const client = getNWCClient();
  const result = await client.getBalance();
  return Math.floor(result.balance / 1000); // Convert millisats to sats
}
