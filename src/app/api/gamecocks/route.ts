import { NextResponse } from 'next/server';
import { INITIAL_GAMECOCKS } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const breed = searchParams.get('breed');
  const status = searchParams.get('status');

  let filtered = [...INITIAL_GAMECOCKS];

  if (breed && breed !== 'ALL') {
    filtered = filtered.filter(g => g.breed.includes(breed));
  }
  if (status && status !== 'ALL') {
    filtered = filtered.filter(g => g.status === status);
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
}

