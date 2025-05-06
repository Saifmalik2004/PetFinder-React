
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type PetType = "lost" | "found" | "adoption";

export type BasePetDetails = {
  id: string;
  pet_type: string;
  breed: string | null;
  color: string | null;
  description: string | null;
  image_url: string | null;
};

export type LostPet = BasePetDetails & {
  pet_name: string;
  last_seen_location: string;
  last_seen_date: string;
  contact_name: string;
  contact_phone: string | null;
  contact_email: string | null;
};

export type FoundPet = BasePetDetails & {
  found_location: string;
  found_date: string;
  contact_name: string;
  contact_phone: string | null;
  contact_email: string | null;
};

export type AdoptionPet = BasePetDetails & {
  pet_name: string;
  age: string | null;
  location: string;
};

export type PetDetails = LostPet | FoundPet | AdoptionPet;

export const usePetDetails = (petType: PetType) => {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: [`pet-${petType}`, id],
    queryFn: async () => {
      let data;
      let error;

      if (petType === "lost") {
        const response = await supabase
          .from("lost_pets")
          .select("*")
          .eq("id", id as string)
          .eq("status", "approved")
          .single();

        data = response.data as LostPet;
        error = response.error;
      } else if (petType === "found") {
        const response = await supabase
          .from("found_pets")
          .select("*")
          .eq("id", id as string)
          .eq("status", "approved")
          .single();

        data = response.data as FoundPet;
        error = response.error;
      } else {
        const response = await supabase
          .from("adoption_pets")
          .select("*")
          .eq("id", id as string)
          .eq("status", "available")
          .single();

        data = response.data as AdoptionPet;
        error = response.error;
      }

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
