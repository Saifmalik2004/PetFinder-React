
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useAdminFoundPets } from "@/hooks/useAdminFoundPets";
import FoundPetStatusBadge from "./foundPets/FoundPetStatusBadge";
import FoundPetDetailsDialog from "./foundPets/FoundPetDetailsDialog";
import ReuniteFoundPetDialog from "./foundPets/ReuniteFoundPetDialog";
import FoundPetActions from "./foundPets/FoundPetActions";
import FoundPetSearchBar from "./foundPets/FoundPetSearchBar";

const AdminFoundPets = () => {
  const {
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
  } = useAdminFoundPets();

  return (
    <div className="md:space-y-6 h-full flex flex-col m-0 p-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:px-6 md:py-4 px-4 py-2 gap-4">
        <h2 className="text-2xl font-bold">Found Pets</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FoundPetSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>

      <div className="md:flex-1 md:border md:rounded-lg md:overflow-hidden flex flex-col h-screen md:h-auto">
        <div className="overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-300px)] h-full">
          <Table className="min-w-[800px] table-fixed w-full">
            <TableHeader className="sticky top-0 bg-white z-1">
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Type/Breed</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date Found</TableHead>
                <TableHead>Finder</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    No pet reports found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>
                      <FoundPetStatusBadge status={pet.status as any} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {pet.pet_type} {pet.breed ? `(${pet.breed})` : ""}
                    </TableCell>
                    <TableCell>{pet.found_location}</TableCell>
                    <TableCell>
                      {format(new Date(pet.found_date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{pet.contact_name}</TableCell>
                    <TableCell className="text-right">
                      <FoundPetActions
                        petId={pet.id}
                        status={pet.status}
                        onViewDetails={() => setSelectedPet(pet)}
                        onReunite={() => handleReunitePet(pet)}
                        onStatusChange={handleStatusChange}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pet Details Dialog */}
      <Dialog open={!!selectedPet && !showReuniteDialog} onOpenChange={(open) => !open && setSelectedPet(null)}>
        {selectedPet && (
          <FoundPetDetailsDialog
            pet={selectedPet}
            onReunite={() => handleReunitePet(selectedPet)}
            onStatusChange={(status) => handleStatusChange(selectedPet.id, status)}
          />
        )}
      </Dialog>

      {/* Reunite Dialog */}
      <Dialog open={showReuniteDialog} onOpenChange={setShowReuniteDialog}>
        <ReuniteFoundPetDialog
          onConfirm={confirmReunite}
          onCancel={() => setShowReuniteDialog(false)}
        />
      </Dialog>
    </div>
  );
};

export default AdminFoundPets;
