
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FoundPetSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FoundPetSearchBar: React.FC<FoundPetSearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative flex-1 md:flex-none">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search type, breed, location, finder..."
        className="pl-10 w-full md:w-60"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default FoundPetSearchBar;
