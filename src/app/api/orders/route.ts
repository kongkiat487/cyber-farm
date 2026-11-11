import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: INITIAL_ORDERS.length,
    data: INITIAL_ORDERS
  });
}

