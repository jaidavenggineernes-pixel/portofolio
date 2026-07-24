import { NextResponse } from 'next/server';
import { initialDocumentation } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(initialDocumentation);
  } catch {
    return NextResponse.json(initialDocumentation);
  }
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: true });
  }
}
