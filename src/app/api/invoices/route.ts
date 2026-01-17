import { NextRequest, NextResponse } from 'next/server';
import { createInvoice } from '@/lib/nwc';

interface CreateInvoiceRequest {
  orderId: string;
  amountSats: number;
}

/**
 * POST /api/invoices
 * Creates a Lightning invoice using NWC (Nostr Wallet Connect)
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
    const description = `PROOF OF WEAR - Order ${body.orderId}`;

    // Create real invoice via NWC
    const { bolt11, paymentHash } = await createInvoice(body.amountSats, description);

    const invoice = {
      invoiceId,
      orderId: body.orderId,
      bolt11,
      paymentHash,
      amountSats: body.amountSats,
      description,
      status: 'pending',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
    };

    console.log('Invoice created:', { invoiceId, paymentHash, amountSats: body.amountSats });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
