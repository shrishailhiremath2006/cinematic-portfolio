"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

// Builds a soft radial-gradient sprite so points render as gentle glowing
// orbs (bokeh) instead of hard squares.
function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CinematicLayer({ particleCount = 220 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // --- Particle field -----------------------------------------------
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count); // sine oscillation offsets
    const speeds = new Float32Array(count);
    const baseX = new Float32Array(count);
    const baseY = new Float32Array(count);

    const warm = new THREE.Color("#ff8a3d");
    const pale = new THREE.Color("#fff2e0");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 14;

      baseX[i] = x;
      baseY[i] = y;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Bias the mix so most particles read warm, a minority read
      // near-white — echoes practical lamps vs. monitor glow.
      const mixed =
        Math.random() > 0.78
          ? white.clone().lerp(pale, Math.random())
          : warm.clone().lerp(pale, Math.random() * 0.6);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      sizes[i] = 0.35 + Math.random() * 1.1;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const glowTexture = createGlowTexture();

    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse parallax --------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    function handlePointerMove(event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    // --- Resize handling ---------------------------------------------
    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // --- Animation loop -------------------------------------------------
    const clock = new THREE.Clock();
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const t = prefersReducedMotion ? elapsed * 0.15 : elapsed;

      const posAttr = geometry.getAttribute("position");
      for (let i = 0; i < count; i++) {
        posAttr.array[i * 3] =
          baseX[i] + Math.sin(t * speeds[i] + phases[i]) * 0.6;
        posAttr.array[i * 3 + 1] =
          baseY[i] + Math.cos(t * speeds[i] * 0.8 + phases[i]) * 0.5;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = t * 0.015;

      targetCamera.x += (pointer.x * 1.1 - targetCamera.x) * 0.02;
      targetCamera.y += (-pointer.y * 0.7 - targetCamera.y) * 0.02;
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // --- Cleanup ----------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return <div ref={mountRef} className={styles.canvasHost} aria-hidden="true" />;
}
