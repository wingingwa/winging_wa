"use client";

import { useEffect, useRef } from "react";
import "./silk-v2-front-wing.css";
import { silkHtml } from "./silk-html";

export default function SilkDetailView() {
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

        activateTab(2);
      }
    }

    const bandeau = root.querySelector("#bandeau-fiche");
    if (bandeau) {
      const navButtons = bandeau.querySelectorAll<HTMLButtonElement>("nav button");
      if (navButtons.length >= 2) {
        const overviewBtn = navButtons[0];
        const specsBtn = navButtons[1];

        overviewBtn.onclick = () => {
          root.querySelector("#apercu")?.scrollIntoView({ behavior: "smooth" });
        };

        specsBtn.onclick = () => {
          root.querySelector("#modeles")?.scrollIntoView({ behavior: "smooth" });
        };
      }

      const sizeGuideBtn = bandeau.querySelector<HTMLButtonElement>('button:has(span[aria-hidden="true"])');
      if (sizeGuideBtn) {
        sizeGuideBtn.onclick = () => {
          root.querySelector("#range")?.scrollIntoView({ behavior: "smooth" });
        };
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="silk-v2-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: silkHtml }}
    />
  );
}

