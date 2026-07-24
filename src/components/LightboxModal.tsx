"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag } from "lucide-react";
import { DocumentationItem } from "@/types/portfolio";

interface LightboxModalProps {
  item: DocumentationItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full glass-card border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 bg-slate-900/90 text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white transition-all backdrop-blur-md border border-white/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Large Image */}
          <div className="relative w-full max-h-[70vh] flex items-center justify-center bg-slate-950 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>

          {/* Photo Caption */}
          <div className="p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Tag size={12} />
                {item.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar size={12} />
                {item.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {item.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
