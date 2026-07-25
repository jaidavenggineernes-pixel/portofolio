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

const KEYS = {
  PROFILE: "portfolio_profile_data",
  PROJECTS: "portfolio_projects_data",
  CERTIFICATES: "portfolio_certificates_data",
  DOCUMENTATION: "portfolio_documentation_data",
  SKILLS: "portfolio_skills_data",
  SOCIAL: "portfolio_social_data",
  MESSAGES: "portfolio_messages_data",
  TIMELINE: "portfolio_timeline_data",
};

// Automatic Global Background Synchronizer
const pushToCloud = async (key: string, data: any) => {
  try {
    await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: data }),
    });
  } catch {
    // Ignore network drop
  }
};

// Clear stale device-level local storage overrides if present
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.PROJECTS);
    localStorage.removeItem(KEYS.CERTIFICATES);
    localStorage.removeItem(KEYS.DOCUMENTATION);
    localStorage.removeItem(KEYS.SKILLS);
    localStorage.removeItem(KEYS.SOCIAL);
    localStorage.removeItem(KEYS.TIMELINE);
  } catch {
    // Ignore
  }
}

export const getStoredProfile = (): ProfileData => {
  return initialProfile;
};

export const setStoredProfile = (profile: ProfileData) => {
  Object.assign(initialProfile, profile);
  pushToCloud("profile", profile);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};

export const getStoredProjects = (): ProjectItem[] => {
  return initialProjects;
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
  return initialCertificates;
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
  return initialDocumentation;
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
  return initialSkills;
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
  return initialSocialLinks;
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
  return initialMessages;
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
  return initialTimeline;
};

export const setStoredTimeline = (timeline: TimelineItem[]) => {
  initialTimeline.length = 0;
  initialTimeline.push(...timeline);
  pushToCloud("timeline", timeline);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
};
