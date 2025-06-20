
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Calendar, MessageCircle, Phone, Mail, Camera, Video, Users, Award } from "lucide-react";
import { mockScouts } from "../data/mockData";
import { Button } from "../components/ui/button";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";

const ScoutProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const scout = mockScouts.find(scout => scout.id === id);

  if (!scout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Scout Not Found</h2>
          <Button onClick={() => navigate('/scouts')}>Back to Scouts</Button>
        </div>
      </div>
    );
  }

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
          {/* Scout Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <img
                  src={scout.profileImage}
                  alt={scout.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-2xl font-bold text-gray-900">{scout.name}</h1>
                <p className="text-gray-600 mb-2">{scout.specialization}</p>
                
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{scout.rating}</span>
                  <span className="text-gray-600">({scout.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{scout.location}</span>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-coral-600">₱{scout.hourlyRate}</div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
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

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{scout.phone || '+63 912 345 6789'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{scout.email || `${scout.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {scout.name}</h2>
              <p className="text-gray-700 leading-relaxed">
                {scout.bio || `Professional location scout with ${scout.experience} years of experience in the Philippine entertainment industry. Specialized in ${scout.specialization.toLowerCase()} and committed to finding the perfect locations for your creative projects.`}
              </p>
            </div>

            {/* Services & Specializations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Services & Specializations</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-coral-50 rounded-lg">
                  <Camera className="h-5 w-5 text-coral-600" />
                  <span className="font-medium">Photography Locations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-coral-50 rounded-lg">
                  <Video className="h-5 w-5 text-coral-600" />
                  <span className="font-medium">Film & Video Shoots</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-coral-50 rounded-lg">
                  <Users className="h-5 w-5 text-coral-600" />
                  <span className="font-medium">Event Venues</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-coral-50 rounded-lg">
                  <Award className="h-5 w-5 text-coral-600" />
                  <span className="font-medium">Premium Locations</span>
                </div>
              </div>
            </div>

            {/* Experience & Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Experience & Stats</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-coral-600 mb-1">{scout.experience}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-coral-600 mb-1">{scout.completedProjects || '150+'}</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-coral-600 mb-1">{scout.reviews}</div>
                  <div className="text-sm text-gray-600">Client Reviews</div>
                </div>
              </div>
            </div>

            {/* Portfolio/Recent Work */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Work</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {scout.portfolioImages?.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )) || (
                  // Fallback images if portfolioImages doesn't exist
                  <>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop"
                        alt="Recent work 1"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop"
                        alt="Recent work 2"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        scoutName={scout.name}
        hourlyRate={scout.hourlyRate}
      />

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipientName={scout.name}
        recipientType="scout"
      />
    </div>
  );
};

export default ScoutProfile;
