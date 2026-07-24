import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnimatedCursor from "@/components/AnimatedCursor";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundCanvas from "@/components/BackgroundCanvas";

export const metadata: Metadata = {
  title: "JaiAsis | Fullstack Developer & Creative Technologist",
  description: "Official Digital Portfolio & Identity of Alif Raditya (JaiAsis). Showcasing Web Applications, Projects, Certificates, Photography, and Tech Journey.",
  keywords: ["Portfolio", "Next.js", "Fullstack Developer", "React", "TypeScript", "Tailwind CSS", "Supabase", "JaiAsis", "Alif Raditya"],
  authors: [{ name: "Alif Raditya (JaiAsis)" }],
  openGraph: {
    title: "JaiAsis | Personal Digital Portfolio",
    description: "Modern, Interactive, Liquid Glass Personal Portfolio",
    type: "website",
    locale: "id_ID",
    url: "https://jaiasis.dev",
    siteName: "JaiAsis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "JaiAsis | Personal Portfolio",
    description: "Modern & Interactive Personal Portfolio built with Next.js & Framer Motion",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 min-h-screen relative">
        <ThemeProvider>
          {/* Animated Loading Screen */}
          <LoadingScreen />

          {/* Custom Interactive Follower Cursor */}
          <AnimatedCursor />

          {/* Liquid Glass Background Particles */}
          <BackgroundCanvas />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
