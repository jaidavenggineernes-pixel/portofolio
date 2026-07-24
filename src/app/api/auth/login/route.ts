import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Verification logic
    if (email === "admin@example.com" && password === "admin123") {
      const response = NextResponse.json({ success: true, message: "Login Berhasil" });
      response.cookies.set("admin_auth", "true", {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      return response;
    }

    return NextResponse.json({ success: false, message: "Credential login tidak valid" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
