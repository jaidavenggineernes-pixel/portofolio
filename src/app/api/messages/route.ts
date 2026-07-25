import { NextResponse } from 'next/server';
import { initialMessages } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(initialMessages);
  } catch {
    return NextResponse.json(initialMessages);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: body });
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
