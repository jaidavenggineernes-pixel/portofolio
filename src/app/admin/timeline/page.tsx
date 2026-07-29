"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Rocket, X, CheckCircle2 } from "lucide-react";
import { TimelineItem } from "@/types/portfolio";
import { getStoredTimeline, setStoredTimeline } from "@/lib/storage";

export default function AdminTimelinePage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TimelineItem>>({
    year: "",
    title: "",
    description: "",
  });
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setTimeline(getStoredTimeline());
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.year) return;

    let updated: TimelineItem[];
    if (editingItem.id) {
      updated = timeline.map((item) =>
        item.id === editingItem.id ? (editingItem as TimelineItem) : item
      );
    } else {
      const newItem: TimelineItem = {
        ...(editingItem as TimelineItem),
        id: `tl-${Date.now()}`,
      };
      updated = [...timeline, newItem];
    }

    setTimeline(updated);
    await setStoredTimeline(updated);
    setShowModal(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleDelete = async (id: string) => {
    const updated = timeline.filter((item) => item.id !== id);
    setTimeline(updated);
    await setStoredTimeline(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Rocket className="text-cyan-400" size={24} />
            Kelola Timeline Perjalanan Hidup
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Tambah, ubah, atau hapus jejak langkah perjalanan karir & pendidikan Anda.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              year: "2026",
              title: "",
              description: "",
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Event Timeline</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Timeline perjalanan hidup berhasil diperbarui!</span>
        </div>
      )}

      {/* Timeline Item List Cards */}
      <div className="space-y-4">
        {timeline.map((item) => (
          <div key={item.id} className="glass-card p-5 border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0 flex-1">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {item.year}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1">
              <button
                onClick={() => {
                  setEditingItem(item);
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
            <h3 className="text-xl font-bold">{editingItem.id ? "Edit Event Timeline" : "Tambah Event Timeline"}</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Tahun / Periode</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 2024 atau 2025 - Present"
                  value={editingItem.year || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Judul Pencapaian / Peristiwa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Masuk Sekolah / Membuat Project Pertama"
                  value={editingItem.title || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Deskripsi Singkat Perjalanan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Penjelasan detail peristiwa atau pencapaian..."
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Simpan Timeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
