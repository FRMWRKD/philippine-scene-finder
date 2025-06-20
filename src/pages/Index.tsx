
import { useState, useEffect, useMemo } from "react";
import { MapPin } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LocationCard from "../components/LocationCard";
import SearchFilters from "../components/SearchFilters";
import { mockLocations } from "../data/mockData";
import FloatingActionButton from "../components/FloatingActionButton";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentLocation, setCurrentLocation] = useState("Metro Manila");
  const [viewMode, setViewMode] = useState<'locations' | 'images'>('locations');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam && !selectedFilters.includes(tagParam)) {
      setSelectedFilters([tagParam]);
    }
  }, [searchParams, selectedFilters]);

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
      setSelectedFilters([...selectedFilters, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {viewMode === 'locations' ? 'Discover Locations' : 'Browse Images'}
            </h2>
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('locations')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'locations' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Locations
              </button>
              <button
                onClick={() => setViewMode('images')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'images' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Images
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {viewMode === 'locations' 
              ? `${filteredLocations.length} locations found`
              : `${filteredImages.length} images found`
            }
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              currentLocation={currentLocation}
              onLocationChange={setCurrentLocation}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {viewMode === 'locations' ? (
              // Location Cards Grid
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            ) : (
              // Image Gallery Grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((imageData) => (
                  <div
                    key={imageData.id}
                    className="group cursor-pointer"
                    onClick={() => handleImageClick(imageData)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={imageData.image}
                        alt={imageData.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-coral-600 transition-colors">
                        {imageData.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{imageData.location.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {imageData.tags.slice(0, 2).map((tag, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium hover:bg-blue-100 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      
                      <div className="font-semibold text-coral-600 text-sm">
                        ₱{imageData.location.price.toLocaleString()}/day
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {((viewMode === 'locations' && filteredLocations.length === 0) || 
              (viewMode === 'images' && filteredImages.length === 0)) && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No {viewMode} found matching your criteria
                </div>
                <button
                  onClick={() => {
                    setSelectedFilters([]);
                    setSearchTerm("");
                    setPriceRange([0, 50000]);
                  }}
                  className="bg-coral-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Index;
