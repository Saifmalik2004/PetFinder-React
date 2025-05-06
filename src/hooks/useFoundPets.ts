
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type FoundPet = {
  id: string;
  pet_type: string;
  breed: string | null;
  found_location: string;
  found_date: string;
  image_url: string | null;
  status: string;
};

export const useFoundPets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [petType, setPetType] = useState<string | null>("all");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");

  const { data: foundPets, isLoading, error } = useQuery({
    queryKey: ["foundPets"],
    queryFn: async () => {
      console.log("Fetching found pets data...");
      try {
        const { data, error } = await supabase
          .from("found_pets")
          .select("*")
          .eq("status", "approved");

        if (error) {
          console.error("Error fetching found pets:", error);
          toast.error(`Failed to load pets: ${error.message}`);
          throw new Error(error.message);
        }
        
        console.log("Fetched successfully");
        return data as FoundPet[];
      } catch (err) {
        console.error("Query execution error:", err);
        throw err;
      }
    },
  });

  // Memoized filtered pets to prevent unnecessary re-renders
  const filteredPets = useMemo(() => {
    return foundPets?.filter((pet) => {
      const matchesSearch =
        (pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        pet.found_location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !petType || petType === "all" ? true : pet.pet_type === petType;
      
      const matchesBreed = breed
        ? (pet.breed?.toLowerCase().includes(breed.toLowerCase()) || false)
        : true;
        
      const matchesLocation = location
        ? pet.found_location.toLowerCase().includes(location.toLowerCase())
        : true;

      return matchesSearch && matchesType && matchesBreed && matchesLocation;
    }) || [];
  }, [foundPets, searchTerm, petType, breed, location]);

  return {
    foundPets,
    filteredPets,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    petType,
    setPetType,
    breed,
    setBreed,
    location,
    setLocation,
  };
};
