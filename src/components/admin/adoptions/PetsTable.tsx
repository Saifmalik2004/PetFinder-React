import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { AdoptionPet } from "@/types/adoption";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PetsTableProps {
  pets: AdoptionPet[];
  isLoading: boolean;
  handlePetStatusChange: (id: string, status: string) => void;
  handleEditPet: (pet: AdoptionPet) => void;
  handleDeletePet: (pet: AdoptionPet) => void;
}

export const PetsTable: React.FC<PetsTableProps> = ({
  pets,
  isLoading,
  handlePetStatusChange,
  handleEditPet,
  handleDeletePet,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[600px] w-full">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead className="hidden sm:table-cell">Type/Breed</TableHead>
            <TableHead className="hidden sm:table-cell">Age</TableHead>
            <TableHead className="hidden sm:table-cell">Location</TableHead>
            <TableHead className="w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          ) : pets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                No pets found
              </TableCell>
            </TableRow>
          ) : (
            pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <StatusBadge status={pet.status} />
                </TableCell>
                <TableCell className="font-medium">
                  {pet.pet_name}
                  <div className="text-xs text-gray-500 mt-1 sm:hidden">
                    {pet.pet_type} {pet.breed ? `(${pet.breed})` : ""}{" "}
                    {pet.age ? `, ${pet.age}` : ""}{" "}
                    {pet.location ? `, ${pet.location}` : ""}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {pet.pet_type} {pet.breed ? `(${pet.breed})` : ""}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{pet.age}</TableCell>
                <TableCell className="hidden sm:table-cell">{pet.location}</TableCell>
                <TableCell className="text-right">
                  {/* Actions - Always show dropdown on small/medium, buttons on large */}
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handlePetStatusChange(
                              pet.id,
                              pet.status === "available" ? "unavailable" : "available"
                            )
                          }
                        >
                          {pet.status === "available" ? "Mark Unavailable" : "Mark Available"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPet(pet)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePet(pet)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* Desktop view actions */}
                  <div className="hidden md:flex justify-end gap-2">
                    <Button
                      variant={pet.status === "available" ? "outline" : "default"}
                      size="sm"
                      onClick={() =>
                        handlePetStatusChange(
                          pet.id,
                          pet.status === "available" ? "unavailable" : "available"
                        )
                      }
                    >
                      {pet.status === "available" ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      onClick={() => handleEditPet(pet)}
                    >
                      <span className="sr-only">Edit</span>
                      <Pencil className="h-4 w-4 text-purple-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                      onClick={() => handleDeletePet(pet)}
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};