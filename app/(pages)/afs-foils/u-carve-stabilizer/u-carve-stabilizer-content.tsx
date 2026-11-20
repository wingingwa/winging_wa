"use client";

import { useEffect, useRef } from "react";
import "./u-carve-stabilizer.css";
import { pageHtml } from "./u-carve-stabilizer-html";

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

    const techModelsData = [
      {
        name: "U carve 130",
        surface: "130 cm2",
        span: "360 mm",
        ar: "10",
        chord: "68",
        thick: "5",
        construction: "HR Carbon + HM Carbon / Monolithic",
        screw: "12mm Torx 30",
        image: "/afs-foils/u-carve-stabilizer/ucrave130_0001-2769f.png"
      },
      {
        name: "U carve 140",
        surface: "140 cm2",
        span: "375 mm",
        ar: "10",
        chord: "72",
        thick: "5",
        construction: "HR Carbon + HM Carbon / Monolithic",
        screw: "12mm Torx 30",
        image: "/afs-foils/u-carve-stabilizer/ucrave140_0001-2c34d.png"
      },
      {
        name: "U carve 150",
        surface: "150 cm2",
        span: "390 mm",
        ar: "10",
        chord: "76",
        thick: "5",
        construction: "HR Carbon + HM Carbon / Monolithic",
        screw: "12mm Torx 30",
        image: "/afs-foils/u-carve-stabilizer/ucrave150_0001-3b867.png"
      },
      {
        name: "U carve 160",
        surface: "160 cm2",
        span: "400 mm",
        ar: "10",
        chord: "80",
        thick: "5",
        construction: "HR Carbon + HM Carbon / Monolithic",
        screw: "12mm Torx 30",
        image: "/afs-foils/u-carve-stabilizer/ucrave160_0001-1461b.png"
      }
    ];

    const techTitle = root.querySelector<HTMLHeadingElement>("#tech-model-title");
    const techImg = root.querySelector<HTMLImageElement>("#tech-model-img");
    const specSurface = root.querySelector<HTMLTableCellElement>("#spec-surface");
    const specSpan = root.querySelector<HTMLTableCellElement>("#spec-span");
    const specAr = root.querySelector<HTMLTableCellElement>("#spec-ar");
    const specChord = root.querySelector<HTMLTableCellElement>("#spec-chord");
    const specThick = root.querySelector<HTMLTableCellElement>("#spec-thick");
    const specConst = root.querySelector<HTMLTableCellElement>("#spec-const");
    const specScrew = root.querySelector<HTMLTableCellElement>("#spec-screw");
    const techPills = root.querySelectorAll<HTMLButtonElement>(".tech-pill");

    const selectTechModel = (idx: number) => {
      const data = techModelsData[idx];
      if (!data) return;

      if (techTitle) techTitle.textContent = data.name;
      if (specSurface) specSurface.textContent = data.surface;
      if (specSpan) specSpan.textContent = data.span;
      if (specAr) specAr.textContent = data.ar;
      if (specChord) specChord.textContent = data.chord;
      if (specThick) specThick.textContent = data.thick;
      if (specConst) specConst.textContent = data.construction;
      if (specScrew) specScrew.textContent = data.screw;

      if (techImg) {
        techImg.src = data.image;
        techImg.srcset = `${data.image} 1x, ${data.image} 2x`;
        techImg.alt = `AFS ${data.name}`;
      }

      techPills.forEach((pill, pIdx) => {
        if (pIdx === idx) {
          pill.className = "tech-pill cursor-pointer relative z-10 px-[14px] py-3 rounded-full whitespace-nowrap text-sm md:text-4 font-semibold uppercase transition-colors bg-white text-[#111111] shadow-sm";
        } else {
          pill.className = "tech-pill cursor-pointer relative z-10 px-[14px] py-3 rounded-full whitespace-nowrap text-sm md:text-4 font-semibold uppercase transition-colors text-white hover:text-white/80";
        }
      });
    };

    techPills.forEach((pill, idx) => {
      pill.onclick = (e) => {
        e.preventDefault();
        selectTechModel(idx);
      };
    });

    const modelBuyButtons = root.querySelectorAll<HTMLButtonElement>(".btn-model-buy-now");
    modelBuyButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const size = btn.getAttribute("data-buy-size") || "130";
        window.location.href = `/contact?item=${encodeURIComponent(`AFS U-Carve Stabilizer (${size})`)}`;
      };
    });

    const modelesSec = root.querySelector("#modeles");
    if (modelesSec) {
      const buttons = modelesSec.querySelectorAll<HTMLButtonElement>("button");
      buttons.forEach((btn) => {
        if (btn.textContent?.toLowerCase().includes("buy")) {
          btn.onclick = (e) => {
            e.preventDefault();
            const size = btn.getAttribute("data-buy-size") || "130";
            window.location.href = `/contact?item=${encodeURIComponent(`AFS U-Carve Stabilizer (${size})`)}`;
          };
        }
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="u-carve-stabilizer-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
