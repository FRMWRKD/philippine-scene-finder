
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
    <div className="relative min-h-[20vh] flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-600 via-coral-500 to-orange-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Discover Perfect Philippine Locations for
            <span className="block text-white/90 mt-1">
              Filmmakers & Photographers
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified location scouts across the Philippines. Book virtual tours or on-site visits for your next production.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Camera className="h-4 w-4" />
            <span className="text-sm font-medium">Photography Studios</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Video className="h-4 w-4" />
            <span className="text-sm font-medium">Film Locations</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Virtual Tours</span>
          </div>
          <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Direct Booking</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <button 
            onClick={handleBrowseLocations}
            className="bg-white text-coral-600 px-6 py-3 rounded-xl font-bold text-base hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Locations
          </button>
          <button 
            onClick={handleUploadLocation}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white/30 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30"
          >
            List Your Location
          </button>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
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
    </div>
  );
};

export default HeroSection;
