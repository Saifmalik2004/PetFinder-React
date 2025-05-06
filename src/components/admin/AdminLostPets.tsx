import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PetTableRow from "@/components/admin/lostPets/PetTableRow";
import ReuniteDialog from "@/components/admin/lostPets/ReuniteDialog";
import PetDetailsDialog from "@/components/admin/lostPets/PetDetailsDialog";
import { LostPet } from "../../types/lostPets";

const AdminLostPets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState<LostPet | null>(null);
  const [dialogType, setDialogType] = useState<"details" | "reunite" | null>(null);
  const queryClient = useQueryClient();

  const { data: lostPets, isLoading } = useQuery({
    queryKey: ["adminLostPets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lost_pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data as LostPet[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      additionalData = {},
    }: {
      id: string;
      status: string;
      additionalData?: any;
    }) => {
      const updateData = {
        status,
        ...additionalData,
      };
      const { error } = await supabase.from("lost_pets").update(updateData).eq("id", id);

      if (error) throw new Error(error.message);
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLostPets"] });
    },
  });

  const handleReunitePet = (pet: LostPet) => {
    setSelectedPet(pet);
    setDialogType("reunite");
  };

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
            setDialogType(null);
            setSelectedPet(null);
          },
        }
      );
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => toast.success(`Pet status updated to ${status}`),
      }
    );
  };

  const handleViewDetails = (pet: LostPet) => {
    setSelectedPet(pet);
    setDialogType("details");
  };

  const filteredPets = lostPets?.filter((pet) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (pet.pet_name?.toLowerCase().includes(searchLower) || false) ||
      pet.pet_type.toLowerCase().includes(searchLower) ||
      (pet.breed?.toLowerCase().includes(searchLower) || false) ||
      pet.last_seen_location.toLowerCase().includes(searchLower) ||
      pet.contact_name.toLowerCase().includes(searchLower)
    );
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-2 md:px-6 md:py-4 gap-4">
        <h2 className="text-2xl font-bold">Lost Pets</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-full md:w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table className="min-w-[600px] w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Pet Name</TableHead>
              <TableHead className="hidden sm:table-cell">Location</TableHead>
              <TableHead className="hidden sm:table-cell">Date Reported</TableHead>
              <TableHead className="hidden sm:table-cell">Owner</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredPets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No lost pet reports found
                </TableCell>
              </TableRow>
            ) : (
              filteredPets.map((pet) => (
                <PetTableRow
                  key={pet.id}
                  pet={pet}
                  onViewDetails={() => handleViewDetails(pet)}
                  onReunite={() => handleReunitePet(pet)}
                  onStatusChange={(status) => handleStatusChange(pet.id, status)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {dialogType === "reunite" && selectedPet && (
        <ReuniteDialog
          open={dialogType === "reunite"}
          onOpenChange={(open) => {
            if (!open) {
              setDialogType(null);
              setSelectedPet(null);
            }
          }}
          pet={selectedPet}
          onConfirm={confirmReunite}
        />
      )}

      {dialogType === "details" && selectedPet && (
        <Dialog
          open={dialogType === "details"}
          onOpenChange={(open) => {
            if (!open) {
              setDialogType(null);
              setSelectedPet(null);
            }
          }}
        >
          <PetDetailsDialog
            pet={selectedPet}
            onReunite={() => handleReunitePet(selectedPet)}
            onStatusChange={(status) => handleStatusChange(selectedPet.id, status)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default AdminLostPets;