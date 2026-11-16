import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantaFoilsClassicContent from "./MantaFoilsClassicContent";

export const metadata: Metadata = {
  title: "Manta TakeOff Evo Foil Assist | Winging WA",
  description: "Manta TakeOff Evo Foil Assist details.",
};

export default function MantaFoilsClassicPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28">
        <MantaFoilsClassicContent />
      </main>
      <Footer />
    </div>
  );
}
