"use client";

import { useEffect, useRef } from "react";
import "./infinity-foil-assist-mast.css";
import { pageHtml } from "./infinity-foil-assist-mast-html";

interface BoardSpec {
  dimensions: string;
  volume: string;
  weight: string;
}

const BOARD_DATA: Record<string, BoardSpec> = {
  "52": {
    dimensions: '5\'2 x 19"',
    volume: "45 L",
    weight: "4 kg"
  },
  "54": {
    dimensions: '5\'4 x 19"',
    volume: "55 L",
    weight: "4,4 kg"
  },
  "56": {
    dimensions: '5\'6 x 20.5"',
    volume: "70 L",
    weight: "4,8 kg"
  }
};

const activeSizeClass = "board-size-btn cursor-pointer min-w-[64px] px-[18px] py-[16px] text-center transition-all duration-200 text-[15px] tracking-[0.08em] font-bold uppercase leading-[1.05] border bg-[#00b9f2] border-[#00b9f2] text-black";
const inactiveSizeClass = "board-size-btn cursor-pointer min-w-[64px] px-[18px] py-[16px] text-center transition-all duration-200 text-[15px] tracking-[0.08em] font-bold uppercase leading-[1.05] border bg-transparent border-white/50 text-white/75";

const activeColorClass = "board-color-btn cursor-pointer flex items-center gap-[10px] px-[13px] py-[22px] text-left transition-all duration-200 text-[13px] tracking-[0.16em] font-bold uppercase leading-[1.05] border bg-[#00b9f2] border-[#00b9f2] text-black";
const inactiveColorClass = "board-color-btn cursor-pointer flex items-center gap-[10px] px-[13px] py-[22px] text-left transition-all duration-200 text-[13px] tracking-[0.16em] font-bold uppercase leading-[1.05] border bg-transparent border-white/50 text-white/75";

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

    const initBoardSelectors = () => {
      const sections = root.querySelectorAll<HTMLElement>(".board-selector-root");
      sections.forEach((section) => {
        let currentSize = "52";
        let currentColor = "blue";

        const sizeButtons = section.querySelectorAll<HTMLButtonElement>(".board-size-btn");
        const colorButtons = section.querySelectorAll<HTMLButtonElement>(".board-color-btn");
        const backImg = section.querySelector<HTMLImageElement>(".board-img-back");
        const frontImg = section.querySelector<HTMLImageElement>(".board-img-front");
        const dimSpan = section.querySelector<HTMLElement>(".board-stat-dimensions");
        const volSpan = section.querySelector<HTMLElement>(".board-stat-volume");
        const weightSpan = section.querySelector<HTMLElement>(".board-stat-weight");

        const updateView = () => {
          sizeButtons.forEach((btn) => {
            const size = btn.getAttribute("data-size");
            if (size === currentSize) {
              btn.className = activeSizeClass;
            } else {
              btn.className = inactiveSizeClass;
            }
          });

          colorButtons.forEach((btn) => {
            const color = btn.getAttribute("data-color");
            if (color === currentColor) {
              btn.className = activeColorClass;
            } else {
              btn.className = inactiveColorClass;
            }
          });

          const cCode = currentColor === "white" ? "w" : "b";
          const backSrc = `/afs-foils/infinity-foil-assist-mast/board-${cCode}-${currentSize}.png`;
          const frontSrc = `/afs-foils/infinity-foil-assist-mast/board-${cCode}-${currentSize}-b.png`;

          if (backImg) {
            backImg.src = backSrc;
            backImg.srcset = backSrc;
          }
          if (frontImg) {
            frontImg.src = frontSrc;
            frontImg.srcset = frontSrc;
          }

          const spec = BOARD_DATA[currentSize];
          if (spec) {
            if (dimSpan) dimSpan.textContent = spec.dimensions;
            if (volSpan) volSpan.textContent = spec.volume;
            if (weightSpan) weightSpan.textContent = spec.weight;
          }
        };

        sizeButtons.forEach((btn) => {
          btn.onclick = () => {
            const size = btn.getAttribute("data-size");
            if (size && BOARD_DATA[size]) {
              currentSize = size;
              updateView();
            }
          };
        });

        colorButtons.forEach((btn) => {
          btn.onclick = () => {
            const color = btn.getAttribute("data-color");
            if (color) {
              currentColor = color;
              updateView();
            }
          };
        });

        updateView();
      });
    };

    initBoardSelectors();
  }, []);

  return (
    <div
      ref={containerRef}
      className="infinity-foil-assist-mast-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
