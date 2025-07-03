import { FaCalendar, FaCarSide, FaClock, FaGasPump, FaRoad } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";

interface OfferDetailsProps {
  offer: {
    fuelType: string;
    transmission: string;
    createdAt: Date;
    year: number;
    bodyType: string;
    mileage: number;
  };
}

export const OfferDetails = ({ offer }: OfferDetailsProps) => {
  const formattedMileage = new Intl.NumberFormat("en-Us").format(offer.mileage);

  return (
    <div className="mb-8 grid grid-cols-2 place-items-center gap-4 md:grid-cols-3">
      <DetailItem icon={FaRoad} label={`${formattedMileage} km`} />
      <DetailItem icon={FaGasPump} label={offer.fuelType} />
      <DetailItem icon={FaCalendar} label={offer.year.toString()} />
      <DetailItem icon={GiGearStickPattern} label={offer.transmission} />
      <DetailItem icon={FaCarSide} label={offer.bodyType} />
      <DetailItem icon={FaClock} label={new Date(offer.createdAt).toLocaleDateString()} />
    </div>
  );
};

const DetailItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => {
  return (
    <div className="flex flex-col items-center space-x-2 text-gray-600">
      <Icon size={32} className="text-primary" />
      <span className="mt-2 font-semibold">{label}</span>
    </div>
  );
};
