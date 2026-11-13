import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductContentView from "./u-glide-stabilizer-content";

export const metadata: Metadata = {
  title: "U Glide Stabiliser | AFS Foils | Winging WA",
  description: "U Glide Stabiliser - Official Western Australia dealer. Enquire with Mark Mawby on 0487 042 694.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Suspense fallback={<div className="h-20 bg-[#4A505B]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-20 md:pt-24">
        <ProductContentView />
      </main>
      <Footer />
    </div>
  );
}
