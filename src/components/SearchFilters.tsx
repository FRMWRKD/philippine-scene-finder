
import { useState } from "react";
import { Filter, X } from "lucide-react";

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
  const activeFilterCount = [filters.style, filters.budget, filters.crewSize, ...filters.amenities].filter(Boolean).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
          hasActiveFilters 
            ? 'bg-coral-500 text-white border-coral-500 shadow-lg' 
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-semibold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-10" onClick={() => setIsOpen(false)} />
          
          {/* Filter Panel */}
          <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-6 flex justify-between items-center">
              <h3 className="font-bold text-xl text-gray-900">Filter Locations</h3>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-coral-500 text-sm hover:text-coral-600 transition-colors font-medium"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Filters */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Popular Styles</label>
                <div className="flex flex-wrap gap-2">
                  {["Modern Studio", "Beachfront", "Rooftop", "Garden"].map(style => (
                    <button
                      key={style}
                      onClick={() => updateFilter('style', filters.style === style ? '' : style)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.style === style
                          ? 'bg-coral-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">All Styles</label>
                <select
                  value={filters.style}
                  onChange={(e) => updateFilter('style', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Any style</option>
                  {styleOptions.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Budget (per day)</label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('budget', filters.budget === option.value ? '' : option.value)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                        filters.budget === option.value
                          ? 'bg-coral-500 text-white border-coral-500'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-coral-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crew Size Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Crew Size</label>
                <div className="space-y-2">
                  {crewSizeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('crewSize', filters.crewSize === option.value ? '' : option.value)}
                      className={`w-full p-3 rounded-xl text-sm font-medium transition-all border text-left ${
                        filters.crewSize === option.value
                          ? 'bg-coral-500 text-white border-coral-500'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-coral-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Essential Amenities</label>
                <div className="grid grid-cols-2 gap-2">
                  {amenityOptions.map(amenity => (
                    <label 
                      key={amenity} 
                      className={`flex items-center p-3 rounded-xl cursor-pointer transition-all border ${
                        filters.amenities.includes(amenity)
                          ? 'bg-coral-50 border-coral-200 text-coral-700'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                        filters.amenities.includes(amenity)
                          ? 'bg-coral-500 border-coral-500'
                          : 'border-gray-300'
                      }`}>
                        {filters.amenities.includes(amenity) && (
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
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100 p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-coral-500 text-white py-3 rounded-xl font-semibold hover:bg-coral-600 transition-colors shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilters;
