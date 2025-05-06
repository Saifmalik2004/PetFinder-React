import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { LostPet } from "../../../types/lostPets";
import PetStatusBadge from "./PetStatusBadge";
import PetActions from "./PetActions";

const PetTableRow = ({
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
    <TableRow key={pet.id}>
      <TableCell>
        <PetStatusBadge status={pet.status} />
      </TableCell>
      <TableCell className="font-medium">
        {pet.pet_name || "Unknown"} ({pet.pet_type}
        {pet.breed ? `, ${pet.breed}` : ""})
        <div className="sm:hidden text-xs text-gray-500 mt-1">
          {pet.last_seen_location} | {format(new Date(pet.created_at), "MMM d, yyyy")} |{" "}
          {pet.contact_name}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{pet.last_seen_location}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(pet.created_at), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{pet.contact_name}</TableCell>
      <TableCell>
        <PetActions
          pet={pet}
          onViewDetails={onViewDetails}
          onReunite={onReunite}
          onStatusChange={onStatusChange}
        />
      </TableCell>
    </TableRow>
  );
};

export default PetTableRow;