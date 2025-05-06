
import { PawPrint } from "lucide-react";

interface PetDetailsImageProps {
  imageUrl: string | null;
  altText: string;
}

const PetDetailsImage = ({ imageUrl, altText }: PetDetailsImageProps) => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          <PawPrint className="h-16 w-16" />
        </div>
      )}
    </div>
  );
};

export default PetDetailsImage;
