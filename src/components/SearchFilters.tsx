
import { useState } from "react";
import { Filter, X, Camera, Video, MapPin } from "lucide-react";

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
  onSearchChange 
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shootTypeOptions = [
    { label: "Photography", value: "photography", icon: Camera },
    { label: "Video/Film", value: "video", icon: Video },
    { label: "Both", value: "both", icon: MapPin }
  ];

  const styleOptions = [
    "Modern Studio", "Spanish Colonial", "Tropical Villa", "Urban Loft", 
    "Beach/Coastal", "Rooftop/Skyline", "Industrial/Warehouse", "Minimalist", 
    "Vintage/Heritage", "Garden/Nature", "Mountain/Highland", "Rice Terraces"
  ];

  const budgetOptions = [
    { label: "Under ₱3,000", value: "under-3000" },
    { label: "₱3,000 - ₱8,000", value: "3000-8000" },
    { label: "₱8,000 - ₱20,000", value: "8000-20000" },
    { label: "₱20,000+", value: "over-20000" }
  ];

  const crewSizeOptions = [
    { label: "Solo/Couple (1-2)", value: "solo" },
    { label: "Small Team (3-8)", value: "small" },
    { label: "Medium Crew (9-20)", value: "medium" },
    { label: "Large Production (20+)", value: "large" }
  ];

  const regionOptions = [
    "Metro Manila", "Luzon", "Visayas", "Mindanao", "Palawan", "Bohol", "Cebu", "Siargao"
  ];

  const amenityOptions = [
    "Power outlets", "Parking space", "WiFi", "AC/Climate control", "Natural light", 
    "Bathroom/Restroom", "Kitchen/Catering", "Security", "Equipment rental", 
    "Makeup/Prep room", "Changing area", "Drone-friendly"
  ];

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    onSearchChange("");
    onPriceChange([0, 50000]);
    onLocationChange("Metro Manila");
  };

  const hasActiveFilters = selectedFilters.length > 0 || searchTerm || priceRange[0] > 0 || priceRange[1] < 50000 || currentLocation !== "Metro Manila";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Search</label>
        <input
          type="text"
          placeholder="Search locations, styles, features..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Location</label>
        <select
          value={currentLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white"
        >
          {regionOptions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Price Range: ₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Popular Styles */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Popular Styles</label>
        <div className="flex flex-wrap gap-2">
          {["Beach/Coastal", "Rooftop/Skyline", "Urban Loft", "Garden/Nature"].map(style => (
            <button
              key={style}
              onClick={() => toggleFilter(style)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilters.includes(style)
                  ? 'bg-coral-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Shoot Types */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Shoot Type</label>
        <div className="grid grid-cols-3 gap-2">
          {shootTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => toggleFilter(option.value)}
              className={`p-3 rounded-xl text-sm font-medium transition-all border flex flex-col items-center gap-1 ${
                selectedFilters.includes(option.value)
                  ? 'bg-coral-500 text-white border-coral-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-coral-300'
              }`}
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Essential Amenities</label>
        <div className="grid grid-cols-1 gap-2">
          {amenityOptions.slice(0, 6).map(amenity => (
            <label 
              key={amenity} 
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all border ${
                selectedFilters.includes(amenity)
                  ? 'bg-coral-50 border-coral-200 text-coral-700'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(amenity)}
                onChange={() => toggleFilter(amenity)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                selectedFilters.includes(amenity)
                  ? 'bg-coral-500 border-coral-500'
                  : 'border-gray-300'
              }`}>
                {selectedFilters.includes(amenity) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default SearchFilters;
