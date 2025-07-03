import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const brandName = searchParams.get("brand");
    const modelName = searchParams.get("model");

    if (!brandName) {
      return NextResponse.json({ error: "Brand is required" }, { status: 400 });
    }

    const brand = await prisma.carBrand.findFirst({
      where: {
        name: {
          equals: brandName,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        models: {
          where: modelName
            ? {
                name: {
                  equals: modelName,
                  mode: "insensitive",
                },
              }
            : undefined, 
        },
      },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
