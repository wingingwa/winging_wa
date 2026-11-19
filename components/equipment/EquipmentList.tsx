"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Star,
  Check,
  X,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Grid,
  List,
  Package,
  Sparkles,
  Copy,
  EyeOff,
} from "lucide-react";
import {
  DashboardEquipmentItem,
  equipmentCategories,
  equipmentBrands,
  stockStatusOptions,
} from "@/data/dashboardEquipment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ImageUploader, MultiImageUploader } from "@/components/dashboard/ImageUploader";

export function EquipmentList() {
  const [equipment, setEquipment] = useState<DashboardEquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "in-stock">("all");
  const [filterPublish, setFilterPublish] = useState<"all" | "published" | "draft">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const [itemToDelete, setItemToDelete] = useState<DashboardEquipmentItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<DashboardEquipmentItem | null>(null);
  const [itemToView, setItemToView] = useState<DashboardEquipmentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchEquipment = () => {
    setIsLoading(true);
    fetch("/api/equipment?all=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setEquipment(
            res.data.map((item: any) => ({
              ...item,
              published: item.published !== undefined ? Boolean(item.published) : true,
              specs: item.specs || item.description || "Direct Warehouse Stock",
            }))
          );
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSimulateLoading = () => {
    fetchEquipment();
  };

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.specs && item.specs.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesFeatured =
        filterFeatured === "all" ||
        (filterFeatured === "featured" && item.featuredOnHome) ||
        (filterFeatured === "in-stock" && item.stockStatus === "In Stock (WA)");

      const matchesPublish =
        filterPublish === "all" ||
        (filterPublish === "published" && item.published) ||
        (filterPublish === "draft" && !item.published);

      return matchesSearch && matchesCategory && matchesFeatured && matchesPublish;
    });
  }, [equipment, searchTerm, selectedCategory, filterFeatured, filterPublish]);

  const metrics = useMemo(() => {
    const total = equipment.length;
    const inStock = equipment.filter((e) => e.stockStatus === "In Stock (WA)").length;
    const featuredCount = equipment.filter((e) => e.featuredOnHome).length;
    const publishedCount = equipment.filter((e) => e.published).length;
    const draftCount = equipment.filter((e) => !e.published).length;
    const totalValue = equipment.reduce((acc, curr) => {
      const num = parseFloat(curr.price.replace(/[^0-9.]/g, "")) || 0;
      return acc + num;
    }, 0);

    return { total, inStock, featuredCount, publishedCount, draftCount, totalValue };
  }, [equipment]);

  const toggleFeatured = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let nextValue = false;
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          nextValue = !item.featuredOnHome;
          showToast(
            nextValue
              ? `"${item.name}" added to Home Page carousel`
              : `"${item.name}" removed from Home Page carousel`
          );
          return { ...item, featuredOnHome: nextValue };
        }
        return item;
      })
    );
    try {
      await fetch("/api/equipment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featuredOnHome: nextValue }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublished = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let nextValue = false;
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          nextValue = !item.published;
          showToast(
            nextValue
              ? `"${item.name}" is now Published live on the website`
              : `"${item.name}" moved to Draft (hidden from website visitors)`
          );
          return { ...item, published: nextValue };
        }
        return item;
      })
    );
    try {
      const res = await fetch("/api/equipment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: nextValue }),
      });
      const data = await res.json();
      if (!data.success) {
        setEquipment((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, published: !nextValue } : item
          )
        );
        showToast("Error updating publish status");
      }
    } catch (err) {
      console.error(err);
      setEquipment((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, published: !nextValue } : item
        )
      );
    }
  };

  const handleClone = async (item: DashboardEquipmentItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    showToast(`Cloning "${item.name}"...`);
    try {
      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cloneFromId: item.id }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        showToast(`Successfully cloned "${item.name}"! Edit it now to adjust size/price.`);
        fetchEquipment();
      } else {
        showToast(data.error || "Failed to clone equipment");
      }
    } catch (err) {
      showToast("Error cloning equipment");
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const deletedId = itemToDelete.id;
    const deletedName = itemToDelete.name;
    setEquipment((prev) => prev.filter((item) => item.id !== deletedId));
    setItemToDelete(null);
    showToast(`"${deletedName}" successfully removed from equipment inventory.`);
    try {
      await fetch(`/api/equipment?id=${deletedId}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToEdit) return;

    const payload = {
      ...itemToEdit,
      brand: itemToEdit.brand || "AFS Foils",
      published: itemToEdit.published !== undefined ? Boolean(itemToEdit.published) : true,
    };
    setEquipment((prev) =>
      prev.map((item) => (item.id === payload.id ? payload : item))
    );
    const updatedName = payload.name;
    setItemToEdit(null);
    showToast(`"${updatedName}" updated successfully.`);
    try {
      await fetch("/api/equipment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: payload.id,
          name: payload.name,
          brand: payload.brand,
          category: payload.category,
          price: payload.price,
          stockStatus: payload.stockStatus,
          image: payload.image,
          images: payload.images,
          specs: payload.specs,
          description: payload.description,
          featuredOnHome: payload.featuredOnHome,
          published: payload.published,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef0e0a]">
              Equipment Catalog
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#ef0e0a]/15 text-orange-300 border border-[#ef0e0a]/30">
              <Sparkles className="size-3 text-[#ef0e0a]" />
              WA Warehouse Stock
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Featured Equipment Management
          </h1>
          <p className="text-sm text-slate-300">
            Publish, unpublish, clone, edit categories, and control equipment displayed across the store and home page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleSimulateLoading}
            variant="outline"
            size="sm"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer text-xs"
          >
            <RefreshCw className={cn("size-3.5 mr-1.5", isLoading && "animate-spin")} />
            Refresh
          </Button>
          <Link
            href="/dashboard/equipment/new"
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-[#ef0e0a] hover:bg-[#c40c08] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="size-4 mr-1.5" />
            Add New Equipment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Total Equipment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {metrics.total}
            </div>
            <span className="text-xs text-slate-400">Total Listings</span>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Live on Website
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 flex items-center gap-2">
              <Check className="size-5 text-emerald-400" />
              {metrics.publishedCount}
            </div>
            <span className="text-xs text-emerald-400/80">Published</span>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Drafts / Unpublished
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center gap-2">
              <EyeOff className="size-5 text-amber-400" />
              {metrics.draftCount}
            </div>
            <span className="text-xs text-amber-400/80">Hidden</span>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Featured on Home Page
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 flex items-center gap-2">
              <Star className="size-5 fill-amber-300 text-amber-300" />
              {metrics.featuredCount}
            </div>
            <span className="text-xs text-slate-400">On Home Carousel</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 bg-[#383D47] p-3.5 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by equipment name, brand, category, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-black/25 border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#ef0e0a]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterPublish}
              onChange={(e) => setFilterPublish(e.target.value as any)}
              className="h-10 px-3 bg-black/25 text-white border border-white/10 rounded-xl text-xs font-medium cursor-pointer focus:outline-hidden focus:border-[#ef0e0a]"
            >
              <option value="all" className="bg-[#383D47] text-white">
                All Statuses
              </option>
              <option value="published" className="bg-[#383D47] text-white">
                Published Only (Live)
              </option>
              <option value="draft" className="bg-[#383D47] text-white">
                Drafts Only (Unpublished)
              </option>
            </select>

            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="h-10 px-3 bg-black/25 text-white border border-white/10 rounded-xl text-xs font-medium cursor-pointer focus:outline-hidden focus:border-[#ef0e0a]"
            >
              <option value="all" className="bg-[#383D47] text-white">
                All Gear
              </option>
              <option value="featured" className="bg-[#383D47] text-white">
                Featured on Home Only
              </option>
              <option value="in-stock" className="bg-[#383D47] text-white">
                In Stock (WA) Only
              </option>
            </select>

            <div className="flex items-center bg-black/25 rounded-xl p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                  viewMode === "table" ? "bg-[#ef0e0a] text-white" : "text-slate-400 hover:text-white"
                )}
                aria-label="Table View"
              >
                <List className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                  viewMode === "grid" ? "bg-[#ef0e0a] text-white" : "text-slate-400 hover:text-white"
                )}
                aria-label="Grid View"
              >
                <Grid className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-white/5">
          {equipmentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
                selectedCategory === cat
                  ? "bg-[#ef0e0a] text-white"
                  : "bg-black/20 text-slate-300 hover:bg-black/40 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : filteredEquipment.length === 0 ? (
        <Card className="bg-[#383D47] border-white/10 text-white p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
            <Package className="size-8" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-white">No Equipment Found</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              No equipment matching your filters or search term was found.
            </p>
          </div>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setFilterFeatured("all");
              setFilterPublish("all");
            }}
            variant="outline"
            className="border-white/15 text-white hover:bg-white/10 cursor-pointer text-xs mt-2"
          >
            Clear Filters
          </Button>
        </Card>
      ) : viewMode === "table" ? (
        <div className="bg-[#383D47] rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="text-xs uppercase bg-black/30 text-slate-400 border-b border-white/10 select-none">
                <tr>
                  <th scope="col" className="py-3.5 px-4 font-bold">
                    Product
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold">
                    Category
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold">
                    Price
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold">
                    Stock Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-center">
                    Website Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-center">
                    Home Carousel
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 rounded-xl bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={44}
                            height={44}
                            unoptimized
                            className="size-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-white group-hover:text-orange-300 transition-colors truncate max-w-[200px] sm:max-w-xs">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="text-[#ef0e0a] font-medium">{item.brand}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-500">
                              {item.sku || item.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-white">
                      {item.price}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                          item.stockStatus === "In Stock (WA)"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : item.stockStatus === "Low Stock"
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            : "bg-sky-500/15 text-sky-400 border-sky-500/30"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            item.stockStatus === "In Stock (WA)"
                              ? "bg-emerald-400"
                              : item.stockStatus === "Low Stock"
                              ? "bg-amber-400"
                              : "bg-sky-400"
                          )}
                        />
                        {item.stockStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => togglePublished(item.id, e)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none",
                          item.published
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-xs"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25"
                        )}
                        title={
                          item.published
                            ? "Published live. Click to Unpublish (Move to Draft)"
                            : "Draft / Unpublished. Click to Publish live on website"
                        }
                      >
                        {item.published ? (
                          <>
                            <Check className="size-3.5 text-emerald-400" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="size-3.5 text-amber-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => toggleFeatured(item.id, e)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none",
                          item.featuredOnHome
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 shadow-xs"
                            : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200"
                        )}
                        title={
                          item.featuredOnHome
                            ? "Featured on front slider. Click to hide from slider"
                            : "Not on home slider. Click to feature"
                        }
                      >
                        <Star
                          className={cn(
                            "size-3.5",
                            item.featuredOnHome && "fill-amber-400 text-amber-400"
                          )}
                        />
                        <span>{item.featuredOnHome ? "Featured" : "Hidden"}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setItemToView(item)}
                          className="size-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemToEdit(item)}
                          className="size-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Equipment"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleClone(item, e)}
                          className="size-8 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 flex items-center justify-center text-sky-400 hover:text-sky-300 transition-colors cursor-pointer border border-sky-500/20"
                          title="Clone / Duplicate Listing for New Size"
                        >
                          <Copy className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="size-8 rounded-lg bg-red-500/10 hover:bg-red-500/25 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors cursor-pointer border border-red-500/20"
                          title="Delete Equipment"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEquipment.map((item) => (
            <Card
              key={item.id}
              className="bg-[#383D47] border-white/10 text-white overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="relative w-full h-48 bg-black/30 p-4 flex items-center justify-center border-b border-white/10">
                  <span
                    className={cn(
                      "absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border",
                      item.published
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    )}
                  >
                    {item.published ? (
                      <>
                        <Check className="size-3" /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3" /> Draft
                      </>
                    )}
                  </span>

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={180}
                    height={180}
                    unoptimized
                    className="size-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#ef0e0a]">{item.brand}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-white/10 mt-2 flex items-center justify-between gap-2">
                <div>
                  <div className="text-base font-bold text-white">{item.price}</div>
                  <div className="text-[11px] text-emerald-400">{item.stockStatus}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => togglePublished(item.id, e)}
                    className={cn(
                      "p-1.5 rounded-lg border transition-all cursor-pointer",
                      item.published
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    )}
                    title={item.published ? "Live. Click to unpublish" : "Draft. Click to publish"}
                  >
                    {item.published ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="size-4 text-amber-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleFeatured(item.id, e)}
                    className={cn(
                      "p-1.5 rounded-lg border transition-all cursor-pointer",
                      item.featuredOnHome
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                    )}
                    title={item.featuredOnHome ? "Featured on Home" : "Hide from Home"}
                  >
                    <Star
                      className={cn(
                        "size-4",
                        item.featuredOnHome && "fill-amber-400 text-amber-400"
                      )}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleClone(item, e)}
                    className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 cursor-pointer"
                    title="Clone listing for new size"
                  >
                    <Copy className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white cursor-pointer"
                    title="Edit"
                  >
                    <Edit className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/20 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {itemToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => setItemToDelete(null)}
        >
          <div
            className="w-full max-w-md bg-[#343943] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3.5 text-red-400">
              <div className="size-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="size-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Equipment?</h3>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Are you sure you want to permanently remove{" "}
              <strong className="text-white">"{itemToDelete.name}"</strong> from your equipment catalog?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setItemToDelete(null)}
                className="border-white/15 text-white hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer shadow-sm"
              >
                Yes, Delete Equipment
              </Button>
            </div>
          </div>
        </div>
      )}

      {itemToView && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => setItemToView(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#343943] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="size-14 rounded-2xl bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <Image
                    src={itemToView.image}
                    alt={itemToView.name}
                    width={56}
                    height={56}
                    unoptimized
                    className="size-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{itemToView.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="text-[#ef0e0a] font-semibold">{itemToView.brand}</span>
                    <span>•</span>
                    <span>{itemToView.category}</span>
                    <span>•</span>
                    <span className="font-bold text-white">{itemToView.price}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setItemToView(null)}
                className="size-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5",
                  itemToView.published
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                )}
              >
                {itemToView.published ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    Published on Website
                  </>
                ) : (
                  <>
                    <EyeOff className="size-3.5 text-amber-400" />
                    Draft (Unpublished)
                  </>
                )}
              </span>

              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5",
                  itemToView.featuredOnHome
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-white/5 text-slate-400 border-white/10"
                )}
              >
                <Star
                  className={cn(
                    "size-3.5",
                    itemToView.featuredOnHome && "fill-amber-400 text-amber-400"
                  )}
                />
                {itemToView.featuredOnHome
                  ? "Displayed on Home Slider"
                  : "Hidden from Home Slider"}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {itemToView.stockStatus}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Specs Overview
              </span>
              <div className="p-3.5 rounded-xl bg-black/25 border border-white/10 text-sm font-medium text-white">
                {itemToView.specs}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Description
              </span>
              <div className="p-4 rounded-xl bg-black/25 border border-white/10 text-sm text-slate-200 leading-relaxed">
                {itemToView.longDescription || itemToView.description}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setItemToView(null)}
                className="border-white/15 text-white hover:bg-white/10 cursor-pointer"
              >
                Close
              </Button>
              <Link
                href={`/feature-equipment/${itemToView.id}`}
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#ef0e0a] hover:bg-[#c40c08] text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <ExternalLink className="size-4 mr-2" />
                Open Live Public Page
              </Link>
            </div>
          </div>
        </div>
      )}

      {itemToEdit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => setItemToEdit(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#343943] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Edit className="size-5 text-[#ef0e0a]" />
                <h3 className="text-xl font-bold text-white">Edit Equipment</h3>
              </div>
              <button
                type="button"
                onClick={() => setItemToEdit(null)}
                className="size-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Equipment Name
                </label>
                <input
                  type="text"
                  required
                  value={itemToEdit.name}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, name: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Category
                  </label>
                  <select
                    value={itemToEdit.category}
                    onChange={(e) =>
                      setItemToEdit({ ...itemToEdit, category: e.target.value as any })
                    }
                    className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a] cursor-pointer"
                  >
                    {equipmentCategories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c} value={c} className="bg-[#343943]">
                          {c}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Stock Status
                  </label>
                  <select
                    value={itemToEdit.stockStatus}
                    onChange={(e) =>
                      setItemToEdit({
                        ...itemToEdit,
                        stockStatus: e.target.value as any,
                      })
                    }
                    className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a] cursor-pointer"
                  >
                    {stockStatusOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#343943]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Price (AUD)
                </label>
                <input
                  type="text"
                  required
                  value={itemToEdit.price}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, price: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/15 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-400" />
                    Publish on Website
                  </div>
                  <div className="text-xs text-slate-400">
                    When turned on, this product is visible live on the website. Turn off to keep as a private draft.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={itemToEdit.published}
                    onChange={(e) =>
                      setItemToEdit({
                        ...itemToEdit,
                        published: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="flex flex-col gap-1.5">
                <MultiImageUploader
                  label="Product Photos (Select Multiple or Drag & Drop)"
                  values={itemToEdit.images || (itemToEdit.image ? [itemToEdit.image] : [])}
                  onChange={(urls) =>
                    setItemToEdit({
                      ...itemToEdit,
                      images: urls,
                      image: urls[0] || "",
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Specs Summary
                </label>
                <input
                  type="text"
                  value={itemToEdit.specs}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, specs: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={itemToEdit.description}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, description: e.target.value })
                  }
                  className="p-3 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/15 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Star className="size-4 text-amber-400 fill-amber-400" />
                    Feature on Home Page Slider
                  </div>
                  <div className="text-xs text-slate-400">
                    Enable to display this item in the front page featured equipment slider (only if published).
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={itemToEdit.featuredOnHome}
                    onChange={(e) =>
                      setItemToEdit({
                        ...itemToEdit,
                        featuredOnHome: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ef0e0a]"></div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setItemToEdit(null)}
                  className="border-white/15 text-white hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold cursor-pointer shadow-sm"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
