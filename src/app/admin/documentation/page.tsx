"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Camera, X } from "lucide-react";
import { DocumentationItem } from "@/types/portfolio";
import { getStoredDocumentation, setStoredDocumentation } from "@/lib/storage";

export default function AdminDocumentationPage() {
  const [docs, setDocs] = useState<DocumentationItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    date: "2026-02-01",
    category: "Event",
  });

  useEffect(() => {
    setDocs(getStoredDocumentation());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const item: DocumentationItem = {
      ...newDoc,
      id: `doc-${Date.now()}`,
    };
    const updated = [item, ...docs];
    setDocs(updated);
    setStoredDocumentation(updated);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = docs.filter((d) => d.id !== id);
    setDocs(updated);
    setStoredDocumentation(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="text-blue-400" size={24} />
            Kelola Galeri Dokumentasi
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Upload foto kegiatan, seminar, event, atau tempat kerja.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Upload Foto</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {docs.map((d) => (
          <div key={d.id} className="glass-card overflow-hidden border border-white/10 group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.imageUrl} alt={d.title} className="w-full h-36 object-cover" />
            <div className="p-3 space-y-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{d.title}</h4>
              <p className="text-[11px] text-slate-400 truncate">{d.description}</p>
            </div>
            <button
              onClick={() => handleDelete(d.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-red-400 hover:bg-slate-950 cursor-pointer"
            >
              <Trash2 size={14} />
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
            <h3 className="text-xl font-bold">Upload Foto Dokumentasi</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Judul Kegiatan</label>
                <input
                  type="text"
                  required
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Deskripsi Singkat</label>
                <input
                  type="text"
                  required
                  value={newDoc.description}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Image URL</label>
                <input
                  type="text"
                  required
                  value={newDoc.imageUrl}
                  onChange={(e) => setNewDoc({ ...newDoc, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Kategori</label>
                <input
                  type="text"
                  required
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
              >
                Simpan Foto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
