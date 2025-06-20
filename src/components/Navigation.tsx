
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Camera, Users, Upload, HelpCircle, Heart } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Locations", icon: Camera },
    { path: "/scouts", label: "Scouts", icon: Users },
    { path: "/upload", label: "List Location", icon: Upload },
    { path: "/how-it-works", label: "How it Works", icon: HelpCircle },
    { path: "/support", label: "Support", icon: Heart },
  ];

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-8">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Camera className="h-4 w-4 text-coral-500" />
            <span className="text-sm font-bold text-gray-900">LocationScout</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-coral-50 text-coral-600 shadow-sm border border-coral-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200 bg-white">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-coral-50 text-coral-600 border border-coral-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
