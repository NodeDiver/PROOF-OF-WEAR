import { NextRequest, NextResponse } from 'next/server';
import type { CartItem, CustomerInfo } from '@/types';

interface CreateOrderRequest {
  items: CartItem[];
  customer: CustomerInfo;
  totalSats: number;
}

/**
 * POST /api/orders
 * Creates a new order
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();

    // Validate request
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    if (!body.customer || !body.customer.email) {
      return NextResponse.json(
        { error: 'Customer information required' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In production: save to database
    // For demo: just return the order
    const order = {
      id: orderId,
      items: body.items,
      customer: body.customer,
      totalSats: body.totalSats,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    console.log('Order created:', order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
