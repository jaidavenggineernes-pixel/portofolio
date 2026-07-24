import { NextResponse } from "next/server";
import { initialProjects } from "@/lib/supabase";

export async function GET() {
  return NextResponse.json(initialProjects);
}
