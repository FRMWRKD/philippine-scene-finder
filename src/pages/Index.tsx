import { useState, useEffect, useMemo } from "react";
import { MapPin, Map } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LocationCard from "../components/LocationCard";
import SearchFilters from "../components/SearchFilters";
import LocationMap from "../components/LocationMap";
import { mockLocations } from "../data/mockData";
import FloatingActionButton from "../components/FloatingActionButton";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentLocation, setCurrentLocation] = useState("Metro Manila");
  const [viewMode, setViewMode] = useState<'locations' | 'images' | 'map'>('locations');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam && !selectedFilters.includes(tagParam)) {
      setSelectedFilters([tagParam]);
    }
  }, [searchParams]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
    
    // Update URL to remove tag parameter if no filters are selected
    if (filters.length === 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("tag");
      setSearchParams(newSearchParams);
    }
  };

  const filteredLocations = useMemo(() => {
    return mockLocations.filter((location) => {
      const matchesSearch = !searchTerm || location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 || selectedFilters.every(filter =>
        location.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );

      const matchesPrice = location.price >= priceRange[0] && location.price <= priceRange[1];
      const matchesLocation = location.location.toLowerCase().includes(currentLocation.toLowerCase());

      return matchesSearch && matchesFilters && matchesPrice && matchesLocation;
    });
  }, [searchTerm, selectedFilters, priceRange, currentLocation]);

  // Create image gallery data from all locations
  const allImages = useMemo(() => {
    const images: Array<{
      id: string;
      locationId: string;
      imageIndex: number;
      image: string;
      location: any;
      title: string;
      tags: string[];
      description: string;
    }> = [];

    mockLocations.forEach(location => {
      const allLocationImages = [location.heroImage, ...location.gallery];
      allLocationImages.forEach((image, index) => {
        images.push({
          id: `${location.id}-${index}`,
          locationId: location.id,
          imageIndex: index,
          image,
          location,
          title: `${location.title} - Image ${index + 1}`,
          tags: index === 0 
            ? ["Main Studio", "Professional Lighting", ...location.tags.slice(0, 2)]
            : [location.tags[index % location.tags.length], "Detail Shot", "Professional Setup"],
          description: index === 0 
            ? `Main view of ${location.title} showcasing the primary space and features.`
            : `Detail view showcasing ${location.tags[index % location.tags.length]} features.`
        });
      });
    });

    return images;
  }, []);

  // Filter images based on search criteria
  const filteredImages = useMemo(() => {
    return allImages.filter(imageData => {
      const matchesSearch = !searchTerm || 
        imageData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        imageData.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        imageData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => 
          imageData.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
          imageData.location.tags.some((tag: string) => tag.toLowerCase().includes(filter.toLowerCase()))
        );

      const matchesPrice = imageData.location.price >= priceRange[0] && imageData.location.price <= priceRange[1];
      
      const matchesLocation = imageData.location.location.toLowerCase().includes(currentLocation.toLowerCase());

      return matchesSearch && matchesFilters && matchesPrice && matchesLocation;
    });
  }, [allImages, searchTerm, selectedFilters, priceRange, currentLocation]);

  const handleImageClick = (imageData: any) => {
    navigate(`/image/${imageData.locationId}/${imageData.imageIndex}`);
  };

  const handleTagClick = (tag: string) => {
    if (!selectedFilters.includes(tag)) {
      const newFilters = [...selectedFilters, tag];
      setSelectedFilters(newFilters);
      
      // Update URL with the new tag
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("tag", tag);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFiltersClick={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
      
      <div id="locations-section" className="container mx-auto px-4 py-8">
        {/* Filters - Show/Hide based on state */}
        {showFilters && (
          <div className="mb-8">
            <SearchFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              currentLocation={currentLocation}
              onLocationChange={setCurrentLocation}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        )}

        {/* View Mode Toggle and Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {viewMode === 'locations' ? 'Discover Locations' : viewMode === 'images' ? 'Browse Images' : 'Map View'}
            </h2>
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode('locations')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'locations' 
                    ? 'bg-coral-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Locations
              </button>
              <button
                onClick={() => setViewMode('images')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'images' 
                    ? 'bg-coral-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'map' 
                    ? 'bg-coral-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Map className="h-4 w-4 inline mr-1" />
                Map
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            {viewMode === 'locations' 
              ? `${filteredLocations.length} locations found`
              : viewMode === 'images'
              ? `${filteredImages.length} images found`
              : `${filteredLocations.length} locations on map`
            }
          </div>
        </div>

        {/* Results */}
        <div>
          {viewMode === 'locations' ? (
            // Location Cards Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : viewMode === 'images' ? (
            // Image Gallery Grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredImages.map((imageData) => (
                <div
                  key={imageData.id}
                  className="group cursor-pointer"
                  onClick={() => handleImageClick(imageData)}
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm hover:shadow-lg transition-shadow">
                    <img
                      src={imageData.image}
                      alt={imageData.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-coral-600 transition-colors">
                      {imageData.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{imageData.location.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {imageData.tags.slice(0, 2).map((tag, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                          className="px-3 py-1 bg-coral-50 text-coral-600 text-xs rounded-full font-medium hover:bg-coral-100 transition-colors border border-coral-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Map View
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <LocationMap locations={filteredLocations} />
            </div>
          )}

          {/* No Results */}
          {((viewMode === 'locations' && filteredLocations.length === 0) || 
            (viewMode === 'images' && filteredImages.length === 0)) && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-gray-500 text-xl mb-6">
                No {viewMode} found matching your criteria
              </div>
              <button
                onClick={() => {
                  setSelectedFilters([]);
                  setSearchTerm("");
                  setPriceRange([0, 50000]);
                  setShowFilters(false);
                  // Clear URL parameters
                  const newSearchParams = new URLSearchParams();
                  setSearchParams(newSearchParams);
                }}
                className="bg-coral-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-coral-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Index;
