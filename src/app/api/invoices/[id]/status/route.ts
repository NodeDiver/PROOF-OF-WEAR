import { NextRequest, NextResponse } from 'next/server';
import { checkInvoiceStatus } from '@/lib/nwc';

/**
 * GET /api/invoices/[id]/status
 * Check payment status for an invoice by payment hash
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paymentHash } = await params;

    if (!paymentHash) {
      return NextResponse.json(
        { error: 'Payment hash required' },
        { status: 400 }
      );
    }

    const { paid, preimage } = await checkInvoiceStatus(paymentHash);

    return NextResponse.json({
      paymentHash,
      status: paid ? 'paid' : 'pending',
      paid,
      preimage: preimage || null,
      paidAt: paid ? new Date().toISOString() : null,
    });
  } catch (error) {
    console.error('Error checking invoice status:', error);
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    );
  }
}
