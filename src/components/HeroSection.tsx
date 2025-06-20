
import { Search, SlidersHorizontal } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFiltersClick: () => void;
  showFilters: boolean;
}

const HeroSection = ({ searchTerm, onSearchChange, onFiltersClick, showFilters }: HeroSectionProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Perfect Philippine Locations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with verified location scouts and find the perfect spot for your next production.
          </p>
        </div>

        {/* Integrated Search Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search locations, scouts, or areas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-16 pr-6 py-6 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-coral-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={onFiltersClick}
              className={`px-8 py-6 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-sm ${
                showFilters
                  ? 'bg-coral-500 text-white shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-coral-600'
              }`}
            >
              <SlidersHorizontal className="h-5 w-5 inline mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
