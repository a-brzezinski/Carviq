import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ThumbnailProps {
  file: File;
  i: number;
  files: File[];
  setFiles: (files: File[]) => void;
  onFilesSelected?: (files: File[]) => void;
}

export const Thumbnail = ({ file, files, i, setFiles, onFilesSelected }: ThumbnailProps) => {
  const handleDeleteImage = () => {
    const updated = files.filter((_, index) => index !== i);
    setFiles(updated);
    onFilesSelected?.(updated);
  };
  return (
    <Card
      key={i}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handleDeleteImage}
        className="absolute top-1 right-1 z-10 h-8 w-8 rounded-full bg-white hover:bg-red-100">
        <X className="h-4 w-4 text-red-500" />
      </Button>

      <CardContent className="relative h-full w-full p-0">
        <Image src={URL.createObjectURL(file)} alt={`Uploaded image ${i + 1}`} fill className="object-cover" />
      </CardContent>
    </Card>
  );
};
