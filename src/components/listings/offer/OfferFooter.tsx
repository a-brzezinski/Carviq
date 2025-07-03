interface OfferFooterProps {
  userName: string;
  userPhone: string;
}

export const OfferFooter = ({ userName, userPhone }: OfferFooterProps) => {
  return (
    <div className="flex flex-col rounded-lg pb-6">
      <h3 className="text-2xl font-bold">Contact</h3>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-gray-800">{userName}</div>
        <div className="text-lg text-gray-600">Phone: {userPhone}</div>
      </div>
    </div>
  );
};
