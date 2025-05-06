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
import { LostPet } from "../../../types/lostPets";

const PetDetailsDialog = ({
    pet,
    onReunite,
    onStatusChange,
}: {
    pet: LostPet;
    onReunite: () => void;
    onStatusChange: (status: string) => void;
}) => {
    const imageContainerClasses = pet.status !== "reunited"
        ? "w-full flex justify-center sm:justify-start"
        : "w-full flex justify-center";

    return (
        <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden mx-auto">
            <DialogHeader className="text-center">
                <DialogTitle>Lost Pet Report Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 px-4 box-border">
                {pet.image_url && (
                    <div className={imageContainerClasses}>
                        <img
                            src={pet.image_url}
                            alt={pet.pet_name || "Lost pet"}
                            className="w-full max-w-md h-64 object-cover rounded-md"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pet Name</p>
                        <p>{pet.pet_name || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Type/Breed</p>
                        <p>
                            {pet.pet_type} {pet.breed ? `(${pet.breed})` : ""}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Last Seen</p>
                        <p>{format(new Date(pet.last_seen_date), "MMMM d, yyyy")}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="break-words">{pet.last_seen_location}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Owner</p>
                        <p>{pet.contact_name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                        <p className="break-all max-w-full">{pet.contact_email || pet.contact_phone || "N/A"}</p>
                    </div>
                    {pet.color && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Color</p>
                            <p>{pet.color}</p>
                        </div>
                    )}
                    {pet.description && (
                        <div className="col-span-1 sm:col-span-2">
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="break-words">{pet.description}</p>
                        </div>
                    )}
                    {pet.status === "reunited" && pet.reunite_story && (
                        <div className="col-span-1 sm:col-span-2">
                            <p className="text-sm font-medium text-gray-500">Reunion Story</p>
                            <p className="break-words max-h-40 overflow-y-auto">{pet.reunite_story}</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    {pet.status !== "reunited" && (
                        <Button onClick={onReunite} variant="outline" className="w-full sm:w-auto">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Mark as Reunited
                        </Button>
                    )}
                    <Select
                        value={pet.status}
                        onValueChange={onStatusChange}
                        disabled={pet.status === "reunited"}
                      
                    >
                        <SelectTrigger className="w-full">
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

export default PetDetailsDialog;