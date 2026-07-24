import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
