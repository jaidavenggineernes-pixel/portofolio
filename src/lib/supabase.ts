import { createClient } from "@supabase/supabase-js";
import {
  ProfileData,
  ProjectItem,
  CertificateItem,
  DocumentationItem,
  SkillItem,
  SocialLink,
  ContactMessage,
} from "@/types/portfolio";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bcwpnbwznvcvegdmhnjt.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_lUfwt_xoaValHTyRt1WCYw_bbLrHv0e";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initial Fallback Data
export const initialProfile: ProfileData = {
  fullName: "Alif Rizqi Adi Al Jailani",
  nickname: "ALIF / JAI",
  title: "Web Developer",
  bio: "Seorang Web Developer passionate yang berfokus pada pembuatan website modern, animasi interaktif, dan performa tinggi.",
  motto: "Coding Future",
  age: 21,
  location: "Indonesia",
  education: "Teknik Informatika",
  hobbies: ["Coding", "UI/UX Design", "Technology"],
  interests: ["Web Development", "Artificial Intelligence", "Creative Media"],
  goals: "Membangun produk digital masa depan yang inovatif dan bermanfaat.",
  typingText: [
    "Web Developer",
    "Creative Designer",
    "Fullstack Enthusiast"
  ],
  cvUrl: "/assets/cv_sample.pdf",
  avatarUrl: "/avatar.png",
  coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
};

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Vanguard AI Engine",
    description: "Platform kecerdasan buatan berbasis Next.js App Router dan OpenAI API untuk analisis data prediktif secara real-time.",
    longDescription: "Vanguard AI Engine adalah platform analitik cerdas yang menggabungkan visualisasi data berkecepatan tinggi dengan pemrosesan bahasa alami. Dilengkapi dengan antarmuka futuristik berbasis liquid glass.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    category: "Fullstack App",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI"],
    year: "2026",
    status: "Featured",
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/vanguard",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Nexus Sound Music Player",
    description: "Aplikasi streaming musik modern dengan audio visualizer 3D canvas interaktif dan equalizer terintegrasi.",
    longDescription: "Sistem pemutar musik berbasis web dengan integrasi Web Audio API, animasi lirik real-time, serta fitur playlist berbagi dengan pengguna lain.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    category: "Web Application",
    techStack: ["React 19", "Three.js", "Framer Motion", "Tailwind CSS"],
    year: "2025",
    status: "Completed",
    demoUrl: "https://example.com/sound",
    githubUrl: "https://github.com/example/sound",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Lumina Cloud Dashboard",
    description: "Sistem manajemen inventaris & e-commerce analytics dengan dukungan dark mode dan real-time WebSocket.",
    longDescription: "Dashboard enterprise dengan keamanan terenkripsi, manajemen pengguna berbasis peran (RBAC), serta modul pelaporan PDF otomatis.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    category: "Dashboard CMS",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Recharts"],
    year: "2025",
    status: "Completed",
    demoUrl: "https://example.com/lumina",
    githubUrl: "https://github.com/example/lumina",
    featured: false,
  },
];

export const initialCertificates: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Fullstack Web Developer Certification",
    issuer: "Google & Dicoding Academy",
    issueDate: "2025-11-15",
    credentialUrl: "https://example.com/credential/123",
    fileUrl: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800",
    category: "Web Development",
  },
  {
    id: "cert-2",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "2025-08-20",
    credentialUrl: "https://aws.amazon.com",
    fileUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800",
    category: "Cloud & DevOps",
  },
  {
    id: "cert-3",
    title: "UI/UX Professional Design Mastery",
    issuer: "Meta & Coursera",
    issueDate: "2024-12-10",
    credentialUrl: "https://coursera.org",
    fileUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    category: "UI/UX Design",
  },
];

export const initialDocumentation: DocumentationItem[] = [
  {
    id: "doc-1",
    title: "Keynote Speaker @ Tech Summit 2026",
    description: "Membawakan materi mengenai 'The Future of Liquid Web Animation and Next.js Architecture'.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
    date: "2026-02-10",
    category: "Conference",
  },
  {
    id: "doc-2",
    title: "Hackathon Champion Team Photo",
    description: "Meraih juara pertama dalam ajang National Creative Tech Hackathon.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    date: "2025-10-05",
    category: "Competition",
  },
  {
    id: "doc-3",
    title: "Developer Community Workshop",
    description: "Sesi live coding bersama komunitas Web Developer Indonesia.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    date: "2025-06-18",
    category: "Workshop",
  },
  {
    id: "doc-4",
    title: "Creative Workspace Desk Setup",
    description: "Lingkungan kerja produktif yang dipersonalisasi untuk koding dan desain.",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    date: "2025-01-12",
    category: "Lifestyle",
  },
];

export const initialSkills: SkillItem[] = [
  { id: "sk-1", name: "React / Next.js (App Router)", category: "Frontend", percentage: 95 },
  { id: "sk-2", name: "TypeScript / JavaScript ES6+", category: "Frontend", percentage: 92 },
  { id: "sk-3", name: "Tailwind CSS & Glassmorphism UI", category: "Frontend", percentage: 96 },
  { id: "sk-4", name: "Framer Motion & GSAP Animations", category: "Frontend", percentage: 90 },
  { id: "sk-5", name: "Node.js & Express REST/GraphQL APIs", category: "Backend", percentage: 88 },
  { id: "sk-6", name: "Supabase & Auth / Storage Architecture", category: "Backend", percentage: 90 },
  { id: "sk-7", name: "Figma & High-Fidelity Prototyping", category: "UI Design", percentage: 85 },
  { id: "sk-8", name: "PostgreSQL & Prisma ORM", category: "Database", percentage: 87 },
  { id: "sk-9", name: "Adobe Premiere & DaVinci Resolve", category: "Editing", percentage: 82 },
  { id: "sk-10", name: "Landscape & Portrait Photography", category: "Photography", percentage: 80 },
  { id: "sk-11", name: "AI Tools (ChatGPT, Midjourney, Claude)", category: "AI Tools", percentage: 94 },
];

export const initialSocialLinks: SocialLink[] = [
  { id: "soc-1", platform: "WhatsApp", url: "https://wa.me/6281234567890", username: "+62 812-3456-7890", icon: "MessageSquare" },
  { id: "soc-2", platform: "Email", url: "mailto:alif.raditya@example.com", username: "alif.raditya@example.com", icon: "Mail" },
  { id: "soc-3", platform: "GitHub", url: "https://github.com", username: "github.com/alif-raditya", icon: "Github" },
  { id: "soc-4", platform: "LinkedIn", url: "https://linkedin.com", username: "linkedin.com/in/alif-raditya", icon: "Linkedin" },
  { id: "soc-5", platform: "Instagram", url: "https://instagram.com", username: "@alif_radit", icon: "Instagram" },
  { id: "soc-6", platform: "TikTok", url: "https://tiktok.com", username: "@alif_code", icon: "Video" },
  { id: "soc-7", platform: "Discord", url: "https://discord.com", username: "Jai#1234", icon: "Disc" },
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Budi Santoso",
    email: "budi@techcorp.com",
    subject: "Penawaran Project Web Application",
    message: "Halo Alif, kami tertarik untuk bekerja sama dalam pembuatan platform dashboard perusahaan kami.",
    createdAt: "2026-07-22T14:30:00.000Z",
    read: false,
  },
];
