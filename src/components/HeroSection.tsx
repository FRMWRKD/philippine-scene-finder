
import { Calendar, MapPin, MessageCircle, Camera, Video } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-[20vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-coral-900/80 via-orange-800/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight">
          Discover Perfect Philippine Locations for
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 to-orange-200">
            Filmmakers & Photographers
          </span>
        </h1>
        <p className="text-xs md:text-sm text-white/90 mb-3 max-w-2xl mx-auto">
          Connect directly with verified location scouts across the Philippines. Book virtual tours or on-site visits for your next production.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-3">
          <div className="flex items-center gap-1 text-white/90 bg-white/10 px-2 py-1 rounded-full">
            <Camera className="h-3 w-3 text-coral-200" />
            <span className="text-xs">Photography</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/10 px-2 py-1 rounded-full">
            <Video className="h-3 w-3 text-coral-200" />
            <span className="text-xs">Film Production</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/10 px-2 py-1 rounded-full">
            <Calendar className="h-3 w-3 text-coral-200" />
            <span className="text-xs">Virtual Tours</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/10 px-2 py-1 rounded-full">
            <MessageCircle className="h-3 w-3 text-coral-200" />
            <span className="text-xs">Direct Booking</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button className="bg-white text-coral-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm">
            Browse Locations
          </button>
          <button className="bg-coral-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm border border-white/20">
            Upload Your Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
