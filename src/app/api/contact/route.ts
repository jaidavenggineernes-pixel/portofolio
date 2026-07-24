import { NextResponse } from "next/server";
import { initialMessages } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Field wajib diisi" }, { status: 400 });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    initialMessages.unshift(newMessage);

    return NextResponse.json({ success: true, message: "Pesan tersimpan", data: newMessage });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal menyimpan pesan" }, { status: 500 });
  }
}
