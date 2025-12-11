// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: replace this example with your real fetch/db logic.
    // Example placeholder:
    // const product = await fetchProductFromDb(id);
    const product = {
      id,
      name: `Sample product ${id}`,
      price: 0,
      message: 'Replace this stub with real product fetching logic',
    };

    // Return JSON with NextResponse
    return NextResponse.json(product);
  } catch (err) {
    // Safe error response for production builds
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
