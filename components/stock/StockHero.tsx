"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Phone } from "lucide-react";

const StockHero = () => {
  return (
    <section className="relative w-full min-h-[560px] lg:min-h-[640px] pt-32 pb-16 lg:pt-36 lg:pb-24 bg-[#4A505B] text-white overflow-hidden flex items-center">
      <Image
        src="/afsbg.webp"
        alt="Western Australia Foiling Coastline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[82%_center] sm:object-[76%_center] md:object-[70%_center] lg:object-[65%_center] select-none"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-16 w-full flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4 max-w-xs sm:max-w-sm md:max-w-[440px]"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Featured Equipment
          </h1>

          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xs sm:max-w-sm md:max-w-[400px]">
            Direct inventory available in Western Australia. Browse our current
            stock of genuine AFS Foils, Wings, and Manta Foil Assist systems.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-3.5 pt-2">
            <Button
              nativeButton={false}
              render={<Link href="tel:0487042694" />}
              className="h-11 rounded-full px-7 bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold cursor-pointer shadow-lg shadow-orange-950/30 inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <Phone className="size-4" />
              <span>Call Mark</span>
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/contact" />}
              className="h-11 rounded-full px-6 border-white/30 bg-black/40 hover:bg-black/60 text-white font-medium cursor-pointer backdrop-blur-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Enquire Pricing</span>
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StockHero;
