"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        >
          {/* Animated Background Mesh in Loading */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_60%)] animate-pulse" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400 font-extrabold text-xl tracking-tighter">
                  J
                </div>
              </div>
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                JaiAsis.
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage & Status Text */}
            <div className="flex items-center justify-between w-48 sm:w-64 text-xs font-mono text-slate-400">
              <span>INITIALIZING...</span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
