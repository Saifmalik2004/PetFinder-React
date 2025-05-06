
import { Heart, Users, Search } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Pets Reunited",
    value: "3,000+",
    icon: Heart,
    description: "Successfully reconnected with their families",
  },
  {
    id: 2,
    name: "Pet Adoptions",
    value: "5,500+",
    icon: Users,
    description: "Found their forever homes through our platform",
  },
  {
    id: 3,
    name: "Daily Searches",
    value: "10,000+",
    icon: Search,
    description: "People looking for their pets daily",
  },
];

const StatsSection = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making a difference for pets and families
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our community-driven platform has helped thousands of pets return home and find new loving families.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center p-8 shadow-sm rounded-xl bg-gray-50/50 border border-gray-100 transition-all hover:shadow hover:bg-white"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-3xl font-semibold text-gray-900">{stat.value}</h3>
                  <p className="text-lg font-medium text-gray-900">{stat.name}</p>
                  <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
