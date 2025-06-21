
import { Camera, Facebook, Twitter, Instagram, Mail, Phone, MapPin, HelpCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-coral-400" />
              <span className="text-2xl font-bold">LocationScout</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting filmmakers and photographers with perfect Philippine locations. 
              Discover, book, and create your next masterpiece.
            </p>
            <div className="flex gap-4">
              <button className="p-2 bg-gray-800 hover:bg-coral-500 rounded-lg transition-colors">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-coral-500 rounded-lg transition-colors">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-coral-500 rounded-lg transition-colors">
                <Instagram className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coral-400">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Browse Locations
              </Link>
              <Link to="/scouts" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Find Scouts
              </Link>
              <Link to="/upload" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                List Your Location
              </Link>
              <Link 
                to="/how-it-works" 
                className="flex items-center gap-2 text-gray-300 hover:text-coral-400 transition-colors text-sm font-medium"
              >
                <HelpCircle className="h-4 w-4" />
                How It Works
              </Link>
            </div>
          </div>

          {/* Help & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coral-400">Help & Support</h3>
            <div className="space-y-2">
              <Link 
                to="/support" 
                className="flex items-center gap-2 text-gray-300 hover:text-coral-400 transition-colors text-sm font-medium"
              >
                <Heart className="h-4 w-4" />
                Support Center
              </Link>
              <a href="#" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Photography Locations
              </a>
              <a href="#" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Film Locations
              </a>
              <a href="#" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Virtual Tours
              </a>
              <a href="#" className="block text-gray-300 hover:text-coral-400 transition-colors text-sm">
                Permit Assistance
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coral-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4 text-coral-400" />
                <span>hello@locationscout.ph</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4 text-coral-400" />
                <span>+63 2 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="h-4 w-4 text-coral-400" />
                <span>Manila, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} LocationScout Philippines. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-coral-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-coral-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-coral-400 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
