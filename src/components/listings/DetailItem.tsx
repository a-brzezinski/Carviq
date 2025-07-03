interface DetailItemProps {
  icon: React.ReactNode;
  label: string | number;
}

export const DetailItem = ({ icon, label }: DetailItemProps) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{label}</span>
    </div>
  );
};
