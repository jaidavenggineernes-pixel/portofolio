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

// Server API Sync Helper
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

// Fetch Latest Server Data for all devices
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
      window.dispatchEvent(new Event("portfolio-data-changed"));
    }
  } catch {
    // Ignore
  }
};

export const getStoredProfile = (): ProfileData => {
  return { ...initialProfile };
};

export const setStoredProfile = (profile: ProfileData) => {
  Object.assign(initialProfile, profile);
  pushToCloud("profile", profile);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredProjects = (): ProjectItem[] => {
  return [...initialProjects];
};

export const setStoredProjects = (projects: ProjectItem[]) => {
  initialProjects.length = 0;
  initialProjects.push(...projects);
  pushToCloud("projects", projects);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredCertificates = (): CertificateItem[] => {
  return [...initialCertificates];
};

export const setStoredCertificates = (certs: CertificateItem[]) => {
  initialCertificates.length = 0;
  initialCertificates.push(...certs);
  pushToCloud("certificates", certs);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredDocumentation = (): DocumentationItem[] => {
  return [...initialDocumentation];
};

export const setStoredDocumentation = (docs: DocumentationItem[]) => {
  initialDocumentation.length = 0;
  initialDocumentation.push(...docs);
  pushToCloud("documentation", docs);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredSkills = (): SkillItem[] => {
  return [...initialSkills];
};

export const setStoredSkills = (skills: SkillItem[]) => {
  initialSkills.length = 0;
  initialSkills.push(...skills);
  pushToCloud("skills", skills);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredSocialLinks = (): SocialLink[] => {
  return [...initialSocialLinks];
};

export const setStoredSocialLinks = (links: SocialLink[]) => {
  initialSocialLinks.length = 0;
  initialSocialLinks.push(...links);
  pushToCloud("social", links);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredMessages = (): ContactMessage[] => {
  return [...initialMessages];
};

export const setStoredMessages = (messages: ContactMessage[]) => {
  initialMessages.length = 0;
  initialMessages.push(...messages);
  pushToCloud("messages", messages);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredTimeline = (): TimelineItem[] => {
  return [...initialTimeline];
};

export const setStoredTimeline = (timeline: TimelineItem[]) => {
  initialTimeline.length = 0;
  initialTimeline.push(...timeline);
  pushToCloud("timeline", timeline);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};
