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

    const modelsData = [
      {
        name: "U-Surf 120",
        size: "120",
        surface: "120 cm2",
        span: "328 mm",
        ar: "9",
        chord: "50 mm",
        thick: "5 mm",
        images: [
          "/afs-foils/u-surf-stabilizer/USURF_120_0001-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_120_0002-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_120_0003-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_120_0004-1.png"
        ]
      },
      {
        name: "U-Surf 135",
        size: "135",
        surface: "135 cm2",
        span: "348 mm",
        ar: "9",
        chord: "53 mm",
        thick: "5 mm",
        images: [
          "/afs-foils/u-surf-stabilizer/USURF_135_0001-1-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_135_0002-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_135_0003-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_135_0004-1.png"
        ]
      },
      {
        name: "U-Surf 150",
        size: "150",
        surface: "150 cm2",
        span: "368 mm",
        ar: "9",
        chord: "56 mm",
        thick: "5 mm",
        images: [
          "/afs-foils/u-surf-stabilizer/USURF_150_0001-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_150_0002-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_150_0003-1.png",
          "/afs-foils/u-surf-stabilizer/USURF_150_0004-1.png"
        ]
      }
    ];

    let currentModelIdx = 0;
    const techModelTitle = root.querySelector<HTMLHeadingElement>("#tech-model-title");
    const specSurface = root.querySelector<HTMLTableCellElement>(".spec-surface");
    const specSpan = root.querySelector<HTMLTableCellElement>(".spec-span");
    const specAr = root.querySelector<HTMLTableCellElement>(".spec-ar");
    const specChord = root.querySelector<HTMLTableCellElement>(".spec-chord");
    const specThick = root.querySelector<HTMLTableCellElement>(".spec-thick");
    const slideImgs = root.querySelectorAll<HTMLImageElement>(".tech-main-slide");
    const thumbBtns = root.querySelectorAll<HTMLButtonElement>(".tech-thumb-btn");
    const sizePills = root.querySelectorAll<HTMLButtonElement>(".tech-size-pill");

    const updateSlideView = (slideIdx: number) => {
      slideImgs.forEach((img, idx) => {
        if (idx === slideIdx) {
          img.classList.remove("opacity-0", "pointer-events-none");
          img.classList.add("opacity-100");
        } else {
          img.classList.remove("opacity-100");
          img.classList.add("opacity-0", "pointer-events-none");
        }
      });

      thumbBtns.forEach((btn, idx) => {
        const glow = btn.querySelector(".thumb-glow");
        if (idx === slideIdx) {
          btn.classList.add("border-b-2", "border-[#D44841]");
          if (glow) glow.classList.remove("hidden");
        } else {
          btn.classList.remove("border-b-2", "border-[#D44841]");
          if (glow) glow.classList.add("hidden");
        }
      });
    };

    const selectModel = (modelIdx: number) => {
      currentModelIdx = modelIdx;
      const data = modelsData[modelIdx];
      if (!data) return;

      if (techModelTitle) techModelTitle.textContent = data.name;
      if (specSurface) specSurface.textContent = data.surface;
      if (specSpan) specSpan.textContent = data.span;
      if (specAr) specAr.textContent = data.ar;
      if (specChord) specChord.textContent = data.chord;
      if (specThick) specThick.textContent = data.thick;

      slideImgs.forEach((img, idx) => {
        if (data.images[idx]) {
          img.src = data.images[idx];
        }
      });

      thumbBtns.forEach((btn, idx) => {
        const thumbImg = btn.querySelector("img");
        if (thumbImg && data.images[idx]) {
          thumbImg.src = data.images[idx];
        }
      });

      sizePills.forEach((pill, idx) => {
        if (idx === modelIdx) {
          pill.className = "tech-size-pill cursor-pointer relative z-10 px-[16px] py-2 rounded-full whitespace-nowrap text-sm font-semibold uppercase transition-all bg-white text-[#111111] shadow-sm";
        } else {
          pill.className = "tech-size-pill cursor-pointer relative z-10 px-[16px] py-2 rounded-full whitespace-nowrap text-sm font-semibold uppercase transition-all text-white hover:text-white/80";
        }
      });

      updateSlideView(0);
    };

    thumbBtns.forEach((btn, idx) => {
      btn.onclick = () => updateSlideView(idx);
    });

    sizePills.forEach((pill, idx) => {
      pill.onclick = () => selectModel(idx);
    });

    let selectedSize = "120";
    const submitBtn = root.querySelector<HTMLButtonElement>("#btn-submit-order");
    const label120 = root.querySelector<HTMLLabelElement>("#label-size-120");
    const label135 = root.querySelector<HTMLLabelElement>("#label-size-135");
    const label150 = root.querySelector<HTMLLabelElement>("#label-size-150");
    const radio120 = root.querySelector<HTMLInputElement>('input[value="120"]');
    const radio135 = root.querySelector<HTMLInputElement>('input[value="135"]');
    const radio150 = root.querySelector<HTMLInputElement>('input[value="150"]');
    const achatSec = root.querySelector("#achat");

    const updateSizeSelection = (size: string) => {
      selectedSize = size;
      if (radio120) radio120.checked = size === "120";
      if (radio135) radio135.checked = size === "135";
      if (radio150) radio150.checked = size === "150";

      if (submitBtn) {
        submitBtn.textContent = `Buy Now / Enquire & Order (U-Surf ${size})`;
      }

      if (label120) {
        label120.className = size === "120"
          ? "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border-2 border-[#111] bg-[#f8f9fa] px-5 py-4 shadow-sm"
          : "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border border-[#eee] bg-white px-5 py-4 hover:border-[#ccc]";
      }
      if (label135) {
        label135.className = size === "135"
          ? "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border-2 border-[#111] bg-[#f8f9fa] px-5 py-4 shadow-sm"
          : "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border border-[#eee] bg-white px-5 py-4 hover:border-[#ccc]";
      }
      if (label150) {
        label150.className = size === "150"
          ? "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border-2 border-[#111] bg-[#f8f9fa] px-5 py-4 shadow-sm"
          : "size-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border border-[#eee] bg-white px-5 py-4 hover:border-[#ccc]";
      }
    };

    if (label120) {
      label120.onclick = (e) => {
        e.preventDefault();
        updateSizeSelection("120");
      };
    }
    if (label135) {
      label135.onclick = (e) => {
        e.preventDefault();
        updateSizeSelection("135");
      };
    }
    if (label150) {
      label150.onclick = (e) => {
        e.preventDefault();
        updateSizeSelection("150");
      };
    }

    const modelBuyButtons = root.querySelectorAll<HTMLButtonElement>(".btn-model-buy-now");
    modelBuyButtons.forEach((btn) => {
      btn.onclick = () => {
        const size = btn.getAttribute("data-buy-size");
        if (size) {
          updateSizeSelection(size);
        }
        if (achatSec) {
          achatSec.scrollIntoView({ behavior: "smooth" });
        }
      };
    });

    if (submitBtn) {
      submitBtn.onclick = (e) => {
        e.preventDefault();
        window.location.href = `/contact?item=${encodeURIComponent(`AFS U Surf Stabilizer (${selectedSize})`)}`;
      };
    }

    const achatForm = root.querySelector<HTMLFormElement>("#achat form");
    if (achatForm) {
      achatForm.onsubmit = (e) => {
        e.preventDefault();
        window.location.href = `/contact?item=${encodeURIComponent(`AFS U Surf Stabilizer (${selectedSize})`)}`;
      };
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
