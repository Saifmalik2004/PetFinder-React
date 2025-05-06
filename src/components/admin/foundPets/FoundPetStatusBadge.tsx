
import React from "react";

type Status = "approved" | "pending" | "rejected" | "reunited";

interface FoundPetStatusBadgeProps {
  status: Status;
}

const FoundPetStatusBadge: React.FC<FoundPetStatusBadgeProps> = ({ status }) => {
  const badgeStyles: Record<Status, string> = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    reunited: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[status as Status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default FoundPetStatusBadge;
