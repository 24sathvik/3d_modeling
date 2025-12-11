// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: replace this stub with your actual DB/API logic.
    // Example:
    // const product = await getProductById(id);
    const product = {
      id,
      name: `Sample product ${id}`,
      price: 0,
      message: 'Replace this stub with your real product fetch logic'
    };

    if (!product) {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(product);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
