
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
    <div className="relative min-h-[25vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            Discover Perfect Philippine Locations for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-coral-200 via-orange-200 to-yellow-200 mt-1">
             Filmmakers & Photographers
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/90 mb-3 max-w-xl mx-auto leading-relaxed">
            Connect directly with verified location scouts across the Philippines. Book virtual tours or on-site visits for your next production.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-white/90 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
            <Camera className="h-3 w-3 text-coral-200" />
            <span className="text-xs font-medium">Photography Studios</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
            <Video className="h-3 w-3 text-coral-200" />
            <span className="text-xs font-medium">Film Locations</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
            <Calendar className="h-3 w-3 text-coral-200" />
            <span className="text-xs font-medium">Virtual Tours</span>
          </div>
          <div className="flex items-center gap-1 text-white/90 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
            <MessageCircle className="h-3 w-3 text-coral-200" />
            <span className="text-xs font-medium">Direct Booking</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
          <button 
            onClick={handleBrowseLocations}
            className="bg-white text-coral-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            Browse Locations
          </button>
          <button 
            onClick={handleUploadLocation}
            className="bg-gradient-to-r from-coral-500 to-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:from-coral-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            List Your Location
          </button>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-lg font-bold text-white mb-0">500+</div>
            <div className="text-xs text-white/80">Verified Locations</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white mb-0">50+</div>
            <div className="text-xs text-white/80">Professional Scouts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white mb-0">1000+</div>
            <div className="text-xs text-white/80">Happy Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
