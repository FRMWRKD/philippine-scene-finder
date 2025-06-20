
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Tag, Calendar, MessageCircle, Heart, Share2, Star, Camera } from "lucide-react";
import { mockLocations } from "../data/mockData";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";
import ImageModal from "../components/ImageModal";

const ImageDetail = () => {
  const { locationId, imageIndex } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const location = mockLocations.find(loc => loc.id === locationId);
  const imageIdx = parseInt(imageIndex || "0");

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Image Not Found</h1>
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
  const currentImage = allImages[imageIdx];

  // Mock image-specific data
  const imageData = {
    title: `${location.title} - Image ${imageIdx + 1}`,
    description: imageIdx === 0 
      ? "Main studio space featuring professional lighting setup and clean industrial aesthetic. Perfect for fashion photography and commercial shoots."
      : `Detail view ${imageIdx} showcasing ${location.tags[imageIdx % location.tags.length]} features with natural lighting and professional equipment setup.`,
    specificTags: imageIdx === 0 
      ? ["Main Studio", "Professional Lighting", "Fashion Photography", "Industrial Design"]
      : ["Detail Shot", location.tags[imageIdx % location.tags.length], "Natural Light", "Professional Setup"],
    capturedDate: "2024-01-15",
    photographer: "Studio Team",
    equipment: "Canon EOS R5, 24-70mm f/2.8"
  };

  const relatedImages = allImages
    .map((img, idx) => ({ image: img, index: idx }))
    .filter((_, idx) => idx !== imageIdx)
    .slice(0, 6);

  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const handleLocationClick = () => {
    navigate(`/location/${location.id}`);
  };

  const handleScoutClick = () => {
    navigate(`/scout/1`); // Mock scout ID
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
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

      {/* Main Image */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-100">
          <img
            src={currentImage}
            alt={imageData.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />
        </div>
        
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm">
          <Camera className="h-4 w-4 inline mr-1" />
          Click to view full size
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Title & Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {imageData.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Captured:</span> {imageData.capturedDate}
                </div>
                <div>
                  <span className="font-medium">By:</span> {imageData.photographer}
                </div>
                <div>
                  <span className="font-medium">Equipment:</span> {imageData.equipment}
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {imageData.description}
              </p>

              {/* Image-Specific Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Image Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {imageData.specificTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">About This Location</h2>
              <div 
                className="bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={handleLocationClick}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={location.heroImage}
                    alt={location.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{location.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{location.location}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{location.rating}</span>
                        <span className="text-gray-500">({location.reviews} reviews)</span>
                      </div>
                      <div className="font-bold text-coral-600">
                        ₱{location.price.toLocaleString()}/day
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {location.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-coral-50 text-coral-600 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scout Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Location Scout</h2>
              <div 
                className="bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={handleScoutClick}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
                    alt="Maria Santos"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">Maria Santos</h3>
                    <div className="flex items-center gap-1 text-sm mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-500">• Professional Scout • 3 years</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Specializes in urban photography locations and commercial spaces
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Images from Same Location */}
            {relatedImages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">More from This Location</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedImages.map(({ image, index }) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/image/${location.id}/${index}`)}
                      className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-coral-300 transition-all group"
                    >
                      <img
                        src={image}
                        alt={`${location.title} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Booking Card */}
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

                  <button
                    onClick={handleLocationClick}
                    className="w-full border border-coral-300 text-coral-700 py-3 px-4 rounded-xl font-medium hover:bg-coral-50 transition-colors"
                  >
                    View Full Location Details
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>

              {/* Image Stats */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Image Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Part of gallery</span>
                    <span className="font-semibold">{allImages.length} photos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Image quality</span>
                    <span className="font-semibold">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usage rights</span>
                    <span className="font-semibold">Commercial OK</span>
                  </div>
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

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={allImages}
        currentIndex={imageIdx}
        onIndexChange={(index) => navigate(`/image/${location.id}/${index}`)}
        locationTitle={location.title}
      />
    </div>
  );
};

export default ImageDetail;
