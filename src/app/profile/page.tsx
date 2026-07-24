"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  User,
  GraduationCap,
  MapPin,
  Heart,
  Target,
  Sparkles,
  Compass,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { ProfileData, SkillItem, TimelineItem } from "@/types/portfolio";
import { getStoredProfile, getStoredSkills, getStoredTimeline } from "@/lib/storage";

const techStackList = [
  { name: "HTML5", category: "Markup", color: "from-orange-500 to-amber-500" },
  { name: "CSS3", category: "Styling", color: "from-blue-500 to-cyan-500" },
  { name: "JavaScript", category: "Language", color: "from-yellow-400 to-amber-500" },
  { name: "TypeScript", category: "Language", color: "from-blue-600 to-cyan-600" },
  { name: "React 19", category: "Frontend", color: "from-cyan-400 to-blue-500" },
  { name: "Next.js 16", category: "Framework", color: "from-slate-700 to-slate-900" },
  { name: "Tailwind CSS", category: "Styling", color: "from-cyan-400 to-teal-400" },
  { name: "Node.js", category: "Runtime", color: "from-emerald-500 to-green-600" },
  { name: "Supabase", category: "Backend/BaaS", color: "from-emerald-400 to-teal-500" },
  { name: "Git", category: "VCS", color: "from-orange-600 to-red-600" },
  { name: "GitHub", category: "Platform", color: "from-purple-600 to-indigo-600" },
  { name: "Figma", category: "Design", color: "from-pink-500 to-purple-500" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineItem[]>([]);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");

  const skillCategories = ["All", "Frontend", "Backend", "UI Design", "Database", "Editing", "Photography", "AI Tools"];

  const loadData = () => {
    setProfile(getStoredProfile());
    setSkills(getStoredSkills());
    setTimelineEvents(getStoredTimeline());
  };

  useEffect(() => {
    loadData();

    const handleDataChange = () => {
      loadData();
    };

    window.addEventListener("portfolio-data-changed", handleDataChange);
    return () => {
      window.removeEventListener("portfolio-data-changed", handleDataChange);
    };
  }, []);

  const filteredSkills =
    activeSkillCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  if (!profile) return null;

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider"
        >
          <User size={14} />
          <span>Profile & Identity</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Tentang <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Saya</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Mengenal perjalanan, minat, motto hidup, serta keterampilan teknis yang saya miliki.
        </p>
      </section>

      {/* About Me Details Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Profile Avatar & Motto Box */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 flex flex-col items-center text-center space-y-6 md:sticky md:top-28"
        >
          <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {profile.fullName}
            </h3>
            <p className="text-xs font-semibold text-cyan-400">
              ({profile.nickname})
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              {profile.title}
            </p>
          </div>

          {/* Motto Box */}
          <div className="w-full p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs italic text-cyan-300 relative">
            <Sparkles size={14} className="absolute top-2 right-2 text-cyan-400" />
            &quot;{profile.motto}&quot;
          </div>
        </motion.div>

        {/* Detailed Info Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 space-y-6"
        >
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
              <Compass className="text-cyan-400" size={20} />
              Informasi Biografi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Nama Lengkap</span>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{profile.fullName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Nama Panggilan</span>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{profile.nickname}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase">Umur</span>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{profile.age} Tahun</p>
              </div>

              <div className="space-y-1 flex items-start gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Lokasi</span>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                    <MapPin size={14} className="text-red-400" />
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Pendidikan</span>
                <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-purple-400" />
                  {profile.education}
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1">
                  <Heart size={14} className="text-pink-400" /> Hobi & Minat
                </span>
                <div className="flex flex-wrap gap-2">
                  {[...(profile.hobbies || []), ...(profile.interests || [])].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1">
                  <Target size={14} className="text-emerald-400" /> Visi & Tujuan
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  {profile.goals}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Perjalanan Hidup */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Timeline Perjalanan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Jejak langkah perkembangan karir dan pengalaman belajar saya.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 -translate-x-1/2" />

          <div className="space-y-8 relative">
            {timelineEvents.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={evt.id || evt.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 z-10">
                    <Rocket size={18} />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-14 md:ml-0 md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-card p-6 space-y-2 hover:border-cyan-500/40">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {evt.year}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                        {evt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section with Animated Progress Bar */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Keterampilan / Skills
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tingkat kemahiran pada berbagai bidang teknis dan kreasional.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveSkillCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                activeSkillCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                  : "glass text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  {skill.name}
                </span>
                <span className="font-mono text-cyan-400 font-bold">{skill.percentage}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Tech Stack Utama
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Perangkat lunak, bahasa, dan framework yang biasa saya gunakan setiap hari.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {techStackList.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-card p-5 flex flex-col items-center text-center space-y-2 border border-white/10 group"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${item.color} p-[1.5px] shadow-lg group-hover:scale-110 transition-transform`}>
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-xs">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-white pt-1">{item.name}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.category}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
