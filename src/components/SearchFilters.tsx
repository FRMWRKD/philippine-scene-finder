
import { useState } from "react";

interface FilterState {
  style: string;
  budget: string;
  crewSize: string;
  amenities: string[];
}

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const SearchFilters = ({ filters, onFilterChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const styleOptions = [
    "Modern Studio", "Spanish Colonial", "Tropical Villa", "Urban Loft", 
    "Beachfront", "Rooftop", "Industrial", "Minimalist", "Vintage", "Garden"
  ];

  const budgetOptions = [
    { label: "Under ₱5,000", value: "under-5000" },
    { label: "₱5,000 - ₱15,000", value: "5000-15000" },
    { label: "₱15,000 - ₱30,000", value: "15000-30000" },
    { label: "Over ₱30,000", value: "over-30000" }
  ];

  const crewSizeOptions = [
    { label: "Solo (1-2 people)", value: "solo" },
    { label: "Small (3-8 people)", value: "small" },
    { label: "Medium (9-20 people)", value: "medium" },
    { label: "Large (20+ people)", value: "large" }
  ];

  const amenityOptions = [
    "Power outlets", "Parking", "WiFi", "AC", "Natural light", 
    "Bathroom", "Kitchen", "Security", "Equipment rental", "Catering"
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const clearAllFilters = () => {
    onFilterChange({
      style: "",
      budget: "",
      crewSize: "",
      amenities: []
    });
  };

  const hasActiveFilters = filters.style || filters.budget || filters.crewSize || filters.amenities.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 ${
          hasActiveFilters 
            ? 'bg-coral-500 text-white border-coral-500' 
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
            {[filters.style, filters.budget, filters.crewSize, ...filters.amenities].filter(Boolean).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-coral-500 text-sm hover:text-coral-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* Style Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Style</label>
            <select
              value={filters.style}
              onChange={(e) => updateFilter('style', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
            >
              <option value="">Any style</option>
              {styleOptions.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Budget (per day)</label>
            <select
              value={filters.budget}
              onChange={(e) => updateFilter('budget', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
            >
              <option value="">Any budget</option>
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Crew Size Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Crew Size</label>
            <select
              value={filters.crewSize}
              onChange={(e) => updateFilter('crewSize', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
            >
              <option value="">Any size</option>
              {crewSizeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Amenities Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="rounded border-gray-300 text-coral-500 focus:ring-coral-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-coral-500 text-white py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
