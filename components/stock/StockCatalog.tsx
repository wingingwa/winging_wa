"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { staticInventory, StockItem } from "@/data/stockInventory";

export type { StockItem };
export { staticInventory };

export default function StockCatalog() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setItems(
            res.data.map((item: any) => ({
              id: item.id,
              name: item.name,
              brand: item.brand,
              category: item.category,
              price: item.price?.startsWith("$") ? item.price : `$${item.price || "0.00"}`,
              stockStatus: item.stockStatus || "In Stock (WA)",
              image: item.image || "/equipment/default.jpg",
              disciplines: ["Foil", "Winging"],
              specs: item.specs || item.description || "Direct Warehouse Stock",
              description: item.description || "",
              badge: (item.brand || "").toLowerCase().includes("afs") ? "AFS Carbon" : "In Stock",
              badgeColor: "bg-[#ef0e0a]/15 text-orange-300 border border-[#ef0e0a]/30",
            }))
          );
        } else {
          setItems(staticInventory);
        }
      })
      .catch(() => {
        setItems(staticInventory);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative w-full py-12 lg:py-20 bg-[#4A505B] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-16 flex flex-col gap-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 animate-pulse"
              >
                <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-white/[0.06] border border-white/10 p-6 flex items-center justify-center overflow-hidden">
                  <div className="w-2/3 h-2/3 rounded-xl bg-white/[0.04]" />
                  <div className="absolute top-3.5 left-3.5 h-5 w-20 rounded-full bg-white/10" />
                </div>
                <div className="flex items-center justify-between gap-3 px-1 pt-1">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-5 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-1/3 rounded bg-white/10" />
                  </div>
                  <div className="size-9 rounded-full bg-white/10 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-lg font-medium text-white/80">No equipment in stock currently.</p>
            <p className="text-sm text-white/50">Check back soon or contact Mark directly for custom orders.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/feature-equipment/${item.id}`}
                className="flex flex-col gap-3 group cursor-pointer"
              >
                <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-[#ECECEC] p-6 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/5">
                  {item.badge && (
                    <span
                      className={`absolute top-3.5 left-3.5 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-1 pt-1">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <h3 className="text-base font-medium text-white truncate group-hover:text-[#ef0e0a] transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-white">
                        {item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs font-normal text-white/40 line-through">
                          {item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    aria-label={`View details for ${item.name}`}
                    className="shrink-0 flex size-9 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#ef0e0a] text-white transition-all duration-300 group-hover:scale-105 shadow-sm"
                  >
                    <Plus className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
