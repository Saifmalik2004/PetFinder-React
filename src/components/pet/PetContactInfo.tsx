
interface PetContactInfoProps {
  contactName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

const PetContactInfo = ({ contactName, contactEmail, contactPhone }: PetContactInfoProps) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="font-medium mb-4">Contact Information</h3>
      <p className="text-gray-700">
        <span className="font-medium">Name: </span>
        {contactName}
      </p>
      {contactEmail && (
        <p className="text-gray-700">
          <span className="font-medium">Email: </span>
          {contactEmail}
        </p>
      )}
      {contactPhone && (
        <p className="text-gray-700">
          <span className="font-medium">Phone: </span>
          {contactPhone}
        </p>
      )}
    </div>
  );
};

export default PetContactInfo;
