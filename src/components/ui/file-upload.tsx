
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Image } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  existingUrl?: string;
}

export function FileUpload({ onUploadComplete, existingUrl }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existingUrl || "");

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      setIsUploading(true);
      
      try {
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('pet-images')
          .upload(filePath, file);
          
        if (error) {
          throw error;
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('pet-images')
          .getPublicUrl(filePath);
          
        onUploadComplete(publicUrlData.publicUrl);
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        toast.error(`Error uploading image: ${error.message}`);
        setPreviewUrl(existingUrl || "");
      } finally {
        setIsUploading(false);
      }
    },
    [existingUrl, onUploadComplete]
  );

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={previewUrl}
            alt="Pet"
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={() => {
              setPreviewUrl("");
              onUploadComplete("");
            }}
          >
            Change
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG or GIF (max. 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}
      {isUploading && (
        <div className="text-center text-sm text-gray-500">
          Uploading...
        </div>
      )}
    </div>
  );
}
