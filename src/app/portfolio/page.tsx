"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FolderGit2,
  Award,
  Camera,
  ExternalLink,
  Download,
  Eye,
  Calendar,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectItem, CertificateItem, DocumentationItem } from "@/types/portfolio";
import ProjectModal from "@/components/ProjectModal";
import CertificateModal from "@/components/CertificateModal";
import LightboxModal from "@/components/LightboxModal";
import {
  getStoredProjects,
  getStoredCertificates,
  getStoredDocumentation,
  fetchGlobalData,
} from "@/lib/storage";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "documentation">("projects");

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [documentation, setDocumentation] = useState<DocumentationItem[]>([]);

  // Selected Items for Modals
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentationItem | null>(null);

  // Category Filter inside Projects
  const [projectCategory, setProjectCategory] = useState<string>("All");
  const projectCategories = ["All", "Fullstack App", "Web Application", "Dashboard CMS"];

  const loadAllData = () => {
    setProjects(getStoredProjects());
    setCertificates(getStoredCertificates());
    setDocumentation(getStoredDocumentation());
  };

  useEffect(() => {
    fetchGlobalData().then(() => loadAllData());

    const handleDataChange = () => {
      loadAllData();
    };

    window.addEventListener("portfolio-data-changed", handleDataChange);
    return () => {
      window.removeEventListener("portfolio-data-changed", handleDataChange);
    };
  }, []);

  const filteredProjects =
    projectCategory === "All"
      ? projects
      : projects.filter((p) => p.category === projectCategory);

  return (
    <div className="space-y-12 py-4 sm:py-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
        >
          <Layers size={14} />
          <span>Showcase & Work</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Portfolio & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dokumentasi</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Kumpulan proyek unggulan, sertifikat kualifikasi, serta dokumentasi kegiatan profesional.
        </p>
      </section>

      {/* Main Category Tabs Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full glass border border-white/20 dark:border-white/10 max-w-md w-full justify-between">
          {[
            { id: "projects", label: "Project", icon: FolderGit2 },
            { id: "certificates", label: "Certificate", icon: Award },
            { id: "documentation", label: "Documentation", icon: Camera },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all w-1/3 ${
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="portfolio-tab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <tab.icon size={16} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === "projects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Sub-Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  projectCategory === cat
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "glass text-slate-600 dark:text-slate-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card overflow-hidden group border border-white/10 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative h-48 w-full overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs font-bold text-white border border-white/30">
                        <Eye size={14} />
                        View Details
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">{project.year}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500">Internal</span>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full glass text-slate-600 dark:text-slate-300 hover:text-white transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 2: CERTIFICATES */}
      {activeTab === "certificates" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setSelectedCertificate(cert)}
                  className="relative h-44 w-full overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.fileUrl}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs font-bold text-white border border-white/30">
                      <Eye size={14} />
                      Preview Certificate
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <h3
                    onClick={() => setSelectedCertificate(cert)}
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Penerbit: <strong>{cert.issuer}</strong>
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                    <Calendar size={12} />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                >
                  <span>Preview</span>
                  <Eye size={12} />
                </button>

                <a
                  href={cert.fileUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  <Download size={12} />
                  <span>Download</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* TAB 3: DOCUMENTATION (Masonry Photo Gallery) */}
      {activeTab === "documentation" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {documentation.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedDoc(doc)}
              className="break-inside-avoid glass-card overflow-hidden group border border-white/10 cursor-pointer"
            >
              <div className="relative overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {doc.category}
                  </span>
                  <h4 className="text-sm font-bold text-white pt-1">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modals */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
      <LightboxModal item={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}
