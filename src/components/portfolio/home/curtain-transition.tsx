"use client";

import { useEffect, useRef } from "react";
import styles from "./curtain-transition.module.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function ease(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function coverage(progress: number, side: number) {
  const close = ease((progress - (side > 0 ? .025 : 0)) / .42);
  const open = ease((progress - (side > 0 ? .62 : .60)) / .38);
  return close * (1 - open);
}

function paintCurtain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  side: number,
) {
  const top = coverage(progress, side);
  const middle = coverage(progress - .026, side);
  const hem = coverage(progress - .055, side);
  const pull = top - hem;
  const folds = 14;
  const span = width / 2 + 2;
  // The track moves first. Bend the pleats below it and let the hem follow last.
  const edge = (column: number, row: number) => {
    const u = column / folds;
    const amount = row === 0 ? top : row === 1 ? middle : hem;
    const sway = Math.sin(progress * 20 + u * 9 + row + side) * Math.abs(pull) * row * 8;
    return -2 + (span * amount + 2) * u + sway * Math.sin(Math.PI * u);
  };

  ctx.save();
  if (side > 0) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  for (let fold = 0; fold < folds; fold++) {
    const end = fold + 1;
    const x = edge(fold, 1);
    const tint = ctx.createLinearGradient(x, 0, Math.max(x + 1, edge(end, 1)), 0);
    tint.addColorStop(0, "#0c1020");
    tint.addColorStop(.32, side < 0 ? "#293947" : "#302637");
    tint.addColorStop(.53, side < 0 ? "#354757" : "#403047");
    tint.addColorStop(.79, "#1a1c2c");
    tint.addColorStop(1, "#0c1020");
    ctx.fillStyle = tint;
    ctx.beginPath();
    ctx.moveTo(edge(fold, 0) - .5, 0);
    ctx.lineTo(edge(end, 0) + .5, 0);
    ctx.bezierCurveTo(edge(end, 0), height * .31, edge(end, 1), height * .63, edge(end, 2) + .5, height);
    ctx.lineTo(edge(fold, 2) - .5, height);
    ctx.bezierCurveTo(edge(fold, 1), height * .63, edge(fold, 0), height * .31, edge(fold, 0) - .5, 0);
    ctx.fill();
  }

  const shade = ctx.createLinearGradient(0, 0, 0, height);
  shade.addColorStop(0, "#050710b5");
  shade.addColorStop(.35, "#05071000");
  shade.addColorStop(.8, "#05071022");
  shade.addColorStop(1, "#05071092");
  ctx.fillStyle = shade;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(edge(folds, 0), 0);
  ctx.bezierCurveTo(edge(folds, 0), height * .31, edge(folds, 1), height * .63, edge(folds, 2), height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.restore();
}

export default function CurtainTransition() {
  const markerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!marker || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let displayed: number | undefined;

    function render(time: number) {
      frame = 0;
      if (!marker || !canvas || !ctx) return;
      if (reducedMotion.matches) {
        canvas.hidden = true;
        displayed = undefined;
        return;
      }

      const height = window.innerHeight;
      const width = document.documentElement.clientWidth;
      const boundary = marker.getBoundingClientRect().top;
      const end = Math.min(height * .32, width <= 760 ? 130 : 110);
      const start = Math.max(end + 1, Math.min(height * .82, boundary + window.scrollY - 48));
      const target = clamp((start - boundary) / (start - end));

      if (target === 0 || target === 1) {
        // Keep navigation jumps and section links clear of a stale overlay.
        displayed = target;
        canvas.hidden = true;
        return;
      }

      displayed ??= target;
      const elapsed = previousTime ? Math.min(time - previousTime, 80) : 16;
      previousTime = time;
      const difference = target - displayed;
      displayed = Math.abs(difference) < .0015
        ? target
        : displayed + difference * (1 - Math.exp(-elapsed / 64));

      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.round(width * scale) || canvas.height !== Math.round(height * scale)) {
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
      }

      canvas.hidden = false;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, width, height);
      paintCurtain(ctx, width, height, displayed, -1);
      paintCurtain(ctx, width, height, displayed, 1);

      if (displayed !== target) schedule();
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    const layout = new ResizeObserver(schedule);
    if (marker.previousElementSibling) layout.observe(marker.previousElementSibling);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      layout.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={markerRef} aria-hidden="true">
      <canvas ref={canvasRef} hidden className={styles.curtain} />
    </div>
  );
}
