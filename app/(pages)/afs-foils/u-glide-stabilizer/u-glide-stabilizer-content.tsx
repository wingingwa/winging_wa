"use client";

import { useEffect, useRef } from "react";
import "./u-glide-stabilizer.css";
import { pageHtml } from "./u-glide-stabilizer-html";

export default function ProductContentView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const wrapper = root.querySelector<HTMLDivElement>(".slider_div .swiper-wrapper");
    const slides = root.querySelectorAll<HTMLDivElement>(".slider_div .swiper-slide");
    const btnPrev = root.querySelector<HTMLButtonElement>(".slider_div .swiper-prev");
    const btnNext = root.querySelector<HTMLButtonElement>(".slider_div .swiper-next");

    let activeIndex = 4;

    const updateCarousel = () => {
      if (!wrapper || slides.length === 0) return;
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        const offset = -(activeIndex - 1) * (100 / 3);
        wrapper.style.transform = `translateX(${offset}%)`;
      } else {
        const offset = 7.5 - activeIndex * 85;
        wrapper.style.transform = `translateX(${offset}%)`;
      }

      slides.forEach((slide, idx) => {
        const card = slide.querySelector<HTMLDivElement>(".max-w-\\[75vw\\]");
        const logos = slide.querySelectorAll<HTMLImageElement>("img[alt='AFS U GLide 41']");
        const logo = logos[logos.length - 1];

        if (idx === activeIndex) {
          if (card) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }
          if (logo) {
            logo.style.opacity = "1";
          }
        } else {
          if (card) {
            card.style.opacity = "0.35";
            card.style.transform = "scale(0.92)";
          }
          if (logo) {
            logo.style.opacity = "0";
          }
        }
      });
    };

    if (btnPrev) {
      btnPrev.onclick = (e) => {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      };
    }

    if (btnNext) {
      btnNext.onclick = (e) => {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % slides.length;
        updateCarousel();
      };
    }

    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    const specsData = [
      {
        size: "39",
        area: "113 cm²",
        ar: "13.9",
        thickness: "4.5 mm",
        materials: "High-modulus carbon + high-modulus carbon core",
        bestFor: "Downwind, glide",
        image: "/afs-foils/u-glide-stabilizer/uglide39_00027c00.png"
      },
      {
        size: "41",
        area: "123 cm²",
        ar: "13.8",
        thickness: "5.0 mm",
        materials: "High-modulus carbon + high-modulus carbon core",
        bestFor: "Downwind, glide",
        image: "/afs-foils/u-glide-stabilizer/UGlide_0003d565.png"
      },
      {
        size: "43",
        area: "133 cm²",
        ar: "13.7",
        thickness: "5.0 mm",
        materials: "High-modulus carbon + high-modulus carbon core",
        bestFor: "Downwind, glide",
        image: "/afs-foils/u-glide-stabilizer/uglide43_00018b76.png"
      }
    ];

    const pills = root.querySelectorAll<HTMLButtonElement>(".spec-pill");
    const specArea = root.querySelector<HTMLElement>("#spec-area");
    const specAr = root.querySelector<HTMLElement>("#spec-ar");
    const specThick = root.querySelector<HTMLElement>("#spec-thick");
    const specMat = root.querySelector<HTMLElement>("#spec-mat");
    const specBest = root.querySelector<HTMLElement>("#spec-best");
    const techImg = root.querySelector<HTMLImageElement>("#tech-spec-img");

    const selectSpec = (idx: number) => {
      const data = specsData[idx] || specsData[0];

      pills.forEach((p, pIdx) => {
        if (pIdx === idx) {
          p.className = "spec-pill active uppercase cursor-pointer relative z-10 px-[14px] py-3 rounded-full whitespace-nowrap text-sm md:text-4 font-semibold uppercase transition-colors bg-white text-[#111111]";
          p.setAttribute("data-active", "true");
        } else {
          p.className = "spec-pill uppercase cursor-pointer relative z-10 px-[14px] py-3 rounded-full whitespace-nowrap text-sm md:text-4 font-semibold uppercase transition-colors text-white hover:text-white/80";
          p.removeAttribute("data-active");
        }
      });

      if (specArea) specArea.textContent = data.area;
      if (specAr) specAr.textContent = data.ar;
      if (specThick) specThick.textContent = data.thickness;
      if (specMat) specMat.textContent = data.materials;
      if (specBest) specBest.textContent = data.bestFor;
      if (techImg) {
        techImg.src = data.image;
        techImg.alt = `AFS U GLide ${data.size}`;
      }
    };

    pills.forEach((pill, idx) => {
      pill.onclick = (e) => {
        e.preventDefault();
        selectSpec(idx);
      };
    });

    selectSpec(0);

    const buyButtons = root.querySelectorAll<HTMLButtonElement>(".btn-model-buy-now");
    buyButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const size = btn.getAttribute("data-buy-size") || "39";
        const item = `AFS U-Glide Stabilizer (${size})`;
        window.location.href = `/contact?item=${encodeURIComponent(item)}`;
      };
    });

    return () => {
      window.removeEventListener("resize", updateCarousel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="u-glide-stabilizer-page __variable_d35d24 __className_d35d24 __variable_0d9bde __className_0d9bde antialiased relative w-full bg-[#000] text-white overflow-hidden"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
