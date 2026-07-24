import { NextResponse } from "next/server";
import { initialProfile } from "@/lib/supabase";

export async function GET() {
  return NextResponse.json(initialProfile);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    Object.assign(initialProfile, data);
    return NextResponse.json({ success: true, data: initialProfile });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
