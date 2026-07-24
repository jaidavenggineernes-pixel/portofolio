"use client";

import { useState, useEffect } from "react";
import { Save, User, CheckCircle2, Image as ImageIcon, FileText, Upload, Camera } from "lucide-react";
import { ProfileData } from "@/types/portfolio";
import { getStoredProfile, setStoredProfile } from "@/lib/storage";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [typingTextStr, setTypingTextStr] = useState("");
  const [hobbiesStr, setHobbiesStr] = useState("");
  const [interestsStr, setInterestsStr] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    setTypingTextStr(prof.typingText ? prof.typingText.join("\n") : "");
    setHobbiesStr(prof.hobbies ? prof.hobbies.join(", ") : "");
    setInterestsStr(prof.interests ? prof.interests.join(", ") : "");
  }, []);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfile({ ...profile, avatarUrl: event.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const updated: ProfileData = {
      ...profile,
      typingText: typingTextStr.split("\n").filter((s) => s.trim() !== ""),
      hobbies: hobbiesStr.split(",").map((s) => s.trim()).filter(Boolean),
      interests: interestsStr.split(",").map((s) => s.trim()).filter(Boolean),
    };

    setProfile(updated);
    setStoredProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="text-cyan-400" size={24} />
            Kelola Informasi Profil & Foto Asli
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Upload foto wajah asli Anda, ubah nama, biografi, pendidikan, dan motto hidup.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Informasi profil dan foto berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Profile Photo Uploader Card */}
      <div className="glass-card p-6 sm:p-8 space-y-6 border border-cyan-500/30 bg-cyan-500/5">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Camera size={18} />
          Upload & Pratinjau Foto Wajah Asli
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Preview Box */}
          <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shrink-0 overflow-hidden relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt="Foto Profil Avatar"
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>

          {/* Upload Controls */}
          <div className="space-y-3 flex-1 w-full">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Opsi 1: Upload File Foto dari Perangkat (Galeri / HP / Komputer)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold cursor-pointer transition-colors shadow-md">
                  <Upload size={16} />
                  <span>Pilih File Foto Baru</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-slate-400">Support JPG, PNG, WEBP</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300">
                Opsi 2: Atau Paste URL Gambar Foto
              </label>
              <input
                type="text"
                value={profile.avatarUrl || ""}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 bg-slate-950 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 sm:p-8 space-y-6 border border-white/10">
        {/* Identitas Utama */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-white/10 pb-2">
            1. Identitas Pribadi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Panggilan</label>
              <input
                type="text"
                required
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Profesi / Sub-Title</label>
              <input
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Umur (Tahun)</label>
              <input
                type="number"
                required
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lokasi Tempat Tinggal</label>
              <input
                type="text"
                required
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Pendidikan & Biografi */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider border-b border-white/10 pb-2">
            2. Biografi, Pendidikan, & Visi
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Riwayat Pendidikan</label>
            <input
              type="text"
              required
              placeholder="Contoh: Senior High School / Teknik Informatika - Universitas"
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bio Singkat</label>
            <textarea
              rows={3}
              required
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hobi (pisahkan koma)</label>
              <input
                type="text"
                placeholder="Coding, Photography, Music Production"
                value={hobbiesStr}
                onChange={(e) => setHobbiesStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Minat / Ketertarikan (pisahkan koma)</label>
              <input
                type="text"
                placeholder="Artificial Intelligence, Web3, UI/UX Design"
                value={interestsStr}
                onChange={(e) => setInterestsStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Motto Hidup</label>
            <input
              type="text"
              required
              value={profile.motto}
              onChange={(e) => setProfile({ ...profile, motto: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Visi & Tujuan Utama</label>
            <textarea
              rows={2}
              required
              value={profile.goals}
              onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>
        </div>

        {/* Media & Typing Text */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-white/10 pb-2">
            3. File CV & Animasi Teks
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <FileText size={14} className="text-purple-400" /> URL File Download CV
            </label>
            <input
              type="text"
              value={profile.cvUrl || ""}
              onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Typing Animation Text di Hero (1 kalimat per baris)
            </label>
            <textarea
              rows={4}
              value={typingTextStr}
              onChange={(e) => setTypingTextStr(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Save size={16} />
          <span>Simpan Seluruh Perubahan Profil</span>
        </button>
      </form>
    </div>
  );
}
