"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Cpu, X, CheckCircle2 } from "lucide-react";
import { TechStackItem } from "@/types/portfolio";
import { getStoredTechStack, setStoredTechStack } from "@/lib/storage";

export default function AdminTechStackPage() {
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<Partial<TechStackItem>>({});

  useEffect(() => {
    setTechStack(getStoredTechStack());
  }, []);

  const handleSave = async () => {
    await setStoredTechStack(techStack);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const startEdit = (item: TechStackItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const saveEdit = () => {
    if (editingId === "new") {
      const newItem: TechStackItem = {
        id: `tech-${Date.now()}`,
        name: formData.name || "New Tech",
        category: formData.category || "Frontend",
        color: formData.color || "from-cyan-400 to-blue-500",
      };
      setTechStack([...techStack, newItem]);
    } else {
      setTechStack(techStack.map((t) => (t.id === editingId ? { ...t, ...formData } as TechStackItem : t)));
    }
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setTechStack(techStack.filter((t) => t.id !== id));
  };

  const addNew = () => {
    setEditingId("new");
    setFormData({ name: "", category: "Frontend", color: "from-cyan-400 to-blue-500" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="text-purple-400" size={24} />
            Tech Stack Utama
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Kelola daftar teknologi utama yang ditampilkan di halaman Profile.
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
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25 transition-all"
          >
            {isSaved ? <CheckCircle2 size={16} /> : <Cpu size={16} />}
            {isSaved ? "Tersimpan" : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {techStack.map((item) => (
          <div
            key={item.id}
            className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-colors group flex flex-col items-center text-center relative"
          >
            {editingId === item.id ? (
              <div className="space-y-3 w-full">
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama (Cth: Next.js)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Kategori (Cth: Framework)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.color || ""}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Warna (Cth: from-cyan-400 to-blue-500)"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <div className="flex justify-center gap-2 pt-2">
                  <button onClick={cancelEdit} className="p-2 text-slate-400 hover:text-white glass rounded-lg">
                    <X size={14} />
                  </button>
                  <button onClick={saveEdit} className="p-2 text-emerald-400 hover:text-emerald-300 glass rounded-lg">
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-[1.5px] shadow-lg mb-3`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-sm">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.category}</span>
                
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 p-1 rounded-lg backdrop-blur-md">
                  <button onClick={() => startEdit(item)} className="p-1.5 text-slate-300 hover:text-cyan-400">
                    <Edit3 size={12} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-300 hover:text-red-400">
                    <Trash2 size={12} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {editingId === "new" && (
          <div className="glass-card p-5 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-col items-center">
            <div className="space-y-3 w-full">
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama (Cth: Next.js)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Kategori (Cth: Framework)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={formData.color || ""}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Warna (Cth: from-cyan-400 to-blue-500)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <div className="flex justify-center gap-2 pt-2">
                <button onClick={cancelEdit} className="p-2 text-slate-400 hover:text-white glass rounded-lg">
                  <X size={14} />
                </button>
                <button onClick={saveEdit} className="p-2 text-emerald-400 hover:text-emerald-300 glass rounded-lg">
                  <CheckCircle2 size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
