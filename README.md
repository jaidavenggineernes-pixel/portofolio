# 🚀 JaiAsis - Modern Premium Personal Portfolio Website & CMS

Website portfolio pribadi modern, interaktif, elegan, dan siap pakai (*production-ready*) berbasis **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, dan Supabase**.

Dilengkapi dengan desain **Liquid Glass (Glassmorphism)**, tema gelap Obsidian sebagai default, animasi halus, kursor kustom interaktif, live clock, galeri foto masonry, modal pratinjau sertifikat/project, serta **Dashboard Admin CMS (`/admin`)** penuh untuk mengelola seluruh isi website tanpa perlu mengubah kode!

---

## ✨ Fitur Utama

- 🎨 **Desain Liquid Glass & Obsidian Dark Mode**: Tampilan futuristik setara Apple, Linear.app, Raycast, & Framer dengan tombol toggle Light/Dark Mode.
- ⚡ **Animasi & Interaktivitas Tinggi**: 
  - Splash loading screen animasi logo & progress bar.
  - Follower Custom Animated Cursor dengan efek scale & glow saat hover.
  - Particle Canvas aurora & gradient mesh pada latar belakang.
  - Scroll reveal animations (Fade Up, Zoom, Blur Reveal) menggunakan Framer Motion.
  - Live Clock & Date widget real-time.
  - Typing animation profesional untuk pergantian status/peran.
- 👤 **Halaman Profile Lengkap**:
  - Kartu biografi (Nama lengkap, panggilan, umur, lokasi, pendidikan, hobi, minat, motto).
  - Vertical Journey Timeline interaktif.
  - Animated Skill Progress Bar berkategori (Frontend, Backend, UI Design, Database, Editing, Photography, AI Tools).
  - Tech Stack Badges berikona glowing.
- 📁 **Halaman Portfolio & Gallery**:
  - Filter kategori **Project** (Thumbnail, Tech badges, status, link demo, GitHub repo, & detail modal preview).
  - Kartu **Certificate** (Informasi penerbit, tanggal, modal preview, & tombol direct download).
  - **Documentation** (Masonry photo gallery dengan Lightbox viewer layar penuh).
- ✉️ **Halaman Contact**:
  - Link kontak langsung berikon interaktif (WhatsApp, Email, GitHub, LinkedIn, Instagram, TikTok, Discord).
  - Form Kontak fungsional yang menyimpan pesan langsung ke database.
- 🔐 **Admin CMS Dashboard (`/admin`)**:
  - Login terproteksi dengan kredensial aman / Supabase Auth.
  - Manajemen penuh (CRUD): Ubah profil, project, sertifikat, galeri foto, skill, sosial media, dan baca pesan masuk.
- ⚡ **Dual Database & Fallback Ready**: Otomatis dapat langsung dijalankan dan dicoba tanpa memerlukan konfigurasi Supabase awal (menggunakan fallback mock data layer).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide Icons, React Icons
- **Backend / DB**: Next.js API Routes / Server Actions, Supabase (Auth, Postgres Database, Storage)
- **Deployment**: Vercel Ready

---

## 💻 Cara Install & Menjalankan Project

### 1. Prasyarat
Pastikan komputer Anda sudah terinstall **Node.js** (versi 18+ direkomendasikan) dan **npm** / **yarn** / **pnpm**.

### 2. Install Dependensi
Buka terminal pada folder project ini dan jalankan:

```bash
npm install
```

### 3. Menjalankan Server Lokal Dev
Jalankan perintah berikut:

```bash
npm run dev
```

Buka browser dan akses `http://localhost:3000`.

---

## 🗄️ Cara Menghubungkan Supabase (Opsional & Direkomendasikan)

Website ini sudah dirancang agar **langsung bisa berjalan out-of-the-box**. Untuk menghubungkannya dengan instance Supabase Anda sendiri:

### Langkah 1: Buat Project Supabase Baru
1. Buka [Supabase Dashboard](https://supabase.com) dan buat project baru.
2. Dapatkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari menu **Project Settings > API**.

### Langkah 2: Buat File `.env.local`
Buat file bernama `.env.local` pada akar folder project, lalu isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Langkah 3: Jalankan Schema Migration SQL
1. Masuk ke **SQL Editor** pada Supabase Dashboard Anda.
2. Buka file `supabase_schema.sql` yang ada di root project ini, salin seluruh kodenya, lalu *paste* dan **Run** di Supabase SQL Editor.
3. Di bagian **Storage**, buat 5 bucket publik:
   - `projects`
   - `gallery`
   - `certificate`
   - `avatar`
   - `cover`

---

## 🔐 Cara Mengelola Dashboard Admin (`/admin`)

- Akses URL: `http://localhost:3000/admin/login`
- **Kredensial Default Demo**:
  - **Email**: `admin@example.com`
  - **Password**: `admin123`

Melalui Dashboard Admin, Anda dapat:
1. Mengubah nama, bio, motto, dan teks typing animation di menu **Profile**.
2. Menambah, mengedit, atau menghapus **Projects**, **Certificates**, **Documentation Photos**, dan **Skills**.
3. Membaca dan menghapus pesan pengunjung di menu **Messages Inbox**.

---

## 🌐 Cara Deploy ke Vercel

1. Push repository project Anda ke GitHub.
2. Buka [Vercel Dashboard](https://vercel.com) dan pilih **Add New Project**.
3. Import repository GitHub Anda.
4. Masukkan Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`) jika ada.
5. Klik **Deploy**! Project Anda akan aktif secara instan dalam beberapa detik.

---

## 🎨 Kustomisasi Warna & Logo

- **Warna & Tema**: Ubah variabel warna gradient & glassmorphism di file [`src/app/globals.css`](file:///Users/mac/portfolio/src/app/globals.css).
- **Text Logo**: Ubah `JaiAsis.` di [`src/components/Navbar.tsx`](file:///Users/mac/portfolio/src/components/Navbar.tsx) atau lewat menu Admin Settings.

---

## 📄 Lisensi

Dibuat dengan ❤️ untuk kebutuhan identitas digital & branding profesional.
