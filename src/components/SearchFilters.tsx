
import { useState } from "react";
import { Search, MapPin, Filter, X, SlidersHorizontal } from "lucide-react";

interface SearchFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
  currentLocation: string;
  onLocationChange: (location: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchFilters = ({
  selectedFilters,
  onFilterChange,
  priceRange,
  onPriceChange,
  currentLocation,
  onLocationChange,
  searchTerm,
  onSearchChange,
}: SearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableFilters = [
    "Photography Studio",
    "Video Production",
    "Industrial Design",
    "Rooftop",
    "Natural Light",
    "Warehouse",
    "Modern",
    "Vintage",
    "Outdoor",
    "Beach",
    "Urban",
    "Rustic"
  ];

  const locations = [
    "Metro Manila",
    "Cebu",
    "Davao",
    "Iloilo",
    "Baguio",
    "Boracay",
    "Palawan",
    "Bohol"
  ];

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    onSearchChange("");
    onPriceChange([0, 50000]);
    setShowAdvanced(false);
  };

  const removeFilter = (filterToRemove: string) => {
    onFilterChange(selectedFilters.filter(f => f !== filterToRemove));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Main Search Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[280px] relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations, styles, or keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors text-gray-900 placeholder-gray-500"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={currentLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors text-gray-900 min-w-[160px]"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            showAdvanced 
              ? 'bg-coral-500 text-white shadow-lg' 
              : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-coral-600'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Advanced
        </button>

        {(selectedFilters.length > 0 || searchTerm || showAdvanced) && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-3 text-gray-500 hover:text-coral-600 hover:bg-coral-50 rounded-xl transition-all duration-200"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {availableFilters.slice(0, 6).map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilters.includes(filter)
                ? "bg-coral-500 text-white shadow-md hover:bg-coral-600"
                : "bg-gray-100 text-gray-700 hover:bg-coral-50 hover:text-coral-600 border border-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-100 pt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Price Range: ₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()} per day
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₱0</span>
              <span>₱100,000+</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">All Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    selectedFilters.includes(filter)
                      ? "bg-coral-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-coral-50 hover:text-coral-600 border border-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center gap-2 px-3 py-1 bg-coral-100 text-coral-700 rounded-full text-sm font-medium border border-coral-200"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:text-coral-900 hover:bg-coral-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
