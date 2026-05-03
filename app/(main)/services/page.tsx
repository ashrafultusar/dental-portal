import { getServicesAction } from "@/lib/data/getService";
import ServiceCard from "@/components/main/card/serviceCard/ServiceCard";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  image: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const AllServicesPage = async () => {
  const rawServices: Service[] = await getServicesAction();

  return (
    <main className="min-h-screen pt-10 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-black font-bold text-center mb-12">
          All Dental Services
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {rawServices?.map((srv:Service, index: number) => (
            <ServiceCard
              key={srv._id}
              service={{
                id: index + 1,
                _id: srv._id.toString(), // Add _id for details page routing
                title: srv.title,
                description: srv.description,
                price: srv.price,
                image: srv.image || "/placeholder-service.png",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllServicesPage;
