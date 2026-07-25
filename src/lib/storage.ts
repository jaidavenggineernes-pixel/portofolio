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

// Cloud API Background Sync
const pushToCloud = async (key: string, data: any) => {
  try {
    await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: data }),
    });
  } catch {
    // Ignore offline errors
  }
};

export const getStoredProfile = (): ProfileData => {
  if (typeof window === "undefined") return initialProfile;
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : initialProfile;
  } catch {
    return initialProfile;
  }
};

export const setStoredProfile = (profile: ProfileData) => {
  if (typeof window === "undefined") return;
  Object.assign(initialProfile, profile);
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  pushToCloud("profile", profile);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredProjects = (): ProjectItem[] => {
  if (typeof window === "undefined") return initialProjects;
  try {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : initialProjects;
  } catch {
    return initialProjects;
  }
};

export const setStoredProjects = (projects: ProjectItem[]) => {
  if (typeof window === "undefined") return;
  initialProjects.length = 0;
  initialProjects.push(...projects);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  pushToCloud("projects", projects);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredCertificates = (): CertificateItem[] => {
  if (typeof window === "undefined") return initialCertificates;
  try {
    const data = localStorage.getItem(KEYS.CERTIFICATES);
    return data ? JSON.parse(data) : initialCertificates;
  } catch {
    return initialCertificates;
  }
};

export const setStoredCertificates = (certs: CertificateItem[]) => {
  if (typeof window === "undefined") return;
  initialCertificates.length = 0;
  initialCertificates.push(...certs);
  localStorage.setItem(KEYS.CERTIFICATES, JSON.stringify(certs));
  pushToCloud("certificates", certs);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredDocumentation = (): DocumentationItem[] => {
  if (typeof window === "undefined") return initialDocumentation;
  try {
    const data = localStorage.getItem(KEYS.DOCUMENTATION);
    return data ? JSON.parse(data) : initialDocumentation;
  } catch {
    return initialDocumentation;
  }
};

export const setStoredDocumentation = (docs: DocumentationItem[]) => {
  if (typeof window === "undefined") return;
  initialDocumentation.length = 0;
  initialDocumentation.push(...docs);
  localStorage.setItem(KEYS.DOCUMENTATION, JSON.stringify(docs));
  pushToCloud("documentation", docs);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredSkills = (): SkillItem[] => {
  if (typeof window === "undefined") return initialSkills;
  try {
    const data = localStorage.getItem(KEYS.SKILLS);
    return data ? JSON.parse(data) : initialSkills;
  } catch {
    return initialSkills;
  }
};

export const setStoredSkills = (skills: SkillItem[]) => {
  if (typeof window === "undefined") return;
  initialSkills.length = 0;
  initialSkills.push(...skills);
  localStorage.setItem(KEYS.SKILLS, JSON.stringify(skills));
  pushToCloud("skills", skills);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredSocialLinks = (): SocialLink[] => {
  if (typeof window === "undefined") return initialSocialLinks;
  try {
    const data = localStorage.getItem(KEYS.SOCIAL);
    return data ? JSON.parse(data) : initialSocialLinks;
  } catch {
    return initialSocialLinks;
  }
};

export const setStoredSocialLinks = (links: SocialLink[]) => {
  if (typeof window === "undefined") return;
  initialSocialLinks.length = 0;
  initialSocialLinks.push(...links);
  localStorage.setItem(KEYS.SOCIAL, JSON.stringify(links));
  pushToCloud("social", links);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredMessages = (): ContactMessage[] => {
  if (typeof window === "undefined") return initialMessages;
  try {
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : initialMessages;
  } catch {
    return initialMessages;
  }
};

export const setStoredMessages = (messages: ContactMessage[]) => {
  if (typeof window === "undefined") return;
  initialMessages.length = 0;
  initialMessages.push(...messages);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
  pushToCloud("messages", messages);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};

export const getStoredTimeline = (): TimelineItem[] => {
  if (typeof window === "undefined") return initialTimeline;
  try {
    const data = localStorage.getItem(KEYS.TIMELINE);
    return data ? JSON.parse(data) : initialTimeline;
  } catch {
    return initialTimeline;
  }
};

export const setStoredTimeline = (timeline: TimelineItem[]) => {
  if (typeof window === "undefined") return;
  initialTimeline.length = 0;
  initialTimeline.push(...timeline);
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify(timeline));
  pushToCloud("timeline", timeline);
  window.dispatchEvent(new Event("portfolio-data-changed"));
};
