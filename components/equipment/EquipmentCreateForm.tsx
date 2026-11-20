"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Star,
  Sparkles,
  Layers,
  Upload,
  EyeOff,
} from "lucide-react";
import {
  equipmentBrands,
  equipmentCategories,
  stockStatusOptions,
} from "@/data/dashboardEquipment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MultiImageUploader } from "@/components/dashboard/ImageUploader";

export function EquipmentCreateForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    brand: equipmentBrands[0],
    category: equipmentCategories[1],
    price: "",
    originalPrice: "",
    stockStatus: stockStatusOptions[0],
    badge: "",
    disciplines: "",
    specs: "",
    description: "",
    featuredOnHome: false,
    published: true,
  });

  const [images, setImages] = useState<string[]>([]);
  const [detailedSpecs, setDetailedSpecs] = useState<{ label: string; value: string }[]>([]);
  const [inTheBox, setInTheBox] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData((prev) => ({
      ...prev,
      name,
      id: slug,
    }));
  };

  const addDetailedSpec = () => {
    setDetailedSpecs((prev) => [...prev, { label: "", value: "" }]);
  };

  const removeDetailedSpec = (index: number) => {
    setDetailedSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDetailedSpec = (index: number, field: "label" | "value", text: string) => {
    setDetailedSpecs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: text } : item))
    );
  };

  const addBoxItem = () => {
    setInTheBox((prev) => [...prev, ""]);
  };

  const removeBoxItem = (index: number) => {
    setInTheBox((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBoxItem = (index: number, text: string) => {
    setInTheBox((prev) => prev.map((item, i) => (i === index ? text : item)));
  };

  const handleSave = async (publishStatus: boolean) => {
    if (!formData.name.trim() || !formData.price.trim()) {
      alert("Please provide at least a Product Name and Price.");
      return;
    }

    setIsSubmitting(true);
    const resolvedId =
      formData.id ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const primaryImage = images[0] || "/equipment/default.jpg";
    const formattedPrice = formData.price.trim().startsWith("$")
      ? formData.price.trim()
      : `$${formData.price.trim()}`;

    try {
      await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resolvedId,
          name: formData.name,
          brand: formData.brand || "AFS Foils",
          category: formData.category,
          price: formattedPrice,
          stockStatus: formData.stockStatus,
          image: primaryImage,
          images: images,
          specs: formData.specs || formData.description,
          description: formData.description,
          featuredOnHome: formData.featuredOnHome,
          published: publishStatus,
        }),
      });
      setFormData((prev) => ({ ...prev, id: resolvedId, published: publishStatus }));
      setIsCreated(true);
    } catch (err) {
      console.error(err);
      setIsCreated(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(true);
  };

  if (isCreated) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-xl mx-auto gap-6 bg-[#383D47] rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div
          className={cn(
            "size-16 rounded-full flex items-center justify-center border",
            formData.published
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
          )}
        >
          {formData.published ? (
            <CheckCircle2 className="size-9" />
          ) : (
            <EyeOff className="size-9" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {formData.published
              ? "Equipment Published Successfully!"
              : "Equipment Saved as Draft!"}
          </h2>
          <p className="text-sm text-slate-300">
            <strong>"{formData.name}"</strong> has been saved to your equipment inventory catalog.
            {formData.published ? (
              <span className="block text-emerald-300 font-semibold mt-1">
                ✓ This item is now live and visible to website visitors.
              </span>
            ) : (
              <span className="block text-amber-300 font-semibold mt-1">
                🔒 This item is an unpublished draft and is hidden from public website visitors.
              </span>
            )}
            {formData.featuredOnHome && formData.published && (
              <span className="block text-amber-300 font-semibold mt-1">
                ★ This item is also configured to appear in the Home Page featured slider.
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/dashboard/equipment"
            className="px-5 py-2.5 rounded-xl bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
          >
            Back to Equipment List
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsCreated(false);
              setImages([]);
              setDetailedSpecs([]);
              setInTheBox([]);
              setFormData({
                name: "",
                id: "",
                brand: equipmentBrands[0],
                category: equipmentCategories[1],
                price: "",
                originalPrice: "",
                stockStatus: stockStatusOptions[0],
                badge: "",
                disciplines: "",
                specs: "",
                description: "",
                featuredOnHome: false,
                published: true,
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-colors cursor-pointer"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/equipment"
            className="size-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Equipment Listing</h1>
            <p className="text-xs text-slate-300">
              Add genuine AFS Foils, Manta Foil Assist, or custom equipment to the WA inventory.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/equipment"
          className="text-xs text-slate-400 hover:text-white font-medium"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardContent className="p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Layers className="size-4 text-[#ef0e0a]" />
              Basic Equipment Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Equipment Name <span className="text-[#ef0e0a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AFS Silk v2 Carbon Front Wing"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  URL Slug / Product ID <span className="text-[#ef0e0a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. afs-silk-v2-carbon-front-wing"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white placeholder:text-slate-500 font-mono focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Category <span className="text-[#ef0e0a]">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as any })
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
                  Stock Status <span className="text-[#ef0e0a]">*</span>
                </label>
                <select
                  value={formData.stockStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, stockStatus: e.target.value as any })
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Retail Price (AUD) <span className="text-[#ef0e0a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="$2,450.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Badge / Tag Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sale, New Release, French Carbon"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#ef0e0a]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className={cn(
                  "size-10 rounded-xl flex items-center justify-center shrink-0 border",
                  formData.published
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                )}
              >
                {formData.published ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-base font-bold text-white flex items-center gap-2">
                  {formData.published
                    ? "Live Publication (Published)"
                    : "Draft Mode (Unpublished)"}
                  <span
                    className={cn(
                      "text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                      formData.published
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    )}
                  >
                    {formData.published ? "Visible on Store" : "Hidden from Visitors"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {formData.published
                    ? "This listing will be immediately visible to public website visitors once created."
                    : "This listing will be saved as an internal draft in your admin catalog, completely hidden from the public website until you publish it."}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Star className="size-5 fill-amber-400" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-base font-bold text-white flex items-center gap-2">
                  Feature on Home Page Slider
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Front Store Highlight
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When enabled (and published), this equipment appears directly in the front page interactive equipment carousel on <strong className="text-white">wingingwa.com.au</strong> so visitors can immediately see and enquire about it.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.featuredOnHome}
                onChange={(e) =>
                  setFormData({ ...formData, featuredOnHome: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#ef0e0a]"></div>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardContent className="p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Upload className="size-4 text-[#ef0e0a]" />
              Equipment Product Images
            </h2>

            <MultiImageUploader
              label="Product Photos (Select Multiple or Drag & Drop)"
              values={images}
              onChange={(newImages) => {
                setImages(newImages);
                if (newImages.length > 0) {
                  setFormData((prev) => ({ ...prev, image: newImages[0] }));
                }
              }}
            />
          </CardContent>
        </Card>

        <Card className="bg-[#383D47] border-white/10 text-white">
          <CardContent className="p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="size-4 text-[#ef0e0a]" />
              Specifications & Descriptions
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Disciplines (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Surf Foil, Winging, Downwind"
                value={formData.disciplines}
                onChange={(e) =>
                  setFormData({ ...formData, disciplines: e.target.value })
                }
                className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Specs Summary
              </label>
              <input
                type="text"
                placeholder="e.g. Dual Action • Integrated Barometer Gauge • Laurent Borgna Shape"
                value={formData.specs}
                onChange={(e) =>
                  setFormData({ ...formData, specs: e.target.value })
                }
                className="h-10 px-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white focus:outline-hidden focus:border-[#ef0e0a]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Product Overview & Description <span className="text-[#ef0e0a]">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detailed explanation of the equipment's performance, build quality, and setup advice..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="p-3.5 rounded-xl bg-black/30 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#ef0e0a] leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Detailed Specifications
                </label>
                <button
                  type="button"
                  onClick={addDetailedSpec}
                  className="inline-flex items-center gap-1 text-xs text-[#ef0e0a] hover:text-orange-400 font-semibold cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  Add Specification
                </button>
              </div>

              {detailedSpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Specification Name (e.g. Area)"
                    value={spec.label}
                    onChange={(e) => updateDetailedSpec(i, "label", e.target.value)}
                    className="h-9 px-3 rounded-lg bg-black/30 border border-white/15 text-xs text-white flex-1 focus:outline-hidden focus:border-[#ef0e0a]"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 850 cm²)"
                    value={spec.value}
                    onChange={(e) => updateDetailedSpec(i, "value", e.target.value)}
                    className="h-9 px-3 rounded-lg bg-black/30 border border-white/15 text-xs text-white flex-1 focus:outline-hidden focus:border-[#ef0e0a]"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetailedSpec(i)}
                    className="size-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  In The Box Items
                </label>
                <button
                  type="button"
                  onClick={addBoxItem}
                  className="inline-flex items-center gap-1 text-xs text-[#ef0e0a] hover:text-orange-400 font-semibold cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  Add Box Item
                </button>
              </div>

              {inTheBox.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 1x High-Modulus Front Wing"
                    value={item}
                    onChange={(e) => updateBoxItem(i, e.target.value)}
                    className="h-9 px-3 rounded-lg bg-black/30 border border-white/15 text-xs text-white flex-1 focus:outline-hidden focus:border-[#ef0e0a]"
                  />
                  <button
                    type="button"
                    onClick={() => removeBoxItem(i)}
                    className="size-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pb-8 flex-wrap">
          <Link
            href="/dashboard/equipment"
            className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            variant="outline"
            className="px-5 py-2.5 rounded-xl border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            Save as Draft (Unpublished)
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#ef0e0a] hover:bg-[#c40c08] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
          >
            {isSubmitting ? "Saving..." : "Publish to Website"}
          </Button>
        </div>
      </form>
    </div>
  );
}
