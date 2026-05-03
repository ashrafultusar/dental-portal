import React from "react";
import { getServiceByIdAction } from "@/lib/data/getService";
import {
  Stethoscope,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import ServiceImageSlider from "@/components/main/home/Services/ServiceImageSlider";
import { Service } from "@/Type/Type";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service: Service | null = await getServiceByIdAction(id);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FBFF]">
        <div className="text-center p-12 bg-white rounded-3xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Stethoscope size={40} />
          </div>
          <h1 className="text-3xl font-bold text-[#111827] mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            The service you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link
            href="/services"
            className="px-8 py-3 bg-[#0E5B96] text-white rounded-full font-semibold hover:bg-[#0c4e82] transition-colors inline-flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={20} /> Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const benefits = [
    `Specialized care for ${service.title}`,
    "Experienced and certified dental professionals",
    "State-of-the-art equipment & technology",
    "Comfortable and pain-free experience",
  ];

  return (
    <main className="min-h-screen bg-[#FAFDFF] pb-24 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute right-[-10%] top-[20%] w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[120px] -z-10" />

      <div className="pt-8 pb-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0E5B96] font-medium transition-colors w-fit"
          >
            <ArrowLeft size={18} /> Back to All Services
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-6">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E5B96] to-[#2A9D8F] rounded-[2rem] transform rotate-3 scale-[1.02] opacity-20 transition-transform duration-500"></div>

                {/* স্লাইডার কম্পোনেন্ট কল করা হলো */}
                <ServiceImageSlider
                  images={
                    service.images && service.images.length > 0
                      ? service.images
                      : [service.image || "/placeholder-service.png"]
                  }
                  title={service.title}
                />

                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-2 rounded-2xl shadow-xl animate-bounce-slow z-30 pointer-events-none">
                  <div className="bg-gradient-to-r from-[#0E5B96] to-[#1E74B5] px-8 py-4 rounded-xl text-white">
                    <p className="text-sm text-blue-100 font-medium mb-1">
                      Starting From
                    </p>
                    <p className="text-3xl font-extrabold shadow-sm">
                      ৳{service.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12 pr-4 lg:pr-10">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-[#0E5B96] rounded-full flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Duration</h4>
                  <p className="text-gray-500 text-xs">Varies</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-50 text-[#2A9D8F] rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Safe & Secure
                  </h4>
                  <p className="text-gray-500 text-xs">Certified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center pt-4 lg:pl-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0E5B96] rounded-full font-semibold text-sm mb-6 w-fit border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E5B96] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E5B96]"></span>
              </span>
              Premium Dental Care
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] leading-tight tracking-tight mb-6">
              {service.title}
            </h1>

            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0E5B96] to-transparent rounded-full mb-8"></div>

            <div className="prose prose-lg text-gray-600 mb-10 whitespace-pre-wrap leading-relaxed max-w-none">
              <p className="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#111827] mb-6">
                Why Choose Us?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-50"
                  >
                    <CheckCircle2
                      className="text-[#2A9D8F] shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-gray-700 font-medium text-sm sm:text-base leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <Link
                href={`/appoinment`}
                className="group relative w-full sm:w-auto overflow-hidden bg-[#0E5B96] text-white font-bold text-lg rounded-full px-10 py-5 transition-all outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-3"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                <span className="relative flex items-center gap-2">
                  Book Appointment{" "}
                  <Calendar size={22} className="group-hover:animate-bounce" />
                </span>
              </Link>

              <a
                href="tel:+8801234567890"
                className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg rounded-full px-10 py-4 sm:py-[18px] hover:border-[#0E5B96] hover:text-[#0E5B96] transition-all flex items-center justify-center gap-3"
              >
                <Phone size={22} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
      `,
        }}
      />
    </main>
  );
}
