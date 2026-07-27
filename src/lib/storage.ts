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

// Cloud API Sync Helper (Non-blocking)
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

// Fetch Latest Server Data for all devices on mount
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
    // Ignore
  }
};

export const getStoredProfile = (): ProfileData => {
  if (typeof window === "undefined") return { ...initialProfile };
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : { ...initialProfile };
  } catch {
    return { ...initialProfile };
  }
};

export const setStoredProfile = (profile: ProfileData) => {
  Object.assign(initialProfile, profile);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("profile", profile);
};

export const getStoredProjects = (): ProjectItem[] => {
  if (typeof window === "undefined") return [...initialProjects];
  try {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : [...initialProjects];
  } catch {
    return [...initialProjects];
  }
};

export const setStoredProjects = (projects: ProjectItem[]) => {
  initialProjects.length = 0;
  initialProjects.push(...projects);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("projects", projects);
};

export const getStoredCertificates = (): CertificateItem[] => {
  if (typeof window === "undefined") return [...initialCertificates];
  try {
    const data = localStorage.getItem(KEYS.CERTIFICATES);
    return data ? JSON.parse(data) : [...initialCertificates];
  } catch {
    return [...initialCertificates];
  }
};

export const setStoredCertificates = (certs: CertificateItem[]) => {
  initialCertificates.length = 0;
  initialCertificates.push(...certs);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.CERTIFICATES, JSON.stringify(certs));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("certificates", certs);
};

export const getStoredDocumentation = (): DocumentationItem[] => {
  if (typeof window === "undefined") return [...initialDocumentation];
  try {
    const data = localStorage.getItem(KEYS.DOCUMENTATION);
    return data ? JSON.parse(data) : [...initialDocumentation];
  } catch {
    return [...initialDocumentation];
  }
};

export const setStoredDocumentation = (docs: DocumentationItem[]) => {
  initialDocumentation.length = 0;
  initialDocumentation.push(...docs);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.DOCUMENTATION, JSON.stringify(docs));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("documentation", docs);
};

export const getStoredSkills = (): SkillItem[] => {
  if (typeof window === "undefined") return [...initialSkills];
  try {
    const data = localStorage.getItem(KEYS.SKILLS);
    return data ? JSON.parse(data) : [...initialSkills];
  } catch {
    return [...initialSkills];
  }
};

export const setStoredSkills = (skills: SkillItem[]) => {
  initialSkills.length = 0;
  initialSkills.push(...skills);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.SKILLS, JSON.stringify(skills));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("skills", skills);
};

export const getStoredSocialLinks = (): SocialLink[] => {
  if (typeof window === "undefined") return [...initialSocialLinks];
  try {
    const data = localStorage.getItem(KEYS.SOCIAL);
    return data ? JSON.parse(data) : [...initialSocialLinks];
  } catch {
    return [...initialSocialLinks];
  }
};

export const setStoredSocialLinks = (links: SocialLink[]) => {
  initialSocialLinks.length = 0;
  initialSocialLinks.push(...links);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.SOCIAL, JSON.stringify(links));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("social", links);
};

export const getStoredMessages = (): ContactMessage[] => {
  if (typeof window === "undefined") return [...initialMessages];
  try {
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : [...initialMessages];
  } catch {
    return [...initialMessages];
  }
};

export const setStoredMessages = (messages: ContactMessage[]) => {
  initialMessages.length = 0;
  initialMessages.push(...messages);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("messages", messages);
};

export const getStoredTimeline = (): TimelineItem[] => {
  if (typeof window === "undefined") return [...initialTimeline];
  try {
    const data = localStorage.getItem(KEYS.TIMELINE);
    return data ? JSON.parse(data) : [...initialTimeline];
  } catch {
    return [...initialTimeline];
  }
};

export const setStoredTimeline = (timeline: TimelineItem[]) => {
  initialTimeline.length = 0;
  initialTimeline.push(...timeline);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEYS.TIMELINE, JSON.stringify(timeline));
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("portfolio-data-changed"));
  }
  pushToCloud("timeline", timeline);
};
