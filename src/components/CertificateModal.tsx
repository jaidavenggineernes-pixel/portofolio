"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, Award, Calendar, Building2 } from "lucide-react";
import { CertificateItem } from "@/types/portfolio";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

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
          className="relative w-full max-w-2xl glass-card border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 bg-white/95 dark:bg-slate-900/95"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/20 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Certificate Image Preview */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certificate.fileUrl}
              alt={certificate.title}
              className="max-h-full max-w-full object-contain rounded-lg shadow-xl"
            />
          </div>

          {/* Content Details */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Award size={16} />
              <span>{certificate.category}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {certificate.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300 py-2">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-cyan-400" />
                <span>Issued by: <strong>{certificate.issuer}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                <span>Date: <strong>{certificate.issueDate}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-3">
              <a
                href={certificate.fileUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
              >
                <Download size={16} />
                <span>Download Certificate</span>
              </a>

              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold glass text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all hover:scale-105"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
