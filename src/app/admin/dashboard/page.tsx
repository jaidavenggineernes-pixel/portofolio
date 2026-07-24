"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderGit2,
  Award,
  Camera,
  MessageSquare,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  initialProjects,
  initialCertificates,
  initialDocumentation,
  initialMessages,
} from "@/lib/supabase";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Projects", count: initialProjects.length, href: "/admin/projects", icon: FolderGit2, color: "text-cyan-400" },
    { label: "Certificates", count: initialCertificates.length, href: "/admin/certificates", icon: Award, color: "text-purple-400" },
    { label: "Gallery Photos", count: initialDocumentation.length, href: "/admin/documentation", icon: Camera, color: "text-blue-400" },
    { label: "Inbox Messages", count: initialMessages.length, href: "/admin/messages", icon: MessageSquare, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-8 space-y-4 border border-white/10 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              Control Panel Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Dashboard Content Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Kelola data proyek, sertifikat, galeri foto, pesan masuk, dan profil Anda dari satu tempat.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors shrink-0"
          >
            <span>Preview Public Site</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-5 space-y-3 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <Link href={stat.href} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                <span>View</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.count}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action Buttons */}
      <div className="glass-card p-6 space-y-4 border border-white/10">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp size={18} className="text-cyan-400" />
          Aksi Cepat Tambah Data
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/projects"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:border-cyan-500/50 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-all"
          >
            <Plus size={16} />
            <span>Tambah Project Baru</span>
          </Link>

          <Link
            href="/admin/certificates"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:border-cyan-500/50 text-xs font-bold text-slate-900 dark:text-white hover:text-purple-400 transition-all"
          >
            <Plus size={16} />
            <span>Tambah Sertifikat</span>
          </Link>

          <Link
            href="/admin/documentation"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:border-cyan-500/50 text-xs font-bold text-slate-900 dark:text-white hover:text-blue-400 transition-all"
          >
            <Plus size={16} />
            <span>Upload Foto Dokumentasi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
