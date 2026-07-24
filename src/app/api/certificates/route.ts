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
    const issuer = data.get('issuer') as string;
    const year = data.get('year') as string;

    if (!title || !issuer || !year) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-cert-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const cert = await prisma.certificate.create({
      data: {
        title: title,
        issuer: issuer,
        year: year,
        imageUrl: imageUrl
      }
    });

    return NextResponse.json({ success: true, data: cert });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save certificate" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const certs = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(certs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, issuer, year } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const cert = await prisma.certificate.update({
      where: { id },
      data: { title, issuer, year }
    });
    return NextResponse.json({ success: true, data: cert });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
