import ContactAndAppointment from "@/components/main/appointmentForm/AppointmentForm";
import Gallery from "@/components/main/home/Gallery/Gallery";
import Hero from "@/components/main/home/Hero/Hero";
import Services from "@/components/main/home/Services/Services";
import Stats from "@/components/main/home/Stats/Stats";
import VisitingHours from "@/components/main/home/VisitingHours/VisitingHours";
import OurDoctors from "@/components/main/ourDoctors/OurDoctors";
import Reviews from "@/components/main/reviews/Reviews";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Suspense 
        fallback={
          <div className="flex justify-center items-center py-20 bg-white/90">
            <LoadingSpinner />
          </div>
        }
      >
        <Services />
      </Suspense>
      <OurDoctors />
      <Gallery />
      <Reviews />
      <VisitingHours />
      <ContactAndAppointment />
    </div>
  );
};

export default page;
