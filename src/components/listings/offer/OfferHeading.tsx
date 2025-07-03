interface OfferHeadingProps {
  brand: string;
  model: string;
  price: number;
}

export const OfferHeading = ({ brand, model, price }: OfferHeadingProps) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {brand} | {model}
        </h2>
      </div>
      <div className="text-3xl font-bold text-gray-700">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)}
      </div>
    </div>
  );
};
