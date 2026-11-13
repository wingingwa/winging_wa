"use client";

import { useEffect, useRef } from "react";
import "@/components/manta-foils-2/manta-foils-2.css";
import { mantaFoilsFirstTwoSectionsHtml } from "@/components/manta-foils-2/mantaFoilsFirstTwoSectionsHtml";
import MantaBrochureSections from "@/components/manta-foils-2/MantaBrochureSections";

const TakeOffEvoContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const videos = containerRef.current.querySelectorAll("video");
    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    });

    const thumbs = containerRef.current.querySelectorAll(".yps-thumb");
    const iframe = containerRef.current.querySelector<HTMLIFrameElement>(
      ".yps-main-video iframe, .yps-player iframe"
    );
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const videoId = thumb.getAttribute("data-video-id");
        if (iframe && videoId) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          thumbs.forEach((t) => t.classList.remove("active-thumb"));
          thumb.classList.add("active-thumb");
        }
      });
    });
  }, []);

  return (
    <div className="w-full bg-[#4A505B] text-white overflow-hidden">
      <div
        ref={containerRef}
        suppressHydrationWarning
        className="manta-foils-2-wrapper w-full bg-[#4A505B] text-white overflow-hidden"
        dangerouslySetInnerHTML={{ __html: mantaFoilsFirstTwoSectionsHtml }}
      />
      <MantaBrochureSections />
    </div>
  );
};

export default TakeOffEvoContent;

