"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, FolderGit2, X, Upload, Image as ImageIcon } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { getStoredProjects, await setStoredProjects } from "@/lib/storage";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem>>({
    title: "",
    description: "",
    thumbnail: "",
    category: "Fullstack App",
    techStack: [],
    year: "2026",
    status: "Completed",
    demoUrl: "",
    githubUrl: "",
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditingProject({
          ...editingProject,
          thumbnail: event.target.result as string,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.thumbnail) return;

    let updated: ProjectItem[];
    if (editingProject.id) {
      updated = projects.map((p) =>
        p.id === editingProject.id ? (editingProject as ProjectItem) : p
      );
    } else {
      const newProj: ProjectItem = {
        ...(editingProject as ProjectItem),
        id: `proj-${Date.now()}`,
        techStack: techInput
          ? techInput.split(",").map((s) => s.trim())
          : ["React"],
      };
      updated = [newProj, ...projects];
    }

    setProjects(updated);
    await setStoredProjects(updated);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    await setStoredProjects(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="text-cyan-400" size={24} />
            Kelola Project Portfolio
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Tambah, edit, upload foto thumbnail, atau hapus karya proyek web yang ditampilkan.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject({
              title: "",
              description: "",
              thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
              category: "Fullstack App",
              techStack: ["Next.js", "TypeScript"],
              year: "2026",
              status: "Completed",
              demoUrl: "",
              githubUrl: "",
            });
            setTechInput("Next.js, TypeScript, Tailwind CSS");
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Project Baru</span>
        </button>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card p-5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={proj.thumbnail} alt={proj.title} className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-900 border border-white/10" />
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                  {proj.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10 text-xs">
              <span className="text-slate-500 font-mono">{proj.year}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setTechInput(proj.techStack ? proj.techStack.join(", ") : "");
                    setShowModal(true);
                  }}
                  className="p-2 rounded-lg glass text-slate-300 hover:text-cyan-400 cursor-pointer"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg glass text-slate-300 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card p-6 sm:p-8 max-w-lg w-full space-y-4 border border-white/10 bg-slate-900 text-white rounded-3xl relative my-8">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold">{editingProject.id ? "Edit Project" : "Tambah Project Baru"}</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold">Judul Project</label>
                <input
                  type="text"
                  required
                  placeholder="Nama aplikasi / website project"
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl glass border border-white/10 bg-slate-950 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Upload Foto Thumbnail & Preview */}
              <div className="space-y-2 p-4 rounded-2xl glass border border-cyan-500/30 bg-cyan-500/5">
                <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <ImageIcon size={16} /> Foto Thumbnail Project
                </label>

                {editingProject.thumbnail && (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingProject.thumbnail}
                      alt="Preview Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold cursor-pointer transition-colors">
                      <Upload size={14} />
                      <span>Upload Foto dari Perangkat</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">atau Paste Link Image URL:</span>
                    <input
                      type="text"
                      required
                      placeholder="https://..."
                      value={editingProject.thumbnail || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-xs font-mono mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold">Kategori Project</label>
                <input
                  type="text"
                  required
                  placeholder="Fullstack App / Web Application / Dashboard CMS"
                  value={editingProject.category || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Tech Stack (pisahkan koma)</label>
                <input
                  type="text"
                  placeholder="Next.js, React, TypeScript, Tailwind CSS"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Deskripsi Project</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan fitur utama dan keunggulan project ini..."
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold">Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editingProject.demoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">GitHub Repo URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Simpan Project & Foto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
