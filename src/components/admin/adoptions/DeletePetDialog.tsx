
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdoptionContext } from "@/contexts/AdoptionContext";

interface DeletePetDialogProps {
  onClose: () => void;
}

export const DeletePetDialog: React.FC<DeletePetDialogProps> = ({ onClose }) => {
  const { petToDelete, deletePetMutation } = useAdoptionContext();

  if (!petToDelete) return null;

  const confirmDelete = () => {
    deletePetMutation.mutate(petToDelete.id, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this pet?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the pet listing
          {petToDelete.pet_name && ` for ${petToDelete.pet_name}`}.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={confirmDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
