import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SilkDetailView from "./SilkDetailView";

export const metadata: Metadata = {
  title: "Silk V2 Front Wing for Wing Foiling and Downwind | AFS Foils | Winging WA",
  description: "Silk V2 Front Wing - Sharper. Stronger. Smoother. More Silk than ever. Official Western Australia dealer. Enquire with Mark Mawby on 0487 042 694.",
};

export default function SilkV2FrontWingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Suspense fallback={<div className="h-20 bg-[#4A505B]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-20 md:pt-24">
        <SilkDetailView />
      </main>
      <Footer />
    </div>
  );
}

