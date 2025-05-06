
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdoptionContext } from "@/contexts/AdoptionContext";

export const ApplicationDetailsDialog: React.FC = () => {
  const { selectedApplication, handleApproveApplication, handleRejectApplication } = useAdoptionContext();
  
  if (!selectedApplication) return null;
  
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Adoption Application Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Pet Name
            </p>
            <p>{selectedApplication.pet_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Type/Breed
            </p>
            <p>
              {selectedApplication.pet_type}{" "}
              {selectedApplication.pet_breed
                ? `(${selectedApplication.pet_breed})`
                : ""}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Applicant
            </p>
            <p>{selectedApplication.applicant_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Contact
            </p>
            <p>{selectedApplication.applicant_email}</p>
            {selectedApplication.applicant_phone && (
              <p>{selectedApplication.applicant_phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Date Applied
            </p>
            <p>
              {format(
                new Date(selectedApplication.created_at),
                "MMMM d, yyyy"
              )}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Status
            </p>
            <p className="capitalize">{selectedApplication.status}</p>
          </div>
        </div>
        {selectedApplication.reason && (
          <div>
            <p className="text-sm font-medium text-gray-500">
              Reason for Adoption
            </p>
            <p className="text-sm">{selectedApplication.reason}</p>
          </div>
        )}
        {selectedApplication.living_situation && (
          <div>
            <p className="text-sm font-medium text-gray-500">
              Living Situation
            </p>
            <p className="text-sm">{selectedApplication.living_situation}</p>
          </div>
        )}
        {selectedApplication.experience && (
          <div>
            <p className="text-sm font-medium text-gray-500">
              Pet Experience
            </p>
            <p className="text-sm">{selectedApplication.experience}</p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {selectedApplication.status === "pending" && (
            <>
              <Button
                variant="outline"
                onClick={() => handleRejectApplication(selectedApplication.id)}
              >
                Reject
              </Button>
              <Button
                onClick={() =>
                  handleApproveApplication(
                    selectedApplication.id,
                    selectedApplication.pet_id
                  )
                }
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );
};
