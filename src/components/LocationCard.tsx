
import { useState } from "react";
import { MapPin, Calendar, MessageCircle } from "lucide-react";
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

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const allImages = [location.heroImage, ...location.gallery];

  const handleCardClick = () => {
    navigate(`/location/${location.id}`);
  };

  const handleImageClick = (e: React.MouseEvent, imageIndex: number) => {
    e.stopPropagation();
    navigate(`/location/${location.id}/image/${imageIndex}`);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={handleCardClick}
    >
      {/* Image Container with Navigation */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={allImages[currentImageIndex]}
          alt={location.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onClick={(e) => handleImageClick(e, currentImageIndex)}
        />
        
        {/* Image Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              ›
            </button>
            
            {/* Image Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Like button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <svg
            className={`h-5 w-5 ${isLiked ? 'text-coral-500 fill-current' : 'text-gray-600'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Price badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-900">₱{location.price.toLocaleString()}/day</span>
        </div>

        {/* Image count badge */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {allImages.length} photos
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location and rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{location.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{location.rating}</span>
            <span className="text-sm text-gray-500">({location.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-coral-600 transition-colors">
          {location.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {location.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-coral-50 text-coral-600 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {location.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
              +{location.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
          <div>
            <span className="font-medium">{location.metadata.sizeM2}m²</span>
            <span className="text-gray-500"> space</span>
          </div>
          <div>
            <span className="font-medium">{location.metadata.maxCrew}</span>
            <span className="text-gray-500"> max crew</span>
          </div>
          <div>
            <span className="font-medium">{location.metadata.powerAmps}A</span>
            <span className="text-gray-500"> power</span>
          </div>
          <div className="flex items-center gap-1">
            {location.metadata.parking ? (
              <>
                <span className="text-green-500">✓</span>
                <span className="text-gray-500">Parking</span>
              </>
            ) : (
              <>
                <span className="text-gray-400">✗</span>
                <span className="text-gray-500">No parking</span>
              </>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-coral-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-coral-600 transition-colors flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              // Handle booking
            }}
          >
            <Calendar className="h-4 w-4" />
            Book Now
          </button>
          <button 
            className="bg-gray-100 text-gray-600 p-2 rounded-xl hover:bg-gray-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle message
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
