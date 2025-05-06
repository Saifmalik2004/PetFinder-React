export type LostPet = {
    id: string;
    pet_name: string | null;
    pet_type: string;
    breed: string | null;
    color: string | null;
    description: string | null;
    last_seen_location: string;
    last_seen_date: string;
    contact_name: string;
    contact_phone: string | null;
    contact_email: string | null;
    image_url: string | null;
    status: string;
    created_at: string;
    reunite_story?: string;
    reunite_date?: string;
  };