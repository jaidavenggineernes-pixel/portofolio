"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", features: "" });
  const [file, setFile] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch {
      console.error("Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("features", formData.features);
    if (file) data.append("file", file);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
        setFormData({ title: "", description: "", price: "", features: "" });
        setFile(null);
      }
    } catch {
      console.error("Failed to add service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      const res = await fetch("/api/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        await fetchData();
      }
    } catch {
      console.error("Failed to delete service");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Kelola Layanan Bisnis</h2>
          <p className="text-slate-400 text-sm">Tambah, edit, atau hapus daftar layanan/jasa yang Anda tawarkan.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} /> Tambah Layanan
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Cari layanan..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-800">
                <th className="p-4 font-medium">Ikon/Gambar</th>
                <th className="p-4 font-medium">Nama Layanan</th>
                <th className="p-4 font-medium">Harga</th>
                <th className="p-4 font-medium">Fitur</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada layanan. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                services.map((service, index) => {
                  let feats = "";
                  try {
                    const parsed = JSON.parse(service.features);
                    feats = Array.isArray(parsed) ? parsed.join(", ") : service.features;
                  } catch {
                    feats = service.features;
                  }

                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={service.id} 
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-4">
                        {service.icon && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800">
                            <Image src={service.icon} alt={service.title} fill className="object-cover" />
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-white font-medium">{service.title}</p>
                      </td>
                      <td className="p-4 text-green-400 font-semibold">{service.price || "-"}</td>
                      <td className="p-4 text-slate-300 text-sm max-w-xs truncate">{feats}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleDelete(service.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Layanan */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white">Tambah Layanan Baru</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAdd} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Upload Ikon/Gambar Layanan (Opsional)</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-800 border-dashed rounded-lg cursor-pointer bg-slate-950 hover:bg-slate-900 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-slate-500 mb-2" />
                      <p className="text-sm text-slate-400 font-medium">{file ? file.name : "Klik untuk upload gambar"}</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Nama Layanan</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Pembuatan Website E-Commerce"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Deskripsi Layanan</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Website toko online lengkap dengan payment gateway..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Harga (Opsional)</label>
                  <input 
                    type="text" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Mulai dari Rp 2.500.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Fitur Utama (pisahkan dengan koma)</label>
                  <input 
                    type="text" 
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Domain Gratis, Revisi 3x, Support 1 Bulan"
                  />
                </div>
                
                <div className="pt-4 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 font-medium transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
