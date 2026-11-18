import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MantaHero from "@/components/manta/MantaHero";
import MantaDisciplines from "@/components/manta/MantaDisciplines";
import MantaAnnouncement from "@/components/manta/MantaAnnouncement";
import MantaFAQ from "@/components/manta/MantaFAQ";

export const metadata: Metadata = {
  title: "Manta TakeOff Evo Foil Assist | Winging WA | Western Australia Dealer",
  description:
    "Official Western Australian dealer for Manta TakeOff Evo Foil Assist. Direct drive maintenance-free electric hydrofoil motor and airline-compliant battery packs. Call Mark on 0487 042 694.",
};

export default function MantaFoilsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <MantaHero />
        <MantaDisciplines />
        <MantaAnnouncement />
        <MantaFAQ />
      </main>
      <Footer />
    </div>
  );
}
