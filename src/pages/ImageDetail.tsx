
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, MessageCircle, Heart, Share2, Star, Camera, Users, Zap } from "lucide-react";
import { mockLocations } from "../data/mockData";

const ImageDetail = () => {
  const { locationId, imageIndex } = useParams();
  const navigate = useNavigate();
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
  
  // Mock detailed data for this specific image
  const imageDetails = {
    title: `${location.title} - Scene ${imageIdx + 1}`,
    description: getImageDescription(imageIdx),
    tags: getImageTags(imageIdx),
    shootingDetails: {
      bestTime: "Golden hour (6-7 AM, 5-6 PM)",
      equipment: ["DSLR/Mirrorless", "Wide-angle lens", "Tripod recommended"],
      lighting: "Natural light preferred",
      restrictions: "No flash photography"
    },
    specifications: {
      area: `${Math.floor(Math.random() * 50) + 20}m²`,
      capacity: `${Math.floor(Math.random() * 10) + 5} people`,
      power: "Available nearby",
      access: "Easy access"
    }
  };

  function getImageDescription(index: number) {
    const descriptions = [
      "Perfect for portrait photography with natural lighting and modern architectural elements. This area features clean lines and excellent acoustics.",
      "Ideal for product photography with neutral backgrounds. The space offers versatile shooting angles and controlled lighting options.",
      "Great for fashion shoots with dramatic lighting possibilities. Features textured walls and interesting geometric patterns.",
      "Perfect for video interviews or talking head shots. Quiet area with minimal echo and good natural light.",
      "Excellent for group photos and team shots. Spacious area with flexible seating arrangements and backdrop options."
    ];
    return descriptions[index % descriptions.length];
  }

  function getImageTags(index: number) {
    const tagSets = [
      ["Portrait", "Natural Light", "Modern", "Quiet"],
      ["Product", "Clean Background", "Controlled Light", "Minimal"],
      ["Fashion", "Dramatic", "Textured", "Artistic"],
      ["Interview", "Video", "Audio Friendly", "Professional"],
      ["Group", "Spacious", "Flexible", "Team Photos"]
    ];
    return tagSets[index % tagSets.length];
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/location/${locationId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to location</span>
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

      {/* Image Display */}
      <div className="relative">
        <div className="aspect-[16/9] bg-gray-100">
          <img
            src={currentImage}
            alt={imageDetails.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Details */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{location.location}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {imageDetails.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {imageDetails.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {imageDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-coral-50 text-coral-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Shooting Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Shooting Information</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Best Shooting Time</h3>
                    <p className="text-gray-600">{imageDetails.shootingDetails.bestTime}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Lighting</h3>
                    <p className="text-gray-600">{imageDetails.shootingDetails.lighting}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Recommended Equipment</h3>
                    <ul className="text-gray-600 space-y-1">
                      {imageDetails.shootingDetails.equipment.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Restrictions</h3>
                    <p className="text-gray-600">{imageDetails.shootingDetails.restrictions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Space Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Space Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">{imageDetails.specifications.area}</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">{imageDetails.specifications.capacity}</div>
                  <div className="text-sm text-gray-600">Capacity</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">✓</div>
                  <div className="text-sm text-gray-600">Power</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">✓</div>
                  <div className="text-sm text-gray-600">Easy Access</div>
                </div>
              </div>
            </div>

            {/* Related Images */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Other Angles & Views</h2>
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/location/${locationId}/image/${index}`)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === imageIdx 
                        ? 'border-coral-500 ring-2 ring-coral-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
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
                  <button className="w-full bg-coral-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-coral-600 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Book This Space
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Ask About This Area
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  Specific area booking available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
