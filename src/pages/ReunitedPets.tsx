
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
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
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type ReunitedPet = {
  id: string;
  pet_name?: string;
  pet_type: string;
  breed?: string;
  last_seen_location?: string;
  found_location?: string;
  image_url?: string;
  reunite_story?: string;
  reunite_date?: string;
  created_at: string;
  status: string;
};

const ReunitedPets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [petType, setPetType] = useState<string | null>("all");

  const { data: reunitedPets, isLoading, error } = useQuery({
    queryKey: ["reunitedPets"],
    queryFn: async () => {
      console.log("Fetching reunited pets data...");
      try {
        // First, fetch reunited lost pets
        const { data: lostPets, error: lostError } = await supabase
          .from("lost_pets")
          .select("*")
          .eq("status", "reunited");

        if (lostError) {
          console.error("Error fetching reunited lost pets:", lostError);
          throw lostError;
        }

        // Then, fetch reunited found pets
        const { data: foundPets, error: foundError } = await supabase
          .from("found_pets")
          .select("*")
          .eq("status", "reunited");

        if (foundError) {
          console.error("Error fetching reunited found pets:", foundError);
          throw foundError;
        }
        
        // Combine and format the results
        const combined = [
          ...lostPets.map((pet: any) => ({
            ...pet,
            source: "lost"
          })),
          ...foundPets.map((pet: any) => ({
            ...pet,
            source: "found"
          }))
        ];

        console.log("Fetched reunited pets");
        return combined as (ReunitedPet & { source: string })[];
      } catch (err) {
        console.error("Query execution error:", err);
        toast.error("Failed to load reunited pets");
        throw err;
      }
    },
  });

  // Filter pets based on search criteria
  const filteredPets = reunitedPets?.filter((pet) => {
    const matchesSearch =
      (pet.pet_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      pet.pet_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    // Handle the pet type filter
    const matchesType = !petType || petType === "all" ? true : pet.pet_type === petType;

    return matchesSearch && matchesType;
  }) || [];

  return (
    <Layout>
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Reunited Pets</h1>
          <p className="text-gray-600">
            Celebrate with us the happy stories of pets who have been reunited with their families.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, breed, type..."
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
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setPetType("all");
              }}
              className="mr-2"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading reunited pets. Please try again later.</p>
            <p className="text-sm text-gray-500 mt-2">{(error as Error).message}</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  {pet.image_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={pet.image_url} 
                        alt={pet.pet_name || `${pet.pet_type}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pet.pet_name || `${pet.pet_type} (${pet.breed || "Unknown breed"})`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-1">
                      {pet.breed && <span>{pet.breed} • </span>}
                      {pet.source === "lost" ? "Lost pet" : "Found pet"}
                    </p>
                    <div className="mt-3">
                      {pet.reunite_story ? (
                        <p className="text-gray-700">{pet.reunite_story}</p>
                      ) : (
                        <p className="text-gray-500 italic">A happy reunion story!</p>
                      )}
                    </div>
                    {pet.reunite_date && (
                      <p className="text-sm text-gray-500 mt-4">
                        Reunited on {format(new Date(pet.reunite_date), "MMMM d, yyyy")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-600">
                  No reunited pets found matching your criteria.
                </p>
                <p className="text-gray-500 mt-2">
                  Check back soon for happy reunion stories!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReunitedPets;
