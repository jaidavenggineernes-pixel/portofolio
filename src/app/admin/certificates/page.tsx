"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Award, X } from "lucide-react";
import { CertificateItem } from "@/types/portfolio";
import { getStoredCertificates, setStoredCertificates } from "@/lib/storage";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCert, setNewCert] = useState({
    title: "",
    issuer: "",
    issueDate: "2026-01-01",
    fileUrl: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800",
    category: "Web Development",
  });

  useEffect(() => {
    setCerts(getStoredCertificates());
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const item: CertificateItem = {
      ...newCert,
      id: `cert-${Date.now()}`,
    };
    const updated = [item, ...certs];
    setCerts(updated);
    await setStoredCertificates(updated);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    const updated = certs.filter((c) => c.id !== id);
    setCerts(updated);
    await setStoredCertificates(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-purple-400" size={24} />
            Kelola Sertifikat
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Tambah atau hapus sertifikat kompetensi dan lisensi profesional.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Sertifikat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div key={c.id} className="glass-card p-5 border border-white/10 space-y-3 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase">{c.category}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{c.title}</h3>
              <p className="text-xs text-slate-400">{c.issuer} • {c.issueDate}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="p-2 rounded-lg glass text-slate-300 hover:text-red-400 shrink-0"
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
            <h3 className="text-xl font-bold">Tambah Sertifikat</h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Nama Sertifikat</label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Penerbit (Issuer)</label>
                <input
                  type="text"
                  required
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Tanggal Terbit</label>
                <input
                  type="date"
                  required
                  value={newCert.issueDate}
                  onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Gambar / File URL</label>
                <input
                  type="text"
                  required
                  value={newCert.fileUrl}
                  onChange={(e) => setNewCert({ ...newCert, fileUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass border border-white/10 bg-slate-950 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
              >
                Simpan Sertifikat
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
