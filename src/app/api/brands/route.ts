import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const brands = await prisma.carBrand.findMany();

    return NextResponse.json(brands);
  } catch {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
