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
    const description = data.get('description') as string;
    const price = data.get('price') as string;
    const featuresStr = data.get('features') as string;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: "Title and description are required" }, { status: 400 });
    }

    let iconUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-service-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      iconUrl = `/uploads/${filename}`;
    }

    // Process features into JSON string array
    const featureArray = featuresStr ? featuresStr.split(',').map(s => s.trim()) : [];
    const featuresJson = JSON.stringify(featureArray);

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        features: featuresJson,
        icon: iconUrl
      }
    });

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save service" }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log("Fetching services...");
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error: any) {
    console.error("Prisma Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch services", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
