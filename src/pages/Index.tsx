import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Camera } from "lucide-react";
import LocationCard from "../components/LocationCard";
import SearchFilters from "../components/SearchFilters";
import { mockLocations } from "../data/mockData";

interface FilterState {
  style: string;
  budget: string;
  crewSize: string;
  amenities: string[];
  shootType: string;
  region: string;
}

const HeroSection = () => (
  <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-24">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-6">Discover Unique Creative Spaces</h1>
      <p className="text-xl mb-8">
        Find and book the perfect location for your next photoshoot or film shoot in the Philippines.
      </p>
    </div>
  </div>
);

const FloatingActionButton = () => (
  <button
    className="fixed bottom-8 right-8 bg-coral-500 text-white rounded-full p-4 shadow-lg hover:bg-coral-600 transition-colors"
  >
    <Camera className="h-6 w-6" />
  </button>
);

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    style: "",
    budget: "",
    crewSize: "",
    amenities: [],
    shootType: "",
    region: ""
  });
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    let results = mockLocations.filter(location => {
      const matchesSearch =
        searchQuery === "" ||
        location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStyle = filters.style === "" || location.tags.includes(filters.style);

      const matchesBudget =
        filters.budget === "" ||
        (filters.budget === "under-3000" && location.price < 3000) ||
        (filters.budget === "3000-8000" && location.price >= 3000 && location.price <= 8000) ||
        (filters.budget === "8000-20000" && location.price > 8000 && location.price <= 20000) ||
        (filters.budget === "over-20000" && location.price > 20000);

      const matchesCrewSize =
        filters.crewSize === "" ||
        (filters.crewSize === "solo" && location.metadata.maxCrew <= 2) ||
        (filters.crewSize === "small" && location.metadata.maxCrew >= 3 && location.metadata.maxCrew <= 8) ||
        (filters.crewSize === "medium" && location.metadata.maxCrew >= 9 && location.metadata.maxCrew <= 20) ||
        (filters.crewSize === "large" && location.metadata.maxCrew > 20);

      const matchesAmenities =
        filters.amenities.length === 0 || filters.amenities.every(amenity => {
          if (amenity === "Parking space") {
            return location.metadata.parking;
          }
          return true;
        });

      const matchesShootType = filters.shootType === "" || location.tags.includes(filters.shootType);
      const matchesRegion = filters.region === "" || location.location.includes(filters.region);

      return (
        matchesSearch &&
        matchesStyle &&
        matchesBudget &&
        matchesCrewSize &&
        matchesAmenities &&
        matchesShootType &&
        matchesRegion
      );
    });

    setFilteredLocations(results);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LocationPH</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button 
                onClick={() => navigate("/scouts")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Find Scouts
              </button>
              <button 
                onClick={() => navigate("/how-it-works")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={() => navigate("/support")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Support
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="text-coral-600 hover:text-coral-700 font-medium transition-colors">
                Sign In
              </button>
              <button 
                onClick={() => navigate("/upload")}
                className="bg-coral-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-coral-600 transition-colors"
              >
                List Your Space
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <SearchFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {filteredLocations.length} Locations Found
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
