'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The portrait rendered as a cloud of points sampled from the image.
 * Points scatter away from the pointer and spring back, so the face only
 * fully resolves when the visitor leaves it alone.
 *
 * Plain canvas 2D: no WebGL context competing with the hero scene, and it
 * degrades to the photograph itself when anything is unavailable.
 */

const SIZE = 440; // Matches the source image, in CSS pixels.
const STEP = 3; // Sample every Nth pixel; lower means denser and slower.
const REPEL_RADIUS = 78;
const REPEL_STRENGTH = 1500;

interface Dot {
  readonly ox: number;
  readonly oy: number;
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function PortraitParticles({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'loading' | 'particles' | 'image'>('loading');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('image');
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) {
      setMode('image');
      return;
    }

    let frame = 0;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999 };
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onerror = () => setMode('image');

    image.onload = () => {
      // Read the pixels off an offscreen canvas at native size.
      const reader = document.createElement('canvas');
      reader.width = SIZE;
      reader.height = SIZE;
      const rc = reader.getContext('2d', { willReadFrequently: true });
      if (!rc) {
        setMode('image');
        return;
      }
      rc.drawImage(image, 0, 0, SIZE, SIZE);

      let pixels: Uint8ClampedArray;
      try {
        pixels = rc.getImageData(0, 0, SIZE, SIZE).data;
      } catch {
        // A tainted canvas (cross-origin) cannot be read.
        setMode('image');
        return;
      }

      for (let y = 0; y < SIZE; y += STEP) {
        for (let x = 0; x < SIZE; x += STEP) {
          const i = (y * SIZE + x) * 4;
          const r = pixels[i] ?? 0;
          const g = pixels[i + 1] ?? 0;
          const b = pixels[i + 2] ?? 0;
          const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          // Skip the darkest pixels so the cloud has air in it.
          if (luma < 0.14) continue;
          dots.push({
            ox: x,
            oy: y,
            r,
            g,
            b,
            size: 0.55 + luma * 1.25,
            x,
            y,
            vx: 0,
            vy: 0,
          });
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
      context.scale(dpr, dpr);
      setMode('particles');

      const tick = () => {
        context.clearRect(0, 0, SIZE, SIZE);
        for (const dot of dots) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < REPEL_RADIUS * REPEL_RADIUS && distanceSq > 0.01) {
            const distance = Math.sqrt(distanceSq);
            const force = (1 - distance / REPEL_RADIUS) * (REPEL_STRENGTH / distanceSq);
            dot.vx += (dx / distance) * force;
            dot.vy += (dy / distance) * force;
          }

          // Spring home, with damping so it settles instead of oscillating.
          dot.vx += (dot.ox - dot.x) * 0.045;
          dot.vy += (dot.oy - dot.y) * 0.045;
          dot.vx *= 0.82;
          dot.vy *= 0.82;
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Points tint toward the accent as they travel further from home.
          const offset = Math.min(1, (Math.abs(dot.x - dot.ox) + Math.abs(dot.y - dot.oy)) / 36);
          const r = Math.round(dot.r + (74 - dot.r) * offset);
          const g = Math.round(dot.g + (227 - dot.g) * offset);
          const b = Math.round(dot.b + (196 - dot.b) * offset);

          context.fillStyle = `rgb(${r} ${g} ${b})`;
          context.fillRect(dot.x, dot.y, dot.size, dot.size);
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    image.src = src;

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * SIZE;
      pointer.y = ((event.clientY - rect.top) / rect.height) * SIZE;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      dots = [];
    };
  }, [src]);

  return (
    <div className="relative aspect-square w-full max-w-[380px]">
      {/* The photograph carries the alt text and stays as the fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full rounded-sm object-cover transition-opacity duration-700 ${
          mode === 'particles' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          mode === 'particles' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
