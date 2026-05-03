import Image from 'next/image';

const Gallery = () => {
  const images = [
    { id: 1, src: "/assets/galery/1.jpeg", alt: "Award Ceremony 1" },
    { id: 2, src: "/assets/galery/2.jpeg", alt: "Award Ceremony 2" },
    { id: 3, src: "/assets/galery/3.jpeg", alt: "Award Ceremony 3" },
    { id: 4, src: "/assets/galery/4.jpeg", alt: "Award Ceremony 4" },
    { id: 5, src: "/assets/galery/5.jpeg", alt: "Award Ceremony 5" },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#1D2939] tracking-tight">
            Inside Our <span className="text-[#2A9D8F]">Clinic</span>
          </h2>
        </div>

      
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
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
      </div>
    </section>
  );
};

export default Gallery;