"use client"; // Required since we are using useState

import { useState } from "react";
import Image from "next/image";

const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  const images = [
    { id: 1, src: "/assets/galery/galery1.jpeg", alt: "Award Ceremony 1" },
    { id: 2, src: "/assets/galery/galery2.jpeg", alt: "Award Ceremony 2" },
    { id: 11, src: "/assets/galery/galery11.jpeg", alt: "Award Ceremony 11" },
    { id: 13, src: "/assets/galery/galery13.jpeg", alt: "Award Ceremony 13" },
    { id: 7, src: "/assets/galery/galery7.jpeg", alt: "Award Ceremony 7" },
    { id: 8, src: "/assets/galery/galery8.jpeg", alt: "Award Ceremony 8" }, { id: 12, src: "/assets/galery/galery12.jpeg", alt: "Award Ceremony 12" },
    { id: 3, src: "/assets/galery/galery3.jpeg", alt: "Award Ceremony 3" },
    { id: 4, src: "/assets/galery/galery4.jpeg", alt: "Award Ceremony 4" },
    { id: 5, src: "/assets/galery/galery5.jpeg", alt: "Award Ceremony 5" },
    { id: 6, src: "/assets/galery/galery6.jpeg", alt: "Award Ceremony 6" },

    { id: 9, src: "/assets/galery/galery9.jpeg", alt: "Award Ceremony 9" },
    { id: 10, src: "/assets/galery/galery10.jpeg", alt: "Award Ceremony 10" },

   
  ];

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#1D2939] tracking-tight">
            Inside Our <span className="text-[#2A9D8F]">Clinic</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {images.slice(0, visibleCount).map((image) => (
            <div
              key={image.id}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < images.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-[#2A9D8F] cursor-pointer text-white font-semibold rounded-full hover:bg-[#238579] transition-colors duration-300 shadow-md"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
