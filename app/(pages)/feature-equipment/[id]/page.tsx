import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductDetailView } from "@/components/stock/ProductDetailView";
import { getStockItemById, staticInventory, StockItem } from "@/data/stockInventory";
import { db } from "@/src/db";
import { equipment } from "@/src/db/schema";
import { eq, and, ne } from "drizzle-orm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

async function getProduct(id: string): Promise<StockItem | null> {
  try {
    const [dbItem] = await db
      .select()
      .from(equipment)
      .where(eq(equipment.id, id))
      .limit(1);

    if (dbItem) {
      const isAfs = (dbItem.brand || "").toLowerCase().includes("afs");
      const isManta = (dbItem.brand || "").toLowerCase().includes("manta");
      const brand = isAfs ? "AFS Foils" : isManta ? "Manta Foils" : (dbItem.brand || "AFS Foils");

      return {
        id: dbItem.id,
        name: dbItem.name,
        brand: brand as any,
        category: (dbItem.category || "Foil Sets") as any,
        price: dbItem.price?.startsWith("$") ? dbItem.price : `$${dbItem.price || "0.00"}`,
        stockStatus: (dbItem.stockStatus || "In Stock (WA)") as any,
        image: dbItem.image || "/equipment/default.jpg",
        disciplines: ["Foil", "Winging"],
        specs: dbItem.description || "Direct Warehouse Stock",
        description: dbItem.description || "Authentic high performance equipment available in Western Australia.",
        longDescription: dbItem.description || undefined,
        badge: isAfs ? "AFS Carbon" : "In Stock",
        badgeColor: "bg-[#ef0e0a]/15 text-orange-300 border border-[#ef0e0a]/30",
        detailedSpecs: [
          { label: "Category", value: dbItem.category || "General" },
          { label: "Brand", value: dbItem.brand || "Winging WA" },
          { label: "Status", value: dbItem.stockStatus || "In Stock (WA)" },
          { label: "SKU / Code", value: dbItem.sku || dbItem.id },
          { label: "Location", value: "Western Australia (Perth)" },
        ],
        features: [
          "Direct warehouse inventory ready for pickup or dispatch",
          "Tested and verified for Australian ocean and breeze conditions",
          "Full manufacturer support and expert local advice from Mark",
        ],
        inTheBox: [
          `1x ${dbItem.name}`,
          "Protective packaging & documentation",
        ],
      };
    }
  } catch (error) {
    console.error(error);
  }

  const staticItem = getStockItemById(id);
  return staticItem || null;
}

async function getRelatedProducts(currentId: string): Promise<StockItem[]> {
  try {
    const dbRelated = await db
      .select()
      .from(equipment)
      .where(and(eq(equipment.published, true), ne(equipment.id, currentId)))
      .limit(4);

    if (dbRelated.length > 0) {
      return dbRelated.map((dbItem) => {
        const isAfs = (dbItem.brand || "").toLowerCase().includes("afs");
        const isManta = (dbItem.brand || "").toLowerCase().includes("manta");
        const brand = isAfs ? "AFS Foils" : isManta ? "Manta Foils" : (dbItem.brand || "AFS Foils");
        return {
          id: dbItem.id,
          name: dbItem.name,
          brand: brand as any,
          category: (dbItem.category || "Foil Sets") as any,
          price: dbItem.price?.startsWith("$") ? dbItem.price : `$${dbItem.price || "0.00"}`,
          stockStatus: (dbItem.stockStatus || "In Stock (WA)") as any,
          image: dbItem.image || "/equipment/default.jpg",
          disciplines: ["Foil", "Winging"],
          specs: dbItem.description || "Direct Warehouse Stock",
          description: dbItem.description || "",
          badge: isAfs ? "AFS Carbon" : "In Stock",
          badgeColor: "bg-[#ef0e0a]/15 text-orange-300 border border-[#ef0e0a]/30",
        };
      });
    }
  } catch (error) {
    console.error(error);
  }

  return staticInventory.filter((item) => item.id !== currentId).slice(0, 4);
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Equipment Not Found | Winging WA",
    };
  }

  return {
    title: `${product.name} | Featured Equipment | Winging WA`,
    description: `${product.name} - ${product.specs}. Direct stock available in Western Australia. ${product.description}`,
  };
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#4A505B] text-white">
      <Suspense fallback={<div className="h-20 bg-[#4A505B]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 pt-28 sm:pt-32 lg:pt-36">
        <Suspense fallback={<div className="min-h-screen bg-[#4A505B]" />}>
          <ProductDetailView product={product} relatedProducts={relatedProducts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
