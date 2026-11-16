"use client";

import { useEffect, useRef } from "react";
import "./u-surf-stabilizer.css";
import { pageHtml } from "./u-surf-stabilizer-html";

export default function ProductContentView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

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
const toggle = root.querySelector("#infinity-mast-toggle");
    if (toggle) {
      const btnManta = root.querySelector<HTMLButtonElement>("#btn-tab-manta");
      const btnFoilDrive = root.querySelector<HTMLButtonElement>("#btn-tab-foildrive");
      const panelManta = root.querySelector<HTMLDivElement>("#infinity-panel-manta");
      const panelFoilDrive = root.querySelector<HTMLDivElement>("#infinity-panel-foildrive");

      if (btnManta && btnFoilDrive && panelManta && panelFoilDrive) {
        btnManta.onclick = () => {
          btnManta.className = "px-4 py-1.5 text-xs font-bold rounded-md transition-all bg-[#ef0e0a] text-white";
          btnFoilDrive.className = "px-4 py-1.5 text-xs font-bold rounded-md transition-all text-[#888] hover:text-white";
          panelManta.classList.remove("hidden");
          panelFoilDrive.classList.add("hidden");
        };

        btnFoilDrive.onclick = () => {
          btnFoilDrive.className = "px-4 py-1.5 text-xs font-bold rounded-md transition-all bg-[#ef0e0a] text-white";
          btnManta.className = "px-4 py-1.5 text-xs font-bold rounded-md transition-all text-[#888] hover:text-white";
          panelFoilDrive.classList.remove("hidden");
          panelManta.classList.add("hidden");
        };
      }
    }

    const swiperSlides = root.querySelectorAll<HTMLElement>(".swiper-slide");
    const thumbBtns = root.querySelectorAll<HTMLButtonElement>("button img[alt^='thumb-']");
    if (swiperSlides.length > 0 && thumbBtns.length > 0) {
      const parentThumbBtns = Array.from(thumbBtns).map((img) => img.closest("button")!);
      const activateSlide = (slideIdx: number) => {
        swiperSlides.forEach((slide, idx) => {
          if (idx === slideIdx) {
            slide.style.display = "flex";
            slide.style.opacity = "1";
          } else {
            slide.style.display = "none";
            slide.style.opacity = "0";
          }
        });
        parentThumbBtns.forEach((btn, idx) => {
          if (btn) {
            if (idx === slideIdx) {
              btn.classList.add("border-b-2", "border-[#D44841]");
            } else {
              btn.classList.remove("border-b-2", "border-[#D44841]");
            }
          }
        });
      };

      parentThumbBtns.forEach((btn, idx) => {
        if (btn) {
          btn.onclick = () => activateSlide(idx);
        }
      });
      activateSlide(0);
    }

    const pillBtns = root.querySelectorAll<HTMLButtonElement>(".rounded-full.bg-\\[\\#1F1F1F\\] button");
    const techTitle = root.querySelector<HTMLElement>("h3.text-\\[28px\\]");
    const techTableTbody = root.querySelector<HTMLElement>("table tbody");
    if (pillBtns.length > 0 && techTitle && techTableTbody) {
      const specsData = [
        { name: "U-Surf 120", surface: "120 cm2", span: "328 mm", ar: "9", chord: "50 mm", thick: "5 mm" },
        { name: "U-Surf 135", surface: "135 cm2", span: "350 mm", ar: "9", chord: "52 mm", thick: "5 mm" },
        { name: "U-Surf 150", surface: "150 cm2", span: "370 mm", ar: "9", chord: "54 mm", thick: "5.5 mm" },
      ];

      pillBtns.forEach((btn, idx) => {
        btn.onclick = () => {
          pillBtns.forEach((b, i) => {
            if (i === idx) {
              b.classList.remove("text-white");
              b.classList.add("text-[#111111]", "bg-white");
            } else {
              b.classList.remove("text-[#111111]", "bg-white");
              b.classList.add("text-white");
            }
          });
          const d = specsData[idx];
          if (d) {
            techTitle.textContent = d.name;
            const rows = techTableTbody.querySelectorAll("tr");
            if (rows.length >= 5) {
              const r0 = rows[0].querySelector("td");
              if (r0) r0.textContent = d.surface;
              const r1 = rows[1].querySelector("td");
              if (r1) r1.textContent = d.span;
              const r2 = rows[2].querySelector("td");
              if (r2) r2.textContent = d.ar;
              const r3 = rows[3].querySelector("td");
              if (r3) r3.textContent = d.chord;
              const r4 = rows[4].querySelector("td");
              if (r4) r4.textContent = d.thick;
            }
          }
        };
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="u-surf-stabilizer-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
