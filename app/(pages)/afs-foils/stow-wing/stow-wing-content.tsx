"use client";

import { useEffect, useRef } from "react";
import "./stow-wing.css";
import { pageHtml } from "./stow-wing-html";

interface StowSizeSpec {
  surface: string;
  aspectRatio: string;
  barLength: string;
  weight: string;
  lineMaterials: string;
  canopyMaterials: string;
  windRange: string;
  width: string;
  alt: string;
}

const STOW_SIZES: Record<number, StowSizeSpec> = {
  0: {
    surface: "2.5 m²",
    aspectRatio: "2.72",
    barLength: "33.5 cm",
    weight: "0.480 kg",
    lineMaterials: "HMPE sleeved 1.1 & 0.9 mm · Dyneema SK76 1.6 mm",
    canopyMaterials: "Techfiber STA15",
    windRange: "25 to 40 knots",
    width: "72%",
    alt: "AFS STOW parawing, 2.5 m²",
  },
  1: {
    surface: "3.5 m²",
    aspectRatio: "2.72",
    barLength: "33.5 cm",
    weight: "0.570 kg",
    lineMaterials: "HMPE sleeved 1.1 & 0.9 mm · Dyneema SK76 1.6 mm",
    canopyMaterials: "Techfiber STA15",
    windRange: "15 to 30 knots",
    width: "82%",
    alt: "AFS STOW parawing, 3.5 m²",
  },
  2: {
    surface: "4.5 m²",
    aspectRatio: "2.72",
    barLength: "33.5 cm",
    weight: "0.640 kg",
    lineMaterials: "HMPE sleeved 1.1 & 0.9 mm · Dyneema SK76 1.6 mm",
    canopyMaterials: "Techfiber STA15",
    windRange: "12 to 25 knots",
    width: "92%",
    alt: "AFS STOW parawing, 4.5 m²",
  },
};

const activeBtnClass =
  "cursor-pointer px-[18px] py-[12px] text-[13px] font-bold tracking-[0.08em] transition-colors border border-white bg-white text-black";
const inactiveBtnClass =
  "cursor-pointer px-[18px] py-[12px] text-[13px] font-bold tracking-[0.08em] transition-colors border border-[#2a2a2a] bg-transparent text-white hover:border-white/50";

export default function ProductContentView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const videos = root.querySelectorAll("video");
    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.play().catch(() => {});
    });

    const rangeSection = root.querySelector("#range");
    if (rangeSection) {
      const buttons = rangeSection.querySelectorAll<HTMLButtonElement>("button");
      const tabPanels = rangeSection.querySelectorAll<HTMLDivElement>(
        ".transition-all.duration-300"
      );

      if (buttons.length > 0 && tabPanels.length > 0) {
        const activateTab = (index: number) => {
          buttons.forEach((btn, idx) => {
            if (idx === index) {
              btn.classList.add("!text-white", "border-b-2", "!border-[#ef0e0a]");
              btn.classList.remove("!text-[#777777]");
            } else {
              btn.classList.remove("!text-white", "border-b-2", "!border-[#ef0e0a]");
              btn.classList.add("!text-[#777777]");
            }
          });

          tabPanels.forEach((panel, idx) => {
            if (idx === index) {
              panel.classList.remove("hidden");
            } else {
              panel.classList.add("hidden");
            }
          });
        };

        buttons.forEach((btn, idx) => {
          btn.onclick = () => activateTab(idx);
        });

        activateTab(0);
      }
    }

    const sizeSection = root.querySelector<HTMLElement>("#tailles");
    if (sizeSection) {
      const sizeButtons = sizeSection.querySelectorAll<HTMLButtonElement>(
        ".mt-\\[30px\\].flex.gap-2 button"
      );
      const specSpans = sizeSection.querySelectorAll<HTMLElement>(
        ".border-t.border-white\\/28 .text-right"
      );
      const wingImage = sizeSection.querySelector<HTMLImageElement>(
        "img[alt*='STOW'], .transition-\\[width\\]"
      );

      const selectSize = (index: number) => {
        const spec = STOW_SIZES[index];
        if (!spec) return;

        sizeButtons.forEach((btn, idx) => {
          if (idx === index) {
            btn.className = activeBtnClass;
            btn.setAttribute("aria-pressed", "true");
          } else {
            btn.className = inactiveBtnClass;
            btn.setAttribute("aria-pressed", "false");
          }
        });

        if (specSpans.length >= 7) {
          specSpans[0].textContent = spec.surface;
          specSpans[1].textContent = spec.aspectRatio;
          specSpans[2].textContent = spec.barLength;
          specSpans[3].textContent = spec.weight;
          specSpans[4].textContent = spec.lineMaterials;
          specSpans[5].textContent = spec.canopyMaterials;
          specSpans[6].textContent = spec.windRange;
        }

        if (wingImage) {
          wingImage.style.width = spec.width;
          wingImage.alt = spec.alt;
        }
      };

      sizeButtons.forEach((btn, idx) => {
        btn.onclick = () => selectSize(idx);
      });
    }

    const allButtons = root.querySelectorAll<HTMLButtonElement>("button");
    let watchVideoBtn: HTMLButtonElement | null = null;
    allButtons.forEach((btn) => {
      if (btn.textContent && btn.textContent.includes("Watch Video")) {
        watchVideoBtn = btn;
      }
    });

    if (watchVideoBtn) {
      const btn = watchVideoBtn as HTMLButtonElement;
      const container = btn.parentElement;
      if (container) {
        const playVideo = () => {
          container.innerHTML = `
            <div class="relative w-full h-[clamp(360px,46vw,760px)] bg-black">
              <iframe
                class="w-full h-full border-0"
                src="https://www.youtube.com/embed/zSYfiyy-dqI?autoplay=1&si=4IIa2qZ7gfZ7H_WY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          `;
        };
        btn.onclick = playVideo;
        const photoSection = container.querySelector("section");
        if (photoSection) {
          photoSection.classList.add("cursor-pointer");
          photoSection.onclick = playVideo;
        }
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="stow-wing-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
