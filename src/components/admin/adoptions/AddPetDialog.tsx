
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PetForm, PetFormValues } from "./PetForm";
import { useAdoptionContext } from "@/contexts/AdoptionContext";

interface AddPetDialogProps {
  isMobile: boolean;
  onClose: () => void;
}

export const AddPetDialog: React.FC<AddPetDialogProps> = ({ isMobile, onClose }) => {
  const { addPetMutation } = useAdoptionContext();
  
  const handleSubmit = (data: PetFormValues) => {
    addPetMutation.mutate(data, {
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
        <DialogTitle>Add New Adoption Pet</DialogTitle>
      </DialogHeader>
      <ScrollArea
        className={`${isMobile ? "max-h-[100vh]" : "max-h-[80vh]"} flex-1 overflow-y-auto`}
      >
        <div className="px-1 py-1">
          <PetForm
            onSubmit={handleSubmit}
            isSubmitting={addPetMutation.isPending}
            submitLabel="Add Pet"
            onCancel={onClose}
            isMobile={isMobile}
          />
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
