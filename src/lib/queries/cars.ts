import { CarBrand, CarModel } from "@/generated/prisma";

export const fetchBrands = async (): Promise<CarBrand[]> => {
  const res = await fetch("/api/brands");
  const data = await res.json();
  return data.map((brand: CarBrand) => ({ name: brand.name, id: brand.id }));
};

export const fetchModels = async (brand: string): Promise<CarModel[]> => {
  const res = await fetch(`/api/cars?brand=${brand}`);
  const data = await res.json();
  return data.models.map((model: CarModel) => ({ name: model.name, id: model.id }));
};