"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, BarChart2, X, CheckCircle2 } from "lucide-react";
import { StatItem } from "@/types/portfolio";
import { getStoredStats, setStoredStats } from "@/lib/storage";

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<Partial<StatItem>>({});

  useEffect(() => {
    setStats(getStoredStats());
  }, []);

  const handleSave = async () => {
    await setStoredStats(stats);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const startEdit = (stat: StatItem) => {
    setEditingId(stat.id);
    setFormData(stat);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveEdit = () => {
    if (editingId === "new") {
      const newStat: StatItem = {
        id: `stat-${Date.now()}`,
        label: formData.label || "New Stat",
        count: formData.count || "0",
        iconName: formData.iconName || "Activity",
        color: formData.color || "text-cyan-400",
      };
      setStats([...stats, newStat]);
    } else {
      setStats(stats.map((s) => (s.id === editingId ? { ...s, ...formData } as StatItem : s)));
    }
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setStats(stats.filter((s) => s.id !== id));
  };

  const addNew = () => {
    setEditingId("new");
    setFormData({ label: "", count: "", iconName: "Activity", color: "text-cyan-400" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="text-cyan-400" size={24} />
            Statistik Utama (Stats)
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Kelola 4 kotak statistik yang muncul di halaman utama (Home).
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addNew}
            disabled={editingId !== null}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-white/10 hover:bg-slate-700 dark:hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
          >
            <Plus size={16} /> Tambah Data
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all"
          >
            {isSaved ? <CheckCircle2 size={16} /> : <BarChart2 size={16} />}
            {isSaved ? "Tersimpan" : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="glass-card p-5 border border-white/10 hover:border-cyan-500/30 transition-colors group"
          >
            {editingId === stat.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.count || ""}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                  placeholder="Angka (Cth: 10+, 50%, 100+)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={formData.label || ""}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Label (Cth: Completed Projects)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={formData.iconName || ""}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  placeholder="Lucide Icon Name (Cth: Briefcase, Award)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={formData.color || ""}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Tailwind Text Color (Cth: text-cyan-400)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={cancelEdit} className="p-2 text-slate-400 hover:text-white glass rounded-lg">
                    <X size={16} />
                  </button>
                  <button onClick={saveEdit} className="p-2 text-emerald-400 hover:text-emerald-300 glass rounded-lg">
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-2xl font-black ${stat.color}`}>{stat.count}</h3>
                  <p className="text-sm font-semibold text-slate-300">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-1">Icon: {stat.iconName}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(stat)} className="p-2 text-slate-400 hover:text-cyan-400 glass rounded-lg">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(stat.id)} className="p-2 text-slate-400 hover:text-red-400 glass rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {editingId === "new" && (
          <div className="glass-card p-5 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <div className="space-y-4">
              <input
                type="text"
                value={formData.count || ""}
                onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                placeholder="Angka (Cth: 10+, 50%, 100+)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Label (Cth: Completed Projects)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={formData.iconName || ""}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                placeholder="Lucide Icon Name (Cth: Briefcase, Award)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={formData.color || ""}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Tailwind Text Color (Cth: text-cyan-400)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={cancelEdit} className="p-2 text-slate-400 hover:text-white glass rounded-lg">
                  <X size={16} />
                </button>
                <button onClick={saveEdit} className="p-2 text-emerald-400 hover:text-emerald-300 glass rounded-lg">
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
