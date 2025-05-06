
import { Calendar, MapPin, PawPrint, Clock } from "lucide-react";
import { format } from "date-fns";
import { PetType } from "@/hooks/usePetDetails";

interface PetDetailsInfoProps {
  petType: PetType;
  name: string;
  type: string;
  breed?: string | null;
  color?: string | null;
  location: string;
  date?: string | null;
  dateLabel?: string;
  age?: string | null;
  description?: string | null;
}

const PetDetailsInfo = ({
  petType,
  name,
  type,
  breed,
  color,
  location,
  date,
  dateLabel,
  age,
  description,
}: PetDetailsInfoProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>

      <div className="space-y-4">
        <div className="flex items-center">
          <PawPrint className="h-5 w-5 text-purple-500 mr-2" />
          <div>
            <span className="font-medium">Type: </span>
            {type}
            {breed && ` (${breed})`}
          </div>
        </div>

        {color && (
          <div className="flex items-center">
            <div>
              <span className="font-medium">Color: </span>
              {color}
            </div>
          </div>
        )}

        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-purple-500 mr-2" />
          <div>
            <span className="font-medium">Location: </span>
            {location}
          </div>
        </div>

        {date && (
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
            <div>
              <span className="font-medium">{dateLabel}: </span>
              {format(new Date(date), "MMMM d, yyyy")}
            </div>
          </div>
        )}

        {petType === "adoption" && age && (
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-purple-500 mr-2" />
            <div>
              <span className="font-medium">Age: </span>
              {age}
            </div>
          </div>
        )}

        {description && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetailsInfo;
