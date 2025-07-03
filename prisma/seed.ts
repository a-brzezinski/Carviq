import { PrismaClient } from "@/generated/prisma";

import brandsWithModels from "./carData.json"; 

const prisma = new PrismaClient();

async function main() {
  await prisma.carModel.deleteMany();
  await prisma.carBrand.deleteMany();

  for (const entry of brandsWithModels) {
    const brand = await prisma.carBrand.create({
      data: {
        name: entry.brand,
        models: {
          create: entry.models.map((model: string) => ({ name: model })),
        },
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
