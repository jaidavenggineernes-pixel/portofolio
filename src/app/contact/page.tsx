"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import {
  WhatsappIcon,
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TiktokIcon,
  DiscordIcon,
} from "@/components/SocialIcons";
import { getStoredMessages, setStoredMessages, getStoredSocialLinks } from "@/lib/storage";
import { SocialLink } from "@/types/portfolio";

export default function ContactPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = () => {
    setSocialLinks(getStoredSocialLinks());
  };

  useEffect(() => {
    loadData();
    const handleDataChange = () => {
      loadData();
    };
    window.addEventListener("portfolio-data-changed", handleDataChange);
    return () => window.removeEventListener("portfolio-data-changed", handleDataChange);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {}

    const newMsg = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const current = getStoredMessages();
    setStoredMessages([newMsg, ...current]);

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "WhatsApp": return <WhatsappIcon className="text-emerald-400" size={22} />;
      case "Email": return <EmailIcon className="text-blue-400" size={22} />;
      case "GitHub": return <GithubIcon className="text-purple-400" size={22} />;
      case "LinkedIn": return <LinkedinIcon className="text-cyan-400" size={22} />;
      case "Instagram": return <InstagramIcon className="text-pink-400" size={22} />;
      case "TikTok": return <TiktokIcon className="text-red-400" size={22} />;
      case "Discord": return <DiscordIcon className="text-indigo-400" size={22} />;
      default: return <EmailIcon className="text-cyan-400" size={22} />;
    }
  };

  return (
    <div className="space-y-16 py-4 sm:py-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
        >
          <Mail size={14} />
          <span>Get In Touch</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Hubungi <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Saya</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Punya penawaran proyek, pertanyaan, atau ingin sekadar berdiskusi? Jangan ragu untuk mengirim pesan.
        </p>
      </section>

      {/* Main Grid: Direct Contact Social Links + Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column: Direct Social Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="glass-card p-6 space-y-4 border border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin size={18} className="text-cyan-400" />
              Kontak Langsung
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Klik salah satu icon di bawah ini untuk membuka kanal komunikasi langsung.
            </p>

            <div className="space-y-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl glass hover:border-cyan-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform">
                    {getSocialIcon(link.platform)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-slate-400">{link.platform}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                      {link.username}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="glass-card p-6 sm:p-8 space-y-6 border border-white/10">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Isi formulir berikut dan pesan Anda akan tersimpan otomatis di database dashboard saya.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-3"
              >
                <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Pesan Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-300">
                  Terima kasih telah menghubungi saya. Saya akan membalas pesan Anda sesegera mungkin.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 text-xs font-bold rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Kirim Pesan Lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nama Lengkap <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Alamat Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subjek / Judul Pesan <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Contoh: Penawaran Project Web"
                    className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Isi Pesan <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan Anda secara detail..."
                    className="w-full px-4 py-2.5 rounded-xl glass border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Mengirim Pesan...</span>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
