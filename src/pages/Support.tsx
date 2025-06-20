
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react";

const Support = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "Booking & Payments",
      questions: [
        {
          question: "How do I book a location?",
          answer: "Simply browse our locations, select your preferred date and time, and complete the booking through our secure payment system. You'll receive instant confirmation with all necessary details."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, GCash, PayMaya, and bank transfers. Payment is processed securely through our platform."
        },
        {
          question: "Can I cancel or modify my booking?",
          answer: "Yes, you can cancel or modify bookings up to 48 hours before your shoot date. Cancellation policies vary by location owner, so please check the specific terms."
        }
      ]
    },
    {
      category: "Location Scouting",
      questions: [
        {
          question: "How do I find the right scout for my project?",
          answer: "Use our scout directory to filter by location, specialty, and experience. Read reviews and portfolios to find the perfect match for your creative vision."
        },
        {
          question: "What services do location scouts provide?",
          answer: "Our scouts offer location research, permit assistance, local crew recommendations, equipment rental connections, and cultural guidance."
        },
        {
          question: "How much do location scouts charge?",
          answer: "Scout fees vary based on experience, location complexity, and services required. Most scouts charge between ₱2,500 - ₱20,000 per day."
        }
      ]
    },
    {
      category: "Permits & Regulations",
      questions: [
        {
          question: "Do I need permits to shoot in the Philippines?",
          answer: "Most commercial shoots require permits. Our location scouts can help you navigate the permit process and ensure compliance with local regulations."
        },
        {
          question: "How long does it take to get permits?",
          answer: "Permit processing time varies by location and type of shoot. Generally, allow 1-2 weeks for standard permits. Our scouts can expedite when possible."
        },
        {
          question: "What insurance is required?",
          answer: "We recommend comprehensive production insurance. Some locations require specific coverage. Check with your scout and location owner for requirements."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble with the website. What should I do?",
          answer: "Try refreshing your browser or clearing your cache. If issues persist, contact our support team with details about the problem and your browser/device."
        },
        {
          question: "How do I upload my location to the platform?",
          answer: "Click 'List Your Space' on our homepage and follow the step-by-step process. Include high-quality photos and detailed descriptions for best results."
        },
        {
          question: "Can I edit my location listing after posting?",
          answer: "Yes, you can edit your listing anytime through your account dashboard. Updates are reviewed and go live within 24 hours."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@locationph.com",
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+63 (2) 8123-4567",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Can We Help?
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/20 outline-none text-gray-900 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                  <method.icon className="h-6 w-6 text-coral-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                  <p className="text-coral-600 text-xs font-medium mb-3">{method.available}</p>
                  <button className="bg-coral-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-coral-600 transition-colors">
                    {method.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find quick answers to common questions</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">
                {category.category}
              </h3>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isExpanded = expandedFaq === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {searchQuery && filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No results found for "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-coral-600 hover:text-coral-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 text-lg mb-8">Our support team is here to assist you</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-coral-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-coral-600 transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
