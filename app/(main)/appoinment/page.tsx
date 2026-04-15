import ContactForm from "@/components/main/appointmentForm/ContactForm";
import ContactInfo from "@/components/main/appointmentForm/ContactInfo";


const ContactAndAppointment = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Side: Contact Info & Map */}
          <ContactInfo />

          {/* Right Side: Appointment Form */}
          <ContactForm />

        </div>
      </div>
    </section>
  );
};

export default ContactAndAppointment;