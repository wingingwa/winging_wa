"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownToLine, PhoneCall, Mail } from "lucide-react";
import "./manta-foils-2.css";
import { mantaFoilsFirstTwoSectionsHtml } from "./mantaFoilsFirstTwoSectionsHtml";

const brochurePages = Array.from({ length: 17 }, (_, i) => ({
  num: i + 1,
  src: `/manta-brochure/page-${String(i + 1).padStart(2, "0")}.png`,
}));

const MantaFoils2Content = () => {
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
  }, []);

  return (
    <div className="w-full bg-[#4A505B] text-white">
      <div
        ref={containerRef}
        suppressHydrationWarning
        className="manta-foils-2-wrapper w-full bg-[#4A505B] text-white overflow-hidden"
        dangerouslySetInnerHTML={{ __html: mantaFoilsFirstTwoSectionsHtml }}
      />

      <section className="w-full bg-[#111317] border-t border-white/10 flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div>
            <span className="text-[#ef0e0a] text-xs font-bold tracking-widest uppercase">
              Official Manta Foils Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              TakeOff Evo System — Product Brochure
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/manta/TakeOff-Evo-Brochure.pdf"
              download="TakeOff-Evo-Brochure.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowDownToLine className="size-4" />
              <span>Download PDF Brochure</span>
            </a>
            <Link
              href="/contact?item=Manta+TakeOff+Evo"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ef0e0a] hover:bg-[#c40c08] text-white text-xs sm:text-sm font-semibold transition-colors shadow-lg shadow-red-950/40"
            >
              <Mail className="size-4" />
              <span>Enquire & Order</span>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col items-center bg-[#111317]">
          {brochurePages.map((page) => (
            <div
              key={page.num}
              className="w-full max-w-[1400px] flex justify-center bg-[#111317]"
            >
              <img
                src={page.src}
                alt={`Manta TakeOff Evo Brochure - Page ${page.num}`}
                className="w-full h-auto block select-none"
                loading={page.num <= 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div className="w-full bg-[#111317] py-12 px-4 border-t border-white/10 flex flex-col items-center text-center gap-4">
          <h3 className="text-2xl font-bold text-white">
            Ready to Electrify Your Foil?
          </h3>
          <p className="text-white/70 max-w-xl text-sm sm:text-base">
            Contact Mark Mawby for Western Australia demo bookings, pricing, and system availability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:0487042694"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              <PhoneCall className="size-4 text-[#ef0e0a]" />
              <span>Call 0487 042 694</span>
            </a>
            <Link
              href="/contact?item=Manta+TakeOff+Evo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold text-sm transition-colors shadow-lg shadow-red-950/40"
            >
              <Mail className="size-4" />
              <span>Contact Dealer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MantaFoils2Content;
