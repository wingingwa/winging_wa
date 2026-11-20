"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Edit2,
  Eye,
  EyeOff,
  Filter,
  Layers,
  Palette,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AfsCardItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  image: string;
  badge: string | null;
  badgeBgColor: string | null;
  badgeTextColor: string | null;
  badgeType: string | null;
  sizes: string[];
  price: string;
  originalPrice: string | null;
  actionText: string;
  url: string;
  href: string | null;
  disciplines: string[];
  visible: boolean;
  sortOrder: number;
}

const PRESET_BG_COLORS = [
  { label: "Red", value: "#ef0e0a" },
  { label: "Amber", value: "#d97706" },
  { label: "Emerald", value: "#10b981" },
  { label: "Blue", value: "#2563eb" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Dark Slate", value: "#0f172a" },
  { label: "White", value: "#ffffff" },
];

const PRESET_TEXT_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Gold", value: "#fef08a" },
  { label: "Red", value: "#ef0e0a" },
  { label: "Amber", value: "#fde68a" },
];

export function AfsFoilsManager() {
  const [cards, setCards] = useState<AfsCardItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [editingCard, setEditingCard] = useState<AfsCardItem | null>(null);
  const [newSizeInput, setNewSizeInput] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/afs-foils?all=true");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCards(json.data);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const subCategories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => {
      if (c.subCategory) set.add(c.subCategory);
    });
    return ["All", ...Array.from(set)];
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (selectedSubCategory !== "All" && card.subCategory !== selectedSubCategory) {
        return false;
      }

      if (visibilityFilter === "visible" && !card.visible) return false;
      if (visibilityFilter === "hidden" && card.visible) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesBadge = (card.badge || "").toLowerCase().includes(q);
        const matchesSub = card.subCategory.toLowerCase().includes(q);
        if (!matchesName && !matchesBadge && !matchesSub) return false;
      }

      return true;
    });
  }, [cards, selectedSubCategory, visibilityFilter, searchQuery]);

  const metrics = useMemo(() => {
    const total = cards.length;
    const visible = cards.filter((c) => c.visible).length;
    const hidden = total - visible;
    return { total, visible, hidden };
  }, [cards]);

  const toggleVisibility = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let nextValue = false;
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          nextValue = !c.visible;
          showToast(
            nextValue
              ? `"${c.name}" is now VISIBLE on /afs-foils`
              : `"${c.name}" is now HIDDEN from /afs-foils`
          );
          return { ...c, visible: nextValue };
        }
        return c;
      })
    );

    try {
      const res = await fetch("/api/afs-foils", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, visible: nextValue }),
      });
      const data = await res.json();
      if (!data.success) {
        setCards((prev) =>
          prev.map((c) => (c.id === id ? { ...c, visible: !nextValue } : c))
        );
        showToast("Error updating visibility");
      }
    } catch (err) {
      console.error(err);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, visible: !nextValue } : c))
      );
      showToast("Error updating visibility");
    }
  };

  const openEditModal = (card: AfsCardItem) => {
    setEditingCard({
      ...card,
      badge: card.badge || "",
      badgeBgColor: card.badgeBgColor || "#0f172a",
      badgeTextColor: card.badgeTextColor || "#ffffff",
      sizes: Array.isArray(card.sizes) ? [...card.sizes] : [],
    });
    setNewSizeInput("");
  };

  const handleAddSize = () => {
    if (!newSizeInput.trim() || !editingCard) return;
    const val = newSizeInput.trim();
    if (!editingCard.sizes.includes(val)) {
      setEditingCard({
        ...editingCard,
        sizes: [...editingCard.sizes, val],
      });
    }
    setNewSizeInput("");
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    if (!editingCard) return;
    setEditingCard({
      ...editingCard,
      sizes: editingCard.sizes.filter((s) => s !== sizeToRemove),
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setIsSaving(true);
    const payload = editingCard;

    setCards((prev) =>
      prev.map((c) => (c.id === payload.id ? payload : c))
    );

    try {
      const res = await fetch("/api/afs-foils", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: payload.id,
          badge: payload.badge,
          badgeBgColor: payload.badgeBgColor,
          badgeTextColor: payload.badgeTextColor,
          sizes: payload.sizes,
          price: payload.price,
          originalPrice: payload.originalPrice,
          visible: payload.visible,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`"${payload.name}" updated successfully!`);
        setEditingCard(null);
      } else {
        showToast(data.error || "Failed to save changes");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving card changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ef0e0a]">
              AFS Foils Catalog Management
            </span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
              {metrics.total} Product Cards
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            AFS Foils Cards
          </h1>
          <p className="text-sm text-slate-400">
            Control live visibility, edit top-right badges & custom colors, manage available sizes, and update prices for the public /afs-foils page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/afs-foils"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
          >
            <Eye className="size-3.5 text-slate-400" />
            <span>View Public /afs-foils</span>
          </Link>
          <Button
            type="button"
            onClick={fetchCards}
            variant="outline"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className={cn("size-3.5", isLoading && "animate-spin")} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#343943] border border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-semibold text-slate-400">Total Cards</span>
            <span className="text-2xl font-bold text-white">{metrics.total}</span>
          </div>
          <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
            <Layers className="size-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#343943] border border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-semibold text-emerald-400">Live on /afs-foils</span>
            <span className="text-2xl font-bold text-emerald-300">{metrics.visible}</span>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="size-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#343943] border border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-semibold text-amber-400">Hidden / Draft</span>
            <span className="text-2xl font-bold text-amber-300">{metrics.hidden}</span>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <EyeOff className="size-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-2xl bg-[#343943] border border-white/10">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by card title, badge, subcategory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 h-10 bg-black/20 border-white/10 text-sm text-white placeholder:text-slate-500 rounded-xl focus:border-[#ef0e0a]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
            {subCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  selectedSubCategory === cat
                    ? "bg-[#ef0e0a] text-white shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setVisibilityFilter("all")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                visibilityFilter === "all"
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white"
              )}
            >
              All
            </button>
            <button
              onClick={() => setVisibilityFilter("visible")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                visibilityFilter === "visible"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Live Only
            </button>
            <button
              onClick={() => setVisibilityFilter("hidden")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                visibilityFilter === "hidden"
                  ? "bg-amber-500/20 text-amber-300"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Hidden Only
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#343943] border border-white/10 animate-pulse flex flex-col gap-3"
            >
              <div className="w-full h-44 rounded-xl bg-white/5" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="h-9 w-full rounded-xl bg-white/5 mt-2" />
            </div>
          ))}
        </div>
      ) : filteredCards.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-[#343943] rounded-3xl border border-white/10">
          <Layers className="size-10 text-slate-500" />
          <p className="text-base font-semibold text-white">No AFS cards found matching criteria.</p>
          <p className="text-xs text-slate-400">Try clearing your search query or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCards.map((card) => {
            const badgeBg = card.badgeBgColor || "#0f172a";
            const badgeText = card.badgeTextColor || "#ffffff";

            return (
              <div
                key={card.id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 bg-[#343943] overflow-hidden",
                  card.visible
                    ? "border-white/10 hover:border-white/20 shadow-md"
                    : "border-amber-500/30 opacity-75 bg-[#343943]/60"
                )}
              >
                <div className="flex flex-col">
                  <div className="relative w-full h-48 bg-white p-3 flex items-center justify-center overflow-hidden">
                    {card.badge && (
                      <span
                        style={{
                          backgroundColor: badgeBg,
                          color: badgeText,
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                        className="absolute top-2.5 right-2.5 z-10 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border shadow-sm max-w-[85%] truncate"
                      >
                        {card.badge}
                      </span>
                    )}

                    <div className="relative w-full h-full">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        unoptimized
                        className="object-contain p-2 select-none group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-black/20 px-2 py-0.5 rounded border border-white/5 truncate">
                        {card.subCategory}
                      </span>
                      <span className="text-xs font-bold text-white shrink-0">
                        {card.price}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-tight text-white line-clamp-1 group-hover:text-[#ef0e0a] transition-colors">
                      {card.name}
                    </h3>

                    {card.sizes && card.sizes.length > 0 ? (
                      <div className="flex flex-wrap gap-1 pt-1 min-h-[26px]">
                        {card.sizes.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                        {card.sizes.length > 4 && (
                          <span className="rounded border border-white/5 bg-black/20 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                            +{card.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="min-h-[26px] flex items-center">
                        <span className="text-[10px] text-slate-500 italic">No sizes specified</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleVisibility(card.id, e)}
                      className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                        card.visible ? "bg-emerald-500" : "bg-slate-600"
                      )}
                      title={card.visible ? "Card is visible on website. Click to hide" : "Card is hidden. Click to show"}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                          card.visible ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {card.visible ? (
                        <span className="text-emerald-400">Live</span>
                      ) : (
                        <span className="text-amber-400">Hidden</span>
                      )}
                    </span>
                  </div>

                  <Button
                    type="button"
                    onClick={() => openEditModal(card)}
                    size="sm"
                    className="h-8 px-2.5 rounded-lg bg-white/10 hover:bg-[#ef0e0a] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editingCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => !isSaving && setEditingCard(null)}
        >
          <div
            className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-[#2e333b] border border-white/15 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#343943]">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ef0e0a]">
                  Edit AFS Foil Card
                </span>
                <h2 className="text-lg font-bold text-white truncate max-w-sm">
                  {editingCard.name}
                </h2>
              </div>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => setEditingCard(null)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 flex flex-col gap-5 overflow-y-auto">
              <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-400" />
                    Live Badge Preview
                  </span>
                  <span className="text-[11px] text-slate-500">
                    How it renders on the card
                  </span>
                </div>

                <div className="relative w-full h-24 rounded-xl bg-white flex items-center justify-center p-3 overflow-hidden border border-white/10">
                  {editingCard.badge ? (
                    <span
                      style={{
                        backgroundColor: editingCard.badgeBgColor || "#0f172a",
                        color: editingCard.badgeTextColor || "#ffffff",
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                      className="absolute top-3 right-3 rounded px-2.5 py-1 text-xs font-bold tracking-wider uppercase border shadow-md transition-all"
                    >
                      {editingCard.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No badge displayed</span>
                  )}
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                    {editingCard.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Tag className="size-3.5 text-[#ef0e0a]" />
                    1. Top-Right Badge
                  </label>
                  {editingCard.badge && (
                    <button
                      type="button"
                      onClick={() => setEditingCard({ ...editingCard, badge: "" })}
                      className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      Clear Badge
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-slate-400">Badge Text (e.g. PORTANCE, ACCESSIBILITY, NEW, DEAL)</span>
                  <Input
                    type="text"
                    placeholder="Enter badge text (leave empty to hide)"
                    value={editingCard.badge || ""}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, badge: e.target.value })
                    }
                    className="h-10 bg-black/40 border-white/15 text-sm text-white rounded-xl focus:border-[#ef0e0a]"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Badge Background Color
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_BG_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() =>
                          setEditingCard({ ...editingCard, badgeBgColor: c.value })
                        }
                        className={cn(
                          "size-7 rounded-lg border transition-all cursor-pointer flex items-center justify-center shrink-0",
                          editingCard.badgeBgColor?.toLowerCase() === c.value.toLowerCase()
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#2e333b] border-white scale-110"
                            : "border-white/20 hover:scale-105"
                        )}
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                      >
                        {editingCard.badgeBgColor?.toLowerCase() === c.value.toLowerCase() && (
                          <Check
                            className={cn(
                              "size-3.5",
                              c.value === "#ffffff" ? "text-black" : "text-white"
                            )}
                          />
                        )}
                      </button>
                    ))}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <Palette className="size-3.5 text-slate-400" />
                      <input
                        type="color"
                        value={editingCard.badgeBgColor || "#0f172a"}
                        onChange={(e) =>
                          setEditingCard({ ...editingCard, badgeBgColor: e.target.value })
                        }
                        className="size-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        title="Custom Background Color"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Badge Text Color
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_TEXT_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() =>
                          setEditingCard({ ...editingCard, badgeTextColor: c.value })
                        }
                        className={cn(
                          "size-7 rounded-lg border transition-all cursor-pointer flex items-center justify-center shrink-0",
                          editingCard.badgeTextColor?.toLowerCase() === c.value.toLowerCase()
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#2e333b] border-white scale-110"
                            : "border-white/20 hover:scale-105"
                        )}
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                      >
                        {editingCard.badgeTextColor?.toLowerCase() === c.value.toLowerCase() && (
                          <Check
                            className={cn(
                              "size-3.5",
                              c.value === "#ffffff" ? "text-black" : "text-white"
                            )}
                          />
                        )}
                      </button>
                    ))}

                    <div className="flex items-center gap-1.5 ml-auto">
                      <Palette className="size-3.5 text-slate-400" />
                      <input
                        type="color"
                        value={editingCard.badgeTextColor || "#ffffff"}
                        onChange={(e) =>
                          setEditingCard({ ...editingCard, badgeTextColor: e.target.value })
                        }
                        className="size-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        title="Custom Text Color"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Layers className="size-3.5 text-[#ef0e0a]" />
                    2. Available Sizes
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {editingCard.sizes.length} sizes configured
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-xl bg-black/40 border border-white/10">
                  {editingCard.sizes.length === 0 ? (
                    <span className="text-xs text-slate-500 italic p-1">No sizes added yet. Use the field below.</span>
                  ) : (
                    editingCard.sizes.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-xs"
                      >
                        <span>{s}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(s)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="e.g. 650, 750, 1050, 2.5m"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSize();
                      }
                    }}
                    className="h-9 bg-black/40 border-white/15 text-xs text-white rounded-xl focus:border-[#ef0e0a]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSize}
                    size="sm"
                    className="h-9 px-3 rounded-xl bg-white/10 hover:bg-[#ef0e0a] text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Size</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-black/20 border border-white/10">
                <label className="text-xs font-bold uppercase tracking-wider text-white">
                  3. Price Display
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-400">Display Price (e.g. From 799,00)</span>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. From 799,00"
                      value={editingCard.price}
                      onChange={(e) =>
                        setEditingCard({ ...editingCard, price: e.target.value })
                      }
                      className="h-10 bg-black/40 border-white/15 text-sm text-white rounded-xl focus:border-[#ef0e0a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-400">Original Price (optional strike-through)</span>
                    <Input
                      type="text"
                      placeholder="e.g. 990,00"
                      value={editingCard.originalPrice || ""}
                      onChange={(e) =>
                        setEditingCard({
                          ...editingCard,
                          originalPrice: e.target.value || null,
                        })
                      }
                      className="h-10 bg-black/40 border-white/15 text-sm text-white rounded-xl focus:border-[#ef0e0a]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Show on Public /afs-foils</span>
                  <span className="text-[11px] text-slate-400">Turn on to make this card live on the website</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingCard({ ...editingCard, visible: !editingCard.visible })
                  }
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                    editingCard.visible ? "bg-emerald-500" : "bg-slate-600"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out",
                      editingCard.visible ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSaving}
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border-white/15 text-xs text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-[#ef0e0a] hover:bg-[#c40c08] text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
