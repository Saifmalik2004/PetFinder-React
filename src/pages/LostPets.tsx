
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import PetCard from "@/components/pet/PetCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type LostPet = {
  id: string;
  pet_name: string;
  pet_type: string;
  breed: string | null;
  last_seen_location: string;
  last_seen_date: string;
  image_url: string | null;
  status: string;
};

const LostPets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [petType, setPetType] = useState<string | null>(null);
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");

  const { data: lostPets, isLoading, error } = useQuery({
    queryKey: ["lostPets"],
    queryFn: async () => {
      console.log("Fetching lost pets data...");
      try {
        const { data, error } = await supabase
          .from("lost_pets")
          .select("*")
          .eq("status", "approved");

        if (error) {
          console.error("Error fetching lost pets:", error);
          toast.error(`Failed to load pets: ${error.message}`);
          throw error;
        }
        
        console.log("Fetched lost pets:", data);
        return data as LostPet[];
      } catch (err) {
        console.error("Query execution error:", err);
        throw err;
      }
    },
  });

  // Filter pets based on search criteria
  const filteredPets = lostPets?.filter((pet) => {
    const matchesSearch =
      (pet.pet_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      pet.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase());

    // Fix the petType filter to properly handle "all" or null values
    const matchesType = !petType || petType === "all" ? true : pet.pet_type === petType;
    
    const matchesBreed = breed
      ? (pet.breed?.toLowerCase().includes(breed.toLowerCase()) || false)
      : true;
    const matchesLocation = location
      ? pet.last_seen_location.toLowerCase().includes(location.toLowerCase())
      : true;

    return matchesSearch && matchesType && matchesBreed && matchesLocation;
  }) || [];

  return (
    <Layout>
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Lost Pets</h1>
          <p className="text-gray-600">
            Browse through reported lost pets. If you've found one of these pets, please contact
            the owner directly or use our contact form.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, breed..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={petType || "all"} onValueChange={setPetType}>
              <SelectTrigger>
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Bird">Bird</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setPetType("all");
                setBreed("");
                setLocation("");
              }}
              className="mr-2"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
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
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading pets. Please try again later.</p>
            <p className="text-sm text-gray-500 mt-2">{(error as Error).message}</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets && filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <PetCard 
                  key={pet.id} 
                  id={pet.id}
                  name={pet.pet_name || "Unknown"}
                  type={pet.pet_type}
                  breed={pet.breed || undefined}
                  imageUrl={pet.image_url || "/placeholder.svg"}
                  location={pet.last_seen_location}
                  date={new Date(pet.last_seen_date)}
                  status="lost"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-600">
                  No lost pets found matching your criteria.
                </p>
                <p className="text-gray-500 mt-2 mb-6">
                  This could be because there are no approved lost pet reports yet, or none match your search filters.
                </p>
                <Link to="/report/lost">
                  <Button variant="default">Report a Lost Pet</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LostPets;
