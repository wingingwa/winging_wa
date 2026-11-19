"use client";

import { useEffect, useRef } from "react";
import "./hm-carbon-mast.css";
import { pageHtml } from "./hm-carbon-mast-html";

export default function ProductContentView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const galleryImages = [
      {
        src: "/afs-foils/hm-carbon-mast/HM85-1-1d4d3.png",
        srcset:
          "/afs-foils/hm-carbon-mast/HM85-1-1d045.png 384w, /afs-foils/hm-carbon-mast/HM85-1-174f0.png 640w, /afs-foils/hm-carbon-mast/HM85-1-14c9c.png 750w, /afs-foils/hm-carbon-mast/HM85-1-13d75.png 828w, /afs-foils/hm-carbon-mast/HM85-1-1b8d4.png 1080w, /afs-foils/hm-carbon-mast/HM85-1-1abd5.png 1200w, /afs-foils/hm-carbon-mast/HM85-1-13ef4.png 1920w, /afs-foils/hm-carbon-mast/HM85-1-14caf.png 2048w, /afs-foils/hm-carbon-mast/HM85-1-1d4d3.png 3840w",
        alt: "HM Carbon Mast (85 HM)"
      },
      {
        src: "/afs-foils/hm-carbon-mast/HM80-1-1cf90.png",
        srcset:
          "/afs-foils/hm-carbon-mast/HM80-1-11d8d.png 384w, /afs-foils/hm-carbon-mast/HM80-1-13f51.png 640w, /afs-foils/hm-carbon-mast/HM80-1-1dbf8.png 750w, /afs-foils/hm-carbon-mast/HM80-1-1709b.png 828w, /afs-foils/hm-carbon-mast/HM80-1-10e8a.png 1080w, /afs-foils/hm-carbon-mast/HM80-1-10763.png 1200w, /afs-foils/hm-carbon-mast/HM80-1-145aa.png 1920w, /afs-foils/hm-carbon-mast/HM80-1-13685.png 2048w, /afs-foils/hm-carbon-mast/HM80-1-1cf90.png 3840w",
        alt: "HM Carbon Mast (80 HM)"
      }
    ];

    let currentSlide = 0;
    const galleryImg = root.querySelector<HTMLImageElement>("#product-gallery-img");
    const prevBtn = root.querySelector<HTMLButtonElement>("#gallery-prev-btn");
    const nextBtn = root.querySelector<HTMLButtonElement>("#gallery-next-btn");
    const counter = root.querySelector<HTMLElement>("#gallery-counter");

    const updateGallery = (idx: number) => {
      currentSlide = idx;
      const data = galleryImages[idx];
      if (!data) return;

      if (galleryImg) {
        galleryImg.src = data.src;
        galleryImg.srcset = data.srcset;
        galleryImg.alt = data.alt;
      }
      if (counter) {
        counter.textContent = `${idx + 1} / ${galleryImages.length}`;
      }

      if (prevBtn) {
        if (idx === 0) {
          prevBtn.classList.add("opacity-30");
        } else {
          prevBtn.classList.remove("opacity-30");
        }
      }
      if (nextBtn) {
        if (idx === galleryImages.length - 1) {
          nextBtn.classList.add("opacity-30");
        } else {
          nextBtn.classList.remove("opacity-30");
        }
      }
    };

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        const nextIdx = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
        updateGallery(nextIdx);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        const nextIdx = (currentSlide + 1) % galleryImages.length;
        updateGallery(nextIdx);
      };
    }

    const buyButtons = root.querySelectorAll<HTMLButtonElement>(".btn-model-buy-now");
    buyButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const size = btn.getAttribute("data-buy-size") || "80 HM";
        window.location.href = `/contact?item=${encodeURIComponent(`AFS HM Carbon Mast (${size})`)}`;
      };
    });

    const contactButtons = root.querySelectorAll<HTMLButtonElement>("button.btn-contact-action");
    contactButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        window.location.href = `/contact?item=${encodeURIComponent("AFS HM Carbon Mast")}`;
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="hm-carbon-mast-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
