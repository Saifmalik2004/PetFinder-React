
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type FoundPet = {
  id: string;
  pet_type: string;
  breed: string | null;
  color: string | null;
  description: string | null;
  found_location: string;
  found_date: string;
  contact_name: string;
  contact_phone: string | null;
  contact_email: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  reunite_story?: string;
  reunite_date?: string;
};

export const useAdminFoundPets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState<FoundPet | null>(null);
  const [showReuniteDialog, setShowReuniteDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch foundPets data
  const { data: foundPets, isLoading } = useQuery({
    queryKey: ["adminFoundPets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("found_pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data as FoundPet[];
    },
  });

  // Update pet status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, additionalData = {} }: { id: string; status: string; additionalData?: any }) => {
      const updateData = {
        status,
        ...additionalData,
      };

      const { error } = await supabase
        .from("found_pets")
        .update(updateData)
        .eq("id", id);

      if (error) throw new Error(error.message);
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminFoundPets"] });
    },
  });

  // Filter pets based on search term
  const filteredPets = foundPets?.filter((pet) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pet.pet_type.toLowerCase().includes(searchLower) ||
      (pet.breed?.toLowerCase().includes(searchLower) || false) ||
      pet.found_location.toLowerCase().includes(searchLower) ||
      pet.contact_name.toLowerCase().includes(searchLower)
    );
  }) || [];

  // Handle reunion
  const handleReunitePet = (pet: FoundPet) => {
    setSelectedPet(pet);
    setShowReuniteDialog(true);
  };

  // Handle status change
  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => toast.success(`Pet status updated to ${status}`),
      }
    );
  };

  // Confirm reunion with story
  const confirmReunite = (reuniteStory: string) => {
    if (selectedPet) {
      updateStatusMutation.mutate(
        {
          id: selectedPet.id,
          status: "reunited",
          additionalData: {
            reunite_story: reuniteStory,
            reunite_date: new Date().toISOString(),
          },
        },
        {
          onSuccess: () => {
            toast.success("Pet marked as reunited");
            setShowReuniteDialog(false);
          },
        }
      );
    }
  };

  return {
    foundPets,
    filteredPets,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedPet,
    setSelectedPet,
    showReuniteDialog,
    setShowReuniteDialog,
    handleReunitePet,
    handleStatusChange,
    confirmReunite,
  };
};
