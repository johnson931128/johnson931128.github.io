"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.6;
const MAX_SCALE = 5;

type ViewState = {
  x: number;
  y: number;
  scale: number;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  viewX: number;
  viewY: number;
};

function clampScale(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

export default function ArchitectureCanvas() {
  const viewportRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);

  const resetView = useCallback(() => {
    setView({ x: 0, y: 0, scale: 1 });
  }, []);

  const zoomAtCenter = useCallback((factor: number) => {
    setView((current) => ({
      ...current,
      scale: clampScale(current.scale * factor),
    }));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = viewport.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left - bounds.width / 2;
      const pointerY = event.clientY - bounds.top - bounds.height / 2;

      setView((current) => {
        const nextScale = clampScale(current.scale * Math.exp(-event.deltaY * 0.0015));
        const ratio = nextScale / current.scale;

        return {
          scale: nextScale,
          x: pointerX - ratio * (pointerX - current.x),
          y: pointerY - ratio * (pointerY - current.y),
        };
      });
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main
      ref={viewportRef}
      tabIndex={0}
      aria-label="Interactive MDSBU EtherCAT Analyzer architecture slide. Use the mouse wheel to zoom and drag with the left mouse button to move."
      data-zoom={view.scale.toFixed(3)}
      data-pan-x={Math.round(view.x)}
      data-pan-y={Math.round(view.y)}
      onKeyDown={(event) => {
        if (event.key === "+" || event.key === "=") {
          event.preventDefault();
          zoomAtCenter(1.2);
        } else if (event.key === "-" || event.key === "_") {
          event.preventDefault();
          zoomAtCenter(1 / 1.2);
        } else if (event.key === "0" || event.key === "Escape") {
          event.preventDefault();
          resetView();
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          viewX: view.x,
          viewY: view.y,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        setView((current) => ({
          ...current,
          x: drag.viewX + event.clientX - drag.startX,
          y: drag.viewY + event.clientY - drag.startY,
        }));
      }}
      onPointerUp={(event) => {
        if (dragRef.current?.pointerId !== event.pointerId) return;
        dragRef.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
        setIsDragging(false);
      }}
      onPointerCancel={() => {
        dragRef.current = null;
        setIsDragging(false);
      }}
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#0b0e12] outline-none select-none touch-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <h1 className="sr-only">MDSBU EtherCAT Analyzer Architecture</h1>

      <div
        className="absolute inset-4 sm:inset-6"
        style={{
          transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
          transformOrigin: "center",
        }}
      >
        <Image
          src="/slides/mdsbu-ethercat-analyzer-architecture.drawio.svg"
          alt="MDSBU EtherCAT Analyzer architecture diagram"
          fill
          priority
          unoptimized
          draggable={false}
          className="pointer-events-none object-contain"
          sizes="100vw"
        />
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-px overflow-hidden rounded-sm border border-white/20 bg-[#111821]/92 text-white shadow-lg sm:top-6 sm:right-6">
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => zoomAtCenter(1 / 1.2)}
          aria-label="Zoom out"
          className="grid size-10 place-items-center text-xl text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
        >
          −
        </button>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={resetView}
          aria-label="Reset view"
          className="h-10 min-w-16 border-x border-white/15 px-3 font-mono text-xs tabular-nums text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
        >
          {Math.round(view.scale * 100)}%
        </button>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => zoomAtCenter(1.2)}
          aria-label="Zoom in"
          className="grid size-10 place-items-center text-xl text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
        >
          +
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#111821]/88 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/55 sm:bottom-6">
        Wheel to zoom / Drag to move
      </p>
    </main>
  );
}
