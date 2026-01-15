import { NextRequest, NextResponse } from 'next/server';

interface CreateInvoiceRequest {
  orderId: string;
  amountSats: number;
}

/**
 * POST /api/invoices
 * Creates a Lightning invoice using Alby/NWC
 *
 * In production, you would:
 * 1. Use Alby SDK with NWC (Nostr Wallet Connect)
 * 2. Or connect to your own Lightning node (LND, CLN, etc.)
 * 3. Or use Alby's hosted invoice API
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateInvoiceRequest = await request.json();

    // Validate request
    if (!body.orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      );
    }

    if (!body.amountSats || body.amountSats <= 0) {
      return NextResponse.json(
        { error: 'Valid amount required' },
        { status: 400 }
      );
    }

    // Generate invoice ID
    const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In production with Alby SDK:
    // import { nwc } from '@getalby/sdk';
    // const client = new nwc.NWCClient({ nostrWalletConnectUrl: process.env.NWC_URL });
    // const invoice = await client.makeInvoice({ amount: body.amountSats * 1000, description: `Order ${body.orderId}` });

    // For demo: generate a fake bolt11 invoice
    const fakeBolt11 = `lnbc${body.amountSats}n1pjexampleinvoice${Date.now()}`;

    const invoice = {
      invoiceId,
      orderId: body.orderId,
      bolt11: fakeBolt11,
      paymentHash: `hash_${invoiceId}`,
      amountSats: body.amountSats,
      status: 'pending',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      // In production: include payment URL or WebLN support
      paymentUrl: `lightning:${fakeBolt11}`,
    };

    console.log('Invoice created:', invoice);

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
