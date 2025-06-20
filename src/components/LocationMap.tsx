
import { useState } from "react";
import { MapPin, Star, Calendar, MessageCircle, X } from "lucide-react";
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

  // Mock coordinates for Philippine locations with better spread
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
    <div className="relative h-[700px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 relative">
          {/* Philippines outline simulation */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path
                d="M200 50 Q180 80 160 100 Q140 120 120 140 Q100 160 110 180 Q120 200 140 210 Q160 220 180 200 Q200 180 220 160 Q240 140 260 120 Q280 100 300 80 Q320 60 310 40 Q300 20 280 30 Q260 40 240 50 Q220 50 200 50"
                fill="rgba(34, 197, 94, 0.1)"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Center map info */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <MapPin className="h-12 w-12 text-coral-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Philippines Location Map</h3>
          <p className="text-gray-500 text-sm">Click on pins to view location details</p>
        </div>
      </div>

      {/* Location pins */}
      <div className="absolute inset-0">
        {locations.slice(0, 12).map((location, index) => {
          const [lat, lng] = getCoordinates(location.location);
          // Convert coordinates to percentage positions with better distribution
          const x = ((lng - 116) / (128 - 116)) * 100;
          const y = ((20 - lat) / (20 - 5)) * 100;
          
          // Add some random offset for better visual distribution
          const offsetX = (index * 7) % 20 - 10;
          const offsetY = (index * 11) % 16 - 8;
          
          return (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 z-10 ${
                selectedLocation?.id === location.id ? 'z-30 scale-125' : ''
              }`}
              style={{ 
                left: `${Math.max(8, Math.min(92, x + offsetX))}%`, 
                top: `${Math.max(8, Math.min(88, y + offsetY))}%` 
              }}
            >
              <div className="relative group">
                <div className={`w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-200 ${
                  selectedLocation?.id === location.id 
                    ? 'bg-coral-600 scale-110 shadow-xl ring-4 ring-coral-200' 
                    : 'bg-coral-500 hover:bg-coral-600 hover:shadow-xl group-hover:ring-2 group-hover:ring-coral-200'
                }`}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                {/* Price tag */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-coral-600 text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₱{location.price.toLocaleString()}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Location details popup - Enhanced */}
      {selectedLocation && (
        <>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 z-20"
            onClick={() => setSelectedLocation(null)}
          />
          
          {/* Popup */}
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl p-6 z-40 max-w-lg mx-auto border border-gray-100">
            <div className="flex gap-4">
              <img
                src={selectedLocation.heroImage}
                alt={selectedLocation.title}
                className="w-24 h-24 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-gray-900 text-lg line-clamp-2 pr-2">
                    {selectedLocation.title}
                  </h4>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedLocation.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{selectedLocation.rating}</span>
                    <span className="text-gray-400">({selectedLocation.reviews})</span>
                  </div>
                </div>
                
                <div className="text-lg font-bold text-coral-600 mb-4">
                  ₱{selectedLocation.price.toLocaleString()}/day
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLocationClick(selectedLocation)}
                    className="flex-1 bg-coral-500 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-coral-600 transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => handleBookNow(e, selectedLocation)}
                    className="bg-gray-100 text-gray-600 p-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                    title="Book Now"
                  >
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleMessage(e, selectedLocation)}
                    className="bg-gray-100 text-gray-600 p-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                    title="Send Message"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationMap;
