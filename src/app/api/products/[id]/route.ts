// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

/**
 * Correct Next.js App Router GET handler signature:
 * GET(request: Request, context: { params: { id: string } })
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: replace stub logic below with your real fetch/db call.
    // Example: const product = await getProductById(id);
    const product = {
      id,
      name: `Sample product ${id}`,
      price: 0,
      note: 'Replace this stub with your DB/API logic'
    };

    if (!product) {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return NextResponse.json(product);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
