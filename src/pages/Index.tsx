
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Search } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      <StatsSection />
      <HowItWorksSection />
      
      {/* Testimonials Carousel Section - Now with continuous animation */}
      <TestimonialsCarousel />
      
      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 bg-purple-600">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <PawPrint className="mx-auto h-12 w-12 text-purple-200 animate-bounce" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Looking for a new furry friend?
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Browse our adoption section to find your perfect companion.
            </p>
            <div className="mt-10">
              <Link to="/adoption">
                <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-purple-50 border-transparent transition-all hover:scale-105">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Adoptable Pets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
