"use client";

import { useState } from "react";

import { Thumbnail } from "@/components/features/ImagePicker/Thumbnail";
import { UploadButton } from "@/components/features/ImagePicker/UploadButton";

interface ImagePickerProps {
  onFilesSelected?: (files: File[]) => void;
  disabled?: boolean;
}

export const ImagePicker = ({ onFilesSelected, disabled }: ImagePickerProps) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-full">
      <UploadButton files={files} setFiles={setFiles} onFilesSelected={onFilesSelected} disabled={disabled}/>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {files.map((file, i) => (
            <Thumbnail file={file} files={files} i={i} setFiles={setFiles} onFilesSelected={onFilesSelected} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};
