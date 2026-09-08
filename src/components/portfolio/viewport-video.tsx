"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ViewportVideoProps = {
  src: string;
  className?: string;
};

export default function ViewportVideo({ src, className }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !reducedMotion.matches) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "80px 0px", threshold: [0, 0.35, 0.75] },
    );

    const handleMotionPreference = () => {
      if (reducedMotion.matches) video.pause();
    };

    observer.observe(video);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      className={cn("w-full object-cover", className)}
    />
  );
}
