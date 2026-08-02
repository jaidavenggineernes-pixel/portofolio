import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { fetchGlobalData, getStoredMessages, setStoredMessages } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Field wajib diisi" }, { status: 400 });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    // 1. Simpan ke Supabase via storage
    // Pastikan data terbaru ter-fetch dulu
    await fetchGlobalData();
    const currentMessages = getStoredMessages();
    const updatedMessages = [newMessage, ...currentMessages];
    await setStoredMessages(updatedMessages);

    // 2. Kirim Email Notifikasi
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.SMTP_EMAIL}>`,
        to: "jaidav.enggineernes@gmail.com",
        subject: `New Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; color: #18181b;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #06b6d4; margin-top: 0;">Pesan Baru dari Portfolio! 🚀</h2>
              <p style="font-size: 14px; color: #71717a;">Anda baru saja menerima pesan melalui form kontak di website.</p>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Nama:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
                <p style="margin: 0 0 10px 0;"><strong>Subjek:</strong> ${subject}</p>
                <p style="margin: 0;"><strong>Pesan:</strong></p>
                <p style="margin: 5px 0 0 0; white-space: pre-wrap; color: #3f3f46;">${message}</p>
              </div>
              
              <p style="font-size: 12px; color: #a1a1aa; margin-bottom: 0; text-align: center;">
                Pesan ini dikirim secara otomatis dari website Anda.<br/>
                Silakan cek halaman Admin untuk mengelolanya.
              </p>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Tetap lanjutkan meskipun email gagal agar user tidak mendapatkan pesan error di form
      }
    } else {
      console.warn("SMTP credentials not configured. Email skipped.");
    }

    return NextResponse.json({ success: true, message: "Pesan tersimpan & terkirim", data: newMessage });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "Gagal memproses pesan" }, { status: 500 });
  }
}
