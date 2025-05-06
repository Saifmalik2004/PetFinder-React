
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface PetFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  petType: string | null;
  setPetType: (value: string | null) => void;
  breed: string;
  setBreed: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const PetFilters = ({
  searchTerm,
  setSearchTerm,
  petType,
  setPetType,
  breed,
  setBreed,
  location,
  setLocation,
}: PetFiltersProps) => {
  const handleClearFilters = () => {
    setSearchTerm("");
    setPetType("all");
    setBreed("");
    setLocation("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by breed, location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={petType || "all"} onValueChange={setPetType}>
          <SelectTrigger>
            <SelectValue placeholder="Pet Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Dog">Dog</SelectItem>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Bird">Bird</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={handleClearFilters} className="mr-2">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default PetFilters;
