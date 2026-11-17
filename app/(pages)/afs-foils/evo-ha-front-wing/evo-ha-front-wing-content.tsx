"use client";

import { useEffect, useRef } from "react";
import "./evo-ha-front-wing.css";
import { pageHtml } from "./evo-ha-front-wing-html";

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

    let selectedSurface = "HA750";
    const priceDisplay = root.querySelector<HTMLDivElement>("#achat-price-display");
    const submitBtn = root.querySelector<HTMLButtonElement>("#btn-submit-order");
    const label750 = root.querySelector<HTMLLabelElement>("#label-surface-ha750");
    const label1000 = root.querySelector<HTMLLabelElement>("#label-surface-ha1000");
    const radio750 = root.querySelector<HTMLInputElement>('input[value="HA750"]');
    const radio1000 = root.querySelector<HTMLInputElement>('input[value="HA1000"]');
    const achatSec = root.querySelector("#achat");

    const updateSurfaceSelection = (surface: string) => {
      selectedSurface = surface;
      if (surface === "HA1000") {
        if (radio1000) radio1000.checked = true;
        if (radio750) radio750.checked = false;
        if (priceDisplay) priceDisplay.textContent = "829,00";
        if (submitBtn) submitBtn.textContent = "Buy Now / Enquire & Order (HA1000)";
        if (label1000) {
          label1000.className = "surface-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border-2 border-[#111] bg-[#f8f9fa] px-5 py-4 shadow-sm";
        }
        if (label750) {
          label750.className = "surface-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border border-[#eee] bg-white px-5 py-4 hover:border-[#ccc]";
        }
      } else {
        if (radio750) radio750.checked = true;
        if (radio1000) radio1000.checked = false;
        if (priceDisplay) priceDisplay.textContent = "739,00";
        if (submitBtn) submitBtn.textContent = "Buy Now / Enquire & Order (HA750)";
        if (label750) {
          label750.className = "surface-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border-2 border-[#111] bg-[#f8f9fa] px-5 py-4 shadow-sm";
        }
        if (label1000) {
          label1000.className = "surface-option flex w-full items-center cursor-pointer rounded-[4px] transition-all gap-4 border border-[#eee] bg-white px-5 py-4 hover:border-[#ccc]";
        }
      }
    };

    if (label750) {
      label750.onclick = (e) => {
        e.preventDefault();
        updateSurfaceSelection("HA750");
      };
    }

    if (label1000) {
      label1000.onclick = (e) => {
        e.preventDefault();
        updateSurfaceSelection("HA1000");
      };
    }

    const buyButtons = root.querySelectorAll<HTMLButtonElement>(".btn-model-buy-now, #btn-cta-buy-now");
    buyButtons.forEach((btn) => {
      btn.onclick = () => {
        const surface = btn.getAttribute("data-buy-surface");
        if (surface) {
          updateSurfaceSelection(surface);
        }
        if (achatSec) {
          achatSec.scrollIntoView({ behavior: "smooth" });
        }
      };
    });

    if (submitBtn) {
      submitBtn.onclick = (e) => {
        e.preventDefault();
        window.location.href = `/contact?item=${encodeURIComponent(`AFS Evo HA Front Wing (${selectedSurface})`)}`;
      };
    }

    const achatForm = root.querySelector<HTMLFormElement>("#achat form");
    if (achatForm) {
      achatForm.onsubmit = (e) => {
        e.preventDefault();
        window.location.href = `/contact?item=${encodeURIComponent(`AFS Evo HA Front Wing (${selectedSurface})`)}`;
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="evo-ha-front-wing-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
