interface NotFoundListingsProps {
  infoText: string;
}

export const NotFoundListings = ({ infoText }: NotFoundListingsProps) => {
  return (
    <div className="pt-24">
      <h3 className="text-center text-2xl font-bold text-gray-800">{infoText}</h3>
      <p className="mt-4 text-center text-gray-600">Try adjusting your search criteria or check back later.</p>
    </div>
  );
};
