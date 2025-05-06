
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { FoundPet } from "@/hooks/useAdminFoundPets";

interface FoundPetDetailsDialogProps {
  pet: FoundPet;
  onReunite: () => void;
  onStatusChange: (status: string) => void;
}

const FoundPetDetailsDialog: React.FC<FoundPetDetailsDialogProps> = ({
  pet,
  onReunite,
  onStatusChange,
}) => {
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Found Pet Report Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {pet.image_url && (
          <div className="w-full">
            <img
              src={pet.image_url}
              alt="Found pet"
              className="w-full h-64 object-cover rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Type/Breed</p>
            <p>
              {pet.pet_type} {pet.breed ? `(${pet.breed})` : ""}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Found Date</p>
            <p>{format(new Date(pet.found_date), "MMMM d, yyyy")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p>{pet.found_location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Finder</p>
            <p>{pet.contact_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contact</p>
            <p>{pet.contact_email || pet.contact_phone || "N/A"}</p>
          </div>
          {pet.color && (
            <div>
              <p className="text-sm font-medium text-gray-500">Color</p>
              <p>{pet.color}</p>
            </div>
          )}
          {pet.description && (
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p>{pet.description}</p>
            </div>
          )}
          {pet.status === "reunited" && pet.reunite_story && (
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Reunion Story</p>
              <p>{pet.reunite_story}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {pet.status !== "reunited" && (
            <Button onClick={onReunite} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Mark as Reunited
            </Button>
          )}
          <Select
            value={pet.status}
            onValueChange={onStatusChange}
            disabled={pet.status === "reunited"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </DialogContent>
  );
};

export default FoundPetDetailsDialog;
