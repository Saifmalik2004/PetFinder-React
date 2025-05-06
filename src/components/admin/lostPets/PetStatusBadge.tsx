import { LostPet } from "../../../types/lostPets";

const PetStatusBadge = ({ status }: { status: LostPet["status"] }) => {
  const badgeStyles: { [key: string]: string } = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    reunited: "bg-blue-100 text-blue-800",
  };

  if (!badgeStyles[status]) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default PetStatusBadge;