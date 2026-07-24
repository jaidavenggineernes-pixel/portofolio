import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const title = data.get('title') as string;
    const date = data.get('date') as string;

    if (!title || !date) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const doc = await prisma.documentation.create({
      data: {
        caption: title,
        date: date,
        imageUrl: imageUrl
      }
    });

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save documentation" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const docs = await prisma.documentation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(docs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch documentation" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.documentation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, date } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const doc = await prisma.documentation.update({
      where: { id },
      data: { caption: title, date: date }
    });
    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
