import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, Eye, MoreHorizontal, RefreshCw, XCircle } from "lucide-react";
import { LostPet } from "../../../types/lostPets";

const PetActions = ({
  pet,
  onViewDetails,
  onReunite,
  onStatusChange,
}: {
  pet: LostPet;
  onViewDetails: () => void;
  onReunite: () => void;
  onStatusChange: (status: string) => void;
}) => {
  return (
    <div className="text-right">
      {/* Dropdown for small/medium screens */}
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
            {pet.status !== "reunited" && (
              <DropdownMenuItem onClick={onReunite}>Mark as Reunited</DropdownMenuItem>
            )}
            {pet.status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => onStatusChange("approved")}>
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange("rejected")}>
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
        {pet.status !== "reunited" && (
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
        {pet.status === "pending" && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onStatusChange("approved")}
            >
              <span className="sr-only">Approve</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onStatusChange("rejected")}
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

export default PetActions;