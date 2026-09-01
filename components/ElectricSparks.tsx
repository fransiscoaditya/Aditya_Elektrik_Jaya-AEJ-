"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  history: { x: number; y: number }[];
}

export default function ElectricSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const sparks: Spark[] = [];
    const colors = ["#E6FF00", "#FFFFFF", "#10B981", "#FFA800"];
    let animationFrameId: number | null = null;
    let isRunning = false;

    const render = () => {
      if (sparks.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isRunning = false;
        animationFrameId = null;
        return; // Stop RAF loop when idle!
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        s.history.push({ x: s.x, y: s.y });
        if (s.history.length > 5) s.history.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.93;
        s.vy *= 0.93;

        // Draw electrical spark tail
        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;

        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size * (1 - progress * 0.7);
        ctx.globalAlpha = alpha;
        ctx.beginPath();

        for (let j = 0; j < s.history.length; j++) {
          const pt = s.history[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else {
            const jitterX = (Math.random() - 0.5) * 1.5;
            const jitterY = (Math.random() - 0.5) * 1.5;
            ctx.lineTo(pt.x + jitterX, pt.y + jitterY);
          }
        }
        ctx.stroke();

        // Spark head
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const addSparks = (x: number, y: number, count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        const maxLife = Math.random() * 16 + 10;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife,
          history: [{ x, y }],
        });
      }
      startAnimation();
    };

    const onClick = (e: MouseEvent) => {
      addSparks(e.clientX, e.clientY, 10);
    };

    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99998]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
