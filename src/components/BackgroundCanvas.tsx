"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle definitions
    const particleCount = Math.min(Math.floor((width * height) / 20000), 50);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const colors = [
      "rgba(56, 189, 248, ", // cyan
      "rgba(147, 51, 234, ", // purple
      "rgba(59, 130, 246, ", // blue
      "rgba(236, 72, 153, ", // pink accent
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      {/* Liquid Gradient Blobs (Dark Mode Default) */}
      <div className="liquid-blob hidden dark:block top-[-10%] left-[-5%] w-[45%] h-[55%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] animate-pulse" />
      <div className="liquid-blob hidden dark:block bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)]" style={{ animationDelay: "-4s" }} />
      <div className="liquid-blob hidden dark:block top-[35%] left-[55%] w-[35%] h-[45%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]" style={{ animationDelay: "-8s" }} />

      {/* Light Mode Blobs */}
      <div className="liquid-blob dark:hidden top-[-10%] left-[-5%] w-[45%] h-[55%] bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.6),transparent_70%)]" />
      <div className="liquid-blob dark:hidden bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(233,213,255,0.6),transparent_70%)]" style={{ animationDelay: "-4s" }} />
      
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}
