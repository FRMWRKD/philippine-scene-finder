
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Zap, Car, MessageCircle, Calendar, Heart, Share2, Star } from "lucide-react";
import { mockLocations } from "../data/mockData";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const location = mockLocations.find(loc => loc.id === id);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-coral-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const allImages = [location.heroImage, ...location.gallery];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to search</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'text-coral-500 fill-current' : 'text-gray-600'}`} />
                <span className="text-sm font-medium">Save</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/1] bg-gray-100">
          <img
            src={allImages[currentImageIndex]}
            alt={location.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Navigation */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-xl p-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Location */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{location.location}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {location.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{location.rating}</span>
                  <span className="text-gray-500">({location.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-coral-600">
                  ₱{location.price.toLocaleString()}/day
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {location.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-coral-50 text-coral-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {location.metadata.sizeM2}m²
                  </div>
                  <div className="text-sm text-gray-600">Space</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {location.metadata.powerAmps}A
                  </div>
                  <div className="text-sm text-gray-600">Power</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {location.metadata.maxCrew}
                  </div>
                  <div className="text-sm text-gray-600">Max Crew</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-1">
                    {location.metadata.parking ? (
                      <Car className="h-6 w-6 text-green-500" />
                    ) : (
                      <Car className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {location.metadata.parking ? 'Parking' : 'No Parking'}
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-coral-500 ring-2 ring-coral-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${location.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ₱{location.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600">per day</div>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full bg-coral-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-coral-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Book This Location
                  </button>
                  
                  <button
                    onClick={() => setIsMessageOpen(true)}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message Scout
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        location={location}
      />
      
      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        location={location}
      />
    </div>
  );
};

export default LocationDetail;
