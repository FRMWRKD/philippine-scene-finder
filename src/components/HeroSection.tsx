
import { Calendar, MapPin, MessageCircle, Camera, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBrowseLocations = () => {
    // Scroll to locations section on same page
    const locationsSection = document.querySelector('#locations-section');
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUploadLocation = () => {
    navigate('/upload');
  };

  return (
    <div className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-coral-900/85 via-orange-800/75 to-coral-700/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Discover Perfect Philippine Locations for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 via-orange-200 to-yellow-200 mt-2">
             Filmmakers & Photographers
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            Connect directly with verified location scouts across the Philippines. Book virtual tours or on-site visits for your next production.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Camera className="h-4 w-4 text-coral-200" />
            <span className="text-sm font-medium">Photography Studios</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Video className="h-4 w-4 text-coral-200" />
            <span className="text-sm font-medium">Film Locations</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <Calendar className="h-4 w-4 text-coral-200" />
            <span className="text-sm font-medium">Virtual Tours</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <MessageCircle className="h-4 w-4 text-coral-200" />
            <span className="text-sm font-medium">Direct Booking</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button 
            onClick={handleBrowseLocations}
            className="bg-white text-coral-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20"
          >
            Browse Locations
          </button>
          <button 
            onClick={handleUploadLocation}
            className="bg-gradient-to-r from-coral-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-coral-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20"
          >
            List Your Location
          </button>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-white/80">Verified Locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div className="text-sm text-white/80">Professional Scouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">1000+</div>
            <div className="text-sm text-white/80">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
