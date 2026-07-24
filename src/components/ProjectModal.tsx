"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Tag, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectItem } from "@/types/portfolio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-card border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 bg-white/90 dark:bg-slate-900/90"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/20 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Image Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/60 px-3 py-1 rounded-full backdrop-blur-md">
                <Calendar size={12} />
                {project.year}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-1.5">
                <Tag size={14} />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Project Status: <strong>{project.status}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <span>Live Preview</span>
                  <ExternalLink size={16} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold glass text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105"
                >
                  <GithubIcon size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
