"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="dark relative flex min-h-[82svh] sm:min-h-[88svh] lg:min-h-screen w-full flex-col justify-end overflow-hidden bg-[#4A505B]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-video-poster.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source
          src="https://api.afs-foiling.com/wp-content/uploads/2026/09/SHOWREEL_WEBSITE_V1.2-4.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pt-28 pb-8 sm:pb-12 lg:px-8 lg:pb-14 xl:px-16">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-8">
          <div className="flex items-center justify-center shrink-0 order-2 md:order-1 w-full sm:w-auto">
            <Link
              href="/afs-foils"
              className="group relative flex items-center justify-center py-2.5 px-4 sm:p-2 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto min-h-12"
            >
              <Image
                src="/afs.svg"
                alt="AFS Foils"
                width={190}
                height={88}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain rounded-lg"
                priority
              />
            </Link>
          </div>

          <div className="flex flex-col items-center text-center gap-2 sm:gap-3 max-w-2xl mx-auto order-1 md:order-2 px-2">
            <span className="inline-flex items-center rounded-full bg-[#ef0e0a]/20 border border-[#ef0e0a]/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 backdrop-blur-md">
              Western Australia
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              High Performance Foils &amp; Electric Assist
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-medium text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-relaxed max-w-xl">
              Australian Distributor for genuine AFS French Carbon Foils and Western Australian Dealer for MANTA Foil Assist.
            </p>
          </div>

          <div className="flex items-center justify-center shrink-0 order-3 w-full sm:w-auto">
            <Link
              href="/manta-foils"
              className="group relative flex items-center justify-center py-2.5 px-4 sm:p-3 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 shadow-xl w-full sm:w-auto min-h-12"
            >
              <Image
                src="/manta.webp"
                alt="Manta Foils"
                width={200}
                height={75}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
