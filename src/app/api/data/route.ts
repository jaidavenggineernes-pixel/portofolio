import { NextResponse } from "next/server";
import {
  initialProfile,
  initialProjects,
  initialCertificates,
  initialDocumentation,
  initialSkills,
  initialSocialLinks,
  supabase
} from "@/lib/supabase";
import { initialTimeline } from "@/lib/storage";

export const dynamic = "force-dynamic";

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
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("data")
      .eq("id", "main_state")
      .single();
    
    if (error || !data) {
      return NextResponse.json(fallbackData);
    }
    
    return NextResponse.json(data.data || fallbackData);
  } catch {
    return NextResponse.json(fallbackData);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Fetch current
    let currentData = { ...fallbackData };
    const { data: fetchRes, error: fetchErr } = await supabase
      .from("portfolio_data")
      .select("data")
      .eq("id", "main_state")
      .single();
    
    if (!fetchErr && fetchRes && fetchRes.data) {
      currentData = fetchRes.data;
    }
    
    const updatedData = {
      ...currentData,
      ...body,
    };
    
    // Upsert to Supabase
    const { error: upsertErr } = await supabase
      .from("portfolio_data")
      .upsert({ id: "main_state", data: updatedData });
      
    if (upsertErr) {
      console.error("Supabase upsert error:", upsertErr);
      return NextResponse.json({ success: false, error: upsertErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
