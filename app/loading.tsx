import LoadingSpinner from "@/components/shared/LoadingSpinner";


const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
      
      {/* স্পিনার কম্পোনেন্ট কল করা */}
      <LoadingSpinner />
      
      {/* Loading Text */}
      <p className="mt-8 text-[#2A9D8F] font-semibold tracking-wide text-sm animate-pulse">
        Preparing your smile...
      </p>
    </div>
  );
};

export default LoadingScreen;