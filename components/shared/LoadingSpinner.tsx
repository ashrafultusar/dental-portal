import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Static Background Ring */}
      <div className="absolute inset-0 border-4 border-[#E9F5F3] rounded-full"></div>
      
      {/* Animated Spinning Ring */}
      <div className="absolute inset-0 border-4 border-t-[#2A9D8F] rounded-full animate-spin"></div>
      
      {/* Teeth Icon - Static & Centered */}
      <div className="absolute flex items-center justify-center">
        <Image 
          src="/assets/tooth.svg" 
          alt="Dental Icon" 
          width={40} 
          height={40}
          className="object-contain"
          priority={true}
          style={{ filter: 'invert(52%) sepia(50%) saturate(601%) hue-rotate(125deg) brightness(92%) contrast(87%)' }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;