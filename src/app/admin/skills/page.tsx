"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckSquare, X } from "lucide-react";
import { SkillItem } from "@/types/portfolio";
import { getStoredSkills, setStoredSkills } from "@/lib/storage";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend" as SkillItem["category"],
    percentage: 85,
  });

  useEffect(() => {
    setSkills(getStoredSkills());
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const item: SkillItem = {
      ...newSkill,
      id: `sk-${Date.now()}`,
    };
    const updated = [item, ...skills];
    setSkills(updated);
    await setStoredSkills(updated);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    await setStoredSkills(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="text-emerald-400" size={24} />
            Kelola Skills & Progress Bar
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Atur persentase kemahiran dan kategori keterampilan.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s.id} className="glass-card p-4 border border-white/10 space-y-2 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">{s.category}</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</h4>
              <p className="text-xs font-mono text-cyan-400 font-bold">{s.percentage}%</p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className="p-2 rounded-lg glass text-slate-300 hover:text-red-400 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-card p-6 sm:p-8 max-w-md w-full space-y-4 border border-white/10 bg-slate-900 text-white rounded-3xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold">Tambah Skill Baru</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Nama Keterampilan</label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Kategori</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="UI Design">UI Design</option>
                  <option value="Database">Database</option>
                  <option value="Editing">Editing</option>
                  <option value="Photography">Photography</option>
                  <option value="AI Tools">AI Tools</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold">Persentase ({newSkill.percentage}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={newSkill.percentage}
                  onChange={(e) => setNewSkill({ ...newSkill, percentage: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
              >
                Simpan Skill
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
