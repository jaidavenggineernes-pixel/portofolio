import { NextResponse } from "next/server";
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

// Permanent Global State Store
const globalDataStore = {
  profile: initialProfile,
  projects: initialProjects,
  certificates: initialCertificates,
  documentation: initialDocumentation,
  skills: initialSkills,
  social: initialSocialLinks,
  timeline: initialTimeline,
};

export async function GET() {
  return NextResponse.json(globalDataStore);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (payload.profile) globalDataStore.profile = payload.profile;
    if (payload.projects) globalDataStore.projects = payload.projects;
    if (payload.certificates) globalDataStore.certificates = payload.certificates;
    if (payload.documentation) globalDataStore.documentation = payload.documentation;
    if (payload.skills) globalDataStore.skills = payload.skills;
    if (payload.social) globalDataStore.social = payload.social;
    if (payload.timeline) globalDataStore.timeline = payload.timeline;

    return NextResponse.json({ success: true, data: globalDataStore });
  } catch {
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
