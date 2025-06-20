
import { Search } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFiltersClick: () => void;
}

const HeroSection = ({ searchTerm, onSearchChange, onFiltersClick }: HeroSectionProps) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to locations section
    const locationsSection = document.querySelector('#locations-section');
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Perfect Philippine Locations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with verified location scouts and find the perfect spot for your next production.
          </p>
        </div>

        {/* Integrated Search Bar */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search locations, scouts, or areas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              type="button"
              onClick={onFiltersClick}
              className="px-6 py-4 bg-coral-500 text-white rounded-xl font-medium hover:bg-coral-600 transition-colors"
            >
              Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
