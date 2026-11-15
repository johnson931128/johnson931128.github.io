"use client";

import Image from "next/image";
import { Children, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import styles from "./project-gallery.module.css";

const dragThreshold = 52;

export default function ProjectReel({ projects, heading, children }: {
  projects: readonly { id: string; title: string }[];
  heading: ReactNode;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [press, setPress] = useState(0);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gesture = useRef<{ id: number; start: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const count = projects.length;

  useEffect(() => {
    const selectHash = () => {
      const index = projects.findIndex(({ id }) => location.hash === `#project-${id}`);
      if (index >= 0) setActive(index);
    };
    const frame = requestAnimationFrame(() => {
      selectHash();
      setReady(true);
    });
    window.addEventListener("hashchange", selectHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", selectHash);
    };
  }, [projects]);

  useEffect(() => {
    reelRef.current?.querySelectorAll<HTMLVideoElement>("[inert] video").forEach((video) => video.pause());
  }, [active]);

  useEffect(() => () => {
    if (pressTimer.current !== null) clearTimeout(pressTimer.current);
  }, []);

  function step(direction: number) {
    if (count < 2) return;
    setActive((index) => (index + direction + count) % count);
    setPress((previous) => previous + 1);
    if (pressTimer.current !== null) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      setPress(0);
      pressTimer.current = null;
    }, 460);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    if (!event.isPrimary || event.button !== 0 || gesture.current ||
        (event.target instanceof Element && event.target.closest("video"))) return;
    gesture.current = { id: event.pointerId, start: event.clientY, moved: false };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const distance = event.clientY - current.start;
    if (!current.moved && Math.abs(distance) < 6) return;
    if (!current.moved) {
      current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDrag(Math.max(-155, Math.min(155, distance)));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>, canceled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setDrag(0);
    if (!current.moved || canceled) return;
    suppressClick.current = true;
    const distance = event.clientY - current.start;
    if (Math.abs(distance) >= dragThreshold) step(distance > 0 ? -1 : 1);
  }

  const cards = Children.toArray(children);

  return (
    <div className={styles.room}>
      <div className={styles.galleryInner}>
        {heading}
        <div className={styles.display} data-ready={ready || undefined}>
          <div className={styles.controls}>
            <p id="project-reel-help">Drag up or down to browse</p>
          </div>
          <div
            ref={reelRef}
            className={styles.reel}
            data-dragging={drag !== 0 || undefined}
            style={{ "--drag": `${drag}px`, "--tilt": `${drag / 9}deg` } as CSSProperties}
            tabIndex={ready ? 0 : undefined}
            role="group"
            aria-label="Project reel"
            aria-describedby={ready ? "project-reel-help" : undefined}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={finishDrag}
            onPointerCancel={(event) => finishDrag(event, true)}
            onLostPointerCapture={(event) => {
              if (event.target === event.currentTarget) finishDrag(event, true);
            }}
            onPointerLeave={(event) => {
              if (!gesture.current?.moved) finishDrag(event, true);
            }}
            onDragStart={(event) => event.preventDefault()}
            onClickCapture={(event) => {
              if (!suppressClick.current) return;
              suppressClick.current = false;
              event.preventDefault();
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
              event.preventDefault();
              step(event.key === "ArrowUp" ? -1 : 1);
            }}
          >
            <div className={styles.grip} aria-hidden="true"><span /></div>
            {projects.map(({ id }, index) => {
              const offset = (index - active + count) % count;
              const position = offset > Math.floor(count / 2) ? offset - count : offset;
              return (
                <div key={id} id={`project-${id}`} className={styles.slot}
                  data-current={index === active || undefined}
                  inert={ready && index !== active}
                  style={{ "--position": position, "--distance": Math.abs(position) } as CSSProperties}>
                  {cards[index]}
                  <span className={styles.position} aria-hidden="true">{index + 1} / {count}</span>
                </div>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">{active + 1} / {count} {projects[active]?.title}</p>
        </div>
      </div>
      <div
        className={styles.foreground}
        data-aiming={Math.abs(drag) >= 22 || press > 0 || undefined}
        aria-hidden="true"
      >
        <Image
          src="/hero/project-sofa-foreground.webp"
          className={styles.restingPose}
          alt=""
          width={1000}
          height={564}
          sizes="(max-width: 640px) 69vw, 450px"
        />
        <Image
          src="/hero/project-remote-raised.webp"
          className={styles.raisedPose}
          alt=""
          width={1000}
          height={564}
          sizes="(max-width: 640px) 69vw, 450px"
        />
        {press > 0 && <span key={press} className={styles.remotePulse} />}
      </div>
    </div>
  );
}
