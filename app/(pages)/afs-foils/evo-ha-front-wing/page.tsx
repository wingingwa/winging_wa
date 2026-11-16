import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductContentView from "./evo-ha-front-wing-content";

export const metadata: Metadata = {
  title: "Evo HA Front Wing | AFS Foils | Winging WA",
  description: "Evo HA Front Wing - Official Western Australia dealer. Enquire with Mark Mawby on 0487 042 694.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000] text-white overflow-x-clip">
      <Suspense fallback={<div className="h-20 bg-[#000]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-20 md:pt-24">
        <ProductContentView />
      </main>
      <Footer />
    </div>
  );
}
