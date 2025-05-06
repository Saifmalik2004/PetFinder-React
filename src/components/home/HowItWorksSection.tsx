
import { Search, ClipboardEdit, Phone, Heart } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Report",
    description:
      "Submit details about a lost or found pet through our easy-to-use form.",
    icon: ClipboardEdit,
  },
  {
    id: 2,
    name: "Search",
    description:
      "Browse through our database to look for matching pets in your area.",
    icon: Search,
  },
  {
    id: 3,
    name: "Connect",
    description:
      "Contact pet owners or finders directly through our secure platform.",
    icon: Phone,
  },
  {
    id: 4,
    name: "Reunite",
    description:
      "Successfully reunite pets with their families or find them new homes.",
    icon: Heart,
  },
];

const HowItWorksSection = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes it easy to report lost pets, find matches, and reconnect families.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 relative">
                  <step.icon className="h-10 w-10 text-purple-600" />
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
                    {step.id}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.name}
                </h3>
                <p className="mt-2 text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
