import ContactAndAppointment from '@/components/main/appointmentForm/AppointmentForm';
import Hero from '@/components/main/home/Hero/Hero';
import Services from '@/components/main/home/Services/Services';
import Stats from '@/components/main/home/Stats/Stats';
import OurDoctors from '@/components/main/ourDoctors/OurDoctors';
import Reviews from '@/components/main/reviews/Reviews';


const page = () => {
    return (
        <div>
            <Hero/>
            <Stats/>
         <Services/>
         <OurDoctors/>
         <Reviews/>
         <ContactAndAppointment/>
        </div>
    );
};

export default page;