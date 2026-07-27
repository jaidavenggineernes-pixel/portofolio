"use client";

import { useState, useEffect } from "react";
import { Share2, Plus, Trash2, Edit3, Save, X, CheckCircle2 } from "lucide-react";
import { SocialLink } from "@/types/portfolio";
import { getStoredSocialLinks, await setStoredSocialLinks } from "@/lib/storage";

export default function AdminSocialPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<Partial<SocialLink>>({
    platform: "WhatsApp",
    username: "",
    url: "",
    icon: "MessageSquare",
  });
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setSocialLinks(getStoredSocialLinks());
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink.username || !editingLink.url) return;

    let updated: SocialLink[];
    if (editingLink.id) {
      updated = socialLinks.map((item) =>
        item.id === editingLink.id ? (editingLink as SocialLink) : item
      );
    } else {
      const newLink: SocialLink = {
        ...(editingLink as SocialLink),
        id: `soc-${Date.now()}`,
      };
      updated = [...socialLinks, newLink];
    }

    setSocialLinks(updated);
    await setStoredSocialLinks(updated);
    setShowModal(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleDelete = async (id: string) => {
    const updated = socialLinks.filter((item) => item.id !== id);
    setSocialLinks(updated);
    await setStoredSocialLinks(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="text-cyan-400" size={24} />
            Kelola Akun Sosial Media & Kontak
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ubah username, URL tautan, atau tambah platform media sosial Anda.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLink({
              platform: "WhatsApp",
              username: "",
              url: "",
              icon: "MessageSquare",
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Media Sosial</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Akun media sosial berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Grid Social Link Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((item) => (
          <div key={item.id} className="glass-card p-5 border border-white/10 space-y-3 flex items-center justify-between">
            <div className="space-y-1 min-w-0 pr-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{item.platform}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.username}</h3>
              <p className="text-xs text-slate-400 font-mono truncate">{item.url}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditingLink(item);
                  setShowModal(true);
                }}
                className="p-2 rounded-lg glass text-slate-300 hover:text-cyan-400 cursor-pointer"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg glass text-slate-300 hover:text-red-400 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form Edit / Add */}
      {showModal && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-card p-6 sm:p-8 max-w-md w-full space-y-4 border border-white/10 bg-slate-900 text-white rounded-3xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold">{editingLink.id ? "Edit Media Sosial" : "Tambah Media Sosial"}</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Platform</label>
                <select
                  value={editingLink.platform}
                  onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                  <option value="GitHub">GitHub</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Discord">Discord</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Username / Teks Tampilan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: @username atau +628123456789"
                  value={editingLink.username || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">URL Tautan Langsung</label>
                <input
                  type="text"
                  required
                  placeholder="https://wa.me/... atau mailto:... atau https://instagram.com/..."
                  value={editingLink.url || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Simpan Media Sosial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
