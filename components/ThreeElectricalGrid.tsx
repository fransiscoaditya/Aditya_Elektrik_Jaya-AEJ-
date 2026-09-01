"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeElectricalGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capability
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 65;
    const maxDistance = isMobile ? 45 : 55;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000
    );
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
      precision: isMobile ? "mediump" : "highp",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // ── 3D Electrical Nodes & Particle Network ──
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const bounds = { x: 140, y: 90, z: 80 };

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.15,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#E6FF00"),
      size: isMobile ? 2.5 : 3.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // ── Lines Geometry for Electric Synapses ──
    const maxConnections = particleCount * 4;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Interaction (passive)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Resize Observer for efficient responsive layout
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Intersection Observer: Only render when visible on screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const limeColor = new THREE.Color("#E6FF00");
    const goldColor = new THREE.Color("#FFA800");

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip heavy WebGL calculations when out of viewport!
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth mouse follow
      if (!isMobile) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        camera.position.x = mouse.x * 20;
        camera.position.y = mouse.y * 14;
        camera.lookAt(scene.position);
      }

      const pos = geometry.attributes.position.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        if (Math.abs(pos[i3]) > bounds.x) velocities[i].x *= -1;
        if (Math.abs(pos[i3 + 1]) > bounds.y) velocities[i].y *= -1;
        if (Math.abs(pos[i3 + 2]) > bounds.z) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Connect nearby particles
      let lineIndex = 0;
      let colorIndex = 0;
      const lPos = lineGeometry.attributes.position.array as Float32Array;
      const lCol = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;

            lPos[lineIndex++] = pos[i * 3];
            lPos[lineIndex++] = pos[i * 3 + 1];
            lPos[lineIndex++] = pos[i * 3 + 2];

            lPos[lineIndex++] = pos[j * 3];
            lPos[lineIndex++] = pos[j * 3 + 1];
            lPos[lineIndex++] = pos[j * 3 + 2];

            const c = (i + j) % 2 === 0 ? limeColor : goldColor;
            lCol[colorIndex++] = c.r * alpha;
            lCol[colorIndex++] = c.g * alpha;
            lCol[colorIndex++] = c.b * alpha;
            lCol[colorIndex++] = c.r * alpha;
            lCol[colorIndex++] = c.g * alpha;
            lCol[colorIndex++] = c.b * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      scene.rotation.y = time * 0.03;
      scene.rotation.x = Math.sin(time * 0.02) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[3] overflow-hidden opacity-60"
    />
  );
}
