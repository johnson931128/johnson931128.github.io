"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const scenes = [
  { id: "about", label: "Intro" },
  { id: "experience", label: "Experience + Work" },
  { id: "learning-notes", label: "Learning Notes" },
] as const;

const sceneIndex = (hash: string) => {
  const id = hash.replace(/^#/, "");
  if (id === "work") return 1;
  const index = scenes.findIndex((scene) => scene.id === id);
  return index >= 0 ? index : 0;
};

type SceneControllerProps = {
  children: ReactNode;
};

export default function PortfolioSceneController({ children }: SceneControllerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionFrom, setTransitionFrom] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const activeRef = useRef(0);
  const desktopRef = useRef(false);
  const lockedUntil = useRef(0);
  const wheelTotal = useRef(0);
  const lastWheelAt = useRef(0);
  const transitionTimer = useRef<number | null>(null);
  const sceneChildren = Children.toArray(children);

  const navigateTo = useCallback((nextIndex: number, updateHash = true) => {
    const clamped = Math.max(0, Math.min(scenes.length - 1, nextIndex));
    const current = activeRef.current;
    if (clamped === current || Date.now() < lockedUntil.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTransitionFrom(current);
    setDirection(clamped > current ? "forward" : "backward");
    setTransitioning(true);
    activeRef.current = clamped;
    setActiveIndex(clamped);
    wheelTotal.current = 0;
    lockedUntil.current = Date.now() + (reducedMotion ? 240 : 1050);

    if (window.scrollY !== 0) window.scrollTo({ top: 0, behavior: "auto" });
    if (updateHash) window.history.replaceState(null, "", `#${scenes[clamped].id}`);
    window.dispatchEvent(new CustomEvent("portfolio:scenechange", { detail: scenes[clamped] }));

    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      setTransitioning(false);
      transitionTimer.current = null;
    }, reducedMotion ? 40 : 900);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const syncMode = () => {
      desktopRef.current = media.matches;
      setDesktop(media.matches);
      if (media.matches) {
        const initial = sceneIndex(window.location.hash);
        activeRef.current = initial;
        setActiveIndex(initial);
        window.scrollTo({ top: 0, behavior: "auto" });
        window.dispatchEvent(new CustomEvent("portfolio:scenechange", { detail: scenes[initial] }));
      }
    };

    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!desktopRef.current || event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.1) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-carousel-interactive]") && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      if (Date.now() < lockedUntil.current) {
        event.preventDefault();
        return;
      }

      const current = activeRef.current;
      if (current === scenes.length - 1 && event.deltaY > 0) return;
      if (window.scrollY > 1) return;

      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelAt.current > 180) wheelTotal.current = 0;
      lastWheelAt.current = now;
      wheelTotal.current += event.deltaY;

      if (Math.abs(wheelTotal.current) < 56) return;
      navigateTo(current + (wheelTotal.current > 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!desktopRef.current || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        if (activeRef.current === scenes.length - 1) {
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: reducedMotion ? "auto" : "smooth",
          });
          return;
        }
        navigateTo(activeRef.current + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        if (window.scrollY > 1) {
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
          return;
        }
        navigateTo(activeRef.current - 1);
      }
    };

    const onSceneLink = (event: MouseEvent) => {
      if (!desktopRef.current) return;
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("[data-scene-target]");
      if (!link) return;
      const id = link.dataset.sceneTarget;
      const index = scenes.findIndex((scene) => scene.id === id);
      if (index < 0) return;
      event.preventDefault();
      navigateTo(index);
    };

    const onHashChange = () => {
      if (desktopRef.current) navigateTo(sceneIndex(window.location.hash), false);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onSceneLink);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onSceneLink);
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    };
  }, [navigateTo]);

  const stageStyle = { "--scene-index": activeIndex } as CSSProperties;

  return (
    <div
      className="portfolio-scenes full-bleed"
      data-enhanced={desktop ? "true" : undefined}
      data-transitioning={transitioning ? "true" : undefined}
      data-direction={direction}
      style={stageStyle}
    >
      <nav className="scene-top-nav" aria-label="Scene navigation">
        {scenes.map((scene, index) => (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            data-scene-target={scene.id}
            aria-current={index === activeIndex ? "location" : undefined}
          >
            <span aria-hidden />
            {scene.label}
          </a>
        ))}
      </nav>

      <div className="scene-rail" aria-label="Portfolio scenes">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => navigateTo(index)}
            aria-label={`Show ${scene.label}`}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i aria-hidden />
          </button>
        ))}
      </div>

      <div className="scene-controls">
        <button type="button" onClick={() => navigateTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous scene">
          <ArrowUp aria-hidden />
        </button>
        <button type="button" onClick={() => navigateTo(activeIndex + 1)} disabled={activeIndex === scenes.length - 1} aria-label="Next scene">
          <ArrowDown aria-hidden />
        </button>
      </div>

      <div className="portfolio-scene-stage">
        {sceneChildren.map((child, index) => {
          const state = index === activeIndex ? "active" : index < activeIndex ? "previous" : "next";
          return (
            <div
              key={scenes[index]?.id ?? index}
              className="portfolio-scene"
              data-scene={scenes[index]?.id}
              data-state={state}
              aria-hidden={desktop && state !== "active" ? true : undefined}
              inert={desktop && state !== "active"}
            >
              {child}
            </div>
          );
        })}
        {transitioning ? (
          <div className="scene-wipe" data-direction={direction} data-from={transitionFrom} data-to={activeIndex} aria-hidden>
            <span className="scene-crt-scanlines" />
            <span className="scene-crt-tear" />
            <span className="scene-crt-flare" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
