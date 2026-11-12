"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const AfsHero = () => {
  return (
    <section className="relative w-full min-h-[560px] lg:min-h-[640px] pt-32 pb-16 lg:pt-36 lg:pb-24 bg-[#4A505B] text-white overflow-hidden flex items-center">
      <Image
        src="/afsbg.webp"
        alt="AFS Foils Ocean Backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_center] sm:object-[68%_center] md:object-[62%_center] lg:object-center select-none"
      />

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-16 w-full flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4 max-w-lg lg:max-w-xl"
        >
          <div className="relative flex items-center justify-start py-1">
            <Image
              src="/afs-logo.svg"
              alt="AFS Foils"
              width={340}
              height={100}
              priority
              className="w-auto h-12 sm:h-16 md:h-20 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] select-none"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Engineered and crafted in Brittany, France by Foil And Co. Explore our complete catalogue of high-modulus carbon front wings, ultra-stiff masts, titanium fuselages, downwind boards, and wings.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-3.5 pt-2">
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              className="h-11 rounded-full px-8 bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold cursor-pointer shadow-lg shadow-red-950/40 inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Enquire & Order</span>
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AfsHero;
