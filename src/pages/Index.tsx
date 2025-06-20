
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, MessageCircle } from "lucide-react";
import LocationCard from "../components/LocationCard";
import SearchFilters from "../components/SearchFilters";
import HeroSection from "../components/HeroSection";
import FloatingActionButton from "../components/FloatingActionButton";
import { mockLocations } from "../data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    style: "",
    budget: "",
    crewSize: "",
    amenities: []
  });
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);

  useEffect(() => {
    // Filter locations based on search and filters
    let filtered = mockLocations.filter(location => {
      const matchesSearch = location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStyle = !selectedFilters.style || location.tags.includes(selectedFilters.style);
      const matchesBudget = !selectedFilters.budget || checkBudgetRange(location.price, selectedFilters.budget);
      
      return matchesSearch && matchesStyle && matchesBudget;
    });
    
    setFilteredLocations(filtered);
  }, [searchQuery, selectedFilters]);

  const checkBudgetRange = (price: number, range: string) => {
    switch (range) {
      case "under-5000": return price < 5000;
      case "5000-15000": return price >= 5000 && price <= 15000;
      case "15000-30000": return price >= 15000 && price <= 30000;
      case "over-30000": return price > 30000;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LocationPH</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-coral-600 transition-colors">Browse</a>
              <a href="#" className="text-gray-600 hover:text-coral-600 transition-colors">How it works</a>
              <a href="#" className="text-gray-600 hover:text-coral-600 transition-colors">Support</a>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="text-coral-600 hover:text-coral-700 font-medium transition-colors">
                Sign In
              </button>
              <button className="bg-coral-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-coral-600 transition-colors">
                Join as Scout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search locations, styles, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <SearchFilters 
              filters={selectedFilters} 
              onFilterChange={setSelectedFilters} 
            />
          </div>

          {/* Active Filters Display */}
          {(selectedFilters.style || selectedFilters.budget || selectedFilters.crewSize || selectedFilters.amenities.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedFilters.style && (
                <span className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedFilters.style}
                </span>
              )}
              {selectedFilters.budget && (
                <span className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedFilters.budget === "under-5000" && "Under ₱5,000"}
                  {selectedFilters.budget === "5000-15000" && "₱5,000 - ₱15,000"}
                  {selectedFilters.budget === "15000-30000" && "₱15,000 - ₱30,000"}
                  {selectedFilters.budget === "over-30000" && "Over ₱30,000"}
                </span>
              )}
              {selectedFilters.crewSize && (
                <span className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedFilters.crewSize === "solo" && "Solo"}
                  {selectedFilters.crewSize === "small" && "Small crew"}
                  {selectedFilters.crewSize === "medium" && "Medium crew"}
                  {selectedFilters.crewSize === "large" && "Large crew"}
                </span>
              )}
              {selectedFilters.amenities.map(amenity => (
                <span key={amenity} className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredLocations.length} stunning locations found
          </h2>
          <div className="text-sm text-gray-600">
            Showing results for the Philippines
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No locations found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-coral-100">Verified Locations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1,200+</div>
              <div className="text-coral-100">Happy Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-coral-100">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₱2M+</div>
              <div className="text-coral-100">Earned by Hosts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Scouts */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
