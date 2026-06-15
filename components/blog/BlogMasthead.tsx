"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import Counter from "@/components/anim/Counter";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type BlogMastheadProps = {
  entriesCount: number;
  cragsCount: number;
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
 * Dark, full-bleed masthead for the field journal. A low-poly ember wireframe
 * terrain (three.js) animates behind the title + live stats. Under
 * `prefers-reduced-motion` or when WebGL is unavailable it falls back to a
 * static topo-line motif — never a flat empty block.
 */
export default function BlogMasthead({
  entriesCount,
  cragsCount,
}: BlogMastheadProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  // --- Terrain ----------------------------------------------------------
  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    if (prefersReducedMotion()) {
      setFallback(true);
      return;
    }

    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const ember = cssVar("--ember", "#C8541E");
    const emberSoft = cssVar("--ember-soft", "#E37A3F");
    const granite = cssVar("--granite-200", "#161618");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setFallback(true);
      return;
    }

    const sizeOf = () => ({
      w: section.clientWidth,
      h: section.clientHeight,
    });

    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    let { w, h } = sizeOf();
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(granite, 0.052);

    const camera = new THREE.PerspectiveCamera(54, w / h, 0.1, 100);
    const camBase = new THREE.Vector3(0, 5, 11);
    const lookAt = new THREE.Vector3(0, -0.5, -3);
    camera.position.copy(camBase);
    camera.lookAt(lookAt);

    const segs = mobile ? 46 : 84;
    const group = new THREE.Group();
    group.rotation.x = -Math.PI / 2;
    scene.add(group);

    const geo = new THREE.PlaneGeometry(46, 46, segs, segs);
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: ember,
        wireframe: true,
        transparent: true,
        opacity: 0,
        fog: true,
      }),
    );
    group.add(mesh);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    const baseX = new Float32Array(count);
    const baseY = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      baseX[i] = pos.getX(i);
      baseY[i] = pos.getY(i);
    }

    // Peak points: a parallel buffer; non-peak vertices are sunk out of frame.
    const peakArr = new Float32Array(count * 3);
    const peakGeo = new THREE.BufferGeometry();
    peakGeo.setAttribute("position", new THREE.BufferAttribute(peakArr, 3));
    const points = new THREE.Points(
      peakGeo,
      new THREE.PointsMaterial({
        color: emberSoft,
        size: mobile ? 0.16 : 0.13,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0,
        fog: true,
      }),
    );
    group.add(points);

    const half = 23;
    const peakThreshold = 1.25;
    const displace = (x: number, y: number, t: number) => {
      const d = Math.min(1, Math.sqrt(x * x + y * y) / half);
      const falloff = 1 - d * d;
      const wx = x * 0.18;
      const wy = y * 0.18;
      const hgt =
        Math.sin(wx + t) * 1.4 +
        Math.cos(wy * 1.3 - t * 0.8) * 1.1 +
        Math.sin((wx + wy) * 0.6 + t * 0.6) * 0.8;
      return hgt * falloff * 2.2;
    };

    // Pointer parallax (desktop only).
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    if (!mobile) window.addEventListener("pointermove", onPointer);

    let frame = 0;
    let reveal = 0;
    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();

    const render = () => {
      const t = clock.getElapsedTime();
      const arr = pos.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = baseX[i];
        const y = baseY[i];
        const hgt = displace(x, y, t);
        arr[i * 3 + 2] = hgt;
        if (hgt > peakThreshold) {
          peakArr[i * 3] = x;
          peakArr[i * 3 + 1] = y;
          peakArr[i * 3 + 2] = hgt;
        } else {
          peakArr[i * 3 + 2] = -9999; // sink below frame
        }
      }
      pos.needsUpdate = true;
      peakGeo.attributes.position.needsUpdate = true;

      // Entrance fade-up over the first ~80 frames.
      if (reveal < 1) {
        reveal = Math.min(1, reveal + 1 / 80);
        (mesh.material as THREE.MeshBasicMaterial).opacity = reveal * 0.5;
        (points.material as THREE.PointsMaterial).opacity = reveal * 0.85;
      }

      if (!mobile) {
        camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.045;
        camera.position.y +=
          (camBase.y - pointer.y * 1.1 - camera.position.y) * 0.045;
        camera.lookAt(lookAt);
      }

      renderer.render(scene, camera);
      frame++;
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

    // Pause the RAF loop while the masthead is offscreen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(section);

    // Debounced resize.
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
      peakGeo.dispose();
      (mesh.material as THREE.Material).dispose();
      (points.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  // --- Title / content entrance ----------------------------------------
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".mast-line", {
        yPercent: 120,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }).from(
        ".mast-rise",
        {
          autoAlpha: 0,
          y: 18,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
        },
        0.5,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[clamp(540px,82vh,720px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Animated terrain */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      {/* Static fallback (reduced motion / no WebGL) */}
      {fallback && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 text-ember opacity-25"
        >
          <TopoLine height={140} seed={5} />
        </div>
      )}

      {/* Overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 78% 18%, rgba(200,84,30,0.22), transparent 64%)",
          animation: "mast-glow 9s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.92) 0%, rgba(22,22,24,0.35) 38%, rgba(22,22,24,0.15) 62%, rgba(22,22,24,0.78) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[90px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.85), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl"
        style={{
          padding:
            "clamp(40px,7vw,64px) clamp(20px,5vw,56px) clamp(32px,5vw,52px)",
        }}
      >
        <div className="mast-rise mb-5 flex items-center gap-4">
          <MonoChip className="text-ember-soft">— THE FIELD JOURNAL</MonoChip>
          <span
            aria-hidden="true"
            className="h-px w-24 max-w-[18vw]"
            style={{
              background:
                "linear-gradient(90deg, var(--ember), transparent)",
            }}
          />
        </div>

        <h1
          className="font-display font-extrabold uppercase text-chalk"
          style={{ fontSize: "clamp(52px,9vw,118px)", lineHeight: 0.88 }}
        >
          <span className="block overflow-hidden">
            <span className="mast-line block">Notes from</span>
          </span>
          <span className="block overflow-hidden">
            <span className="mast-line block">the gneiss.</span>
          </span>
        </h1>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <p
            className="mast-rise max-w-[560px] font-body"
            style={{
              fontSize: "clamp(14px,1.5vw,16.5px)",
              lineHeight: 1.65,
              color: "rgba(244,241,236,0.78)",
            }}
          >
            Trip reports, training journals, and the occasional rant about
            footwork — logged between sessions on Okanagan granite, sandstone,
            and gneiss.
          </p>

          <div className="mast-rise flex gap-10">
            {[
              { v: entriesCount, l: "ENTRIES FILED" },
              { v: cragsCount, l: "CRAGS COVERED" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="font-display leading-none text-chalk"
                  style={{ fontSize: "clamp(40px,5vw,56px)" }}
                >
                  <Counter value={s.v} />
                </div>
                <MonoChip className="mt-1.5 block text-[rgba(244,241,236,0.5)]">
                  {s.l}
                </MonoChip>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[rgba(244,241,236,0.4)]"
        style={{ animation: "mast-bob 2.4s ease-in-out infinite" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          SCROLL
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
