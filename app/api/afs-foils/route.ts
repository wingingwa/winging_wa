import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { afsFoilCards } from "@/src/db/schema";
import { afsProducts } from "@/data/afsProducts";
import { eq, asc } from "drizzle-orm";

async function ensureSeeded() {
  const existing = await db.select().from(afsFoilCards).limit(1);
  if (existing.length === 0) {
    for (let i = 0; i < afsProducts.length; i++) {
      const p = afsProducts[i];
      let defaultBg = "#0f172a";
      let defaultColor = "#ffffff";
      if (p.badgeType === "deal") {
        defaultBg = "#ef0e0a";
        defaultColor = "#ffffff";
      } else if (p.badgeType === "performance") {
        defaultBg = "#d97706";
        defaultColor = "#ffffff";
      } else if (p.badge) {
        defaultBg = "#0f172a";
        defaultColor = "#ffffff";
      }

      await db
        .insert(afsFoilCards)
        .values({
          id: p.id,
          name: p.name,
          category: p.category,
          subCategory: p.subCategory,
          image: p.image,
          badge: p.badge || null,
          badgeBgColor: defaultBg,
          badgeTextColor: defaultColor,
          badgeType: p.badgeType || null,
          sizes: p.sizes ? JSON.stringify(p.sizes) : null,
          price: p.price,
          originalPrice: p.originalPrice || null,
          actionText: p.actionText || "DISCOVER",
          url: p.url,
          href: p.href || null,
          disciplines: p.disciplines ? JSON.stringify(p.disciplines) : null,
          visible: true,
          sortOrder: i,
        })
        .onConflictDoNothing();
    }
  }
}

export async function GET(req: Request) {
  try {
    await ensureSeeded();

    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get("all") === "true";

    let records;
    if (showAll) {
      records = await db
        .select()
        .from(afsFoilCards)
        .orderBy(asc(afsFoilCards.sortOrder));
    } else {
      records = await db
        .select()
        .from(afsFoilCards)
        .where(eq(afsFoilCards.visible, true))
        .orderBy(asc(afsFoilCards.sortOrder));
    }

    const formatted = records.map((r) => {
      let parsedSizes: string[] = [];
      if (r.sizes) {
        try {
          const parsed = JSON.parse(r.sizes);
          if (Array.isArray(parsed)) parsedSizes = parsed;
        } catch {}
      }

      let parsedDisciplines: string[] = [];
      if (r.disciplines) {
        try {
          const parsed = JSON.parse(r.disciplines);
          if (Array.isArray(parsed)) parsedDisciplines = parsed;
        } catch {}
      }

      return {
        ...r,
        sizes: parsedSizes,
        disciplines: parsedDisciplines,
      };
    });

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Missing card ID" },
        { status: 400 }
      );
    }

    const updateData: Partial<typeof afsFoilCards.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.visible !== undefined) updateData.visible = Boolean(body.visible);
    if (body.badge !== undefined) updateData.badge = body.badge ? String(body.badge).trim() : null;
    if (body.badgeBgColor !== undefined) updateData.badgeBgColor = body.badgeBgColor;
    if (body.badgeTextColor !== undefined) updateData.badgeTextColor = body.badgeTextColor;
    if (body.price !== undefined) updateData.price = String(body.price).trim();
    if (body.originalPrice !== undefined) updateData.originalPrice = body.originalPrice ? String(body.originalPrice).trim() : null;
    if (body.sizes !== undefined) {
      if (Array.isArray(body.sizes)) {
        updateData.sizes = JSON.stringify(body.sizes);
      } else if (typeof body.sizes === "string") {
        updateData.sizes = body.sizes;
      }
    }

    const [updated] = await db
      .update(afsFoilCards)
      .set(updateData)
      .where(eq(afsFoilCards.id, body.id))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
