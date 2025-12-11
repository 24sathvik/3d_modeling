// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: any) {
  try {
    const id = context?.params?.id ?? null;

    // TODO: replace stub logic with real fetch/db call
    const product = id
      ? { id, name: `Sample product ${id}`, price: 0 }
      : null;

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
