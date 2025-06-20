
import { Search, SlidersHorizontal } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFiltersClick: () => void;
  showFilters: boolean;
}

const HeroSection = ({ searchTerm, onSearchChange, onFiltersClick, showFilters }: HeroSectionProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Perfect Philippine Locations
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connect with verified location scouts and find the perfect spot for your next production.
          </p>
        </div>

        {/* Integrated Search Bar */}
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 h-8 w-8" />
              <input
                type="text"
                placeholder="Search locations, scouts, or areas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-20 pr-8 py-8 text-xl border border-gray-300 rounded-3xl focus:ring-2 focus:ring-coral-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg"
              />
            </div>
            <button
              type="button"
              onClick={onFiltersClick}
              className={`px-10 py-8 rounded-3xl font-semibold text-xl transition-all duration-200 shadow-lg ${
                showFilters
                  ? 'bg-coral-500 text-white shadow-xl'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-coral-600'
              }`}
            >
              <SlidersHorizontal className="h-6 w-6 inline mr-3" />
              Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
