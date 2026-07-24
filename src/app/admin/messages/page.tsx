"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, Calendar, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "@/types/portfolio";
import { getStoredMessages, setStoredMessages } from "@/lib/storage";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setMessages(getStoredMessages());
  }, []);

  const toggleRead = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, read: !m.read } : m
    );
    setMessages(updated);
    setStoredMessages(updated);
  };

  const handleDelete = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setStoredMessages(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-cyan-400" size={24} />
            Pesan Masuk (Inbox)
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Pesan dan penawaran proyek yang dikirimkan oleh pengunjung melalui contact form.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-400 text-sm">
            Belum ada pesan masuk.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card p-6 border space-y-3 transition-all ${
                msg.read
                  ? "border-white/10 opacity-70"
                  : "border-cyan-500/40 bg-cyan-500/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{msg.name}</h3>
                    <span className="text-xs text-cyan-400 font-medium">&lt;{msg.email}&gt;</span>
                  </div>
                  <h4 className="text-xs font-semibold text-purple-400 pt-1">Subjek: {msg.subject}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleRead(msg.id)}
                    className="p-2 rounded-lg glass text-slate-300 hover:text-cyan-400 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    <span>{msg.read ? "Dibaca" : "Tandai Dibaca"}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-lg glass text-slate-300 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-white/5 font-sans">
                {msg.message}
              </p>

              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <Calendar size={12} />
                <span>Diterima: {new Date(msg.createdAt).toLocaleString("id-ID")}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
