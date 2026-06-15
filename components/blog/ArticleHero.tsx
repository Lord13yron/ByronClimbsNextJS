"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import MonoChip from "@/components/ui/MonoChip";
import {
  gsap,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/components/anim/gsap";

type ArticleHeroProps = {
  image?: string;
  title: string;
  date: string;
  readTime: number;
  monthYear: string;
};

/** Pull a hex token from CSS so the WebGL layer stays in the design system. */
function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

/** Soft round radial sprite (white → ember) for the dust motes. */
function dustTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,236,220,0.9)");
  g.addColorStop(0.6, "rgba(227,122,63,0.5)");
  g.addColorStop(1, "rgba(227,122,63,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

/**
 * Cinematic, full-bleed article hero: the cover photo bled edge-to-edge under
 * layered scrims, a drifting field of ember dust (three.js), a slow ken-burns +
 * scroll parallax, and a line-masked title that slides up on load. Under
 * `prefers-reduced-motion` or when WebGL is unavailable, the dust + photo motion
 * are skipped — the bled photo + scrims still read as a full cinematic block.
 */
export default function ArticleHero({
  image,
  title,
  date,
  readTime,
  monthYear,
}: ArticleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const kenRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // --- Ember dust (three.js) -------------------------------------------
  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    if (prefersReducedMotion()) {
      setReducedMotion(true);
      return;
    }

    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const emberSoft = cssVar("--ember-soft", "#E37A3F");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }

    const sizeOf = () => ({ w: section.clientWidth, h: section.clientHeight });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    let { w, h } = sizeOf();
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(54, w / h, 0.1, 100);
    const camBase = new THREE.Vector3(0, 0, 22);
    camera.position.copy(camBase);
    camera.lookAt(0, 0, 0);

    const BOX = { x: 46, y: 26, z: 24 };
    const count = mobile ? 340 : 900;
    const positions = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOX.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOX.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOX.z;
      speed[i] = 0.6 + Math.random() * 0.9;
      phase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const texture = dustTexture();
    const material = new THREE.PointsMaterial({
      map: texture,
      color: emberSoft,
      size: mobile ? 0.5 : 0.42,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Pointer parallax (desktop only).
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
    const top = BOX.y / 2;

    const render = () => {
      const t = clock.getElapsedTime();
      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        let y = arr[i * 3 + 1] + 0.013 * speed[i];
        if (y > top) y = -top;
        arr[i * 3 + 1] = y;
        arr[i * 3] += Math.sin(t * 0.5 + phase[i]) * 0.0016;
      }
      geo.attributes.position.needsUpdate = true;
      group.rotation.y += 0.0007;

      if (reveal < 1) {
        reveal = Math.min(1, reveal + 1 / 90);
        material.opacity = reveal * 0.5;
      }

      if (!mobile) {
        camera.position.x += (pointer.x * 2.6 - camera.position.x) * 0.04;
        camera.position.y += (pointer.y * 1.5 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
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

    // Pause the RAF loop while the hero is offscreen.
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
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  // --- Photo motion + title/content entrance ---------------------------
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Slow ken-burns + scroll parallax on the bled cover photo.
      if (kenRef.current) {
        gsap.to(kenRef.current, {
          scale: 1.09,
          duration: 16,
          ease: "none",
          yoyo: true,
          repeat: -1,
        });
      }
      if (photoWrapRef.current) {
        gsap.to(photoWrapRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Masked title slide-up, then crumb/meta fade-in.
      const tl = gsap.timeline();
      tl.from(".hero-line", {
        yPercent: 120,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }).from(
        ".hero-rise",
        {
          autoAlpha: 0,
          y: 12,
          duration: 0.65,
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
      className="relative isolate flex min-h-[clamp(560px,90vh,820px)] flex-col justify-end overflow-hidden bg-granite-200"
    >
      {/* Bled cover photo */}
      <div
        ref={photoWrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ left: "-4%", top: "-8%", width: "108%", height: "118%" }}
      >
        <div ref={kenRef} className="relative h-full w-full">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: "center 46%",
                filter: "saturate(0.86) contrast(1.04) brightness(0.78)",
              }}
            />
          ) : (
            <div className="photo-ph h-full w-full" />
          )}
        </div>
      </div>

      {/* Ember dust */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}

      {/* Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 16%, rgba(200,84,30,0.26), transparent 64%)",
          animation: "mast-glow 9s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,22,24,0.78) 0%, rgba(22,22,24,0.25) 26%, rgba(22,22,24,0.18) 48%, rgba(22,22,24,0.88) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[96px]"
        style={{
          background: "linear-gradient(180deg, rgba(22,22,24,0.82), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl"
        style={{
          padding:
            "clamp(40px,7vw,68px) clamp(20px,5vw,56px) clamp(34px,5vw,56px)",
        }}
      >
        {/* Breadcrumb */}
        <div className="hero-rise mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(244,241,236,0.66)]">
          <Link
            href="/blog"
            className="transition-colors hover:text-ember-soft"
          >
            Field Journal
          </Link>
          <span className="text-[rgba(244,241,236,0.3)]">/</span>
          <span>{monthYear}</span>
        </div>

        {/* Meta */}
        <div className="hero-rise mb-5 flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(244,241,236,0.66)]">
          <span className="text-ember-soft">{date}</span>
          <span className="text-[rgba(244,241,236,0.4)]">·</span>
          <span>{readTime} MIN READ</span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-extrabold uppercase text-balance text-chalk"
          style={{
            fontSize: "clamp(46px,8.4vw,116px)",
            lineHeight: 0.86,
            maxWidth: "14ch",
          }}
        >
          <span className="block overflow-hidden">
            <span className="hero-line block">{title}</span>
          </span>
        </h1>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[rgba(244,241,236,0.42)]"
        style={{ animation: "mast-bob 2.4s ease-in-out infinite" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          READ
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
