import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { equipment } from "@/src/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const showAll = searchParams.get("all") === "true";

    let records;
    if (showAll) {
      if (featuredOnly) {
        records = await db
          .select()
          .from(equipment)
          .where(eq(equipment.featuredOnHome, true))
          .orderBy(desc(equipment.createdAt));
      } else {
        records = await db
          .select()
          .from(equipment)
          .orderBy(desc(equipment.createdAt));
      }
    } else {
      if (featuredOnly) {
        records = await db
          .select()
          .from(equipment)
          .where(
            and(
              eq(equipment.featuredOnHome, true),
              eq(equipment.published, true)
            )
          )
          .orderBy(desc(equipment.createdAt));
      } else {
        records = await db
          .select()
          .from(equipment)
          .where(eq(equipment.published, true))
          .orderBy(desc(equipment.createdAt));
      }
    }

    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.cloneFromId) {
      const [existing] = await db
        .select()
        .from(equipment)
        .where(eq(equipment.id, body.cloneFromId))
        .limit(1);

      if (!existing) {
        return NextResponse.json(
          { success: false, error: "Original equipment to clone not found" },
          { status: 404 }
        );
      }

      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const newId = `${existing.id}-copy-${randomSuffix}`;
      const newSku = `WA-${existing.brand?.startsWith("AFS") ? "AFS" : "MNT"}-${Math.floor(100 + Math.random() * 900)}`;

      const [cloned] = await db
        .insert(equipment)
        .values({
          id: newId,
          name: `${existing.name} (Copy)`,
          brand: existing.brand,
          category: existing.category,
          price: existing.price,
          stockStatus: existing.stockStatus,
          image: existing.image,
          description: existing.description,
          featuredOnHome: false,
          published: false,
          sku: newSku,
        })
        .returning();

      return NextResponse.json({ success: true, data: cloned });
    }

    const baseSlug = (body.name || "equipment")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const id = body.id || `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const sku =
      body.sku ||
      `WA-${body.brand?.startsWith("AFS") ? "AFS" : "MNT"}-${Math.floor(100 + Math.random() * 900)}`;

    const [inserted] = await db
      .insert(equipment)
      .values({
        id,
        name: body.name,
        brand: body.brand,
        category: body.category,
        price: body.price,
        stockStatus: body.stockStatus || "In Stock (WA)",
        image: body.image || "/equipment/default.jpg",
        description: body.description ?? null,
        featuredOnHome: Boolean(body.featuredOnHome),
        published: body.published !== undefined ? Boolean(body.published) : true,
        sku,
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted });
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
        { success: false, error: "Missing equipment ID" },
        { status: 400 }
      );
    }

    const updateData: Partial<typeof equipment.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updateData.name = body.name;
    if (body.brand !== undefined) updateData.brand = body.brand;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.stockStatus !== undefined) updateData.stockStatus = body.stockStatus;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.featuredOnHome !== undefined) updateData.featuredOnHome = Boolean(body.featuredOnHome);
    if (body.published !== undefined) updateData.published = Boolean(body.published);
    if (body.sku !== undefined) updateData.sku = body.sku;

    const [updated] = await db
      .update(equipment)
      .set(updateData)
      .where(eq(equipment.id, body.id))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing equipment ID" },
        { status: 400 }
      );
    }

    await db.delete(equipment).where(eq(equipment.id, id));
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
