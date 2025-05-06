
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import PetDetailsImage from "@/components/pet/PetDetailsImage";
import PetDetailsInfo from "@/components/pet/PetDetailsInfo";
import PetContactInfo from "@/components/pet/PetContactInfo";
import AdoptionApplicationDialog from "@/components/pet/AdoptionApplicationDialog";
import { usePetDetails, PetType } from "@/hooks/usePetDetails";

const PetDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const path = window.location.pathname;
  
  const petType: PetType = path.includes("/lost-pets/")
    ? "lost"
    : path.includes("/found-pets/")
    ? "found"
    : "adoption";

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: pet, isLoading, error } = usePetDetails(petType);

  const handleApply = () => {
    if (!user) {
      toast.error("Please log in to apply for adoption");
      navigate("/auth");
      return;
    }
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-10 w-32 bg-gray-200 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !pet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the pet you're looking for.
            </p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Extract relevant pet information based on pet type
  let name, location, date, dateLabel;

  if (petType === "lost") {
    name = pet.pet_name;
    location = pet.last_seen_location;
    date = pet.last_seen_date;
    dateLabel = "Last seen";
  } else if (petType === "found") {
    name = `Found ${pet.pet_type}`;
    location = pet.found_location;
    date = pet.found_date;
    dateLabel = "Found on";
  } else {
    name = pet.pet_name;
    location = pet.location;
    date = null;
    dateLabel = "";
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Pet Image */}
          <div className="w-full md:w-1/2 h-96">
            <PetDetailsImage imageUrl={pet.image_url} altText={name || pet.pet_type} />
          </div>

          {/* Pet Info */}
          <div className="w-full md:w-1/2">
            <PetDetailsInfo
              petType={petType}
              name={name}
              type={pet.pet_type}
              breed={pet.breed}
              color={pet.color}
              location={location}
              date={date}
              dateLabel={dateLabel}
              age={petType === "adoption" ? (pet as any).age : undefined}
              description={pet.description}
            />
            
            {/* Contact Information (for lost/found pets) */}
            {(petType === "lost" || petType === "found") && (
              <div className="mt-6">
                <PetContactInfo
                  contactName={(pet as any).contact_name}
                  contactEmail={(pet as any).contact_email}
                  contactPhone={(pet as any).contact_phone}
                />
              </div>
            )}

            {/* Adoption Button (for adoption pets) */}
            {petType === "adoption" && (
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <Button size="lg" onClick={handleApply}>
                  Apply to Adopt
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Adoption Application Dialog */}
        {petType === "adoption" && pet.id && (
          <AdoptionApplicationDialog
            petId={pet.id}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default PetDetails;
