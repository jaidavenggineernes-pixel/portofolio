export interface ProfileData {
  id?: string;
  fullName: string;
  nickname: string;
  title: string;
  bio: string;
  motto: string;
  age: number;
  location: string;
  education: string;
  hobbies: string[];
  interests: string[];
  goals: string;
  typingText: string[];
  cvUrl?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  category: string;
  techStack: string[];
  year: string;
  status: "Completed" | "In Progress" | "Featured";
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  category: string;
}

export interface DocumentationItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "UI Design" | "Database" | "Editing" | "Photography" | "AI Tools";
  percentage: number;
  iconName?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  color: string;
}

export interface StatItem {
  id: string;
  label: string;
  count: string;
  iconName: string;
  color: string;
}

export interface SocialLink {
  id: string;
  platform: "WhatsApp" | "Email" | "GitHub" | "Instagram" | "TikTok" | "LinkedIn" | "Discord";
  url: string;
  username: string;
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  primaryColor: string;
  accentColor: string;
  defaultTheme: "dark" | "light";
  enableCursor: boolean;
  enableSound: boolean;
}
