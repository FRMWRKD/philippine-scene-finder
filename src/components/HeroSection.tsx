
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to locations section
    const locationsSection = document.querySelector('#locations-section');
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[40vh] flex items-center justify-center">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-500 to-orange-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Discover Perfect Philippine Locations
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with verified location scouts and find the perfect spot for your next production.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search locations, scouts, or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-0 text-lg shadow-xl focus:ring-4 focus:ring-white/20 outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
