import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import {
  initialProfile,
  initialProjects,
  initialCertificates,
  initialDocumentation,
  initialSkills,
  initialSocialLinks,
} from "@/lib/supabase";
import { initialTimeline } from "@/lib/storage";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = join(process.cwd(), "public", "data", "portfolio.json");

const fallbackData = {
  profile: initialProfile,
  projects: initialProjects,
  certificates: initialCertificates,
  documentation: initialDocumentation,
  skills: initialSkills,
  social: initialSocialLinks,
  timeline: initialTimeline,
};

export async function GET() {
  try {
    const fileContent = await readFile(DATA_FILE_PATH, "utf-8");
    const json = JSON.parse(fileContent);
    return NextResponse.json(json);
  } catch {
    return NextResponse.json(fallbackData);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let currentData = { ...fallbackData };

    try {
      const fileContent = await readFile(DATA_FILE_PATH, "utf-8");
      currentData = JSON.parse(fileContent);
    } catch {
      // Use fallback
    }

    const updatedData = {
      ...currentData,
      ...body,
    };

    try {
      await writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    } catch {
      // Ignore if read-only filesystem
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
