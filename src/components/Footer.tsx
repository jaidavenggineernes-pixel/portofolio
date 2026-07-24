"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from "@/components/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/40 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl transition-colors duration-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                JaiAsis.
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Transforming vision into fluid digital experiences through modern architecture, glassmorphic design, and smooth interactions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:alif.raditya@example.com"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <EmailIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-900 dark:text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-cyan-400 transition-colors">Profile & Skills</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio & Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Me</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-cyan-400 text-xs text-slate-500 dark:text-slate-500 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-slate-900 dark:text-white uppercase">
              Location & Contact
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Jakarta, Indonesia
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Available for Freelance & Fulltime positions worldwide.
            </p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-slate-200/40 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>© {currentYear} JaiAsis (Alif Raditya). All Rights Reserved. Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
