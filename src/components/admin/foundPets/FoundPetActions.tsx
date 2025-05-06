
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, Eye, MoreHorizontal, RefreshCw, XCircle } from "lucide-react";

interface FoundPetActionsProps {
  petId: string;
  status: string;
  onViewDetails: () => void;
  onReunite: () => void;
  onStatusChange: (petId: string, status: string) => void;
}

const FoundPetActions: React.FC<FoundPetActionsProps> = ({
  petId,
  status,
  onViewDetails,
  onReunite,
  onStatusChange,
}) => {
  return (
    <div className="text-right">
      {/* Dropdown for small screens */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
            {status !== "reunited" && (
              <DropdownMenuItem onClick={onReunite}>Mark as Reunited</DropdownMenuItem>
            )}
            {status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => onStatusChange(petId, "approved")}>
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(petId, "rejected")}>
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Buttons for large screens */}
      <div className="hidden md:flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onViewDetails}
        >
          <span className="sr-only">View details</span>
          <Eye className="h-4 w-4" />
        </Button>
        {status !== "reunited" && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onReunite}
          >
            <span className="sr-only">Mark as Reunited</span>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </Button>
        )}
        {status === "pending" && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onStatusChange(petId, "approved")}
            >
              <span className="sr-only">Approve</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onStatusChange(petId, "rejected")}
            >
              <span className="sr-only">Reject</span>
              <XCircle className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoundPetActions;
