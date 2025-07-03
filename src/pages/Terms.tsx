import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Users, CreditCard, Shield } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Provide accurate information when creating your account",
        "Use the platform respectfully and legally",
        "Respect other users' intellectual property rights",
        "Report any suspicious or inappropriate behavior"
      ]
    },
    {
      icon: CreditCard,
      title: "Booking & Payments",
      content: [
        "All bookings are subject to availability and confirmation",
        "Payment processing is handled securely through our platform",
        "Cancellation policies vary by location and are set by owners",
        "Disputes will be handled fairly according to our resolution process"
      ]
    },
    {
      icon: Shield,
      title: "Platform Rules",
      content: [
        "Content must comply with Philippine laws and regulations",
        "We reserve the right to remove inappropriate content",
        "Account suspension may occur for violations of these terms",
        "We are not liable for disputes between users"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
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
            <h1 className="text-xl font-bold text-gray-900">LocationScout</h1>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-coral-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Terms Overview</h2>
                <p className="text-gray-600">Last updated: December 2024</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              By using LocationScout Philippines, you agree to these terms of service. These terms govern your use of our platform 
              and outline the rights and responsibilities of all users, including photographers, filmmakers, location owners, and scouts.
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                  <section.icon className="h-6 w-6 text-coral-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-amber-800 mb-2">Important Notice</h3>
            <p className="text-amber-700">
              These terms may be updated from time to time. Continued use of the platform constitutes acceptance of any changes. 
              We recommend reviewing these terms periodically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;