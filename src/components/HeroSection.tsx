
import { Search, SlidersHorizontal } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFiltersClick: () => void;
  showFilters: boolean;
}

const HeroSection = ({ searchTerm, onSearchChange, onFiltersClick, showFilters }: HeroSectionProps) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-coral-50/30 py-20 md:py-32 overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(239,117,72,0.1)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(239,117,72,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        {/* Main Search Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Find Your Perfect Location
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing Philippine locations with verified scouts
            </p>
          </div>

          {/* Glass Morphism Search Bar */}
          <div className="glass bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-coral-500 h-6 w-6 transition-colors" />
                <input
                  type="text"
                  placeholder="Search locations, scouts, or areas..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-16 pr-6 py-6 text-lg bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-coral-500/50 focus:border-coral-300 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:bg-white/80 focus:bg-white"
                />
              </div>
              <button
                type="button"
                onClick={onFiltersClick}
                className={`px-8 py-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  showFilters
                    ? 'bg-coral-500 text-white shadow-xl hover:shadow-2xl hover:bg-coral-600'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-600 hover:bg-white hover:text-coral-600 hover:border-coral-200 hover:shadow-lg'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5 inline mr-2" />
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
