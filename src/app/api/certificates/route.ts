import { NextResponse } from 'next/server';
import { initialCertificates } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(initialCertificates);
  } catch {
    return NextResponse.json(initialCertificates);
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
