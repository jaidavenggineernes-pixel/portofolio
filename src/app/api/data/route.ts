import { NextResponse } from "next/server";
import {
  initialProfile,
  initialProjects,
  initialCertificates,
  initialDocumentation,
  initialSkills,
  initialSocialLinks,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Global Server Data Memory (persisted across active deployment sessions)
let globalDatabase = {
  profile: initialProfile,
  projects: initialProjects,
  certificates: initialCertificates,
  documentation: initialDocumentation,
  skills: initialSkills,
  social: initialSocialLinks,
};

export async function GET() {
  return NextResponse.json(globalDatabase);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    globalDatabase = {
      ...globalDatabase,
      ...body,
    };
    return NextResponse.json({ success: true, data: globalDatabase });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update global database" }, { status: 500 });
  }
}
