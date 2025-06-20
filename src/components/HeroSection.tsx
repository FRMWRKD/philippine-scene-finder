
import { Calendar, MapPin, MessageCircle, Camera, Video } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-[35vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-coral-900/80 via-orange-800/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
          Perfect Locations for Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 to-orange-200">
            Creative Vision
          </span>
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto">
          Discover stunning Philippine locations for photography and filmmaking. Connect directly with verified location scouts.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4">
          <div className="flex items-center gap-2 text-white/90">
            <Camera className="h-4 w-4 text-coral-200" />
            <span className="text-sm">Photo Shoots</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Video className="h-4 w-4 text-coral-200" />
            <span className="text-sm">Film Production</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <MessageCircle className="h-4 w-4 text-coral-200" />
            <span className="text-sm">Direct Connect</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white text-coral-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Find Locations
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
