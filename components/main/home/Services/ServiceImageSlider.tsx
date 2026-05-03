"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServiceImageSlider({ images, title }: { images: string[], title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // বাটন ক্লিক করলে স্ক্রল হওয়ার ফাংশন
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // কন্টেইনারের উইডথ অনুযায়ী স্ক্রল হবে
      const scrollAmount = current.offsetWidth;
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth', // স্মুথ স্লাইডিং
      });
    }
  };
  return (
    <div className="relative group w-full">
      {/* স্লাইডার কন্টেইনার */}
      <div 
        ref={scrollRef}
        className="relative h-[450px] sm:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border-4 border-white flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {images.map((imgUrl, idx) => (
          <div key={idx} className="relative min-w-full h-full shrink-0 snap-center">
            <Image
              src={imgUrl}
              alt={`${title} - view ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* বাম পাশের বাটন (Prev) */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-20"
      >
        <ChevronLeft size={24} className="text-[#0E5B96] cursor-pointer" />
      </button>

      {/* ডান পাশের বাটন (Next) */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-20"
      >
        <ChevronRight size={24} className="text-[#0E5B96] cursor-pointer" />
      </button>
    </div>
  );
}