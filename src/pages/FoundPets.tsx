
import Layout from "@/components/layout/Layout";
import PetFilters from "@/components/pet/PetFilters";
import PetGrid from "@/components/pet/PetGrid";
import { useFoundPets } from "@/hooks/useFoundPets";

const FoundPets = () => {
  const {
    filteredPets,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    petType,
    setPetType,
    breed,
    setBreed,
    location,
    setLocation,
  } = useFoundPets();

  return (
    <Layout>
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Found Pets</h1>
          <p className="text-gray-600">
            Browse through pets that have been found. If you recognize one of these pets as yours,
            please contact the finder directly or use our contact form.
          </p>
        </div>

        <PetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          petType={petType}
          setPetType={setPetType}
          breed={breed}
          setBreed={setBreed}
          location={location}
          setLocation={setLocation}
        />

        <PetGrid
          pets={filteredPets}
          isLoading={isLoading}
          error={error}
          emptyMessage="No found pets matching your criteria."
          emptyActionLink="/report-found"
          emptyActionText="Report a Found Pet"
        />
      </div>
    </Layout>
  );
};

export default FoundPets;
