import React, { createContext, useState, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdoptionApplication, AdoptionPet } from "@/types/adoption";
import { PetFormValues } from "@/components/admin/adoptions/PetForm";

interface AdoptionContextType {
  petApplications: AdoptionApplication[];
  adoptionPets: AdoptionPet[];
  applicationsLoading: boolean;
  petsLoading: boolean;
  selectedApplication: AdoptionApplication | null;
  setSelectedApplication: (app: AdoptionApplication | null) => void;
  handleApproveApplication: (id: string, petId: string) => void;
  handleRejectApplication: (id: string) => void;
  handlePetStatusChange: (id: string, status: string) => void;
  petToEdit: AdoptionPet | null;
  setPetToEdit: (pet: AdoptionPet | null) => void;
  petToDelete: AdoptionPet | null;
  setPetToDelete: (pet: AdoptionPet | null) => void;
  updateApplicationStatusMutation: ReturnType<typeof useMutation>;
  updatePetStatusMutation: ReturnType<typeof useMutation>;
  addPetMutation: ReturnType<typeof useMutation>;
  editPetMutation: ReturnType<typeof useMutation>;
  deletePetMutation: ReturnType<typeof useMutation>;
  filteredApplications: (searchTerm: string) => AdoptionApplication[];
  filteredPets: (searchTerm: string) => AdoptionPet[];
}

const AdoptionContext = createContext<AdoptionContextType | undefined>(undefined);

export const AdoptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedApplication, setSelectedApplication] = useState<AdoptionApplication | null>(null);
  const [petToEdit, setPetToEdit] = useState<AdoptionPet | null>(null);
  const [petToDelete, setPetToDelete] = useState<AdoptionPet | null>(null);
  const queryClient = useQueryClient();

  // Fetch applications
  const { data: petApplications = [], isLoading: applicationsLoading } = useQuery({
    queryKey: ["adoptionApplications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("adoption_applications")
        .select(`
          id, pet_id, applicant_name, applicant_email, applicant_phone, reason, living_situation, experience, status, created_at,
          adoption_pets(pet_name, pet_type, breed)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        throw new Error(error.message);
      }

      const applications = data.map(app => ({
        ...app,
        pet_name: app.adoption_pets?.pet_name ?? "Unknown",
        pet_type: app.adoption_pets?.pet_type ?? "Unknown",
        pet_breed: app.adoption_pets?.breed ?? null,
      })) as AdoptionApplication[];

      return applications;
    },
  });

  // Fetch pets
  const { data: adoptionPets = [], isLoading: petsLoading } = useQuery({
    queryKey: ["adminAdoptionPets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("adoption_pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching pets:", error);
        throw new Error(error.message);
      }
      return data as AdoptionPet[];
    },
  });

  // Mutations
  const updateApplicationStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        throw new Error(`Invalid application ID format: ${id}`);
      }

      const { data, error } = await supabase
        .from("adoption_applications")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating application:", error);
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        console.error(`No rows updated for application id=${id}`);
        throw new Error(`No application found with ID: ${id}`);
      }

      return { id, status, data: data[0] };
    },
    onSuccess: ({ id, status }) => {
      queryClient.invalidateQueries({ queryKey: ["adoptionApplications"] });
      toast.success(`Application ${status} successfully`);
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      toast.error(`Failed to update application status: ${error.message}`);
    },
  });

  const updatePetStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        throw new Error(`Invalid pet ID format: ${id}`);
      }

      const { data, error } = await supabase
        .from("adoption_pets")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating pet:", error);
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        console.error(`No rows updated for pet id=${id}`);
        throw new Error(`No pet found with ID: ${id}`);
      }

      return { id, status, data: data[0] };
    },
    onSuccess: ({ id, status }) => {
      queryClient.invalidateQueries({ queryKey: ["adminAdoptionPets"] });
      toast.success(`Pet status updated to ${status} successfully`);
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      toast.error(`Failed to update pet status: ${error.message}`);
    },
  });

  const addPetMutation = useMutation({
    mutationFn: async (petData: PetFormValues) => {
      const { error, data } = await supabase
        .from("adoption_pets")
        .insert([
          {
            pet_name: petData.pet_name,
            pet_type: petData.pet_type,
            breed: petData.breed || null,
            age: petData.age,
            color: petData.color || null,
            description: petData.description || null,
            location: petData.location,
            image_url: petData.image_url || null,
            status: "available",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error adding pet:", error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdoptionPets"] });
      toast.success("Pet added successfully");
    },
    onError: (error: Error) => {
      console.error("Error adding pet:", error);
      toast.error(`Failed to add pet: ${error.message}`);
    },
  });

  const editPetMutation = useMutation({
    mutationFn: async ({ id, petData }: { id: string, petData: PetFormValues }) => {
      const { error, data } = await supabase
        .from("adoption_pets")
        .update({
          pet_name: petData.pet_name,
          pet_type: petData.pet_type,
          breed: petData.breed || null,
          age: petData.age,
          color: petData.color || null,
          description: petData.description || null,
          location: petData.location,
          image_url: petData.image_url || null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error editing pet:", error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdoptionPets"] });
      toast.success("Pet updated successfully");
    },
    onError: (error: Error) => {
      console.error("Error updating pet:", error);
      toast.error(`Failed to update pet: ${error.message}`);
    },
  });
  
  const deletePetMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("adoption_pets")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting pet:", error);
        throw new Error(error.message);
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdoptionPets"] });
      toast.success("Pet deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Error deleting pet:", error);
      toast.error(`Failed to delete pet: ${error.message}`);
    },
  });

  const handleApproveApplication = async (id: string, petId: string) => {
    if (!id || !petId) {
      toast.error("Invalid application or pet ID");
      console.error("Invalid IDs:", { id, petId });
      return;
    }

    updateApplicationStatusMutation.mutate(
      { id, status: "approved" },
      {
        onSuccess: () => {
          updatePetStatusMutation.mutate(
            { id: petId, status: "unavailable" },
            {
              onSuccess: () => {
                // Toast moved to onSuccess of updatePetStatusMutation
              },
            }
          );
        },
      }
    );
  };

  const handleRejectApplication = (id: string) => {
    if (!id) {
      toast.error("Invalid application ID");
      console.error("Invalid ID:", id);
      return;
    }

    updateApplicationStatusMutation.mutate(
      { id, status: "rejected" },
      {
        onSuccess: () => {
          // Toast moved to onSuccess of updateApplicationStatusMutation
        },
      }
    );
  };

  const handlePetStatusChange = (id: string, status: string) => {
    updatePetStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast.success(`Pet listing updated to ${status} successfully`);
        },
        onError: (error: Error) => {
          toast.error(`Failed to update pet status: ${error.message}`);
        },
      }
    );
  };

  const filteredApplications = (searchTerm: string) => {
    if (!searchTerm) return petApplications;
    const searchLower = searchTerm.toLowerCase();
    return petApplications.filter((app) => {
      return (
        app.applicant_name.toLowerCase().includes(searchLower) ||
        app.pet_name.toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredPets = (searchTerm: string) => {
    if (!searchTerm) return adoptionPets;
    const searchLower = searchTerm.toLowerCase();
    return adoptionPets.filter((pet) => {
      return (
        pet.pet_name.toLowerCase().includes(searchLower) ||
        (pet.breed?.toLowerCase().includes(searchLower) || false)
      );
    });
  };

  return (
    <AdoptionContext.Provider
      value={{
        petApplications,
        adoptionPets,
        applicationsLoading,
        petsLoading,
        selectedApplication,
        setSelectedApplication,
        handleApproveApplication,
        handleRejectApplication,
        handlePetStatusChange,
        petToEdit,
        setPetToEdit,
        petToDelete,
        setPetToDelete,
        updateApplicationStatusMutation,
        updatePetStatusMutation,
        addPetMutation,
        editPetMutation,
        deletePetMutation,
        filteredApplications,
        filteredPets,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoptionContext = () => {
  const context = useContext(AdoptionContext);
  if (context === undefined) {
    throw new Error("useAdoptionContext must be used within an AdoptionProvider");
  }
  return context;
};