import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadButtonProps {
  files: File[];
  setFiles: (files: File[]) => void;
  onFilesSelected?: (files: File[]) => void;
  disabled?: boolean;
}

export const UploadButton = ({ files, setFiles, onFilesSelected, disabled }: UploadButtonProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const filtered = selected
      .filter(file => ["image/jpeg", "image/png"].includes(file.type))
      .slice(0, 4 - files.length);

    const updated = [...files, ...filtered];
    setFiles(updated);
    onFilesSelected?.(updated);

    if (ref.current) {
      ref.current.value = "";
    }
  };

  return (
    <>
      <Input accept=".jpg,.jpeg,.png" multiple className="hidden" ref={ref} type="file" onChange={handleFileSelect} />
      <Button variant='outline' onClick={() => ref.current?.click()} className="w-full" type="button" disabled={files.length >= 4 || disabled}>
        Upload Images (Min 1 - Max 4) – {files.length} uploaded
      </Button>
    </>
  );
};
