import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || "No Subject",
        content: data.message,
      }
    });
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
