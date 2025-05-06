
export type AdoptionPet = {
  id: string;
  pet_name: string;
  pet_type: string;
  breed: string | null;
  age: string | null;
  color: string | null;
  description: string | null;
  location: string;
  image_url: string | null;
  status: string;
  created_at: string;
};

export type AdoptionApplication = {
  id: string;
  pet_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  reason: string | null;
  living_situation: string | null;
  experience: string | null;
  status: string;
  created_at: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string | null;
};
