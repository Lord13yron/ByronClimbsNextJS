"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/components/anim/gsap";

type GradeSkylineProps = {
  /** Per-grade counts (low → high) that drive the ridge heights. */
  counts: number[];
};

/** Pull a hex token from CSS so the WebGL layer stays in the design system. */
function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

/**
 * Decorative 3D "grade skyline": an InstancedMesh ridge of wireframe bars whose
 * heights encode Byron's per-grade send distribution, lerped ember-soft →
 * ember-deep front-to-back. Mirrors the ArticleHero three.js lifecycle (try/catch
 * renderer, IntersectionObserver pause, debounced resize, full dispose). Under
 * reduced motion it renders a single static frame; if WebGL is unavailable it
 * renders nothing and the masthead's scrims keep the text legible.
 */
export default function GradeSkyline({ counts }: GradeSkylineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 760px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }

    const sizeOf = () => ({ w: container.clientWidth, h: container.clientHeight });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    let { w, h } = sizeOf();
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x161618, 0.038);

    const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 200);
    const camBase = new THREE.Vector3(0, 13, 30);
    camera.position.copy(camBase);
    camera.lookAt(0, 2, 0);

    // --- Ridge geometry ------------------------------------------------
    const COLS = Math.max(counts.length, 1);
    const ROWS = mobile ? 7 : 13;
    const FOOT = 1.5;
    const GAP = 2.4;
    const max = Math.max(1, ...counts);
    const heightFor = (col: number) => 1.2 + (counts[col] ?? 0) / max * 12;

    const total = COLS * ROWS;
    const geo = new THREE.BoxGeometry(FOOT, 1, FOOT); // unit height, scaled per instance

    const wireMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const fillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x0e0e10),
      transparent: true,
      opacity: 0,
    });
    const wire = new THREE.InstancedMesh(geo, wireMat, total);
    const fill = new THREE.InstancedMesh(geo, fillMat, total);

    const colA = new THREE.Color(cssVar("--ember-soft", "#E37A3F")); // low grades / front
    const colB = new THREE.Color(cssVar("--ember-deep", "#8E3A12")); // high grades / back

    const baseHeights = new Float32Array(total);
    const phases = new Float32Array(total);
    const cols = new Int16Array(total);
    const dummy = new THREE.Object3D();
    const tmpColor = new THREE.Color();

    let i = 0;
    for (let c = 0; c < COLS; c++) {
      const colColor = tmpColor.copy(colA).lerp(colB, COLS > 1 ? c / (COLS - 1) : 0);
      for (let r = 0; r < ROWS; r++) {
        const bh = heightFor(c);
        baseHeights[i] = bh;
        phases[i] = Math.random() * Math.PI * 2;
        cols[i] = c;
        dummy.position.set(
          (c - (COLS - 1) / 2) * GAP,
          bh / 2,
          (r - (ROWS - 1) / 2) * GAP,
        );
        dummy.scale.set(1, bh, 1);
        dummy.updateMatrix();
        wire.setMatrixAt(i, dummy.matrix);
        fill.setMatrixAt(i, dummy.matrix);
        wire.setColorAt(i, colColor);
        i++;
      }
    }
    wire.instanceMatrix.needsUpdate = true;
    fill.instanceMatrix.needsUpdate = true;
    if (wire.instanceColor) wire.instanceColor.needsUpdate = true;

    const group = new THREE.Group();
    group.add(fill, wire);
    scene.add(group);

    // --- Reduced motion: one static frame ------------------------------
    if (reduced) {
      group.rotation.y = 0.35;
      wireMat.opacity = 0.62;
      fillMat.opacity = 0.32;
      renderer.render(scene, camera);
      return () => {
        geo.dispose();
        wireMat.dispose();
        fillMat.dispose();
        wire.dispose();
        fill.dispose();
        renderer.dispose();
      };
    }

    // --- Animated path -------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    if (!mobile) window.addEventListener("pointermove", onPointer);

    let reveal = 0;
    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();

    const render = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.045;

      // Gentle per-bar height wobble.
      for (let j = 0; j < total; j++) {
        const bh = baseHeights[j] * (1 + Math.sin(t * 0.9 + phases[j]) * 0.04);
        const col = cols[j];
        const row = j % ROWS;
        dummy.position.set(
          (col - (COLS - 1) / 2) * GAP,
          bh / 2,
          (row - (ROWS - 1) / 2) * GAP,
        );
        dummy.scale.set(1, bh, 1);
        dummy.updateMatrix();
        wire.setMatrixAt(j, dummy.matrix);
        fill.setMatrixAt(j, dummy.matrix);
      }
      wire.instanceMatrix.needsUpdate = true;
      fill.instanceMatrix.needsUpdate = true;

      if (reveal < 1) {
        reveal = Math.min(1, reveal + 1 / 90);
        wireMat.opacity = reveal * 0.62;
        fillMat.opacity = reveal * 0.32;
      }

      if (!mobile) {
        camera.position.x += (pointer.x * 6 - camera.position.x) * 0.04;
        camera.position.y += (13 - pointer.y * 4 - camera.position.y) * 0.04;
        camera.lookAt(0, 2, 0);
      }

      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(container);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ({ w, h } = sizeOf());
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (!mobile) window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      wireMat.dispose();
      fillMat.dispose();
      wire.dispose();
      fill.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 z-0">
      {!failed && (
        <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
      )}
    </div>
  );
}
