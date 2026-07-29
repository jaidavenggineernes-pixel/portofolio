"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  Clock,
  Calendar,
  Sparkles,
  Code2,
  Briefcase,
  Award,
  Layers,
  ChevronRight,
  Terminal,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getStoredProfile, getStoredProjects, getStoredStats, fetchGlobalData } from "@/lib/storage";
import { ProfileData, ProjectItem, StatItem } from "@/types/portfolio";

export default function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [time, setTime] = useState<Date | null>(null);

  // Typing effect state
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = () => {
    setProfile(getStoredProfile());
    setProjects(getStoredProjects());
    setStats(getStoredStats());
  };

  useEffect(() => {
    fetchGlobalData().then(() => loadData());
    const handleDataChange = () => {
      loadData();
    };
    window.addEventListener("portfolio-data-changed", handleDataChange);
    return () => window.removeEventListener("portfolio-data-changed", handleDataChange);
  }, []);

  // Live Clock Effect
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Typing Loop Effect
  useEffect(() => {
    if (!profile) return;
    const typingList = profile.typingText || [];
    if (!typingList || typingList.length === 0) return;

    const handleTyping = () => {
      const fullWord = typingList[wordIndex] || "";

      if (!isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1));
        if (currentWord === fullWord) {
          setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1));
        if (currentWord === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingList.length);
          return;
        }
      }
    };

    const speed = isDeleting ? 40 : 100;
    const timer = setTimeout(
      handleTyping,
      currentWord === (typingList[wordIndex] || "") && !isDeleting ? 1800 : speed
    );

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex, profile]);

  if (!profile) return null;

  const formattedTime = time
    ? time.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  const formattedDate = time
    ? time.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Loading date...";

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-8 sm:py-12">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-cyan-500/10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Selamat Datang di Digital Workspace Saya</span>
          <Sparkles size={14} className="text-cyan-300" />
        </motion.div>

        {/* Hero Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card w-full p-8 sm:p-12 md:p-16 relative z-10 flex flex-col items-center border border-white/20 dark:border-white/10"
        >
          {/* Avatar Image with Pulsing Glowing Border */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.3 }}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 mb-8 relative shadow-2xl group cursor-pointer"
          >
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-slate-950 rounded-full p-1.5 shadow-md">
              <Code2 size={16} className="text-white" />
            </div>
          </motion.div>

          {/* Name & Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 max-w-3xl"
          >
            <p className="text-sm sm:text-base font-semibold tracking-widest text-cyan-400 uppercase">
              Hai, Panggil saya <span className="underline decoration-cyan-400 underline-offset-4 font-bold">{profile.nickname}</span>
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              {profile.fullName}
            </h1>

            {/* Typing Role Animation */}
            <div className="h-10 flex items-center justify-center text-lg sm:text-2xl font-mono text-slate-700 dark:text-slate-300 font-medium">
              <Terminal size={20} className="mr-2 text-cyan-400 shrink-0" />
              <span>{currentWord}</span>
              <span className="w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2">
              {profile.bio}
            </p>
          </motion.div>

          {/* Live Clock & Current Date Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono glass px-6 py-3 rounded-2xl border border-white/10 text-slate-700 dark:text-slate-300"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyan-400 animate-spin-slow" />
              <span className="font-bold text-cyan-400">{formattedTime}</span>
              <span className="text-xs text-slate-400">WIB</span>
            </div>
            <div className="w-px h-4 bg-slate-400/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-400" />
              <span>{formattedDate}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
          >
            <Link
              href="/portfolio"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>View Portfolio</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold glass text-slate-900 dark:text-white hover:bg-slate-200/80 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border border-white/20"
            >
              <Mail size={18} className="text-cyan-400" />
              <span>Contact Me</span>
            </Link>

            <a
              href={profile.cvUrl || "/assets/cv_sample.pdf"}
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold glass text-slate-900 dark:text-white hover:bg-slate-200/80 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border border-white/20"
            >
              <Download size={18} className="text-purple-400" />
              <span>Download CV</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Overview Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = (LucideIcons as any)[stat.iconName] || LucideIcons.Activity;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center space-y-2"
            >
              <IconComponent className={`w-8 h-8 ${stat.color}`} />
              <div className="space-y-1">
                <h3 className={`text-3xl font-black ${stat.color}`}>
                  {stat.id === "stat-1" && projects.length > 0 ? `${projects.length}+` : stat.count}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Featured Projects Highlight */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Beberapa karya terbaik yang telah saya buat dengan teknologi modern.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Lihat Semua</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card overflow-hidden group border border-white/10"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-slate-950/70 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  {project.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
