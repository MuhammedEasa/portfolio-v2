"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background film: a muted loop, self-hosted under /public so no
 * third-party bucket can silently take the hero down. Reduced motion gets
 * the poster frame alone — playback never starts, and with preload="none"
 * no video bytes are fetched for a single held frame.
 */

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster="/hero-poster.webp"
      src="/hero-film.mp4"
      className="h-full w-full object-cover"
    />
  );
}
