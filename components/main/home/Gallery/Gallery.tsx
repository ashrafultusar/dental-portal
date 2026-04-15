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
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1]">
          Inside Our  <span className="text-[#2A9D8F]">Clinic</span>
          </h2>
         
        </div>

        {/* Responsive Flex/Grid Layout */}
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl"
            >
              {/* Aspect Ratio 3:2 matches professional event photos best */}
              <div className="relative aspect-[3/2] w-full">
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover" 
                  // object-cover এখানে ইমেজের চারপাশের অপ্রয়োজনীয় অংশ বাদ দিয়ে সাবজেক্টকে ফোকাসে রাখবে
                  priority
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