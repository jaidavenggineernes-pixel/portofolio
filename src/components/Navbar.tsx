"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar inside admin route
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
              isScrolled
                ? "glass shadow-2xl border border-white/20 dark:border-white/10"
                : "bg-white/20 dark:bg-slate-900/30 backdrop-blur-md border border-white/30 dark:border-white/10"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 font-bold text-sm">
                  J
                </div>
              </div>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                JaiAsis.
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/50 dark:bg-slate-950/40 p-1.5 rounded-full border border-slate-200/50 dark:border-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-5 py-2 text-sm font-medium transition-colors"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 dark:border dark:border-cyan-500/30 rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? "text-slate-900 dark:text-cyan-400 font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Actions & Theme Switcher */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitcher />
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles size={14} />
                <span>Hire Me</span>
              </Link>
            </div>

            {/* Mobile Menu Actions */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeSwitcher />
              <button
                aria-label="Toggle menu"
                className="p-2 rounded-full glass text-slate-900 dark:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-6 bg-slate-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-bold transition-all ${
                      isActive
                        ? "text-cyan-400 scale-105"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20"
              >
                Hire Me Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
