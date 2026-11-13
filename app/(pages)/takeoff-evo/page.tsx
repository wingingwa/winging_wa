import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TakeOffEvoContent from "@/components/takeoff-evo/TakeOffEvoContent";

export const metadata: Metadata = {
  title: "Manta TakeOff Evo - New Brochure Preview | Winging WA",
  description:
    "Private preview for the new Manta TakeOff Evo Foil Assist brochure specifications and product ecosystem.",
  robots: {
    index: false,
    follow: false,
  },
};

const TakeOffEvoPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28">
        <TakeOffEvoContent />
      </main>
      <Footer />
    </div>
  );
};

export default TakeOffEvoPage;

