"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Web Audio API 8-Bit Sound Synthesizer ─── */
class SoundEffects {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playJump() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playDoubleJump() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {}
  }

  playCollect() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1180, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {}
  }

  playPowerup() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [360, 480, 600, 720, 960].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, now + i * 0.035);
        gain.gain.setValueAtTime(0.08, now + i * 0.035);
        gain.gain.linearRampToValueAtTime(0.01, now + i * 0.035 + 0.045);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.035);
        osc.stop(now + i * 0.035 + 0.045);
      });
    } catch {}
  }

  playHit() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {}
  }
}

const sfx = new SoundEffects();

/* ─── Real Dogs Mascot Roster: Michi (White), Pyu (Brown), Miko (Black) ─── */
const DOG_ROSTER = [
  {
    id: "michi",
    name: "Michi",
    title: "Si Putih Lincah",
    imageSrc: "/dog-michi-8bit.webp",
    desc: "Bulu putih bersih, selalu ceria & lincah menyapa pelanggan.",
    bodyColor: "#FFFFFF",
    accentColor: "#F5E6CC",
    snoutColor: "#111111",
    tongueColor: "#FF4D6D",
    perk: "Lompatan Gesit",
    hasBall: false,
  },
  {
    id: "pyu",
    name: "Pyu",
    title: "Si Coklat Shaggy",
    imageSrc: "/dog-pyu-8bit.webp",
    desc: "Bulu coklat-abu lebat ramah dengan senyuman khas.",
    bodyColor: "#5A524C",
    accentColor: "#D6B07A",
    snoutColor: "#1A1A1A",
    tongueColor: "#FF4D6D",
    perk: "Magnet Bola +150",
    hasBall: false,
  },
  {
    id: "miko",
    name: "Miko",
    title: "Si Hitam Fluffy",
    imageSrc: "/dog-miko-8bit.webp",
    desc: "Bulu hitam anggun dengan senyuman ramah.",
    bodyColor: "#22272E",
    accentColor: "#64748B",
    snoutColor: "#0F172A",
    tongueColor: "#FF4D6D",
    perk: "Perisai Listrik +50%",
    hasBall: false,
  },
];

export default function DoggoEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(0);
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [muted, setMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const jumpTriggerRef = useRef<(() => void) | null>(null);

  // Load High Score from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aej_doggo_highscore_v3");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
      setGameState("menu");
    };
    window.addEventListener("aej-open-game", handleTrigger);
    return () => window.removeEventListener("aej-open-game", handleTrigger);
  }, []);

  // Game Loop Logic
  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const width = 640;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const dogInfo = DOG_ROSTER[selectedDog];

    // Game Entities & Natural Physics Configuration
    const groundY = height - 58;
    let dogY = groundY - 32;
    let dogVy = 0;
    let isJumping = false;
    let jumpCount = 0;
    const maxJumps = 2; // Double jump!
    let runFrame = 0;
    let frameTimer = 0;

    // Natural Responsive Controls (Jump Buffer & Coyote Time)
    let jumpBuffer = 0;
    let coyoteTimer = 0;
    let lastJumpTimestamp = 0;

    // Smooth Pacing & Difficulty Curve
    let gameSpeed = 2.4;
    let currentScore = 0;
    let distance = 0;
    let isGameOver = false;

    // Visual Juice Systems (Particles & Floating Score Badges)
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
      maxLife: number;
    }
    const particles: Particle[] = [];

    interface ScoreBadge {
      x: number;
      y: number;
      text: string;
      color: string;
      life: number;
    }
    const scoreBadges: ScoreBadge[] = [];
    let screenShake = 0;

    // Background scrolling elements (green plants & store backdrop)
    const plants: { x: number; type: number }[] = [
      { x: 80, type: 0 },
      { x: 240, type: 1 },
      { x: 420, type: 0 },
      { x: 580, type: 2 },
    ];

    // Obstacles: Panel boxes, Conduit pipes, Cones
    interface Obstacle {
      x: number;
      y: number;
      w: number;
      h: number;
      type: "box" | "pipe" | "cone";
    }
    const obstacles: Obstacle[] = [];
    let obstacleTimer = 110;

    // Collectibles: Lamp LED, Cable Roll, Tennis Ball, Battery
    interface Item {
      x: number;
      y: number;
      type: "lamp" | "cable" | "ball" | "battery";
      collected: boolean;
    }
    const items: Item[] = [];
    let itemTimer = 75;
    let hasShield = dogInfo.id === "miko"; // Miko starts with 1 free electric barrier!
    let shieldTimer = dogInfo.id === "miko" ? 300 : 0;

    // Spawn Particles Helper
    const spawnParticles = (x: number, y: number, color: string, count = 6, speed = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * (Math.random() * speed + 0.8),
          vy: Math.sin(angle) * (Math.random() * speed + 0.8) - 0.6,
          color,
          size: Math.random() * 3 + 2,
          life: 20,
          maxLife: 20,
        });
      }
    };

    // Execute Natural Floaty Jump
    const executeJump = () => {
      if (isGameOver) return;

      if (jumpCount === 0 || (!isJumping && coyoteTimer > 0)) {
        dogVy = -6.6;
        isJumping = true;
        jumpCount = 1;
        coyoteTimer = 0;
        spawnParticles(58, groundY - 4, "#FFFFFF", 5, 1.8);
        if (!muted) sfx.playJump();
      } else if (jumpCount < maxJumps) {
        dogVy = -5.8;
        jumpCount++;
        spawnParticles(58, dogY + 16, "#E6FF00", 7, 2.5);
        if (!muted) sfx.playDoubleJump();
      }
    };

    // Jump Handler with 200ms Debounce Guard & Jump Buffer
    const doJump = () => {
      if (isGameOver) return;
      const now = Date.now();
      if (now - lastJumpTimestamp < 200) return;
      lastJumpTimestamp = now;

      if (isJumping && jumpCount >= maxJumps) {
        jumpBuffer = 10;
        return;
      }

      executeJump();
    };

    jumpTriggerRef.current = doJump;
    (window as unknown as { __aej_doggo_jump?: () => void }).__aej_doggo_jump = doJump;

    // Main 60 FPS Animation Loop
    const loop = () => {
      if (isGameOver) return;

      // Natural Floaty Gravity (0.24 curve + capped downward speed)
      dogVy += 0.24;
      dogVy = Math.min(5.2, dogVy);
      dogY += dogVy;

      if (dogY >= groundY - 32) {
        dogY = groundY - 32;
        dogVy = 0;
        if (isJumping) {
          spawnParticles(58, groundY - 2, "#4B5563", 4, 1.2);
        }
        isJumping = false;
        jumpCount = 0;
        coyoteTimer = 6;

        if (jumpBuffer > 0) {
          jumpBuffer = 0;
          executeJump();
        }
      } else {
        if (coyoteTimer > 0) coyoteTimer--;
        if (jumpBuffer > 0) jumpBuffer--;
      }

      frameTimer++;
      if (frameTimer % 6 === 0) {
        runFrame = (runFrame + 1) % 4;
      }

      distance += gameSpeed;
      gameSpeed = Math.min(5.6, 2.4 + Math.floor(distance / 1000) * 0.18);

      currentScore += 0.08;
      setScore(Math.floor(currentScore));

      if (hasShield) {
        shieldTimer--;
        if (shieldTimer <= 0) hasShield = false;
      }

      if (screenShake > 0) screenShake--;

      for (const p of plants) {
        p.x -= gameSpeed * 0.5;
        if (p.x < -60) p.x = width + Math.random() * 90;
      }

      obstacleTimer--;
      if (obstacleTimer <= 0) {
        const types: ("box" | "pipe" | "cone")[] = ["box", "pipe", "cone"];
        const t = types[Math.floor(Math.random() * types.length)];
        const h = t === "box" ? 28 : t === "pipe" ? 34 : 22;
        const w = t === "box" ? 26 : t === "pipe" ? 20 : 18;
        obstacles.push({
          x: width + 20,
          y: groundY - h,
          w,
          h,
          type: t,
        });
        obstacleTimer = Math.floor(Math.random() * 70 + 105 - gameSpeed * 2);
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.x -= gameSpeed;

        const dogHurtbox = { x: 54, y: dogY + 6, w: 22, h: 22 };
        const obHurtbox = { x: ob.x + 3, y: ob.y + 3, w: ob.w - 6, h: ob.h - 3 };

        if (
          dogHurtbox.x < obHurtbox.x + obHurtbox.w &&
          dogHurtbox.x + dogHurtbox.w > obHurtbox.x &&
          dogHurtbox.y < obHurtbox.y + obHurtbox.h &&
          dogHurtbox.y + dogHurtbox.h > obHurtbox.y
        ) {
          if (hasShield) {
            hasShield = false;
            obstacles.splice(i, 1);
            screenShake = 6;
            spawnParticles(ob.x + ob.w / 2, ob.y + ob.h / 2, "#00E5FF", 12, 3.5);
            if (!muted) sfx.playHit();
            continue;
          } else {
            isGameOver = true;
            screenShake = 10;
            spawnParticles(58, dogY + 16, "#EF4444", 15, 4);
            if (!muted) sfx.playHit();
            const finalScore = Math.floor(currentScore);
            setScore(finalScore);
            setHighScore((prev) => {
              const nh = Math.max(prev, finalScore);
              try {
                localStorage.setItem("aej_doggo_highscore_v3", nh.toString());
              } catch {}
              return nh;
            });
            setGameState("gameover");
            return;
          }
        }

        if (ob.x < -50) obstacles.splice(i, 1);
      }

      itemTimer--;
      if (itemTimer <= 0) {
        const rand = Math.random();
        const type = rand < 0.4 ? "lamp" : rand < 0.7 ? "cable" : rand < 0.88 ? "ball" : "battery";
        const spawnY = groundY - 35 - Math.floor(Math.random() * 45);
        items.push({
          x: width + 20,
          y: spawnY,
          type,
          collected: false,
        });
        itemTimer = Math.floor(Math.random() * 70 + 65);
      }

      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.x -= gameSpeed;

        if (dogInfo.id === "pyu" && it.type === "ball" && it.x < 180 && it.x > 40) {
          it.y += (dogY - it.y) * 0.08;
        }

        const dogGrabBox = { x: 44, y: dogY - 4, w: 42, h: 40 };
        if (!it.collected && it.x < dogGrabBox.x + dogGrabBox.w && it.x + 22 > dogGrabBox.x && it.y < dogGrabBox.y + dogGrabBox.h && it.y + 22 > dogGrabBox.y) {
          it.collected = true;
          let badgeText = "+15";
          let badgeColor = "#FFD700";

          if (it.type === "lamp") {
            currentScore += 15;
            badgeText = "+15";
            badgeColor = "#FFD700";
            spawnParticles(it.x + 8, it.y + 8, "#FFD700", 6, 2);
          } else if (it.type === "cable") {
            currentScore += 30;
            badgeText = "+30 SNI";
            badgeColor = "#F59E0B";
            spawnParticles(it.x + 8, it.y + 8, "#F59E0B", 7, 2.5);
          } else if (it.type === "ball") {
            const pts = dogInfo.id === "pyu" ? 150 : 100;
            currentScore += pts;
            badgeText = `+${pts} 🎾`;
            badgeColor = "#D4FF00";
            spawnParticles(it.x + 8, it.y + 8, "#D4FF00", 9, 3);
          } else if (it.type === "battery") {
            currentScore += 50;
            hasShield = true;
            shieldTimer = dogInfo.id === "miko" ? 320 : 220;
            badgeText = "⚡ PERISAI!";
            badgeColor = "#00E5FF";
            spawnParticles(it.x + 8, it.y + 8, "#00E5FF", 10, 3.5);
            if (!muted) sfx.playPowerup();
          }

          scoreBadges.push({
            x: 58,
            y: dogY - 8,
            text: badgeText,
            color: badgeColor,
            life: 25,
          });

          if (it.type !== "battery" && !muted) sfx.playCollect();
          items.splice(i, 1);
          continue;
        }

        if (it.x < -30) items.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
      }

      for (let i = scoreBadges.length - 1; i >= 0; i--) {
        const b = scoreBadges[i];
        b.y -= 0.8;
        b.life--;
        if (b.life <= 0) scoreBadges.splice(i, 1);
      }

      // ─── RENDERING ───
      ctx.save();
      if (screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * 4;
        const shakeY = (Math.random() - 0.5) * 4;
        ctx.translate(shakeX, shakeY);
      }

      ctx.fillStyle = "#070b07";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0d140d";
      ctx.fillRect(0, groundY - 130, width, 130);

      ctx.fillStyle = "#10B981";
      ctx.fillRect(35, 20, 185, 24);
      ctx.fillStyle = "#050505";
      ctx.font = "bold 10px monospace";
      ctx.fillText("ADITYA ELEKTRIK JAYA", 42, 36);

      for (const p of plants) {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(p.x + 4, groundY - 20, 18, 20);
        ctx.fillStyle = "#A0522D";
        ctx.fillRect(p.x + 2, groundY - 22, 22, 4);

        ctx.fillStyle = "#22C55E";
        ctx.fillRect(p.x - 2, groundY - 48, 30, 28);
        ctx.fillStyle = "#15803D";
        ctx.fillRect(p.x + 2, groundY - 44, 22, 20);
        ctx.fillStyle = "#166534";
        ctx.fillRect(p.x + 6, groundY - 40, 14, 14);
      }

      ctx.fillStyle = "#161c16";
      ctx.fillRect(0, groundY, width, height - groundY);
      ctx.fillStyle = "#10B981";
      ctx.fillRect(0, groundY, width, 4);

      ctx.strokeStyle = "#202a20";
      ctx.lineWidth = 1;
      const tileOffset = (distance * 0.8) % 32;
      for (let tx = -tileOffset; tx < width; tx += 32) {
        ctx.beginPath();
        ctx.moveTo(tx, groundY);
        ctx.lineTo(tx, height);
        ctx.stroke();
      }

      for (const it of items) {
        if (it.type === "lamp") {
          ctx.fillStyle = "#FFD700";
          ctx.beginPath();
          ctx.arc(it.x + 8, it.y + 8, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFF";
          ctx.fillRect(it.x + 6, it.y + 14, 4, 4);
        } else if (it.type === "cable") {
          ctx.fillStyle = "#D97706";
          ctx.fillRect(it.x, it.y, 16, 16);
          ctx.fillStyle = "#1E293B";
          ctx.fillRect(it.x + 4, it.y + 4, 8, 8);
        } else if (it.type === "ball") {
          ctx.fillStyle = "#D4FF00";
          ctx.beginPath();
          ctx.arc(it.x + 8, it.y + 8, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(it.x + 8, it.y + 8, 5, 0.4, 2.5);
          ctx.stroke();
        } else if (it.type === "battery") {
          ctx.fillStyle = "#00E5FF";
          ctx.beginPath();
          ctx.moveTo(it.x + 10, it.y);
          ctx.lineTo(it.x + 2, it.y + 10);
          ctx.lineTo(it.x + 8, it.y + 10);
          ctx.lineTo(it.x + 4, it.y + 18);
          ctx.lineTo(it.x + 14, it.y + 7);
          ctx.lineTo(it.x + 8, it.y + 7);
          ctx.closePath();
          ctx.fill();
        }
      }

      for (const ob of obstacles) {
        if (ob.type === "box") {
          ctx.fillStyle = "#334155";
          ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
          ctx.fillStyle = "#E6FF00";
          ctx.fillRect(ob.x + 4, ob.y + 4, 6, 6);
          ctx.fillStyle = "#0F172A";
          ctx.fillRect(ob.x + 2, ob.y + 14, ob.w - 4, ob.h - 16);
        } else if (ob.type === "pipe") {
          ctx.fillStyle = "#CBD5E1";
          ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
          ctx.fillStyle = "#64748B";
          ctx.fillRect(ob.x + 2, ob.y + 4, 4, ob.h);
        } else if (ob.type === "cone") {
          ctx.fillStyle = "#EA580C";
          ctx.beginPath();
          ctx.moveTo(ob.x + ob.w / 2, ob.y);
          ctx.lineTo(ob.x, ob.y + ob.h);
          ctx.lineTo(ob.x + ob.w, ob.y + ob.h);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#FFF";
          ctx.fillRect(ob.x + 4, ob.y + 10, ob.w - 8, 4);
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1.0;

      const dx = 50;
      const dy = dogY;

      if (hasShield) {
        ctx.strokeStyle = "#00E5FF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const auraPulse = Math.sin(frameTimer * 0.2) * 2;
        ctx.arc(dx + 18, dy + 16, 26 + auraPulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = dogInfo.bodyColor;
      ctx.fillRect(dx + 6, dy + 10, 22, 16);
      ctx.fillRect(dx + 18, dy + 2, 16, 15);

      if (dogInfo.id === "pyu") {
        ctx.fillStyle = "#1A1A1A";
        ctx.fillRect(dx + 13, dy + 2, 6, 12);
        ctx.fillStyle = dogInfo.accentColor;
        ctx.fillRect(dx + 19, dy + 4, 12, 10);
        ctx.fillRect(dx + 8, dy + 12, 12, 8);
      } else {
        ctx.fillStyle = dogInfo.accentColor;
        ctx.fillRect(dx + 14, dy + 2, 6, 10);
        if (dogInfo.id === "miko") {
          ctx.fillRect(dx + 8, dy + 12, 12, 8);
        }
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(dx + 27, dy + 5, 3, 3);
      ctx.fillStyle = dogInfo.snoutColor;
      ctx.fillRect(dx + 31, dy + 9, 3, 3);

      if (dogInfo.hasBall) {
        ctx.fillStyle = "#D4FF00";
        ctx.beginPath();
        ctx.arc(dx + 32, dy + 13, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = dogInfo.tongueColor;
        ctx.fillRect(dx + 30, dy + 13, 3.5, 3);
      }

      const tailWag = runFrame % 2 === 0 ? -4 : 2;
      ctx.fillStyle = dogInfo.bodyColor;
      ctx.fillRect(dx + 1, dy + 8 + tailWag, 7, 7);

      ctx.fillStyle = dogInfo.accentColor;
      if (isJumping) {
        ctx.fillRect(dx + 6, dy + 25, 5, 5);
        ctx.fillRect(dx + 22, dy + 25, 5, 5);
      } else {
        if (runFrame === 0) {
          ctx.fillRect(dx + 6, dy + 25, 4, 8);
          ctx.fillRect(dx + 20, dy + 25, 4, 8);
        } else if (runFrame === 1) {
          ctx.fillRect(dx + 3, dy + 25, 5, 7);
          ctx.fillRect(dx + 24, dy + 25, 5, 7);
        } else if (runFrame === 2) {
          ctx.fillRect(dx + 9, dy + 25, 4, 8);
          ctx.fillRect(dx + 18, dy + 25, 4, 8);
        } else {
          ctx.fillRect(dx + 12, dy + 25, 5, 7);
          ctx.fillRect(dx + 15, dy + 25, 5, 7);
        }
      }

      ctx.fillStyle = "#10B981";
      ctx.font = "bold 9px monospace";
      ctx.fillText(dogInfo.name, dx + 10, dy - 2);

      for (const b of scoreBadges) {
        ctx.fillStyle = b.color;
        ctx.font = "bold 11px monospace";
        ctx.globalAlpha = b.life / 25;
        ctx.fillText(b.text, b.x, b.y);
      }
      ctx.globalAlpha = 1.0;

      ctx.fillStyle = "#000000cc";
      ctx.fillRect(width - 195, 10, 185, 26);
      ctx.strokeStyle = "#10B981";
      ctx.strokeRect(width - 195, 10, 185, 26);
      ctx.fillStyle = "#E6FF00";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`SKOR: ${Math.floor(currentScore)}`, width - 185, 27);
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(`HI: ${highScore}`, width - 95, 27);

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedDog, highScore, muted]);

  // Global Keydown Handler (Desktop Spacebar / Enter / ArrowUp / KeyW)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (gameState === "playing" && jumpTriggerRef.current) {
          jumpTriggerRef.current();
        } else if (gameState === "menu") {
          startGame();
        } else if (gameState === "gameover") {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, gameState, startGame]);

  return (
    <>
      {/* ── Fixed Floating Doggo Easter Egg Trigger ── */}
      {/* Trigger button: bottom-20 on mobile (above MobileBottomBar), bottom-6 on md+ */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setGameState("menu");
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-[9990] bg-[#111811] border-2 border-emerald-500/40 hover:border-[#10B981] shadow-2xl p-2 sm:p-2.5 rounded-full flex items-center gap-2 group cursor-pointer"
        title="Easter Egg Mini-Game Michi, Pyu & Miko"
      >
        <span className="text-lg sm:text-xl inline-block group-hover:rotate-12 transition-transform">
          🐶
        </span>
        <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest pr-1 hidden sm:inline">
          AEJ 8-Bit Quest
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </motion.button>

      {/* ── 8-Bit Arcade Modal Popup ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-3 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.94, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 10 }}
              className="w-full h-full md:h-auto md:max-w-[760px] bg-[#0c120c] border-0 md:border-2 border-emerald-500 rounded-none md:rounded-xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] relative font-mono my-auto flex flex-col"
            >
              {/* Arcade Top Header Bar — compact on small screens */}
              <div className="bg-emerald-950/90 px-2 sm:px-4 py-2 border-b-2 border-emerald-500/50 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                  <span className="text-emerald-300 text-[9px] sm:text-xs font-bold tracking-wider uppercase truncate">
                    🐾 8-BIT DOGGO QUEST · AEJ ARCADE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMuted(!muted)}
                    className="text-[8px] sm:text-xs text-zinc-300 hover:text-white px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-900 border border-white/20 rounded cursor-pointer transition-colors"
                  >
                    {muted ? "🔇 SFX" : "🔊 SFX"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setGameState("menu");
                      cancelAnimationFrame(animFrameRef.current);
                    }}
                    className="text-[8px] sm:text-xs bg-red-950/80 hover:bg-red-800 border border-red-500 text-red-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded font-bold transition-colors cursor-pointer"
                  >
                    ✕ TUTUP
                  </button>
                </div>
              </div>

              {/* ── Game Canvas Area
                   Height strategy for all screens:
                   - clamp(260px, 56.25vw, 360px)
                   - Portrait mobile 360px wide  → 56.25vw = 202px < 260px floor → uses 260px ✓
                   - Portrait mobile 390px wide  → 56.25vw = 219px < 260px floor → uses 260px ✓
                   - Landscape mobile 667px wide → 56.25vw = 375px > 360px cap  → uses 360px ✓
                   - Tablet 768px wide           → 56.25vw = 432px > 360px cap  → uses 360px ✓
                   - Desktop                     → always capped at 360px ✓
                   Canvas (640×360) fills container via CSS; slight vertical stretch
                   on portrait is acceptable and far better than the 219px "gepeng" look.
                ── */}
              <div
                className="relative w-full bg-black overflow-hidden flex items-center justify-center"
                style={{ height: "clamp(260px, 56.25vw, 360px)" }}
              >
                {/* Canvas: always 640×360 internally, CSS fills the container.
                     IMPORTANT: use onPointerDown ONLY for jump — not onClick.
                     On mobile, a single tap fires pointerdown + click (2 events).
                     Using both would cause 1 tap = double jump. */}
                <canvas
                  ref={canvasRef}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (gameState === "playing" && jumpTriggerRef.current) {
                      jumpTriggerRef.current();
                    } else if (gameState === "menu") {
                      startGame();
                    }
                  }}
                  className="absolute inset-0 w-full h-full block cursor-pointer select-none touch-none"
                  style={{ imageRendering: "pixelated" }}
                />

                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent bg-[length:100%_4px] opacity-70 z-10" />

                {/* ── MENU OVERLAY — fully inset into the canvas area ── */}
                {gameState === "menu" && (
                  <div className="absolute inset-0 z-20 bg-[#080d08]/96 flex flex-col justify-evenly items-center px-3 py-2 text-center select-none overflow-hidden">
                    {/* Title */}
                    <div className="shrink-0">
                      <h3 className="text-[10px] xs:text-xs sm:text-sm font-black text-[#E6FF00] tracking-wider uppercase flex items-center justify-center gap-1 leading-tight">
                        🐶 DOGGO QUEST · PILIH MASKOT ⚡
                      </h3>
                      <p className="text-[7px] sm:text-[8.5px] text-zinc-400 mt-0.5">
                        Tap karakter → START
                      </p>
                    </div>

                    {/* Dog selector */}
                    <div className="w-full max-w-xs shrink-0">
                      <div className="grid grid-cols-3 gap-1 sm:gap-2">
                        {DOG_ROSTER.map((dog, idx) => (
                          <button
                            key={dog.id}
                            type="button"
                            onClick={() => setSelectedDog(idx)}
                            className={`p-1 sm:p-1.5 border-2 rounded-lg transition-all text-center flex flex-col items-center gap-0.5 cursor-pointer ${
                              selectedDog === idx
                                ? "border-[#E6FF00] bg-emerald-950/90 shadow-[0_0_10px_rgba(230,255,0,0.4)] scale-[1.03]"
                                : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-600 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <div className="relative w-6 h-6 sm:w-9 sm:h-9 rounded overflow-hidden border border-white/20 bg-black shrink-0">
                              <Image
                                src={dog.imageSrc}
                                alt={dog.name}
                                fill
                                sizes="(max-width: 640px) 24px, 36px"
                                className="object-cover"
                                style={{ imageRendering: "pixelated" }}
                              />
                            </div>
                            <div className="font-bold text-[8px] sm:text-[10px] text-white truncate w-full">{dog.name}</div>
                            <div className="text-[6px] sm:text-[7px] text-emerald-400 font-mono truncate w-full leading-tight">{dog.perk}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* START button */}
                    <div className="w-full max-w-[240px] shrink-0">
                      <button
                        type="button"
                        onClick={startGame}
                        className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-[10px] sm:text-xs uppercase py-2 sm:py-3 px-4 rounded-xl shadow-[0_0_18px_rgba(16,185,129,0.7)] tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <span>▶</span>
                        <span>MULAI GAME</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── GAMEOVER OVERLAY ── */}
                {gameState === "gameover" && (
                  <div className="absolute inset-0 z-20 bg-black/92 flex flex-col justify-evenly items-center px-3 py-2 text-center select-none overflow-hidden">
                    <div>
                      <span className="text-xl sm:text-3xl">💥🐶</span>
                      <h3 className="text-sm sm:text-lg font-bold text-red-500 tracking-wider uppercase">
                        GAME OVER
                      </h3>
                    </div>

                    <div className="py-1.5 px-3 bg-zinc-900/90 border border-zinc-700 rounded-lg w-full max-w-[220px]">
                      <div className="flex justify-between text-[10px] sm:text-xs text-zinc-400">
                        <span>Skor:</span>
                        <span className="font-bold text-[#E6FF00] text-xs sm:text-sm">{score}</span>
                      </div>
                      <div className="flex justify-between text-[10px] sm:text-xs text-zinc-400">
                        <span>Tertinggi:</span>
                        <span className="font-bold text-emerald-400 text-xs sm:text-sm">{highScore}</span>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 w-full max-w-[240px]">
                      <button
                        type="button"
                        onClick={startGame}
                        className="flex-1 bg-[#10B981] hover:bg-[#059669] text-black font-bold text-[10px] sm:text-xs uppercase py-2 sm:py-2.5 rounded-lg tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        🔄 MAIN LAGI
                      </button>
                      <button
                        type="button"
                        onClick={() => setGameState("menu")}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[10px] sm:text-xs uppercase py-2 sm:py-2.5 rounded-lg tracking-wider transition-all cursor-pointer"
                      >
                        GANTI MASKOT
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── CONTROL BAR — compact for small screens, spacious on larger ── */}
              {gameState === "playing" && (
                <div className="bg-[#060c06] px-2 sm:px-4 py-1 sm:py-2 border-t-2 border-emerald-500/40 flex items-center justify-between gap-2 select-none shrink-0">
                  {/* Active Mascot */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-emerald-400/50 bg-black shrink-0">
                      <Image
                        src={DOG_ROSTER[selectedDog].imageSrc}
                        alt={DOG_ROSTER[selectedDog].name}
                        fill
                        sizes="(max-width: 640px) 24px, 32px"
                        className="object-cover"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="leading-tight min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-bold text-white uppercase truncate">
                        {DOG_ROSTER[selectedDog].name}
                      </div>
                      <div className="text-[7px] sm:text-[8px] text-emerald-400 font-mono truncate">
                        {DOG_ROSTER[selectedDog].perk}
                      </div>
                    </div>
                  </div>

                  {/* Jump Button — onPointerDown ONLY, no onClick to prevent double-fire */}
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      if (jumpTriggerRef.current) jumpTriggerRef.current();
                    }}
                    className="flex-1 max-w-[160px] sm:max-w-[220px] h-8 sm:h-11 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-[10px] sm:text-sm uppercase rounded-lg sm:rounded-xl shadow-[0_0_18px_rgba(16,185,129,0.5)] active:scale-90 flex items-center justify-center gap-1 cursor-pointer select-none transition-transform"
                  >
                    <span>⚡</span>
                    <span>LOMPAT (SPASI/TAP)</span>
                  </button>
                </div>
              )}

              {/* Bottom hints — hide some on very small screens to save space */}
              <div className="bg-[#080d08] px-2 py-0.5 sm:px-4 sm:py-1.5 border-t border-emerald-500/30 flex items-center justify-between gap-1 text-[7px] sm:text-[9px] text-zinc-400 select-none shrink-0">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-emerald-300 font-bold text-[7px] sm:text-[8px]">
                    SPASI / KLIK / TAP
                  </span>
                  <span className="hidden xs:inline sm:inline text-[7px] sm:text-[9px]">= Lompat</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2.5 text-emerald-400 font-mono">
                  <span>💡+15</span>
                  <span>🔌+30</span>
                  <span className="hidden xs:inline">🎾+150</span>
                  <span>⚡Perisai</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
