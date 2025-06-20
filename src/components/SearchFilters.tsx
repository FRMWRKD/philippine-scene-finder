
import { useState } from "react";
import { Search, MapPin, DollarSign, Filter, X } from "lucide-react";

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

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      {/* Main Search Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
          />
        </div>

        <select
          value={currentLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        {(selectedFilters.length > 0 || searchTerm || showAdvanced) && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {availableFilters.slice(0, 8).map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedFilters.includes(filter)
                ? "bg-coral-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">All Categories</label>
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedFilters.includes(filter)
                      ? "bg-coral-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <div className="border-t pt-3 mt-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center gap-1 px-2 py-1 bg-coral-100 text-coral-700 rounded-full text-xs"
              >
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="hover:text-coral-900"
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
