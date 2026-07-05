"use client";

import { useEffect, useRef } from "react";

/** Hero background film: a muted loop; reduced motion holds the opening frame. */

const FILM_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const holdFrame = () => {
        video.currentTime = 0.1;
      };
      video.addEventListener("loadedmetadata", holdFrame);
      return () => video.removeEventListener("loadedmetadata", holdFrame);
    }

    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      src={FILM_SRC}
      className="h-full w-full object-cover"
    />
  );
}
