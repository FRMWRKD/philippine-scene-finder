
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Calendar, MessageCircle, Share2, Heart, Phone, Mail } from "lucide-react";
import { mockLocations } from "../data/mockData";
import { Button } from "../components/ui/button";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";

// Create mock scout data based on the ID
const getScoutData = (id: string) => {
  const scouts = [
    {
      id: "1",
      name: "Maria Santos",
      title: "Professional Location Scout",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c6d5?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 2500,
      location: "Metro Manila",
      experience: "8 years",
      specialties: ["Urban Locations", "Studio Spaces", "Historical Sites"],
      description: "Experienced location scout with extensive knowledge of Metro Manila's best photography and filming locations.",
      portfolio: [
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop"
      ]
    },
    {
      id: "2",
      name: "Carlos Rodriguez",
      title: "Freelance Location Scout",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviews: 89,
      hourlyRate: 2000,
      location: "Cebu City",
      experience: "5 years",
      specialties: ["Beach Locations", "Nature Spots", "Commercial Spaces"],
      description: "Specialized in finding unique outdoor and commercial locations throughout Cebu and surrounding areas.",
      portfolio: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571203841770-8b23a73b4c57?w=400&h=300&fit=crop"
      ]
    }
  ];
  
  return scouts.find(scout => scout.id === id) || scouts[0];
};

const ScoutProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const scout = getScoutData(id || "1");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scout.name,
        text: `Check out ${scout.name} - ${scout.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/scouts')}
          className="flex items-center gap-2 text-coral-600 hover:text-coral-700 mb-6 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scouts
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Scout Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <img
                  src={scout.avatar}
                  alt={scout.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{scout.name}</h1>
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
                  <p className="text-coral-600 font-medium mb-2">{scout.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{scout.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{scout.rating}</span>
                      <span>({scout.reviews} reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{scout.description}</p>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {scout.portfolio.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {scout.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-coral-50 text-coral-600 text-sm rounded-full font-medium border border-coral-200"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-coral-600">₱{scout.hourlyRate.toLocaleString()}</div>
                <div className="text-sm text-gray-600">per hour</div>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-coral-500 hover:bg-coral-600"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Scout
                </Button>
                <Button 
                  onClick={() => setShowMessageModal(true)}
                  variant="outline" 
                  className="w-full border-coral-200 text-coral-600 hover:bg-coral-50"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Scout Details */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Scout Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{scout.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-medium">{scout.reviews} reviews</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{scout.rating}/5.0</span>
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
      />

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
      />
    </div>
  );
};

export default ScoutProfile;
