"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, KeyRound, Sparkles, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Email atau password salah.");
      }
    } catch {
      // Fallback demo login
      if (email === "admin@example.com" && password === "admin123") {
        document.cookie = "admin_auth=true; path=/";
        router.push("/admin/dashboard");
      } else {
        setError("Email: admin@example.com | Pass: admin123");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8 sm:p-10 border border-white/20 dark:border-white/10 space-y-6 relative overflow-hidden"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] mx-auto shadow-xl">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Lock size={24} />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Admin Portal
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Masuk untuk mengelola seluruh konten website portfolio.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ShieldCheck size={16} />
              </>
            )}
          </button>
        </form>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 text-center">
          Demo Credential: <strong>admin@example.com</strong> / <strong>admin123</strong>
        </div>
      </motion.div>
    </div>
  );
}
