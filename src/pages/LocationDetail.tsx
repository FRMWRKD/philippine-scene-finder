
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Calendar, MessageCircle, Share2, Heart } from "lucide-react";
import { mockLocations } from "../data/mockData";
import { Button } from "../components/ui/button";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";
import ImageModal from "../components/ImageModal";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const location = mockLocations.find(loc => loc.id === id);

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h2>
          <Button onClick={() => navigate('/')}>Back to Locations</Button>
        </div>
      </div>
    );
  }

  const allImages = [location.heroImage, ...location.gallery];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: location.title,
        text: location.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-coral-600 hover:text-coral-700 mb-6 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Locations
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="mb-6">
              <div 
                className="aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => handleImageClick(0)}
              >
                <img
                  src={location.heroImage}
                  alt={location.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {location.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => handleImageClick(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Location</h2>
              <p className="text-gray-700 leading-relaxed">{location.description}</p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {location.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-coral-50 text-coral-600 text-sm rounded-full font-medium border border-coral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{location.title}</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorited 
                        ? 'bg-red-50 text-red-500' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{location.location}</span>
              </div>

              <div className="flex items-center gap-1 mb-6">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{location.rating}</span>
                <span className="text-gray-600">({location.reviews} reviews)</span>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-coral-600">₱{location.price.toLocaleString()}</div>
                <div className="text-sm text-gray-600">per day</div>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-coral-500 hover:bg-coral-600"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Location
                </Button>
                <Button 
                  onClick={() => setShowMessageModal(true)}
                  variant="outline" 
                  className="w-full border-coral-200 text-coral-600 hover:bg-coral-50"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>
              </div>

              {/* Location Details */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Location Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{location.size || '500 sqm'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{location.capacity || '50 people'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{location.type || 'Studio'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        locationTitle={location.title}
        dailyRate={location.price}
      />

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipientName={location.title}
        recipientType="location owner"
      />

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={allImages}
        currentIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
      />
    </div>
  );
};

export default LocationDetail;
