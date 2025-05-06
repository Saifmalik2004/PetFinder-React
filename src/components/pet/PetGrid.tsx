
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PetCard from "@/components/pet/PetCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PetGridProps {
  pets: any[];
  isLoading: boolean;
  error: Error | null;
  emptyMessage: string;
  emptyActionLink?: string;
  emptyActionText?: string;
}

const PetGrid = ({
  pets,
  isLoading,
  error,
  emptyMessage,
  emptyActionLink,
  emptyActionText,
}: PetGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading pets. Please try again later.</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg text-gray-600">{emptyMessage}</p>
        <p className="text-gray-500 mt-2 mb-6">Try adjusting your filters or search term.</p>
        {emptyActionLink && emptyActionText && (
          <Link to={emptyActionLink}>
            <Button variant="default">{emptyActionText}</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          id={pet.id}
          type={pet.pet_type}
          breed={pet.breed || undefined}
          imageUrl={pet.image_url || "/placeholder.svg"}
          location={pet.found_location}
          date={new Date(pet.found_date)}
          status="found"
        />
      ))}
    </div>
  );
};

export default PetGrid;
