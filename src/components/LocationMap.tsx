
import { useState } from "react";
import { MapPin, Star, Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Location {
  id: string;
  title: string;
  heroImage: string;
  gallery: string[];
  tags: string[];
  price: number;
  location: string;
  rating: number;
  reviews: number;
  metadata: {
    sizeM2: number;
    powerAmps: number;
    maxCrew: number;
    parking: boolean;
  };
}

interface LocationMapProps {
  locations: Location[];
}

const LocationMap = ({ locations }: LocationMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const navigate = useNavigate();

  // Mock coordinates for Philippine locations
  const getCoordinates = (locationName: string) => {
    const coordinates: { [key: string]: [number, number] } = {
      "Metro Manila": [14.5995, 120.9842],
      "Makati": [14.5547, 121.0244],
      "BGC": [14.5517, 121.0498],
      "Quezon City": [14.6760, 121.0437],
      "Ortigas": [14.5866, 121.0635],
      "Cebu": [10.3157, 123.8854],
      "Davao": [7.1907, 125.4553],
      "Iloilo": [10.7202, 122.5621],
      "Baguio": [16.4023, 120.5960],
      "Boracay": [11.9674, 121.9248],
      "Palawan": [9.8349, 118.7384],
      "Bohol": [9.6496, 124.1443]
    };
    
    // Find matching coordinates or default to Metro Manila
    const locationKey = Object.keys(coordinates).find(key => 
      locationName.toLowerCase().includes(key.toLowerCase())
    );
    return coordinates[locationKey || "Metro Manila"];
  };

  const handleLocationClick = (location: Location) => {
    navigate(`/location/${location.id}`);
  };

  const handleBookNow = (e: React.MouseEvent, location: Location) => {
    e.stopPropagation();
    navigate(`/location/${location.id}#book`);
  };

  const handleMessage = (e: React.MouseEvent, location: Location) => {
    e.stopPropagation();
    navigate(`/location/${location.id}#message`);
  };

  return (
    <div className="relative h-[600px] bg-gray-100">
      {/* Map placeholder - In a real app, you'd use Google Maps, Mapbox, etc. */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-coral-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map View</h3>
          <p className="text-gray-500">Map integration will show locations across the Philippines</p>
        </div>
      </div>

      {/* Location pins simulation */}
      <div className="absolute inset-0 overflow-hidden">
        {locations.slice(0, 8).map((location, index) => {
          const [lat, lng] = getCoordinates(location.location);
          // Convert coordinates to percentage positions (simplified)
          const x = ((lng - 118) / (126 - 118)) * 100;
          const y = ((18 - lat) / (18 - 5)) * 100;
          
          return (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                selectedLocation?.id === location.id ? 'z-20' : 'z-10'
              }`}
              style={{ 
                left: `${Math.max(10, Math.min(90, x))}%`, 
                top: `${Math.max(10, Math.min(90, y))}%` 
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  selectedLocation?.id === location.id 
                    ? 'bg-coral-600 scale-125' 
                    : 'bg-coral-500 hover:bg-coral-600'
                }`}>
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-coral-500"></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Location details popup */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-4 z-30 max-w-md mx-auto">
          <div className="flex gap-4">
            <img
              src={selectedLocation.heroImage}
              alt={selectedLocation.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {selectedLocation.title}
                </h4>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-gray-600 ml-2"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <MapPin className="h-3 w-3" />
                <span>{selectedLocation.location}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span>{selectedLocation.rating}</span>
                </div>
              </div>
              
              <div className="text-sm font-semibold text-coral-600 mb-3">
                ₱{selectedLocation.price.toLocaleString()}/day
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleLocationClick(selectedLocation)}
                  className="flex-1 bg-coral-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-coral-600 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => handleBookNow(e, selectedLocation)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleMessage(e, selectedLocation)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
