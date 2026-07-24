"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "JaiAsis Portfolio",
    logoText: "JaiAsis.",
    primaryColor: "#0f172a",
    accentColor: "#3b82f6",
    defaultTheme: "dark",
    enableCursor: true,
    enableSound: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="text-slate-400" size={24} />
            Pengaturan Website
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Kustomisasi nama website, logo text, serta opsi cursor.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Pengaturan berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card p-6 sm:p-8 space-y-6 border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Judul Website (SEO)</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Text Logo Navbar</label>
            <input
              type="text"
              value={settings.logoText}
              onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Custom Animated Cursor</h4>
              <p className="text-xs text-slate-400">Aktifkan efek penunjuk kursor cair dan glow pada desktop.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.enableCursor}
              onChange={(e) => setSettings({ ...settings, enableCursor: e.target.checked })}
              className="w-5 h-5 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Save size={16} />
          <span>Simpan Pengaturan</span>
        </button>
      </form>
    </div>
  );
}
