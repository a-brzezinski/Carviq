import { cn } from "@/lib/utils";

interface InfoTextProps {
  children: React.ReactNode;
  variant: "default" | "error";
}

export const InfoText = ({ children, variant }: InfoTextProps) => {
  return (
    <p className={cn("pt-2 text-sm", variant === "default" && "text-gray-500", variant === "error" && "text-red-400")}>
      {children}
    </p>
  );
};
