
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-16 sm:py-24">
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <PawPrint className="mx-auto h-16 w-16 text-purple-500 animate-float" />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Reunite lost pets with their families
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl mx-auto">
            Help lost pets find their way home or discover your new best friend through our adoption services.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report-lost">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-base">
                Report Lost Pet
              </Button>
            </Link>
            <Link to="/report-found">
              <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 text-base">
                Report Found Pet
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 h-32 w-32 bg-purple-100 rounded-full opacity-50 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-purple-100 rounded-full opacity-50 blur-3xl translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
};

export default HeroSection;
