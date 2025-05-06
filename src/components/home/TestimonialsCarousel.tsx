
import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  initials: string;
  petImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Thanks to PawPal, I was reunited with my cat Whiskers after she had been missing for 2 weeks. The process was easy and the community was incredibly supportive!",
    author: "Jennifer S.",
    location: "Portland, OR",
    initials: "JS",
    petImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 2,
    quote: "I found a lost dog in my neighborhood and used PawPal to locate the owner. Within hours, Rocky was back home where he belonged. Such a rewarding experience!",
    author: "Mark T.",
    location: "Chicago, IL",
    initials: "MT",
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 3,
    quote: "PawPal helped me find a forever friend in my dog Max. The adoption process was smooth and the staff were very helpful in matching me with the right pet.",
    author: "Samantha K.",
    location: "Austin, TX",
    initials: "SK",
    petImage: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=300&h=300",
  },
  {
    id: 4,
    quote: "When my parrot flew away, I thought I'd never see him again. Thanks to PawPal's lost pet alert system, a neighbor spotted him within 24 hours.",
    author: "David R.",
    location: "Seattle, WA",
    initials: "DR",
    petImage: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300&h=300",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="h-full overflow-hidden border-2 border-purple-100 shadow-md">
    <CardContent className="p-0 h-full">
      <div className="flex flex-col md:flex-row h-full">
        <div 
          className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${testimonial.petImage})` }}
        />
        <div className="p-6 w-full md:w-2/3 flex flex-col justify-between">
          <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
          <div className="flex items-center mt-auto">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-medium">{testimonial.initials}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
              <p className="text-xs text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsCarousel: React.FC = () => {
  // Configure autoplay with a longer delay and no stopping on interaction
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from pet owners who have been reunited with their beloved companions.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto px-4">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-3/4 lg:basis-3/4">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
