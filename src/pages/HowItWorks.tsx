
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Calendar, Camera, Users, Star, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse through thousands of unique Filipino locations. Use our smart filters to find exactly what you need for your shoot.",
      details: ["Filter by region, style, and amenities", "View detailed photos and specifications", "Read reviews from other creators"]
    },
    {
      icon: MapPin,
      title: "Connect with Scouts",
      description: "Get matched with verified local scouts who know the best spots and can handle permits and logistics.",
      details: ["Message scouts directly", "Get personalized recommendations", "Local expertise and connections"]
    },
    {
      icon: Calendar,
      title: "Book Your Location",
      description: "Secure your perfect spot with our easy booking system. Get instant confirmation and all necessary details.",
      details: ["Transparent pricing", "Secure payment processing", "Booking confirmation and details"]
    },
    {
      icon: Camera,
      title: "Create Amazing Content",
      description: "Show up and shoot! Our scouts ensure everything is ready, from permits to equipment recommendations.",
      details: ["On-site support available", "Equipment rental connections", "Local crew recommendations"]
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "For Photographers & Filmmakers",
      items: [
        "Access to unique Philippine locations",
        "Local scout expertise and connections",
        "Hassle-free permit handling",
        "Equipment rental recommendations",
        "Cultural sensitivity guidance"
      ]
    },
    {
      icon: MapPin,
      title: "For Location Owners",
      items: [
        "Monetize your unique spaces",
        "Connect with professional creators",
        "Flexible booking management",
        "Insurance coverage included",
        "Professional marketing support"
      ]
    },
    {
      icon: Star,
      title: "For Location Scouts",
      items: [
        "Build your professional network",
        "Showcase local expertise",
        "Earn from your knowledge",
        "Flexible working schedule",
        "Professional development opportunities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LocationPH</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button 
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Browse Locations
              </button>
              <button 
                onClick={() => navigate("/scouts")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Find Scouts
              </button>
              <button className="text-coral-600 hover:text-coral-700 font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How LocationPH Works
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Connecting Filipino photographers and filmmakers with unique locations and expert scouts across the Philippines
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
          <p className="text-gray-600 text-lg">From discovery to shooting in just a few clicks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-coral-200 z-0"></div>
              )}
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <step.icon className="h-8 w-8 text-coral-600" />
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-coral-600 mb-2">STEP {index + 1}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-coral-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for Everyone</h2>
            <p className="text-gray-600 text-lg">LocationPH creates value for our entire creative community</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="h-8 w-8 text-coral-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                
                <ul className="space-y-3">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-coral-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of Filipino creators using LocationPH</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/")}
              className="bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Locations
            </button>
            <button 
              onClick={() => navigate("/scouts")}
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Find Scouts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
