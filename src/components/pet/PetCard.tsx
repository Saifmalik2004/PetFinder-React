
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type PetCardProps = {
  id: string;
  name?: string;
  type: string;
  breed?: string;
  imageUrl: string;
  location: string;
  date: Date;
  status?: "lost" | "found" | "adoption";
};

const PetCard = ({ id, name, type, breed, imageUrl, location, date, status = "lost" }: PetCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  const statusLabels = {
    lost: "Lost",
    found: "Found",
    adoption: "Adoption",
  };
  
  const statusColors = {
    lost: "bg-red-500",
    found: "bg-green-500",
    adoption: "bg-blue-500",
  };
  
  const linkPath = status === "adoption" 
    ? `/adoption/${id}`
    : status === "found" 
    ? `/found-pets/${id}`
    : `/lost-pets/${id}`;

  return (
    <Link to={linkPath}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden">
          <span className={`absolute top-2 right-2 text-xs font-medium text-white px-2 py-1 rounded-full ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
          <img 
            src={imageUrl || "/placeholder.svg"} 
            alt={name ? `${name} - ${type} ${breed || ""}` : `${type} ${breed || ""}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg">
            {name ? name : `${type}${breed ? ` (${breed})` : ""}`}
          </h3>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PetCard;
