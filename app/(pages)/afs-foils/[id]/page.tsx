import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AfsDynamicDetailContent from "@/components/afs/product-detail/AfsDynamicDetailContent";
import { afsProducts } from "@/data/afsProducts";
import { getAfsProductDetail } from "@/data/afsProductDetails";

const staticAfsSlugs = new Set([
  "silk-v2-front-wing",
  "ultra-front-wing",
  "enduro-front-wing",
  "enduro-glt-front-wing",
  "evo-front-wing",
  "evo-ha-front-wing",
  "fuselink-fuselage",
  "fuselage-titanium",
  "fuselage-advanced",
  "u-surf-stabilizer",
  "u-carve-stabilizer",
  "u-glide-stabilizer",
  "hr-carbon-mast",
  "hm-carbon-mast",
  "uhm-carbon-mast",
  "uhm-skinny-carbon-mast",
  "infinity-foil-assist-mast",
  "infinity-mast-manta-foils",
  "infinity-mast-foil-drive",
  "stow-wing",
  "stream-wing",
]);

interface PageProps {
  params: Promise<{ id: string }>;
}

export const generateStaticParams = async () => {
  return [{ id: "_fallback" }];
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = getAfsProductDetail(id);

  if (!product) {
    return {
      title: "AFS Product | Winging WA",
    };
  }

  return {
    title: `${product.name} | AFS Foils | Winging WA`,
    description: `${product.name} - ${product.subtitle}. Official Western Australia dealer. Enquire with Mark Mawby on 0487 042 694.`,
  };
};

const AfsProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  if (id === "infinity-mast-manta-foils" || id === "infinity-mast-foil-drive") {
    redirect("/afs-foils/infinity-foil-assist-mast");
  }
  if (staticAfsSlugs.has(id)) {
    redirect(`/afs-foils/${id}`);
  }
  const product = getAfsProductDetail(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white overflow-x-clip">
      <Suspense fallback={<div className="h-20 bg-[#4A505B]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-24 sm:pt-28">
        <Suspense fallback={<div className="min-h-screen bg-[#4A505B]" />}>
          <AfsDynamicDetailContent product={product} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AfsProductDetailPage;
