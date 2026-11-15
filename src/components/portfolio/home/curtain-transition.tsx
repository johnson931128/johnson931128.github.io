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

const curtainDuration = 1050;
const closedAt = .55;
const landingTolerance = 16;

export default function CurtainTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const home = document.getElementById("about");
    const projects = document.getElementById("work");
    const stage = projects?.querySelector<HTMLElement>("[data-project-stage]");
    const header = document.querySelector("header");
    if (!canvas || !ctx || !home || !projects || !stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastWheel = -Infinity;
    let transitionDirection = 0;
    let transition: { started: number; destination: HTMLElement; switched: boolean } | null = null;

    const sectionTop = (section: HTMLElement) => {
      const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      return Math.max(0, section.getBoundingClientRect().top + window.scrollY - margin);
    };

    const projectLanding = () => {
      const bounds = stage.getBoundingClientRect();
      const style = getComputedStyle(stage);
      const topPadding = parseFloat(style.paddingTop) || 0;
      const bottomPadding = parseFloat(style.paddingBottom) || 0;
      const contentHeight = bounds.height - topPadding - bottomPadding;
      const headerBottom = header?.getBoundingClientRect().height ?? 0;
      const freeSpace = window.innerHeight - headerBottom - contentHeight;
      const contentTop = headerBottom + Math.max(16, freeSpace / 2);
      return Math.max(0, bounds.top + window.scrollY + topPadding - contentTop);
    };

    const jumpTo = (section: HTMLElement) => {
      const top = section === projects ? projectLanding() : sectionTop(section);
      window.scrollTo({ top, behavior: "instant" });
      section.focus({ preventScroll: true });
    };

    const finish = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      transition = null;
      canvas.hidden = true;
    };

    const render = (time: number) => {
      if (!transition) return;
      if (reducedMotion.matches) {
        if (!transition.switched) jumpTo(transition.destination);
        finish();
        return;
      }

      const progress = clamp((time - transition.started) / curtainDuration);
      if (transition.switched && progress === 1) {
        jumpTo(transition.destination);
        finish();
        return;
      }

      const height = window.innerHeight;
      const width = document.documentElement.clientWidth;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.round(width * scale) || canvas.height !== Math.round(height * scale)) {
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
      }

      // If a frame was delayed, still cover the old scene completely before the jump.
      const visibleProgress = transition.switched ? progress : Math.min(progress, closedAt);
      canvas.hidden = false;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, width, height);
      paintCurtain(ctx, width, height, visibleProgress, -1);
      paintCurtain(ctx, width, height, visibleProgress, 1);

      if (!transition.switched && progress >= closedAt) {
        jumpTo(transition.destination);
        transition.switched = true;
        transition.started = time - closedAt * curtainDuration;
      }
      frame = requestAnimationFrame(render);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey ||
          Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const direction = Math.sign(event.deltaY);
      const now = performance.now();
      const continuingGesture = now - lastWheel < 160;
      lastWheel = now;
      // Keep the original gesture's momentum from shifting the landing. A new
      // gesture or a change of direction can navigate immediately.
      if (transition || (continuingGesture && direction === transitionDirection)) {
        event.preventDefault();
        return;
      }

      transitionDirection = 0;
      const current = window.scrollY;
      const landing = projectLanding();
      const projectStart = Math.min(sectionTop(projects), landing);
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const fromHome = delta > 0 && current < projectStart - landingTolerance;
      const fromProjects = delta < 0 && current >= projectStart - landingTolerance &&
        current + delta <= landing + landingTolerance;
      if (!event.cancelable || (!fromHome && !fromProjects)) return;
      if (event.target instanceof Element && event.target.closest("textarea, select, [contenteditable], video")) return;

      event.preventDefault();
      const destination = fromHome ? projects : home;
      if (reducedMotion.matches) {
        jumpTo(destination);
        return;
      }

      transitionDirection = direction;
      transition = { started: now, destination, switched: false };
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("hashchange", finish);
    return () => {
      finish();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("hashchange", finish);
    };
  }, []);

  return <canvas ref={canvasRef} hidden aria-hidden="true" className={styles.curtain} />;
}
