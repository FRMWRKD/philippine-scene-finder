
import { Calendar, MapPin, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 to-orange-200">
            Production Paradise
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          Discover stunning Philippine locations for your next shoot. From urban studios to tropical beaches.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-4 w-4 text-coral-200" />
            <span className="text-sm">AI-Smart Search</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="h-4 w-4 text-coral-200" />
            <span className="text-sm">Instant Booking</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <MessageCircle className="h-4 w-4 text-coral-200" />
            <span className="text-sm">Direct Chat</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white text-coral-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
          Start Exploring
        </button>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-16 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-16 right-8 w-24 h-24 bg-coral-400/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default HeroSection;
