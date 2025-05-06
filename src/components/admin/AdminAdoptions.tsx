
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdoptionProvider, useAdoptionContext } from "@/contexts/AdoptionContext";
import { ApplicationsTable } from "./adoptions/ApplicationsTable";
import { PetsTable } from "./adoptions/PetsTable";
import { AddPetDialog } from "./adoptions/AddPetDialog";
import { EditPetDialog } from "./adoptions/EditPetDialog";
import { DeletePetDialog } from "./adoptions/DeletePetDialog";
import { ApplicationDetailsDialog } from "./adoptions/ApplicationDetailsDialog";

// Main component wrapper with provider
const AdminAdoptions = () => {
  return (
    <AdoptionProvider>
      <AdminAdoptionsContent />
    </AdoptionProvider>
  );
};

// Inner component that uses the context
const AdminAdoptionsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isEditPetOpen, setIsEditPetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"applications" | "listings">("applications");
  const isMobile = useIsMobile();
  
  const {
    applicationsLoading,
    petsLoading,
    handleApproveApplication,
    handleRejectApplication,
    handlePetStatusChange,
    setSelectedApplication,
    setPetToEdit,
    setPetToDelete,
    petToDelete,
    filteredApplications,
    filteredPets,
  } = useAdoptionContext();

  return (
    <div className="md:space-y-6 h-full flex flex-col m-0 p-0">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 px-4 py-2 sm:px-6 sm:py-4 border border-gray-200 sm:border-0 rounded-lg sm:rounded-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Adoption Management</h2>
          <div className="flex bg-gray-100 rounded-lg p-1 self-start shadow-sm">
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "applications"
                  ? "bg-white shadow text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "listings"
                  ? "bg-white shadow text-purple-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("listings")}
            >
              Pet Listings
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-full border-gray-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeTab === "listings" && (
            <Button
              onClick={() => setIsAddPetOpen(true)}
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Pet
            </Button>
          )}
        </div>
      </div>

      <div className="md:flex-1 md:border md:rounded-lg md:overflow-hidden flex flex-col h-screen md:h-auto">
        <div className="overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-300px)] h-full">
          {activeTab === "applications" ? (
            <ApplicationsTable
              applications={filteredApplications(searchTerm)}
              isLoading={applicationsLoading}
              handleApproveApplication={handleApproveApplication}
              handleRejectApplication={handleRejectApplication}
              setSelectedApplication={setSelectedApplication}
            />
          ) : (
            <PetsTable
              pets={filteredPets(searchTerm)}
              isLoading={petsLoading}
              handlePetStatusChange={handlePetStatusChange}
              handleEditPet={(pet) => {
                setPetToEdit(pet);
                setIsEditPetOpen(true);
              }}
              handleDeletePet={setPetToDelete}
            />
          )}
        </div>
      </div>

      {/* Add Pet Dialog */}
      <Dialog open={isAddPetOpen} onOpenChange={setIsAddPetOpen}>
        <AddPetDialog isMobile={isMobile} onClose={() => setIsAddPetOpen(false)} />
      </Dialog>

      {/* Edit Pet Dialog */}
      <Dialog open={isEditPetOpen} onOpenChange={setIsEditPetOpen}>
        <EditPetDialog isMobile={isMobile} onClose={() => {
          setIsEditPetOpen(false);
          setPetToEdit(null);
        }} />
      </Dialog>

      {/* Delete Pet Dialog */}
      <AlertDialog open={!!petToDelete} onOpenChange={(open) => !open && setPetToDelete(null)}>
        <DeletePetDialog onClose={() => setPetToDelete(null)} />
      </AlertDialog>

      {/* Application Details Dialog - Handled in ApplicationsTable */}
    </div>
  );
};

export default AdminAdoptions;
