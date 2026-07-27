import {
  ProfileData,
  ProjectItem,
  CertificateItem,
  DocumentationItem,
  SkillItem,
  SocialLink,
  ContactMessage,
  TimelineItem,
} from "@/types/portfolio";
import {
  initialProfile,
  initialProjects,
  initialCertificates,
  initialDocumentation,
  initialSkills,
  initialSocialLinks,
  initialMessages,
} from "@/lib/supabase";

export const initialTimeline: TimelineItem[] = [
  {
    id: "tl-1",
    year: "2021",
    title: "Awal Belajar & Ketertarikan Teknologi",
    description: "Mulai mengenal pemrograman web dasar (HTML, CSS, JavaScript) dan menyukai dunia estetika UI/UX.",
  },
  {
    id: "tl-2",
    year: "2022",
    title: "Masuk Perguruan Tinggi & Eksplorasi Stack",
    description: "Menempuh studi Teknik Informatika. Mempelajari struktur data, algoritma, serta framework modern seperti React.",
  },
  {
    id: "tl-3",
    year: "2023 - 2024",
    title: "Fokus Fullstack Development & Project Real",
    description: "Mengembangkan berbagai aplikasi web menggunakan Next.js, Node.js, Tailwind CSS, dan Supabase/PostgreSQL.",
  },
  {
    id: "tl-4",
    year: "2025",
    title: "Meraih Sertifikasi & Juara Hackathon",
    description: "Mendapatkan sertifikasi profesional fullstack dari Google/AWS serta menjuarai kompetisi pengembangan aplikasi digital.",
  },
  {
    id: "tl-5",
    year: "2026 - Present",
    title: "Creative Technologist & Open Source",
    description: "Aktif membangun produk digital berefisiensi tinggi dengan desain liquid glass dan pengalaman pengguna interaktif.",
  },
];

// Centralized Cloud Sync POST (will fail gracefully on Vercel without a real DB)
const pushToCloud = async (key: string, data: any) => {
  try {
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: data }),
    });
  } catch {
    // Ignore network drops
  }
};

// Fetch Centralized Cloud Data for all devices on mount
export const fetchGlobalData = async () => {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/data", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.profile) Object.assign(initialProfile, data.profile);
      if (data.projects) { initialProjects.length = 0; initialProjects.push(...data.projects); }
      if (data.certificates) { initialCertificates.length = 0; initialCertificates.push(...data.certificates); }
      if (data.documentation) { initialDocumentation.length = 0; initialDocumentation.push(...data.documentation); }
      if (data.skills) { initialSkills.length = 0; initialSkills.push(...data.skills); }
      if (data.social) { initialSocialLinks.length = 0; initialSocialLinks.push(...data.social); }
      if (data.timeline) { initialTimeline.length = 0; initialTimeline.push(...data.timeline); }
    }
  } catch {
    // Fallback
  }
};

// --- GETTERS & SETTERS (WITH LOCALSTORAGE FALLBACK FOR DEVICE PERSISTENCE) ---

export const getStoredProfile = (): ProfileData => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_profile");
    if (local) return JSON.parse(local);
  }
  return { ...initialProfile };
};

export const setStoredProfile = (profile: ProfileData) => {
  Object.assign(initialProfile, profile);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_profile", JSON.stringify(profile));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("profile", profile);
};

export const getStoredProjects = (): ProjectItem[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_projects");
    if (local) return JSON.parse(local);
  }
  return [...initialProjects];
};

export const setStoredProjects = (projects: ProjectItem[]) => {
  initialProjects.length = 0;
  initialProjects.push(...projects);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("projects", projects);
};

export const getStoredCertificates = (): CertificateItem[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_certificates");
    if (local) return JSON.parse(local);
  }
  return [...initialCertificates];
};

export const setStoredCertificates = (certs: CertificateItem[]) => {
  initialCertificates.length = 0;
  initialCertificates.push(...certs);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_certificates", JSON.stringify(certs));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("certificates", certs);
};

export const getStoredDocumentation = (): DocumentationItem[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_documentation");
    if (local) return JSON.parse(local);
  }
  return [...initialDocumentation];
};

export const setStoredDocumentation = (docs: DocumentationItem[]) => {
  initialDocumentation.length = 0;
  initialDocumentation.push(...docs);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_documentation", JSON.stringify(docs));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("documentation", docs);
};

export const getStoredSkills = (): SkillItem[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_skills");
    if (local) return JSON.parse(local);
  }
  return [...initialSkills];
};

export const setStoredSkills = (skills: SkillItem[]) => {
  initialSkills.length = 0;
  initialSkills.push(...skills);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("skills", skills);
};

export const getStoredSocialLinks = (): SocialLink[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_social");
    if (local) return JSON.parse(local);
  }
  return [...initialSocialLinks];
};

export const setStoredSocialLinks = (links: SocialLink[]) => {
  initialSocialLinks.length = 0;
  initialSocialLinks.push(...links);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_social", JSON.stringify(links));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("social", links);
};

export const getStoredMessages = (): ContactMessage[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_messages");
    if (local) return JSON.parse(local);
  }
  return [...initialMessages];
};

export const setStoredMessages = (messages: ContactMessage[]) => {
  initialMessages.length = 0;
  initialMessages.push(...messages);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_messages", JSON.stringify(messages));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("messages", messages);
};

export const getStoredTimeline = (): TimelineItem[] => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("portfolio_timeline");
    if (local) return JSON.parse(local);
  }
  return [...initialTimeline];
};

export const setStoredTimeline = (timeline: TimelineItem[]) => {
  initialTimeline.length = 0;
  initialTimeline.push(...timeline);
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_timeline", JSON.stringify(timeline));
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("timeline", timeline);
};
