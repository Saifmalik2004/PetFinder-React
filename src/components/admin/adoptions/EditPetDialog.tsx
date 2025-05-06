
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PetForm, PetFormValues } from "./PetForm";
import { useAdoptionContext } from "@/contexts/AdoptionContext";

interface EditPetDialogProps {
  isMobile: boolean;
  onClose: () => void;
}

export const EditPetDialog: React.FC<EditPetDialogProps> = ({ isMobile, onClose }) => {
  const { petToEdit, editPetMutation } = useAdoptionContext();
  
  if (!petToEdit) return null;

  const initialValues = {
    pet_name: petToEdit.pet_name,
    pet_type: petToEdit.pet_type,
    breed: petToEdit.breed || "",
    age: petToEdit.age || "",
    color: petToEdit.color || "",
    description: petToEdit.description || "",
    location: petToEdit.location,
    image_url: petToEdit.image_url || "",
  };

  const handleSubmit = (data: PetFormValues) => {
    editPetMutation.mutate({ 
      id: petToEdit.id, 
      petData: data 
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <DialogContent
      className={`sm:max-w-lg max-h-[100vh] ${
        isMobile ? "p-2 top-0 translate-y-0" : "p-4"
      } flex flex-col overflow-y-auto`}
    >
      <DialogHeader className="shrink-0 pt-4 pb-5">
        <DialogTitle>Edit Pet Listing</DialogTitle>
      </DialogHeader>
      <ScrollArea
        className={`${isMobile ? "max-h-[100vh]" : "max-h-[80vh]"} flex-1 overflow-y-auto`}
      >
        <div className="px-1 py-1">
          <PetForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
            isSubmitting={editPetMutation.isPending}
            submitLabel="Update Pet"
            onCancel={onClose}
            isMobile={isMobile}
          />
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
