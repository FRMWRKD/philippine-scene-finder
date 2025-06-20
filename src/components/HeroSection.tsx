
import { Search, SlidersHorizontal } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFiltersClick: () => void;
  showFilters: boolean;
}

const HeroSection = ({ searchTerm, onSearchChange, onFiltersClick, showFilters }: HeroSectionProps) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 relative">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Perfect Location
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover amazing Philippine locations with verified scouts
          </p>

          {/* Clean Search Bar */}
          <div className="glass bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 max-w-3xl mx-auto">
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search locations, scouts, or areas..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-base bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500/50 focus:border-coral-300 text-gray-900 placeholder-gray-500 transition-all duration-200"
                />
              </div>
              <button
                type="button"
                onClick={onFiltersClick}
                className={`px-6 py-4 rounded-xl font-medium text-base transition-all duration-200 flex items-center gap-2 ${
                  showFilters
                    ? 'bg-coral-500 text-white shadow-md hover:bg-coral-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
