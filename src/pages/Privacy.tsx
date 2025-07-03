import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Mail } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account",
        "Location data when booking venues",
        "Usage data to improve our services",
        "Communication records for support purposes"
      ]
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our location booking services",
        "To connect you with location scouts and venue owners",
        "To process payments and send booking confirmations",
        "To communicate important updates about your bookings"
      ]
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: [
        "We use industry-standard encryption to protect your data",
        "Your personal information is never sold to third parties",
        "Access to your data is strictly limited to authorized personnel",
        "We comply with Philippine Data Privacy Act requirements"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-coral-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Data Privacy Overview</h2>
                <p className="text-gray-600">Last updated: December 2024</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              LocationScout Philippines is committed to protecting your privacy and ensuring the security of your personal information. 
              This privacy policy explains how we collect, use, and safeguard your data when you use our platform.
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

          {/* Contact */}
          <div className="bg-coral-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About Privacy?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about this privacy policy, please contact us.
            </p>
            <button 
              onClick={() => navigate("/support")}
              className="bg-coral-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;