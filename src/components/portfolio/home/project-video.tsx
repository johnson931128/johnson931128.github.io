"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./portfolio.module.css";

export default function ProjectVideo({ title, src, poster }: {
  title: string;
  src: string;
  poster: { src: string; alt: string };
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!playing || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [playing]);

  if (playing) {
    return (
      <video
        ref={videoRef}
        className={styles.projectVideo}
        src={src}
        poster={poster.src}
        aria-label={`${title} demonstration video`}
        controls
        autoPlay
        playsInline
        preload="none"
        onPlay={(event) => {
          document.querySelectorAll("video").forEach((video) => {
            if (video !== event.currentTarget) video.pause();
          });
        }}
      >
        <a href={src}>Open the {title} video</a>
      </video>
    );
  }

  return (
    <button type="button" className={styles.videoButton} onClick={() => setPlaying(true)} aria-label={`Play ${title} video`}>
      <Image src={poster.src} alt={poster.alt} width={720} height={450} sizes="(max-width: 640px) 100vw, 360px" className={styles.projectImage} />
      <span className={styles.playLabel}><span aria-hidden="true">▶</span> Watch video</span>
    </button>
  );
}
