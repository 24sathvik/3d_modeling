import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, products } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, items } = body;

    // Validate userEmail
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required', code: 'MISSING_USER_EMAIL' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!userEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL_FORMAT' },
        { status: 400 }
      );
    }

    // Validate items array
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required', code: 'MISSING_ITEMS' },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Items array cannot be empty', code: 'EMPTY_ITEMS' },
        { status: 400 }
      );
    }

    // Validate each item
    const productIds: number[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.productId || typeof item.productId !== 'number') {
        return NextResponse.json(
          { error: `Invalid productId for item at index ${i}`, code: 'INVALID_PRODUCT_ID' },
          { status: 400 }
        );
      }

      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json(
          { error: `Quantity must be a positive integer for item at index ${i}`, code: 'INVALID_QUANTITY' },
          { status: 400 }
        );
      }

      productIds.push(item.productId);
    }

    // Query products to get prices and validate productIds exist
    const productRecords = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    if (productRecords.length !== productIds.length) {
      const foundIds = productRecords.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      return NextResponse.json(
        { 
          error: `Product(s) not found: ${missingIds.join(', ')}`, 
          code: 'PRODUCT_NOT_FOUND' 
        },
        { status: 400 }
      );
    }

    // Create a map of productId to price for easy lookup
    const productPriceMap = new Map<number, number>();
    productRecords.forEach(product => {
      productPriceMap.set(product.id, product.price);
    });

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const price = productPriceMap.get(item.productId);
      if (price !== undefined) {
        totalAmount += price * item.quantity;
      }
    }

    // Create order
    const newOrder = await db
      .insert(orders)
      .values({
        userEmail: userEmail.trim().toLowerCase(),
        totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
      .returning();

    if (newOrder.length === 0) {
      return NextResponse.json(
        { error: 'Failed to create order', code: 'ORDER_CREATION_FAILED' },
        { status: 500 }
      );
    }

    const createdOrder = newOrder[0];

    // Create order items
    const orderItemsData = items.map(item => ({
      orderId: createdOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      customizationData: item.customizationData || null,
      voiceFrequencyUrl: item.voiceFrequencyUrl || null,
    }));

    const createdOrderItems = await db
      .insert(orderItems)
      .values(orderItemsData)
      .returning();

    // Return complete order with items
    return NextResponse.json(
      {
        order: createdOrder,
        items: createdOrderItems,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}