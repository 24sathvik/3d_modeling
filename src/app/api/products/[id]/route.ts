// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

/**
 * Correct Next.js App Router GET handler signature:
 *   GET(request: Request, context: { params: { id: string } })
 *
 * Important:
 * - First parameter must be Request.
 * - Second parameter must be an object with `params` containing route params.
 * - Returning NextResponse.json(...) produces a proper JSON response.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: replace this stub with your real fetch/db logic:
    // e.g. const product = await getProductById(id);
    const product = {
      id,
      name: `Sample product ${id}`,
      price: 0,
      note: 'Replace this stub with actual DB/API logic'
    };

    if (!product) {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return NextResponse.json(product);
  } catch (err) {
    // Log error server-side if you want (avoid leaking details)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
