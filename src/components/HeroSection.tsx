
import { Calendar, MapPin, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-coral-900/70 via-orange-800/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 to-orange-200">
            Production Paradise
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover stunning Philippine locations for your next shoot. From urban studios to tropical beaches, 
          find spaces that bring your creative vision to life.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5 text-coral-200" />
            <span className="text-sm md:text-base">AI-Smart Search</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="h-5 w-5 text-coral-200" />
            <span className="text-sm md:text-base">Instant Booking</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <MessageCircle className="h-5 w-5 text-coral-200" />
            <span className="text-sm md:text-base">Direct Chat</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white text-coral-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-2xl">
          Start Exploring
        </button>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-coral-400/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default HeroSection;
